import { CodingTestWizard } from "@/features/coding-test/components/CodingTestWizard";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CodingTest() {
  return (
    <>
      <Helmet>
        <title>Làm Bài Test Miễn Phí - Rocket Tech Academy</title>
        <meta 
          name="description" 
          content="Xác định trình độ lập trình của con chỉ trong 5 phút. Nhận ngay báo cáo kết quả và lộ trình học phù hợp từ Rocket Tech Academy." 
        />
        <meta name="keywords" content="test lập trình, đánh giá năng lực, lập trình cho trẻ em, Rocket Tech Academy" />
        <meta property="og:title" content="Làm Bài Test Miễn Phí - Rocket Tech Academy" />
        <meta property="og:description" content="Xác định trình độ lập trình của con chỉ trong 5 phút. Nhận ngay báo cáo kết quả và lộ trình học phù hợp." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/test" />
      </Helmet>
      
      <div className="fixed top-4 left-4 z-10">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Về trang chủ
          </Link>
        </Button>
      </div>
      
      <CodingTestWizard />
    </>
  );
}