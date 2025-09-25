import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CountdownHintProps {
  timeHint?: string;
  className?: string;
}

export function CountdownHint({ 
  timeHint = "~5 phút", 
  className 
}: CountdownHintProps) {
  return (
    <Badge variant="secondary" className={`${className} text-sm px-3 py-1`}>
      <Clock className="w-4 h-4 mr-1" />
      {timeHint}
    </Badge>
  );
}