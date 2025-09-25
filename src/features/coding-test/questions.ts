export interface Question {
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  text: string;
  choices: string[];
  answerIndex: number;
  explain: string;
}

export interface Answer {
  questionId: string;
  choiceIndex: number;
}

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    level: "beginner",
    text: "Robot đi 3 bước phải và 2 bước xuống. Vị trí cuối cùng là?",
    choices: ["3 bước phải", "2 bước xuống", "3 phải & 2 xuống", "Về điểm đầu"],
    answerIndex: 2,
    explain: "X=+3, Y=-2 so với gốc."
  },
  {
    id: "q2",
    level: "beginner",
    text: "Kết quả 5 + 3 * 2 là?",
    choices: ["16", "11", "13", "10"],
    answerIndex: 1,
    explain: "Nhân trước: 3*2=6; 5+6=11."
  },
  {
    id: "q3",
    level: "intermediate",
    text: "for i in range(3): print('Hello') in ra?",
    choices: ["1 lần", "2 lần", "3 lần", "Vô hạn"],
    answerIndex: 2,
    explain: "range(3) → 0,1,2 (3 lần)."
  },
  {
    id: "q4",
    level: "intermediate",
    text: "Làm máy tính bỏ túi cần?",
    choices: ["Vòng lặp", "Nhập liệu & tính toán", "In ra màn hình", "Tất cả đúng"],
    answerIndex: 3,
    explain: "Kết hợp nhiều kiến thức."
  },
  {
    id: "q5",
    level: "advanced",
    text: "x=5; x=x+2; print(x) in ra?",
    choices: ["2", "5", "7", "Lỗi"],
    answerIndex: 2,
    explain: "Gán lại x=7."
  },
  {
    id: "q6",
    level: "advanced",
    text: "Tổng số lẻ trong [3,5,7,9] với if n%2==1?",
    choices: ["24", "17", "9", "19"],
    answerIndex: 0,
    explain: "3+5+7+9=24."
  },
  {
    id: "q7",
    level: "advanced",
    text: "Đoán số bí mật 1–10, đoán tới đúng: đoạn nào đúng?",
    choices: [
      "A (1 lần, số cố định)",
      "B (randint, while tới đúng)",
      "C (3 lần, không kiểm tra)",
      "D (in số bí mật)"
    ],
    answerIndex: 1,
    explain: "B có random + vòng lặp."
  }
];

export type TestLevel = "Beginner" | "Intermediate" | "Advanced";

export interface TestResult {
  correct: number;
  total: number;
  level: TestLevel;
}

export function evaluate(answers: Answer[]): TestResult {
  const correct = answers.filter(a => {
    const question = QUESTIONS.find(q => q.id === a.questionId);
    return question && question.answerIndex === a.choiceIndex;
  }).length;

  let level: TestLevel;
  if (correct <= 2) level = "Beginner";
  else if (correct <= 5) level = "Intermediate"; 
  else level = "Advanced";

  return { correct, total: QUESTIONS.length, level };
}

export const LEVEL_DESCRIPTIONS = {
  Beginner: {
    title: "Cơ bản",
    description: "Con mới bắt đầu hành trình lập trình",
    roadmap: [
      "Bắt đầu với Scratch để hiểu tư duy logic",
      "Làm quen với khái niệm lập trình cơ bản",
      "Tạo các game mini đơn giản (Flappy Bird)",
      "Phát triển kỹ năng giải quyết vấn đề"
    ]
  },
  Intermediate: {
    title: "Trung cấp", 
    description: "Con đã có nền tảng tốt về lập trình",
    roadmap: [
      "Học Python cơ bản với cú pháp và cấu trúc dữ liệu",
      "Xây dựng các dự án thực tế (máy tính, chatbot)",
      "Tạo game Snake và các ứng dụng desktop",
      "Khám phá lập trình web cơ bản"
    ]
  },
  Advanced: {
    title: "Nâng cao",
    description: "Con có tư duy lập trình rất tốt",
    roadmap: [
      "Python nâng cao với OOP và design patterns",
      "Phát triển web/app cơ bản với framework",
      "Luyện tập thuật toán và cấu trúc dữ liệu",
      "Chuẩn bị cho các kỳ thi lập trình quốc gia"
    ]
  }
};