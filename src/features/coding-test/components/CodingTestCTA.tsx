import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CodingTestCTAProps {
  label?: string;
  href?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "xl";
  variant?: "default" | "hero" | "secondary" | "outline";
}

export function CodingTestCTA({ 
  label = "Làm Bài Test Ngay – Miễn phí",
  href = "/test",
  className,
  size = "xl",
  variant = "hero"
}: CodingTestCTAProps) {
  return (
    <Button 
      size={size} 
      variant={variant} 
      className={className}
      asChild
    >
      <Link to={href}>
        🚀 {label}
      </Link>
    </Button>
  );
}