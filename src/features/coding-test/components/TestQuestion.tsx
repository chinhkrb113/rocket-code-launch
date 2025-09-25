import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Question } from "../questions";
import { TestProgress } from "./TestProgress";
import { CountdownHint } from "./CountdownHint";

interface TestQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswer: (choiceIndex: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function TestQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
  isLastQuestion
}: TestQuestionProps) {
  const [currentAnswer, setCurrentAnswer] = useState<number | undefined>(selectedAnswer);

  const handleAnswerChange = (value: string) => {
    const choiceIndex = parseInt(value);
    setCurrentAnswer(choiceIndex);
    onAnswer(choiceIndex);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-success text-success-foreground";
      case "intermediate":
        return "bg-secondary text-secondary-foreground";
      case "advanced":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case "beginner":
        return "Cơ bản";
      case "intermediate":
        return "Trung cấp";
      case "advanced":
        return "Nâng cao";
      default:
        return level;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header with progress and time hint */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Mini-test Lập trình</h2>
          <Badge className={getLevelColor(question.level)} variant="secondary">
            {getLevelText(question.level)}
          </Badge>
        </div>
        <CountdownHint />
      </div>

      <TestProgress current={questionNumber} total={totalQuestions} />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.text}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={currentAnswer?.toString()}
            onValueChange={handleAnswerChange}
            className="space-y-4"
          >
            {question.choices.map((choice, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`choice-${index}`}
                  className="mt-0.5"
                />
                <Label 
                  htmlFor={`choice-${index}`} 
                  className="flex-1 text-base leading-relaxed cursor-pointer"
                >
                  {choice}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-end pt-4">
            <Button
              onClick={onNext}
              disabled={currentAnswer === undefined}
              size="lg"
              className="min-w-32"
            >
              {isLastQuestion ? "Nộp bài" : "Câu tiếp theo"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}