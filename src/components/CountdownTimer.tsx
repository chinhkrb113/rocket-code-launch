import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2024-10-15T23:59:59").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Ngày", value: timeLeft.days },
    { label: "Giờ", value: timeLeft.hours },
    { label: "Phút", value: timeLeft.minutes },
    { label: "Giây", value: timeLeft.seconds },
  ];

  return (
    <Card className="bg-accent/10 border-accent/20 backdrop-blur-sm animate-fade-in">
      <div className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-accent animate-pulse" />
          <span className="text-accent font-semibold text-lg">
            Thời gian còn lại để đăng ký ưu đãi
          </span>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="text-center">
              <div className="bg-hero-gradient rounded-lg p-3 mb-2 shadow-glow">
                <span className="text-2xl font-bold text-white tabular-nums">
                  {unit.value.toString().padStart(2, "0")}
                </span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-accent">🎁 Giảm 15%</span> + Tặng 1 buổi học thử miễn phí
        </div>
      </div>
    </Card>
  );
};

export default CountdownTimer;