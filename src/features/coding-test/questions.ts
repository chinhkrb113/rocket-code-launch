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
    text: "Một con robot có thể di chuyển theo 4 hướng: trái, phải, lên, xuống.\nNếu robot đi 3 bước sang phải và 2 bước xuống, vị trí cuối cùng của robot so với điểm xuất phát là gì?",
    choices: [
      "Cách 3 bước sang phải",
      "Cách 2 bước xuống", 
      "Cách 3 bước phải và 2 bước xuống",
      "Quay lại vị trí ban đầu"
    ],
    answerIndex: 2,
    explain: "Robot di chuyển 3 bước phải và 2 bước xuống, vậy vị trí cuối cùng cách điểm xuất phát 3 bước phải và 2 bước xuống."
  },
  {
    id: "q2",
    level: "beginner",
    text: "Trong lập trình, nếu ta có phép tính:\n5 + 3 * 2\nKết quả là bao nhiêu?",
    choices: ["16", "11", "13", "10"],
    answerIndex: 1,
    explain: "Theo thứ tự ưu tiên phép toán, nhân trước cộng sau: 3 * 2 = 6, sau đó 5 + 6 = 11."
  },
  {
    id: "q3",
    level: "intermediate",
    text: "Đoạn code Python sau in ra gì?\nfor i in range(3):\n    print(\"Hello\")",
    choices: [
      "In ra \"Hello\" 1 lần",
      "In ra \"Hello\" 2 lần", 
      "In ra \"Hello\" 3 lần",
      "In ra \"Hello\" vô hạn"
    ],
    answerIndex: 2,
    explain: "range(3) tạo ra dãy số từ 0 đến 2 (tổng cộng 3 số), nên vòng lặp chạy 3 lần và in ra \"Hello\" 3 lần."
  },
  {
    id: "q4",
    level: "intermediate",
    text: "Nếu muốn làm một máy tính bỏ túi bằng code, học sinh cần dùng kiến thức nào?",
    choices: [
      "Cách viết vòng lặp",
      "Cách nhập dữ liệu và tính toán",
      "Cách in ra màn hình",
      "Tất cả các ý trên"
    ],
    answerIndex: 3,
    explain: "Máy tính bỏ túi cần tất cả: vòng lặp để người dùng tiếp tục sử dụng, nhập dữ liệu để lấy phép tính, tính toán để xử lý, và in ra để hiển thị kết quả."
  },
  {
    id: "q5",
    level: "advanced",
    text: "Đoạn code Python sau cho kết quả gì?\nx = 5\nx = x + 2\nprint(x)",
    choices: ["2", "5", "7", "Lỗi chương trình"],
    answerIndex: 2,
    explain: "x ban đầu bằng 5, sau đó x được gán lại bằng x + 2 = 5 + 2 = 7, nên print(x) sẽ in ra 7."
  },
  {
    id: "q6",
    level: "advanced", 
    text: "Bạn có một danh sách số:\nnumbers = [3, 5, 7, 9]\nNếu ta chạy đoạn code sau:\ntotal = 0\nfor n in numbers:\n    if n % 2 == 1:\n        total = total + n\nprint(total)\nKết quả in ra là gì?\n(Gợi ý: n % 2 == 1 nghĩa là số lẻ)",
    choices: ["24", "17", "9", "19"],
    answerIndex: 0,
    explain: "Tất cả các số 3, 5, 7, 9 đều là số lẻ (n % 2 == 1), nên total = 3 + 5 + 7 + 9 = 24."
  },
  {
    id: "q7",
    level: "advanced",
    text: "Bạn muốn viết trò chơi \"Đoán số bí mật\" bằng Python.\nSố bí mật được tạo ra ngẫu nhiên từ 1 đến 10. Người chơi có thể đoán nhiều lần cho đến khi đúng.\nĐoạn code nào dưới đây là đúng nhất?",
    choices: [
      "A: secret = 7; guess = int(input(\"Đoán số: \")); if guess == secret: print(\"Đúng!\")",
      "B: import random; secret = random.randint(1, 10); guess = 0; while guess != secret: guess = int(input(\"Đoán số: \")); if guess == secret: print(\"Đúng rồi!\")",
      "C: secret = 5; for i in range(3): guess = int(input(\"Đoán số: \")); print(\"Đúng!\")",
      "D: secret = random.randint(1, 10); print(\"Đúng số bí mật là:\", secret)"
    ],
    answerIndex: 1,
    explain: "Đáp án B đúng vì: có random để tạo số ngẫu nhiên, có vòng lặp while để cho phép đoán nhiều lần cho đến khi đúng, và kiểm tra điều kiện đúng."
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