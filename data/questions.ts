export type QuestionType = 'pattern' | 'spatial' | 'verbal' | 'logic' | 'math';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Option {
  id: string;
  text?: LocalizedText;
  imageUrl?: string; // Optional for pattern questions
}

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: number; // 1-5
  text: LocalizedText;
  imageUrl?: string; // For the main puzzle
  options: Option[];
  correctOptionId: string;
  explanation: LocalizedText;
}

export const questions: Question[] = [
  // 1. Pattern / Abstract Reasoning (Matrix)
  {
    id: 'q1',
    type: 'pattern',
    difficulty: 3,
    text: {
      en: "Select the figure that logically completes the matrix.",
      zh: "选择逻辑上能补全矩阵的图形。"
    },
    // In a real app, these would be URLs to images or SVG components
    imageUrl: '/questions/q1_main.svg', 
    options: [
      { id: 'A', text: { en: 'Option A', zh: '选项 A' } }, // Placeholder for visual options
      { id: 'B', text: { en: 'Option B', zh: '选项 B' } },
      { id: 'C', text: { en: 'Option C', zh: '选项 C' } },
      { id: 'D', text: { en: 'Option D', zh: '选项 D' } },
    ],
    correctOptionId: 'C',
    explanation: {
      en: "The number of sides decreases by one in each step across the row.",
      zh: "每行中图形的边数依次递减。"
    }
  },
  // 2. Verbal Reasoning (Analogies)
  {
    id: 'q2',
    type: 'verbal',
    difficulty: 2,
    text: {
      en: "Forest is to Tree as Ocean is to...?",
      zh: "森林之于树木，正如海洋之于...？"
    },
    options: [
      { id: 'A', text: { en: 'Water', zh: '水' } },
      { id: 'B', text: { en: 'Drop', zh: '水滴' } },
      { id: 'C', text: { en: 'Fish', zh: '鱼' } },
      { id: 'D', text: { en: 'Wave', zh: '波浪' } },
    ],
    correctOptionId: 'B',
    explanation: {
      en: "A forest is made up of many trees; an ocean is made up of many drops of water.",
      zh: "森林由许多树木组成，海洋由无数水滴组成。"
    }
  },
  // 3. Math / Logic (Number Series)
  {
    id: 'q3',
    type: 'math',
    difficulty: 4,
    text: {
      en: "Which number comes next in the series: 2, 3, 5, 7, 11, ...?",
      zh: "数列 2, 3, 5, 7, 11, ... 的下一个数字是多少？"
    },
    options: [
      { id: 'A', text: { en: '12', zh: '12' } },
      { id: 'B', text: { en: '13', zh: '13' } },
      { id: 'C', text: { en: '15', zh: '15' } },
      { id: 'D', text: { en: '17', zh: '17' } },
    ],
    correctOptionId: 'B',
    explanation: {
      en: "The series consists of prime numbers. The next prime after 11 is 13.",
      zh: "这是质数数列。11之后的下一个质数是13。"
    }
  },
  // 4. Spatial Reasoning (Rotation)
  {
    id: 'q4',
    type: 'spatial',
    difficulty: 3,
    text: {
      en: "If you fold the paper along the dotted line, which pattern will appear?",
      zh: "如果沿虚线折叠纸张，会出现什么图案？"
    },
    options: [
      { id: 'A', text: { en: 'Pattern A', zh: '图案 A' } },
      { id: 'B', text: { en: 'Pattern B', zh: '图案 B' } },
      { id: 'C', text: { en: 'Pattern C', zh: '图案 C' } },
      { id: 'D', text: { en: 'Pattern D', zh: '图案 D' } },
    ],
    correctOptionId: 'A',
    explanation: {
      en: "Visualizing the overlap of the transparent sections reveals Pattern A.",
      zh: "想象透明部分的重叠，可以得出图案 A。"
    }
  },
  // 5. Advanced Logic (Syllogism)
  {
    id: 'q5',
    type: 'logic',
    difficulty: 5,
    text: {
      en: "All A are B. No B are C. Some D are A. Which conclusion is definitely true?",
      zh: "所有A都是B。没有B是C。有些D是A。哪个结论绝对正确？"
    },
    options: [
      { id: 'A', text: { en: 'Some D are not C', zh: '有些D不是C' } },
      { id: 'B', text: { en: 'All D are B', zh: '所有D都是B' } },
      { id: 'C', text: { en: 'No A are D', zh: '没有A是D' } },
      { id: 'D', text: { en: 'Some C are A', zh: '有些C是A' } },
    ],
    correctOptionId: 'A',
    explanation: {
      en: "If Some D are A, and All A are B, those D are B. Since No B are C, those D cannot be C. Thus, Some D are not C.",
      zh: "既然有些D是A，而所有A都是B，那么这些D就是B。因为没有B是C，所以这些D不可能是C。因此，有些D不是C。"
    }
  }
];
