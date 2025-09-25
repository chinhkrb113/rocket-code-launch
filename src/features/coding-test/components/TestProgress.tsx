import { Progress } from "@/components/ui/progress";

interface TestProgressProps {
  current: number;
  total: number;
  className?: string;
}

export function TestProgress({ current, total, className }: TestProgressProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Câu {current + 1} / {total}
        </span>
        <span className="text-sm font-medium text-primary">
          {percentage}%
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}