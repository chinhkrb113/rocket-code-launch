import { CodingTestWizard } from "@/features/coding-test/components/CodingTestWizard";
import { Helmet } from "react-helmet-async";

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
      
      <CodingTestWizard />
    </>
  );
}