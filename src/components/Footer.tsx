import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  MessageCircle, 
  Youtube,
  Clock,
  Rocket
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center text-white font-bold">
                RT
              </div>
              <div>
                <h3 className="font-bold text-lg">Rocket Tech Academy</h3>
                <p className="text-sm text-muted-foreground">Khơi nguồn sáng tạo</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Trung tâm dạy lập trình hàng đầu dành cho học sinh cấp 2-3, 
              giúp phát triển tư duy logic và kỹ năng công nghệ tương lai.
            </p>
            <div className="flex gap-3">
              <Button size="sm" variant="outline" className="p-2">
                <Facebook size={16} />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <MessageCircle size={16} />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <Youtube size={16} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Liên kết nhanh</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#course" className="text-muted-foreground hover:text-primary transition-colors">
                  Khóa học lập trình
                </a>
              </li>
              <li>
                <a href="#instructors" className="text-muted-foreground hover:text-primary transition-colors">
                  Đội ngũ giảng viên
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Bảng giá & ưu đãi
                </a>
              </li>
              <li>
                <a href="#test" className="text-muted-foreground hover:text-primary transition-colors">
                  Test miễn phí
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Phản hồi phụ huynh
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Liên hệ</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">0901.234.567</p>
                  <p className="text-muted-foreground">Hotline tư vấn</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={16} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Zalo: 0901.234.567</p>
                  <p className="text-muted-foreground">Hỗ trợ 24/7</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">info@rockettech.edu.vn</p>
                  <p className="text-muted-foreground">Email tư vấn</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">123 Đường ABC, Quận 1</p>
                  <p className="text-muted-foreground">TP.HCM, Việt Nam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Giờ làm việc</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">Thứ 2 - Thứ 6</p>
                    <p className="text-muted-foreground">8:00 - 20:00</p>
                  </div>
                  <div>
                    <p className="font-medium">Thứ 7 - Chủ nhật</p>
                    <p className="text-muted-foreground">9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button size="sm" variant="hero" className="w-full">
                📞 Gọi tư vấn ngay
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © 2024 Rocket Tech Academy. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Hỗ trợ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;