export type QuestionType = 'pattern' | 'spatial' | 'verbal' | 'logic' | 'math';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Option {
  id: string;
  text?: LocalizedText;
  svgContent?: string; // Optional SVG content for visual options
}

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: number; // 1-5
  text: LocalizedText;
  svgContent?: string; // Main puzzle SVG
  options: Option[];
  correctOptionId: string;
  explanation: LocalizedText;
}

export const questions: Question[] = [
  // 1. Pattern: Progressive Rotation & Color Switch
  {
    id: 'q1',
    type: 'pattern',
    difficulty: 3,
    text: {
      en: "Select the figure that logically completes the matrix sequence.",
      zh: "选择逻辑上能补全矩阵序列的图形。"
    },
    svgContent: `
      <svg viewBox="0 0 300 100" class="w-full h-full">
        <!-- Frame 1 -->
        <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.2"/>
        <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" stroke-width="4"/>
        
        <!-- Frame 2 -->
        <rect x="110" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="150" cy="50" r="20" fill="currentColor" opacity="0.5"/>
        <line x1="130" y1="50" x2="170" y2="50" stroke="currentColor" stroke-width="4"/>

        <!-- Frame 3 (Question Mark) -->
        <rect x="210" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="250" y="60" text-anchor="middle" font-size="40" fill="currentColor">?</text>
      </svg>
    `,
    options: [
      { id: 'A', svgContent: '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="20" fill="currentColor" opacity="0.8"/><line x1="40" y1="20" x2="40" y2="60" stroke="currentColor" stroke-width="4"/></svg>' },
      { id: 'B', svgContent: '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="20" fill="currentColor" opacity="0.8"/><line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" stroke-width="4"/></svg>' },
      { id: 'C', svgContent: '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="20" fill="currentColor" opacity="0.8"/><line x1="26" y1="26" x2="54" y2="54" stroke="currentColor" stroke-width="4"/></svg>' },
      { id: 'D', svgContent: '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="20" fill="none" stroke="currentColor"/><line x1="40" y1="20" x2="40" y2="60" stroke="currentColor" stroke-width="4"/></svg>' },
    ],
    correctOptionId: 'A',
    explanation: {
      en: "The bar rotates 90 degrees each step (Vertical -> Horizontal -> Vertical). The circle opacity increases (20% -> 50% -> 80%).",
      zh: "线条每次旋转90度（垂直->水平->垂直）。圆的透明度逐渐增加（20%->50%->80%）。"
    }
  },

  // 2. Advanced Number Series
  {
    id: 'q2',
    type: 'math',
    difficulty: 4,
    text: {
      en: "Identify the next number in the series: 2, 12, 36, 80, 150, ...",
      zh: "找出数列中的下一个数字：2, 12, 36, 80, 150, ..."
    },
    options: [
      { id: 'A', text: { en: '252', zh: '252' } },
      { id: 'B', text: { en: '210', zh: '210' } },
      { id: 'C', text: { en: '194', zh: '194' } },
      { id: 'D', text: { en: '240', zh: '240' } },
    ],
    correctOptionId: 'A',
    explanation: {
      en: "The pattern is n² + n³. 1²+1³=2; 2²+2³=12; 3²+3³=36; 4²+4³=80; 5²+5³=150; Next is 6²+6³ = 36+216 = 252.",
      zh: "规律是 n² + n³。6² + 6³ = 36 + 216 = 252。"
    }
  },

  // 3. Verbal Analogy (Deep Semantic)
  {
    id: 'q3',
    type: 'verbal',
    difficulty: 4,
    text: {
      en: "ENTROPY is to DISORDER as CATALYST is to...?",
      zh: "熵之于无序，正如催化剂之于...？"
    },
    options: [
      { id: 'A', text: { en: 'Reaction', zh: '反应' } },
      { id: 'B', text: { en: 'Change', zh: '变化' } },
      { id: 'C', text: { en: 'Acceleration', zh: '加速' } },
      { id: 'D', text: { en: 'Chemistry', zh: '化学' } },
    ],
    correctOptionId: 'C',
    explanation: {
      en: "Entropy is a measure of disorder. A catalyst is an agent of acceleration (increasing rate).",
      zh: "熵是无序程度的度量。催化剂是加速（增加速率）的动因。"
    }
  },

  // 4. Spatial: Cube Folding
  {
    id: 'q4',
    type: 'spatial',
    difficulty: 5,
    text: {
      en: "When the layout below is folded into a cube, which face is opposite the face marked 'X'?",
      zh: "当下图折叠成一个立方体时，标记'X'的面相对的是哪个面？"
    },
    svgContent: `
      <svg viewBox="0 0 300 200" class="w-full h-full">
        <rect x="100" y="50" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="100" y="100" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="125" y="135" text-anchor="middle" font-size="24" fill="currentColor">X</text>
        <rect x="100" y="150" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        
        <rect x="50" y="100" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="75" y="135" text-anchor="middle" font-size="24" fill="currentColor">A</text>
        
        <rect x="150" y="100" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="175" y="135" text-anchor="middle" font-size="24" fill="currentColor">B</text>
        
        <rect x="100" y="0" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="125" y="35" text-anchor="middle" font-size="24" fill="currentColor">C</text>
      </svg>
    `,
    options: [
      { id: 'A', text: { en: 'Face A', zh: '面 A' } },
      { id: 'B', text: { en: 'Face B', zh: '面 B' } },
      { id: 'C', text: { en: 'Face C', zh: '面 C' } },
      { id: 'D', text: { en: 'The empty face', zh: '空白面' } },
    ],
    correctOptionId: 'C',
    explanation: {
      en: "In a standard cross fold, the top-most face (C) will be opposite the center-face (X) when skipping one square vertically.",
      zh: "在标准折叠中，垂直方向上隔一个方块的面是相对面。C与X之间隔了一个方块，所以它们相对。"
    }
  },
  
  // 5. Logic: Syllogism
  {
    id: 'q5',
    type: 'logic',
    difficulty: 4,
    text: {
      en: "Statement 1: No historians are physicists.\nStatement 2: All physicists are mathematicians.\n\nWhich conclusion logically follows?",
      zh: "命题1：没有历史学家是物理学家。\n命题2：所有物理学家都是数学家。\n\n哪个结论在逻辑上成立？"
    },
    options: [
      { id: 'A', text: { en: 'No mathematicians are historians', zh: '没有数学家是历史学家' } },
      { id: 'B', text: { en: 'Some mathematicians are not historians', zh: '有些数学家不是历史学家' } },
      { id: 'C', text: { en: 'All mathematicians are physicists', zh: '所有数学家都是物理学家' } },
      { id: 'D', text: { en: 'Some historians are mathematicians', zh: '有些历史学家是数学家' } },
    ],
    correctOptionId: 'B',
    explanation: {
      en: "Since all physicists are mathematicians, and no physicists are historians, the group of mathematicians that are physicists cannot be historians.",
      zh: "因为所有物理学家都是数学家，而没有物理学家是历史学家，所以那些是物理学家的数学家肯定不是历史学家。"
    }
  },

  // 6. Matrix: Shape Addition
  {
    id: 'q6',
    type: 'pattern',
    difficulty: 4,
    text: {
      en: "Which shape results from combining the first two shapes?",
      zh: "前两个图形组合会产生什么形状？"
    },
    svgContent: `
      <svg viewBox="0 0 300 100" class="w-full h-full">
        <!-- Shape 1: Horizontal Line -->
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="4"/>
        <text x="95" y="55" font-size="30" fill="currentColor">+</text>
        
        <!-- Shape 2: Vertical Line -->
        <line x1="150" y1="20" x2="150" y2="80" stroke="currentColor" stroke-width="4"/>
        <text x="195" y="55" font-size="30" fill="currentColor">=</text>

        <text x="250" y="60" text-anchor="middle" font-size="40" fill="currentColor">?</text>
      </svg>
    `,
    options: [
      { id: 'A', svgContent: '<svg viewBox="0 0 60 60"><line x1="10" y1="50" x2="50" y2="10" stroke="currentColor" stroke-width="4"/></svg>' },
      { id: 'B', svgContent: '<svg viewBox="0 0 60 60"><line x1="10" y1="30" x2="50" y2="30" stroke="currentColor" stroke-width="4"/><line x1="30" y1="10" x2="30" y2="50" stroke="currentColor" stroke-width="4"/></svg>' }, // Cross
      { id: 'C', svgContent: '<svg viewBox="0 0 60 60"><rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" stroke-width="4"/></svg>' },
      { id: 'D', svgContent: '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" stroke-width="4"/></svg>' },
    ],
    correctOptionId: 'B',
    explanation: {
      en: "Superimposing a horizontal line and a vertical line creates a cross shape (+).",
      zh: "叠加水平线和垂直线会形成十字形 (+)。"
    }
  },

  // 7. Math: Probability
  {
    id: 'q7',
    type: 'math',
    difficulty: 5,
    text: {
      en: "A bag contains 3 red, 4 green, and 5 blue balls. Two balls are drawn without replacement. What is the probability that both are green?",
      zh: "袋子中有3个红球、4个绿球和5个蓝球。不放回地取出两个球。两个都是绿球的概率是多少？"
    },
    options: [
      { id: 'A', text: { en: '1/11', zh: '1/11' } },
      { id: 'B', text: { en: '1/12', zh: '1/12' } },
      { id: 'C', text: { en: '4/33', zh: '4/33' } },
      { id: 'D', text: { en: '1/6', zh: '1/6' } },
    ],
    correctOptionId: 'A',
    explanation: {
      en: "Total balls = 12. P(First Green) = 4/12 = 1/3. P(Second Green | First Green) = 3/11. Total P = (1/3) * (3/11) = 1/11.",
      zh: "球总数=12。P(第一个绿)=4/12=1/3。P(第二个绿|第一个绿)=3/11。总概率=(1/3)*(3/11)=1/11。"
    }
  },

  // 8. Pattern: XOR Logic
  {
    id: 'q8',
    type: 'pattern',
    difficulty: 5,
    text: {
      en: "The third figure in each row is derived from the first two using a specific rule. Find the missing figure.",
      zh: "每行第三个图形由前两个根据特定规则得出。找出缺失的图形。"
    },
    svgContent: `
       <svg viewBox="0 0 300 100" class="w-full h-full">
         <!-- Row 2 (Row 1 omitted for brevity, implying XOR logic) -->
         <!-- Fig 1: Top-Left Dot -->
         <rect x="10" y="20" width="60" height="60" fill="none" stroke="currentColor"/>
         <circle cx="30" cy="40" r="5" fill="currentColor"/> 

         <!-- Fig 2: Top-Left Dot + Bottom-Right Dot -->
         <rect x="110" y="20" width="60" height="60" fill="none" stroke="currentColor"/>
         <circle cx="130" cy="40" r="5" fill="currentColor"/>
         <circle cx="150" cy="60" r="5" fill="currentColor"/>

         <text x="250" y="60" text-anchor="middle" font-size="40" fill="currentColor">?</text>
       </svg>
    `,
    options: [
      { id: 'A', svgContent: '<svg viewBox="0 0 60 60"><rect x="0" y="0" width="60" height="60" fill="none" stroke="currentColor"/><circle cx="40" cy="40" r="5" fill="currentColor"/></svg>' }, // Bottom-Right only (XOR)
      { id: 'B', svgContent: '<svg viewBox="0 0 60 60"><rect x="0" y="0" width="60" height="60" fill="none" stroke="currentColor"/><circle cx="20" cy="20" r="5" fill="currentColor"/><circle cx="40" cy="40" r="5" fill="currentColor"/></svg>' },
      { id: 'C', svgContent: '<svg viewBox="0 0 60 60"><rect x="0" y="0" width="60" height="60" fill="none" stroke="currentColor"/></svg>' },
      { id: 'D', svgContent: '<svg viewBox="0 0 60 60"><rect x="0" y="0" width="60" height="60" fill="none" stroke="currentColor"/><circle cx="20" cy="20" r="5" fill="currentColor"/></svg>' },
    ],
    correctOptionId: 'A',
    explanation: {
      en: "The rule is XOR (Exclusive OR). Elements present in both disappear. Elements in only one remain.",
      zh: "规则是 XOR（异或）。两个图形中都存在的元素会消失，只存在于一个图形中的元素会保留。"
    }
  }
];
