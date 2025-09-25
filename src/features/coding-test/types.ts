import { z } from "zod";

export const ParentFormSchema = z.object({
  parentName: z.string()
    .trim()
    .min(2, { message: "Tên phụ huynh phải có ít nhất 2 ký tự" })
    .max(50, { message: "Tên phụ huynh không được vượt quá 50 ký tự" }),
  email: z.string()
    .trim()
    .email({ message: "Email không đúng định dạng" })
    .max(255, { message: "Email không được vượt quá 255 ký tự" }),
  phone: z.string()
    .trim()
    .regex(/^[0-9]{9,12}$/, { message: "Số điện thoại phải từ 9-12 chữ số" }),
  studentName: z.string()
    .trim()
    .min(2, { message: "Tên học sinh phải có ít nhất 2 ký tự" })
    .max(50, { message: "Tên học sinh không được vượt quá 50 ký tự" })
    .optional(),
  grade: z.string()
    .refine(val => {
      const num = parseInt(val);
      return num >= 6 && num <= 12;
    }, { message: "Khối phải từ 6 đến 12" })
});

export type ParentFormData = z.infer<typeof ParentFormSchema>;

export interface TestSession {
  parentInfo: ParentFormData;
  answers: Array<{
    questionId: string;
    choiceIndex: number;
  }>;
  currentQuestion: number;
  startTime: number;
  completed: boolean;
}

export type TestStep = "form" | "test" | "result";

// Analytics events
export const ANALYTICS_EVENTS = {
  TEST_START: 'rt_test_start',
  TEST_SUBMIT: 'rt_test_submit', 
  TEST_VIEW_RESULT: 'rt_test_view_result',
  TEST_CTA_TRIAL_CLICK: 'rt_test_cta_trial_click'
} as const;

export function trackEvent(event: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // GTM tracking
    const win = window as any;
    if (win.dataLayer) {
      win.dataLayer.push({ event, ...data });
    } else {
      // Fallback for QA
      console.info('Analytics Event:', event, data);
    }
  }
}