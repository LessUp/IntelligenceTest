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
}
