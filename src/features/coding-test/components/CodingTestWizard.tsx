import { useEffect, useState } from "react";
import { ParentForm } from "./ParentForm";
import { TestQuestion } from "./TestQuestion";
import { ResultCard } from "./ResultCard";
import { useTestSession } from "../hooks/use-test-session";
import { evaluate } from "../questions";
import { trackEvent, ANALYTICS_EVENTS } from "../types";
import { toast } from "@/hooks/use-toast";

export function CodingTestWizard() {
  const {
    session,
    currentStep,
    startSession,
    submitAnswer,
    nextQuestion,
    completeTest,
    resetSession,
    getCurrentQuestion,
    getCurrentAnswer,
    setCurrentStep
  } = useTestSession();

  const [isCalculating, setIsCalculating] = useState(false);

  // Track initial page view
  useEffect(() => {
    if (currentStep === 'test') {
      trackEvent(ANALYTICS_EVENTS.TEST_START);
    }
  }, [currentStep]);

  const handleFormSubmit = (parentInfo: any) => {
    startSession(parentInfo);
  };

  const handleAnswerSubmit = (choiceIndex: number) => {
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      submitAnswer(currentQuestion.id, choiceIndex);
    }
  };

  const handleNextQuestion = async () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion || !session) return;

    const currentAnswer = getCurrentAnswer(currentQuestion.id);
    if (currentAnswer === null) {
      toast({
        title: "Vui lòng chọn đáp án",
        description: "Bạn cần chọn một đáp án trước khi tiếp tục.",
        variant: "destructive"
      });
      return;
    }

    // Check if this is the last question
    if (session.currentQuestion >= session.answers.length - 1 && session.answers.length >= 7) {
      // Complete the test
      setIsCalculating(true);
      
      // Simulate calculation time
      await new Promise(resolve => setTimeout(resolve, 800));
      
      completeTest();
      setIsCalculating(false);
      
      // Track completion
      const result = evaluate(session.answers);
      trackEvent(ANALYTICS_EVENTS.TEST_SUBMIT, {
        correct: result.correct,
        level: result.level
      });
      trackEvent(ANALYTICS_EVENTS.TEST_VIEW_RESULT, {
        correct: result.correct,
        level: result.level
      });
    } else {
      nextQuestion();
    }
  };

  const handleRegisterTrial = () => {
    // In a real app, this would open a registration modal or redirect
    toast({
      title: "Đăng ký thành công!",
      description: "Chúng tôi sẽ liên hệ với quý phụ huynh trong 24h tới để sắp xếp buổi học thử.",
    });
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "Báo cáo đang được tạo",
      description: "Báo cáo sẽ được gửi về email của quý phụ huynh trong vài phút tới.",
    });
  };

  // Loading state during calculation
  if (isCalculating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium">Đang tính toán kết quả...</p>
          <p className="text-muted-foreground">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    );
  }

  // Form step
  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <ParentForm 
          onSubmit={handleFormSubmit}
          defaultValues={session?.parentInfo}
        />
      </div>
    );
  }

  // Test step
  if (currentStep === 'test' && session) {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) {
      // All questions completed, show result
      setCurrentStep('result');
      return null;
    }

    const currentAnswer = getCurrentAnswer(currentQuestion.id);
    
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <TestQuestion
          question={currentQuestion}
          questionNumber={session.currentQuestion}
          totalQuestions={7}
          selectedAnswer={currentAnswer?.choiceIndex}
          onAnswer={handleAnswerSubmit}
          onNext={handleNextQuestion}
          isLastQuestion={session.currentQuestion >= 6}
        />
      </div>
    );
  }

  // Result step
  if (currentStep === 'result' && session) {
    const result = evaluate(session.answers);
    
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <ResultCard
          result={result}
          parentName={session.parentInfo.email}
          studentName={session.parentInfo.studentName}
          onReset={resetSession}
          onRegisterTrial={handleRegisterTrial}
          onDownloadReport={handleDownloadReport}
        />
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    </div>
  );
}