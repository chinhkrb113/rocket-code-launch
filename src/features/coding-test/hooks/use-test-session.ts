import { useState, useEffect, useCallback } from 'react';
import { TestSession, TestStep, ParentFormData } from '../types';
import { Answer, QUESTIONS } from '../questions';

const STORAGE_KEY = 'rt_test_session';

export function useTestSession() {
  const [session, setSession] = useState<TestSession | null>(null);
  const [currentStep, setCurrentStep] = useState<TestStep>('form');

  // Load session from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedSession = JSON.parse(saved) as TestSession;
        setSession(parsedSession);
        
        // Determine current step based on session state
        if (!parsedSession.parentInfo) {
          setCurrentStep('form');
        } else if (!parsedSession.completed) {
          setCurrentStep('test');
        } else {
          setCurrentStep('result');
        }
      } catch (error) {
        console.error('Failed to parse saved session:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  }, [session]);

  const startSession = useCallback((parentInfo: ParentFormData) => {
    const newSession: TestSession = {
      parentInfo,
      answers: [],
      currentQuestion: 0,
      startTime: Date.now(),
      completed: false
    };
    
    setSession(newSession);
    setCurrentStep('test');
  }, []);

  const submitAnswer = useCallback((questionId: string, choiceIndex: number) => {
    setSession(prev => {
      if (!prev) return prev;
      
      const newAnswers = [...prev.answers];
      const existingIndex = newAnswers.findIndex(a => a.questionId === questionId);
      
      if (existingIndex >= 0) {
        newAnswers[existingIndex] = { questionId, choiceIndex };
      } else {
        newAnswers.push({ questionId, choiceIndex });
      }
      
      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setSession(prev => {
      if (!prev) return prev;
      
      const nextQuestionIndex = prev.currentQuestion + 1;
      if (nextQuestionIndex >= QUESTIONS.length) {
        return {
          ...prev,
          completed: true
        };
      }
      
      return {
        ...prev,
        currentQuestion: nextQuestionIndex
      };
    });
  }, []);

  const completeTest = useCallback(() => {
    setSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        completed: true
      };
    });
    setCurrentStep('result');
  }, []);

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
    setCurrentStep('form');
  }, []);

  const getCurrentQuestion = useCallback(() => {
    if (!session) return null;
    return QUESTIONS[session.currentQuestion] || null;
  }, [session]);

  const getProgress = useCallback(() => {
    if (!session) return 0;
    return Math.round((session.currentQuestion / QUESTIONS.length) * 100);
  }, [session]);

  const getCurrentAnswer = useCallback((questionId: string) => {
    if (!session) return null;
    return session.answers.find(a => a.questionId === questionId) || null;
  }, [session]);

  return {
    session,
    currentStep,
    startSession,
    submitAnswer,
    nextQuestion,
    completeTest,
    resetSession,
    getCurrentQuestion,
    getProgress,
    getCurrentAnswer,
    setCurrentStep
  };
}