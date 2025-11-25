export type QuestionType = 'pattern' | 'spatial' | 'verbal' | 'logic' | 'math' | 'memory';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Option {
  id: string;
  text?: LocalizedText;
  svgContent?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: number; // 1-5
  text: LocalizedText;
  svgContent?: string;
  options: Option[];
  correctOptionId: string;
  explanation: LocalizedText;
}

export interface Reference {
  title: string;
  author: string;
  year: number;
  journal?: string;
  url?: string;
}

export interface TestMethodology {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  theoreticalBasis: LocalizedText;
}

export interface TestBank {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  methodology: TestMethodology;
  questions: Question[];
  references: Reference[];
  timeLimit: number; // in seconds, 0 for no limit
  isPremium?: boolean; // 是否需要会员
}

// 用户类型
export type UserTier = 'free' | 'basic' | 'premium' | 'professional';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  tier: UserTier;
  createdAt: string;
  expiresAt?: string; // 会员过期时间
}

export interface UserStats {
  totalTests: number;
  averageScore: number;
  bestScore: number;
  testHistory: TestHistoryItem[];
  strengths: string[];
  weaknesses: string[];
}

export interface TestHistoryItem {
  id: string;
  testId: string;
  testName: LocalizedText;
  date: string;
  score: number;
  percentile: number;
  timeSpent: number;
  detailedScores: Record<QuestionType, { correct: number; total: number }>;
}

// 会员计划
export interface PricingPlan {
  id: UserTier;
  name: LocalizedText;
  price: {
    monthly: number;
    yearly: number;
  };
  features: LocalizedText[];
  testsIncluded: string[]; // test IDs
  aiAnalysis: boolean;
  paperAccess: boolean;
  historyDays: number; // 历史记录保留天数
}
