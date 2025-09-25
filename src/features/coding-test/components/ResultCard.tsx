import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Download, RotateCcw, UserPlus, Star, Trophy, Target } from "lucide-react";
import { TestResult } from "../questions";
import { LEVEL_DESCRIPTIONS } from "../questions";
import { trackEvent, ANALYTICS_EVENTS } from "../types";

interface ResultCardProps {
  result: TestResult;
  parentName?: string;
  studentName?: string;
  onReset: () => void;
  onRegisterTrial: () => void;
  onDownloadReport?: () => void;
}

export function ResultCard({ 
  result, 
  parentName,
  studentName,
  onReset, 
  onRegisterTrial,
  onDownloadReport 
}: ResultCardProps) {
  const levelInfo = LEVEL_DESCRIPTIONS[result.level];
  
  const handleTrialClick = () => {
    trackEvent(ANALYTICS_EVENTS.TEST_CTA_TRIAL_CLICK, {
      level: result.level,
      correct: result.correct
    });
    onRegisterTrial();
  };

  const handleDownloadClick = () => {
    if (onDownloadReport) {
      onDownloadReport();
    } else {
      // Fallback: print current page
      window.print();
    }
  };

  const getLevelIcon = () => {
    switch (result.level) {
      case "Beginner":
        return <Target className="w-8 h-8 text-success" />;
      case "Intermediate":
        return <Star className="w-8 h-8 text-secondary" />;
      case "Advanced":
        return <Trophy className="w-8 h-8 text-accent" />;
      default:
        return <CheckCircle className="w-8 h-8 text-primary" />;
    }
  };

  const getLevelColor = () => {
    switch (result.level) {
      case "Beginner":
        return "bg-success text-success-foreground";
      case "Intermediate":
        return "bg-secondary text-secondary-foreground";
      case "Advanced":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Congratulations Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          {getLevelIcon()}
        </div>
        <h1 className="text-3xl font-bold">
          Chúc mừng{studentName ? ` ${studentName}` : ''}! Con đã hoàn thành bài test.
        </h1>
        <p className="text-xl text-muted-foreground">
          Đây là kết quả đánh giá năng lực lập trình của con
        </p>
      </div>

      {/* Result Summary */}
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center items-center gap-3 mb-2">
            <CardTitle className="text-2xl">
              Con trả lời đúng {result.correct}/{result.total} câu
            </CardTitle>
          </div>
          <div className="flex justify-center">
            <Badge className={`${getLevelColor()} text-lg px-4 py-2`}>
              Cấp độ: {levelInfo.title}
            </Badge>
          </div>
          <CardDescription className="text-base mt-2">
            {levelInfo.description}
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Lộ trình học phù hợp cho con:
              </h3>
              <ul className="space-y-3">
                {levelInfo.roadmap.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-base">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Call to Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                onClick={handleTrialClick}
                className="h-14"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Đăng ký học thử miễn phí 1 buổi
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleDownloadClick}
                className="h-14"
              >
                <Download className="w-5 h-5 mr-2" />
                Tải báo cáo PDF
              </Button>
            </div>

            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                onClick={onReset}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Làm lại bài test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Kết quả này đã được gửi đến email: <strong>{parentName}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Đội ngũ tư vấn của Rocket Tech Academy sẽ liên hệ với quý phụ huynh trong 24h tới
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}