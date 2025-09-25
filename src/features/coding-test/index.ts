// Export all public components and utilities
export { CodingTestCTA } from './components/CodingTestCTA';
export { CodingTestWizard } from './components/CodingTestWizard';
export { ResultCard } from './components/ResultCard';
export { ParentForm } from './components/ParentForm';
export { TestQuestion } from './components/TestQuestion';
export { TestProgress } from './components/TestProgress';
export { CountdownHint } from './components/CountdownHint';

// Export hooks
export { useTestSession } from './hooks/use-test-session';

// Export types and utilities
export type { ParentFormData, TestSession, TestStep } from './types';
export { ParentFormSchema, trackEvent, ANALYTICS_EVENTS } from './types';
export { QUESTIONS, evaluate, LEVEL_DESCRIPTIONS } from './questions';
export type { Question, Answer, TestResult, TestLevel } from './questions';