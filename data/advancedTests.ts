import { TestBank, Question, QuestionType } from './types';

// ============================================================================
// 认知灵活性测试 (Cognitive Flexibility Test)
// 基于 Wisconsin Card Sorting Test (WCST)
// 参考: Miyake et al. (2000) - Unity and diversity of executive functions
// ============================================================================
export const cognitiveFlexibilityQuestions: Question[] = [
  {
    id: 'cf1',
    type: 'logic',
    difficulty: 3,
    text: {
      en: "Cards can be sorted by color, shape, or number. If the rule is 'sort by shape', which pile does a card with 2 red circles belong to?",
      zh: "卡片可以按颜色、形状或数量分类。如果规则是'按形状分类'，一张有2个红色圆形的卡片应该放在哪一堆？"
    },
    svgContent: `<svg viewBox="0 0 400 120" class="w-full h-full">
      <rect x="10" y="10" width="70" height="90" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="25" y="35" width="40" height="40" fill="#3B82F6" rx="4"/>
      <text x="45" y="115" text-anchor="middle" font-size="10" fill="currentColor">A:Square</text>
      <rect x="100" y="10" width="70" height="90" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
      <polygon points="135,30 115,80 155,80" fill="#10B981"/>
      <text x="135" y="115" text-anchor="middle" font-size="10" fill="currentColor">B:Triangle</text>
      <rect x="190" y="10" width="70" height="90" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="225" cy="55" r="22" fill="#F59E0B"/>
      <text x="225" y="115" text-anchor="middle" font-size="10" fill="currentColor">C:Circle</text>
      <rect x="310" y="10" width="70" height="90" rx="8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5"/>
      <circle cx="330" cy="40" r="14" fill="#EF4444"/>
      <circle cx="355" cy="65" r="14" fill="#EF4444"/>
      <text x="345" y="115" text-anchor="middle" font-size="10" fill="currentColor">Card: ?</text>
    </svg>`,
    options: [
      { id: 'A', text: { en: 'Pile A (Square)', zh: '堆A（方形）' } },
      { id: 'B', text: { en: 'Pile B (Triangle)', zh: '堆B（三角形）' } },
      { id: 'C', text: { en: 'Pile C (Circle)', zh: '堆C（圆形）' } },
      { id: 'D', text: { en: 'Cannot determine', zh: '无法确定' } }
    ],
    correctOptionId: 'C',
    explanation: {
      en: "When sorting by shape, the card with circles goes to Pile C which also contains circles.",
      zh: "按形状分类时，带有圆形的卡片应放入同样有圆形的C堆。"
    }
  },
  {
    id: 'cf2',
    type: 'logic',
    difficulty: 4,
    text: {
      en: "Rule changed from 'color' to 'number'. A card with 3 green squares appears. Where should it go if piles have: A=1 item, B=2 items, C=3 items?",
      zh: "规则从'颜色'变为'数量'。出现一张有3个绿色方形的卡片。如果各堆有：A=1个，B=2个，C=3个物品，应该放在哪里？"
    },
    options: [
      { id: 'A', text: { en: 'Pile A', zh: '堆A' } },
      { id: 'B', text: { en: 'Pile B', zh: '堆B' } },
      { id: 'C', text: { en: 'Pile C', zh: '堆C' } },
      { id: 'D', text: { en: 'Green pile', zh: '绿色堆' } }
    ],
    correctOptionId: 'C',
    explanation: {
      en: "This tests set-shifting. You must adapt to the new rule 'number' and sort by quantity (3 items → Pile C).",
      zh: "这测试心理定势转换。你必须适应新规则'数量'，按数量分类（3个→堆C）。"
    }
  },
  {
    id: 'cf3',
    type: 'logic',
    difficulty: 5,
    text: {
      en: "Dual-task: If number is ODD→LEFT. If letter is VOWEL→RIGHT. For '7A', which response?",
      zh: "双任务：如果数字是奇数→左键。如果字母是元音→右键。对于'7A'，哪个反应？"
    },
    options: [
      { id: 'A', text: { en: 'LEFT only', zh: '只按左键' } },
      { id: 'B', text: { en: 'RIGHT only', zh: '只按右键' } },
      { id: 'C', text: { en: 'Both LEFT and RIGHT', zh: '同时按左键和右键' } },
      { id: 'D', text: { en: 'Neither', zh: '都不按' } }
    ],
    correctOptionId: 'C',
    explanation: {
      en: "7 is odd (LEFT) and A is a vowel (RIGHT). Both conditions met.",
      zh: "7是奇数（左键），A是元音（右键）。两个条件都满足。"
    }
  }
];

// ============================================================================
// 工作记忆测试 (Working Memory Test)
// 基于 Baddeley's Working Memory Model 和 N-Back Paradigm
// ============================================================================
export const workingMemoryQuestions: Question[] = [
  {
    id: 'wm1',
    type: 'memory',
    difficulty: 2,
    text: {
      en: "Remember: 4 - 7 - 1 - 8 - 3. What is the third number?",
      zh: "记住：4 - 7 - 1 - 8 - 3。第三个数字是什么？"
    },
    options: [
      { id: 'A', text: { en: '7', zh: '7' } },
      { id: 'B', text: { en: '1', zh: '1' } },
      { id: 'C', text: { en: '8', zh: '8' } },
      { id: 'D', text: { en: '4', zh: '4' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "Sequence: 4, 7, 1, 8, 3. Third number is 1.", zh: "序列：4, 7, 1, 8, 3。第三个是1。" }
  },
  {
    id: 'wm2',
    type: 'memory',
    difficulty: 3,
    text: {
      en: "Remember: 6 - 2 - 9 - 4 - 7 - 1. Add 2 to each. New sequence?",
      zh: "记住：6 - 2 - 9 - 4 - 7 - 1。每个加2。新序列是？"
    },
    options: [
      { id: 'A', text: { en: '8-4-11-6-9-3', zh: '8-4-11-6-9-3' } },
      { id: 'B', text: { en: '8-4-1-6-9-3', zh: '8-4-1-6-9-3' } },
      { id: 'C', text: { en: '6-2-9-4-7-1', zh: '6-2-9-4-7-1' } },
      { id: 'D', text: { en: '4-0-7-2-5-1', zh: '4-0-7-2-5-1' } }
    ],
    correctOptionId: 'A',
    explanation: { en: "6+2=8, 2+2=4, 9+2=11, 4+2=6, 7+2=9, 1+2=3", zh: "6+2=8, 2+2=4, 9+2=11, 4+2=6, 7+2=9, 1+2=3" }
  },
  {
    id: 'wm3',
    type: 'memory',
    difficulty: 4,
    text: {
      en: "N-Back (2-back): K-M-K-R-M. Is current letter (M) same as 2 positions back?",
      zh: "N-Back（2-back）：K-M-K-R-M。当前字母（M）与2位前相同吗？"
    },
    options: [
      { id: 'A', text: { en: 'Yes', zh: '是' } },
      { id: 'B', text: { en: 'No', zh: '否' } },
      { id: 'C', text: { en: 'Cannot determine', zh: '无法确定' } },
      { id: 'D', text: { en: 'Sequence too short', zh: '序列太短' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "Current=M(5th). 2 back=K(3rd). K≠M, no match.", zh: "当前=M(第5)。2位前=K(第3)。K≠M，不匹配。" }
  },
  {
    id: 'wm4',
    type: 'memory',
    difficulty: 5,
    text: {
      en: "Reverse sequence: 3-8-2-9-4-7-1. What is reversed?",
      zh: "倒序序列：3-8-2-9-4-7-1。倒序是什么？"
    },
    options: [
      { id: 'A', text: { en: '1-7-4-9-2-8-3', zh: '1-7-4-9-2-8-3' } },
      { id: 'B', text: { en: '3-8-2-9-4-7-1', zh: '3-8-2-9-4-7-1' } },
      { id: 'C', text: { en: '1-4-7-2-9-8-3', zh: '1-4-7-2-9-8-3' } },
      { id: 'D', text: { en: '7-1-4-9-2-8-3', zh: '7-1-4-9-2-8-3' } }
    ],
    correctOptionId: 'A',
    explanation: { en: "Reversed: 1-7-4-9-2-8-3. Tests working memory manipulation.", zh: "倒序：1-7-4-9-2-8-3。测试工作记忆操作。" }
  }
];

// ============================================================================
// 流体智力测试 (Fluid Intelligence - Gf)
// 基于 Cattell-Horn-Carroll (CHC) Theory
// ============================================================================
export const fluidIntelligenceQuestions: Question[] = [
  {
    id: 'gf1',
    type: 'pattern',
    difficulty: 4,
    text: {
      en: "Find the pattern: 2→8, 3→27, 4→64, 5→?",
      zh: "找规律：2→8, 3→27, 4→64, 5→?"
    },
    options: [
      { id: 'A', text: { en: '100', zh: '100' } },
      { id: 'B', text: { en: '125', zh: '125' } },
      { id: 'C', text: { en: '150', zh: '150' } },
      { id: 'D', text: { en: '80', zh: '80' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "Pattern is n³: 2³=8, 3³=27, 4³=64, 5³=125", zh: "规律是n³：2³=8, 3³=27, 4³=64, 5³=125" }
  },
  {
    id: 'gf2',
    type: 'pattern',
    difficulty: 5,
    text: {
      en: "Complete: 1, 1, 2, 3, 5, 8, 13, ?",
      zh: "完成序列：1, 1, 2, 3, 5, 8, 13, ?"
    },
    options: [
      { id: 'A', text: { en: '18', zh: '18' } },
      { id: 'B', text: { en: '20', zh: '20' } },
      { id: 'C', text: { en: '21', zh: '21' } },
      { id: 'D', text: { en: '26', zh: '26' } }
    ],
    correctOptionId: 'C',
    explanation: { en: "Fibonacci: each number = sum of previous two. 8+13=21", zh: "斐波那契：每个数=前两数之和。8+13=21" }
  },
  {
    id: 'gf3',
    type: 'pattern',
    difficulty: 5,
    text: {
      en: "Matrix: Row rule + Column rule. Find missing.",
      zh: "矩阵推理：行规律+列规律。找出缺失项。"
    },
    svgContent: `<svg viewBox="0 0 280 280" class="w-full h-full">
      <rect x="5" y="5" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="45" cy="45" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="95" y="5" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="135" cy="45" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="135" cy="45" r="8" fill="currentColor"/>
      <rect x="185" y="5" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="225" cy="45" r="22" fill="currentColor"/>
      <rect x="5" y="95" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="20" y="110" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="95" y="95" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="110" y="110" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="125" y="125" width="20" height="20" fill="currentColor"/>
      <rect x="185" y="95" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="200" y="110" width="50" height="50" fill="currentColor"/>
      <rect x="5" y="185" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <polygon points="45,195 20,255 70,255" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="95" y="185" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <polygon points="135,195 110,255 160,255" fill="none" stroke="currentColor" stroke-width="2"/>
      <polygon points="135,215 125,240 145,240" fill="currentColor"/>
      <rect x="185" y="185" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5"/>
      <text x="225" y="235" text-anchor="middle" font-size="28" fill="currentColor">?</text>
    </svg>`,
    options: [
      { id: 'A', svgContent: '<svg viewBox="0 0 80 80"><polygon points="40,10 15,65 65,65" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'B', svgContent: '<svg viewBox="0 0 80 80"><polygon points="40,10 15,65 65,65" fill="currentColor"/></svg>' },
      { id: 'C', svgContent: '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="25" fill="currentColor"/></svg>' },
      { id: 'D', svgContent: '<svg viewBox="0 0 80 80"><rect x="10" y="10" width="60" height="60" fill="currentColor"/></svg>' }
    ],
    correctOptionId: 'B',
    explanation: { en: "Row: outline→half-fill→full-fill. Column: circle→square→triangle. Answer: filled triangle.", zh: "行：轮廓→半填充→全填充。列：圆→方→三角。答案：填充三角形。" }
  }
];
