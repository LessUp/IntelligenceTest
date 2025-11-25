import { Question } from './types';

// ============================================================================
// 言语推理测试 (Verbal Reasoning)
// 基于 Miller Analogies Test (MAT) 和 GRE Verbal
// ============================================================================
export const verbalReasoningQuestions: Question[] = [
  {
    id: 'vr1',
    type: 'verbal',
    difficulty: 3,
    text: {
      en: "Complete the analogy: BOOK is to READING as FORK is to ?",
      zh: "完成类比：书 之于 阅读 如同 叉子 之于 ?"
    },
    options: [
      { id: 'A', text: { en: 'Kitchen', zh: '厨房' } },
      { id: 'B', text: { en: 'Eating', zh: '吃饭' } },
      { id: 'C', text: { en: 'Metal', zh: '金属' } },
      { id: 'D', text: { en: 'Spoon', zh: '勺子' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "A book is a tool for reading. A fork is a tool for eating. Function relationship.", zh: "书是阅读的工具。叉子是吃饭的工具。功能关系。" }
  },
  {
    id: 'vr2',
    type: 'verbal',
    difficulty: 4,
    text: {
      en: "PALTRY : SIGNIFICANCE :: MEAGER : ?",
      zh: "微不足道 : 重要性 :: 贫乏 : ?"
    },
    options: [
      { id: 'A', text: { en: 'Abundance', zh: '丰富' } },
      { id: 'B', text: { en: 'Poverty', zh: '贫困' } },
      { id: 'C', text: { en: 'Quality', zh: '质量' } },
      { id: 'D', text: { en: 'Scarcity', zh: '稀缺' } }
    ],
    correctOptionId: 'A',
    explanation: { en: "Paltry means lacking significance. Meager means lacking abundance. Antonym relationship.", zh: "Paltry意为缺乏重要性。Meager意为缺乏丰富。反义关系。" }
  },
  {
    id: 'vr3',
    type: 'verbal',
    difficulty: 3,
    text: {
      en: "Which word does NOT belong with the others?",
      zh: "哪个词与其他词不属于同一类？"
    },
    options: [
      { id: 'A', text: { en: 'Apple', zh: '苹果' } },
      { id: 'B', text: { en: 'Banana', zh: '香蕉' } },
      { id: 'C', text: { en: 'Carrot', zh: '胡萝卜' } },
      { id: 'D', text: { en: 'Orange', zh: '橙子' } }
    ],
    correctOptionId: 'C',
    explanation: { en: "Carrot is a vegetable. Apple, banana, and orange are fruits.", zh: "胡萝卜是蔬菜。苹果、香蕉和橙子是水果。" }
  },
  {
    id: 'vr4',
    type: 'verbal',
    difficulty: 5,
    text: {
      en: "If all Zorps are Blips, and some Blips are Clunks, which must be true?",
      zh: "如果所有Zorps都是Blips，有些Blips是Clunks，哪个必须为真？"
    },
    options: [
      { id: 'A', text: { en: 'All Zorps are Clunks', zh: '所有Zorps都是Clunks' } },
      { id: 'B', text: { en: 'Some Zorps may be Clunks', zh: '有些Zorps可能是Clunks' } },
      { id: 'C', text: { en: 'No Zorps are Clunks', zh: '没有Zorps是Clunks' } },
      { id: 'D', text: { en: 'All Clunks are Zorps', zh: '所有Clunks都是Zorps' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "Since all Zorps are Blips, and some Blips are Clunks, it's possible (but not certain) that some Zorps are Clunks.", zh: "由于所有Zorps都是Blips，有些Blips是Clunks，所以有些Zorps可能（但不确定）是Clunks。" }
  },
  {
    id: 'vr5',
    type: 'verbal',
    difficulty: 4,
    text: {
      en: "Choose the word closest in meaning to 'EPHEMERAL':",
      zh: "选择与'短暂的'意思最接近的词："
    },
    options: [
      { id: 'A', text: { en: 'Eternal', zh: '永恒的' } },
      { id: 'B', text: { en: 'Transient', zh: '瞬息的' } },
      { id: 'C', text: { en: 'Memorable', zh: '难忘的' } },
      { id: 'D', text: { en: 'Permanent', zh: '永久的' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "Ephemeral means lasting for a very short time. Transient has the same meaning.", zh: "Ephemeral意为持续时间很短。Transient有相同的意思。" }
  }
];

// ============================================================================
// 晶体智力测试 (Crystallized Intelligence - Gc)
// 基于 WAIS-IV Information and Vocabulary subtests
// ============================================================================
export const crystallizedIntelligenceQuestions: Question[] = [
  {
    id: 'gc1',
    type: 'verbal',
    difficulty: 2,
    text: {
      en: "What is the capital of France?",
      zh: "法国的首都是什么？"
    },
    options: [
      { id: 'A', text: { en: 'London', zh: '伦敦' } },
      { id: 'B', text: { en: 'Paris', zh: '巴黎' } },
      { id: 'C', text: { en: 'Berlin', zh: '柏林' } },
      { id: 'D', text: { en: 'Madrid', zh: '马德里' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "Paris is the capital and largest city of France.", zh: "巴黎是法国的首都和最大城市。" }
  },
  {
    id: 'gc2',
    type: 'verbal',
    difficulty: 3,
    text: {
      en: "Who wrote 'Romeo and Juliet'?",
      zh: "谁写了《罗密欧与朱丽叶》？"
    },
    options: [
      { id: 'A', text: { en: 'Charles Dickens', zh: '查尔斯·狄更斯' } },
      { id: 'B', text: { en: 'William Shakespeare', zh: '威廉·莎士比亚' } },
      { id: 'C', text: { en: 'Jane Austen', zh: '简·奥斯汀' } },
      { id: 'D', text: { en: 'Mark Twain', zh: '马克·吐温' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "William Shakespeare wrote Romeo and Juliet around 1594-1596.", zh: "威廉·莎士比亚在1594-1596年左右写了《罗密欧与朱丽叶》。" }
  },
  {
    id: 'gc3',
    type: 'verbal',
    difficulty: 4,
    text: {
      en: "What does 'DNA' stand for?",
      zh: "'DNA'代表什么？"
    },
    options: [
      { id: 'A', text: { en: 'Deoxyribonucleic Acid', zh: '脱氧核糖核酸' } },
      { id: 'B', text: { en: 'Digital Network Analysis', zh: '数字网络分析' } },
      { id: 'C', text: { en: 'Dynamic Nucleic Assembly', zh: '动态核酸组装' } },
      { id: 'D', text: { en: 'Direct Neural Activity', zh: '直接神经活动' } }
    ],
    correctOptionId: 'A',
    explanation: { en: "DNA = Deoxyribonucleic Acid, the molecule carrying genetic information.", zh: "DNA = 脱氧核糖核酸，携带遗传信息的分子。" }
  },
  {
    id: 'gc4',
    type: 'verbal',
    difficulty: 5,
    text: {
      en: "What philosophical concept did René Descartes express with 'Cogito, ergo sum'?",
      zh: "勒内·笛卡尔用'我思故我在'表达了什么哲学概念？"
    },
    options: [
      { id: 'A', text: { en: 'Existence precedes essence', zh: '存在先于本质' } },
      { id: 'B', text: { en: 'Thinking proves one\'s existence', zh: '思考证明自己的存在' } },
      { id: 'C', text: { en: 'Knowledge is power', zh: '知识就是力量' } },
      { id: 'D', text: { en: 'Mind and body are separate', zh: '心灵和身体是分离的' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "'I think, therefore I am' - Descartes used the act of thinking as proof of existence.", zh: "'我思故我在' - 笛卡尔用思考的行为作为存在的证明。" }
  }
];

// ============================================================================
// 创造力测试 (Divergent Thinking / Creativity)
// 基于 Torrance Tests of Creative Thinking (TTCT)
// ============================================================================
export const creativityQuestions: Question[] = [
  {
    id: 'cr1',
    type: 'verbal',
    difficulty: 3,
    text: {
      en: "How many different uses can you think of for a brick? Choose the response showing the MOST creative uses:",
      zh: "你能想出砖头的多少种不同用途？选择显示最有创意用途的答案："
    },
    options: [
      { id: 'A', text: { en: 'Building, wall, house', zh: '建筑、墙、房子' } },
      { id: 'B', text: { en: 'Doorstop, weapon, paperweight', zh: '门挡、武器、镇纸' } },
      { id: 'C', text: { en: 'Artwork base, heat absorber, musical instrument, bookend, exercise weight', zh: '艺术品底座、吸热器、乐器、书挡、锻炼哑铃' } },
      { id: 'D', text: { en: 'Red object, heavy thing', zh: '红色物体、重物' } }
    ],
    correctOptionId: 'C',
    explanation: { en: "Option C shows divergent thinking with varied, unusual applications across different domains.", zh: "选项C展示了发散思维，跨不同领域的多样化、不寻常的应用。" }
  },
  {
    id: 'cr2',
    type: 'verbal',
    difficulty: 4,
    text: {
      en: "Remote Associates: What single word connects COTTAGE, SWISS, CAKE?",
      zh: "远距离联想：什么单词能连接 小屋、瑞士、蛋糕？"
    },
    options: [
      { id: 'A', text: { en: 'CHEESE', zh: '奶酪' } },
      { id: 'B', text: { en: 'HOUSE', zh: '房子' } },
      { id: 'C', text: { en: 'SWEET', zh: '甜' } },
      { id: 'D', text: { en: 'MOUNTAIN', zh: '山' } }
    ],
    correctOptionId: 'A',
    explanation: { en: "Cottage cheese, Swiss cheese, Cheesecake. All connect with CHEESE.", zh: "农家奶酪(Cottage cheese)、瑞士奶酪(Swiss cheese)、奶酪蛋糕(Cheesecake)。都与奶酪连接。" }
  },
  {
    id: 'cr3',
    type: 'verbal',
    difficulty: 4,
    text: {
      en: "Remote Associates: What word connects FALLING, ACTOR, DUST?",
      zh: "远距离联想：什么词连接 坠落、演员、灰尘？"
    },
    options: [
      { id: 'A', text: { en: 'MOVIE', zh: '电影' } },
      { id: 'B', text: { en: 'STAR', zh: '星星' } },
      { id: 'C', text: { en: 'LIGHT', zh: '光' } },
      { id: 'D', text: { en: 'SPACE', zh: '空间' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "Falling star, Movie star, Stardust. All connect with STAR.", zh: "流星(Falling star)、影星(Movie star)、星尘(Stardust)。都与星星连接。" }
  },
  {
    id: 'cr4',
    type: 'verbal',
    difficulty: 5,
    text: {
      en: "What would happen if humans could photosynthesize like plants? Choose the MOST creative and logical consequence:",
      zh: "如果人类能像植物一样进行光合作用会怎样？选择最有创意且合乎逻辑的后果："
    },
    options: [
      { id: 'A', text: { en: 'People would be green', zh: '人会变绿' } },
      { id: 'B', text: { en: 'Food industry collapses, but sunbathing becomes a job, and cloudy regions become less desirable real estate', zh: '食品工业崩溃，但日光浴成为工作，多云地区的房地产变得不受欢迎' } },
      { id: 'C', text: { en: 'Nothing would change', zh: '什么都不会改变' } },
      { id: 'D', text: { en: 'People would stop eating', zh: '人们会停止吃东西' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "B shows creative thinking by exploring multiple interconnected consequences across society, economy, and geography.", zh: "B通过探索社会、经济和地理方面多个相互关联的后果，展示了创造性思维。" }
  }
];
