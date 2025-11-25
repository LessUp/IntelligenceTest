import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TestStatus = 'idle' | 'in_progress' | 'completed';

export interface TestResult {
  date: string;
  testId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  timeElapsed: number; // seconds
  answers: Record<string, string>; // questionId -> optionId
}

interface TestState {
  language: 'en' | 'zh';
  status: TestStatus;
  currentTestId: string | null;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  timeElapsed: number;
  history: TestResult[];
  
  // Actions
  setLanguage: (lang: 'en' | 'zh') => void;
  startTest: (testId: string) => void;
  resumeTest: () => void;
  answerQuestion: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  finishTest: (totalQuestions: number) => void;
  saveResult: (result: TestResult) => void;
  resetTest: () => void;
  tickTimer: () => void;
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      language: 'zh',
      status: 'idle',
      currentTestId: null,
      currentQuestionIndex: 0,
      answers: {},
      timeElapsed: 0,
      history: [],

      setLanguage: (lang) => set({ language: lang }),
      
      startTest: (testId) => set({ 
        status: 'in_progress', 
        currentTestId: testId,
        currentQuestionIndex: 0, 
        answers: {}, 
        timeElapsed: 0 
      }),
      
      resumeTest: () => set({ status: 'in_progress' }),
      
      answerQuestion: (qId, oId) => set((state) => ({
        answers: { ...state.answers, [qId]: oId }
      })),
      
      nextQuestion: () => set((state) => ({ 
        currentQuestionIndex: state.currentQuestionIndex + 1 
      })),
      
      prevQuestion: () => set((state) => ({ 
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) 
      })),
      
      finishTest: (totalQuestions) => {
        const state = get();
        // Calculate score logic should be in component or here? 
        // Let's keep store dumb about business logic, but we need to save history.
        // For now, just mark completed. The component will calculate score and update history separately 
        // or we provide a specific action to save result.
        set({ status: 'completed' });
      },

      // Helper to save history
      saveResult: (result: TestResult) => set((state) => ({
        history: [...state.history, result],
        status: 'idle', // Reset to idle or stay completed? Usually stay completed to show results.
        // We'll keep status completed so UI shows result page.
      })),

      resetTest: () => set({
        status: 'idle',
        currentTestId: null,
        currentQuestionIndex: 0,
        answers: {},
        timeElapsed: 0
      }),

      tickTimer: () => set((state) => {
        if (state.status === 'in_progress') {
          return { timeElapsed: state.timeElapsed + 1 };
        }
        return {};
      })
    }),
    {
      name: 'iq-test-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
