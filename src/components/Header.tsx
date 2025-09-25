import { Button } from "@/components/ui/button";
import { Phone, Mail, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center text-white font-bold text-lg">
              RT
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">Rocket Tech</h1>
              <p className="text-xs text-muted-foreground">Academy</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#course" className="text-muted-foreground hover:text-primary transition-colors">
              Khóa học
            </a>
            <a href="#instructors" className="text-muted-foreground hover:text-primary transition-colors">
              Giảng viên
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Học phí
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
              Đánh giá
            </a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-primary" />
              <span className="font-medium">0901.234.567</span>
            </div>
            <Button size="sm" variant="hero">
              Đăng ký ngay
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={20} />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <a href="#course" className="text-muted-foreground hover:text-primary transition-colors py-2">
                Khóa học
              </a>
              <a href="#instructors" className="text-muted-foreground hover:text-primary transition-colors py-2">
                Giảng viên
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors py-2">
                Học phí
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors py-2">
                Đánh giá
              </a>
              <div className="pt-3 border-t flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-primary" />
                  <span className="font-medium">0901.234.567</span>
                </div>
                <Button size="sm" variant="hero" className="w-fit">
                  Đăng ký ngay
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;