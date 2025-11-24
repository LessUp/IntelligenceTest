import { TestBank, Question } from './types';

// Re-using the existing questions as a base for the Standard Test
const standardQuestions: Question[] = [
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
        <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.2"/>
        <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" stroke-width="4"/>
        
        <rect x="110" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="150" cy="50" r="20" fill="currentColor" opacity="0.5"/>
        <line x1="130" y1="50" x2="170" y2="50" stroke="currentColor" stroke-width="4"/>

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
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="4"/>
        <text x="95" y="55" font-size="30" fill="currentColor">+</text>
        <line x1="150" y1="20" x2="150" y2="80" stroke="currentColor" stroke-width="4"/>
        <text x="195" y="55" font-size="30" fill="currentColor">=</text>
        <text x="250" y="60" text-anchor="middle" font-size="40" fill="currentColor">?</text>
      </svg>
    `,
    options: [
      { id: 'A', svgContent: '<svg viewBox="0 0 60 60"><line x1="10" y1="50" x2="50" y2="10" stroke="currentColor" stroke-width="4"/></svg>' },
      { id: 'B', svgContent: '<svg viewBox="0 0 60 60"><line x1="10" y1="30" x2="50" y2="30" stroke="currentColor" stroke-width="4"/><line x1="30" y1="10" x2="30" y2="50" stroke="currentColor" stroke-width="4"/></svg>' },
      { id: 'C', svgContent: '<svg viewBox="0 0 60 60"><rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" stroke-width="4"/></svg>' },
      { id: 'D', svgContent: '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" stroke-width="4"/></svg>' },
    ],
    correctOptionId: 'B',
    explanation: {
      en: "Superimposing a horizontal line and a vertical line creates a cross shape (+).",
      zh: "叠加水平线和垂直线会形成十字形 (+)。"
    }
  },
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
         <rect x="10" y="20" width="60" height="60" fill="none" stroke="currentColor"/>
         <circle cx="30" cy="40" r="5" fill="currentColor"/> 
         <rect x="110" y="20" width="60" height="60" fill="none" stroke="currentColor"/>
         <circle cx="130" cy="40" r="5" fill="currentColor"/>
         <circle cx="150" cy="60" r="5" fill="currentColor"/>
         <text x="250" y="60" text-anchor="middle" font-size="40" fill="currentColor">?</text>
       </svg>
    `,
    options: [
      { id: 'A', svgContent: '<svg viewBox="0 0 60 60"><rect x="0" y="0" width="60" height="60" fill="none" stroke="currentColor"/><circle cx="40" cy="40" r="5" fill="currentColor"/></svg>' },
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

// New Questions for Advanced Clinical Test
const clinicalQuestions: Question[] = [
  ...standardQuestions,
  {
    id: 'c1',
    type: 'math',
    difficulty: 5,
    text: {
      en: "If the sequence is 1, 4, 27, 256, ..., what is the next term?",
      zh: "如果序列是 1, 4, 27, 256, ...，下一项是什么？"
    },
    options: [
      { id: 'A', text: { en: '1024', zh: '1024' } },
      { id: 'B', text: { en: '3125', zh: '3125' } },
      { id: 'C', text: { en: '625', zh: '625' } },
      { id: 'D', text: { en: '500', zh: '500' } }
    ],
    correctOptionId: 'B',
    explanation: {
      en: "The pattern is n^n. 1^1=1, 2^2=4, 3^3=27, 4^4=256. Next is 5^5=3125.",
      zh: "规律是 n^n。1^1=1, 2^2=4, 3^3=27, 4^4=256。下一个是 5^5=3125。"
    }
  },
  {
    id: 'c2',
    type: 'logic',
    difficulty: 5,
    text: {
      en: "If 'Some A are B' is false, and 'No B are C' is true, which must be true?",
      zh: "如果'有些A是B'为假，且'没有B是C'为真，则哪个必须为真？"
    },
    options: [
      { id: 'A', text: { en: 'No A are B', zh: '没有A是B' } },
      { id: 'B', text: { en: 'All A are C', zh: '所有A都是C' } },
      { id: 'C', text: { en: 'Some A are C', zh: '有些A是C' } },
      { id: 'D', text: { en: 'All B are A', zh: '所有B都是A' } }
    ],
    correctOptionId: 'A',
    explanation: {
      en: "If 'Some A are B' is false, it implies that the intersection of A and B is empty. Therefore, 'No A are B' must be true.",
      zh: "如果'有些A是B'为假，意味着A和B的交集为空。因此，'没有A是B'必须为真。"
    }
  },
  {
    id: 'c3',
    type: 'spatial',
    difficulty: 4,
    text: {
      en: "Which 3D object can be formed from this net?",
      zh: "这个展开图可以组成哪个3D物体？"
    },
    svgContent: `
      <svg viewBox="0 0 200 150" class="w-full h-full">
        <path d="M70 50 L100 10 L130 50 L100 90 Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M100 90 L70 130 L130 130 Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M40 90 L70 50" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4"/>
      </svg>
    `,
    options: [
      { id: 'A', text: { en: 'Tetrahedron', zh: '四面体' } },
      { id: 'B', text: { en: 'Square Pyramid', zh: '四棱锥' } },
      { id: 'C', text: { en: 'Cube', zh: '立方体' } },
      { id: 'D', text: { en: 'Triangular Prism', zh: '三棱柱' } }
    ],
    correctOptionId: 'B',
    explanation: {
      en: "The shape consists of a square base and four triangular faces (implied), forming a square pyramid.",
      zh: "该形状由一个正方形底面和四个三角形侧面（隐含）组成，构成四棱锥。"
    }
  },
  {
    id: 'c4',
    type: 'memory',
    difficulty: 4,
    text: {
      en: "Memorize this sequence: 7 - 2 - 9 - 4. What is the sequence in reverse?",
      zh: "记住这个序列：7 - 2 - 9 - 4。倒序是什么？"
    },
    options: [
      { id: 'A', text: { en: '4 - 9 - 2 - 7', zh: '4 - 9 - 2 - 7' } },
      { id: 'B', text: { en: '4 - 2 - 9 - 7', zh: '4 - 2 - 9 - 7' } },
      { id: 'C', text: { en: '7 - 2 - 9 - 4', zh: '7 - 2 - 9 - 4' } },
      { id: 'D', text: { en: '9 - 2 - 7 - 4', zh: '9 - 2 - 7 - 4' } }
    ],
    correctOptionId: 'A',
    explanation: {
      en: "Reversing 7 - 2 - 9 - 4 gives 4 - 9 - 2 - 7. This tests working memory.",
      zh: "颠倒 7 - 2 - 9 - 4 得到 4 - 9 - 2 - 7。这测试工作记忆。"
    }
  }
];

export const tests: TestBank[] = [
  {
    id: 'standard-iq',
    name: {
      en: "Standard Progressive Matrices",
      zh: "标准瑞文推理测试"
    },
    description: {
      en: "A classic measure of fluid intelligence using pattern completion tasks.",
      zh: "使用图形填充任务的经典流体智力测量。"
    },
    methodology: {
      id: 'raven',
      name: { en: "Raven's Progressive Matrices", zh: "瑞文氏标准推理测验" },
      description: { en: "Non-verbal group test typically used in educational settings.", zh: "通常用于教育环境的非语言团体测试。" },
      theoreticalBasis: { en: "Spearman's g factor of general intelligence", zh: "斯皮尔曼的通用智力g因子" }
    },
    questions: standardQuestions,
    timeLimit: 1200, // 20 mins
    references: [
      { title: "Standardization of Progressive Matrices", author: "J.C. Raven", year: 1938 },
      { title: "General Intelligence Objectively Determined and Measured", author: "C. Spearman", year: 1904, journal: "American Journal of Psychology" }
    ]
  },
  {
    id: 'clinical-battery',
    name: {
      en: "Advanced Clinical Cognitive Battery",
      zh: "高级临床认知评估组"
    },
    description: {
      en: "A comprehensive multi-dimensional assessment used in neuropsychological research. Includes memory, logic, and fluid reasoning.",
      zh: "用于神经心理学研究的综合多维评估。包括记忆、逻辑和流体推理。"
    },
    methodology: {
      id: 'wais-iv',
      name: { en: "Wechsler Adult Intelligence Scale (Simulated)", zh: "韦克斯勒成人智力量表（模拟）" },
      description: { en: "The gold standard for IQ testing, measuring four major indices of intelligence.", zh: "智商测试的黄金标准，测量智力的四个主要指标。" },
      theoreticalBasis: { en: "Cattell-Horn-Carroll (CHC) Theory", zh: "Cattell-Horn-Carroll (CHC) 理论" }
    },
    questions: clinicalQuestions,
    timeLimit: 1800, // 30 mins
    references: [
      { title: "The neuroscience of human intelligence differences", author: "Deary, I. J., et al.", year: 2010, journal: "Nature Reviews Neuroscience" },
      { title: "Theory of fluid and crystallized intelligence", author: "Raymond Cattell", year: 1963 }
    ]
  }
];
