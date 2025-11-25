import { Question } from './types';

// ============================================================================
// 情绪智力测试 (Emotional Intelligence - EQ)
// 基于 Mayer-Salovey-Caruso Emotional Intelligence Test (MSCEIT)
// 参考: Mayer, Salovey & Caruso (2002) - Emotional intelligence as a standard intelligence
// ============================================================================
export const emotionalIntelligenceQuestions: Question[] = [
  {
    id: 'eq1',
    type: 'verbal',
    difficulty: 2,
    text: {
      en: "A colleague just received news that their project proposal was rejected. They are sitting quietly at their desk. What is the most emotionally intelligent response?",
      zh: "一位同事刚得知他们的项目提案被拒绝了。他们正安静地坐在办公桌前。最有情商的回应是什么？"
    },
    options: [
      { id: 'A', text: { en: 'Immediately share tips on how to improve the proposal', zh: '立即分享如何改进提案的建议' } },
      { id: 'B', text: { en: 'Give them space and check in later with empathy', zh: '给他们空间，稍后带着同理心问候' } },
      { id: 'C', text: { en: 'Tell them not to worry, rejections happen all the time', zh: '告诉他们别担心，拒绝很常见' } },
      { id: 'D', text: { en: 'Change the subject to distract them', zh: '转移话题来分散他们的注意力' } }
    ],
    correctOptionId: 'B',
    explanation: {
      en: "Emotional intelligence involves recognizing others' emotional states and responding appropriately. Giving space while showing later support demonstrates empathy without being intrusive.",
      zh: "情绪智力包括识别他人的情绪状态并做出适当回应。给予空间同时表示稍后的支持，体现了不侵入性的同理心。"
    }
  },
  {
    id: 'eq2',
    type: 'verbal',
    difficulty: 3,
    text: {
      en: "You notice a team member has been increasingly quiet in meetings and their work quality has declined. What should you do first?",
      zh: "你注意到一个团队成员在会议上越来越沉默，工作质量也下降了。你应该首先做什么？"
    },
    options: [
      { id: 'A', text: { en: 'Report to HR about the performance issue', zh: '向HR报告绩效问题' } },
      { id: 'B', text: { en: 'Have a private, supportive conversation to understand', zh: '进行私下的、支持性的谈话来了解情况' } },
      { id: 'C', text: { en: 'Send them an email about improving their work', zh: '发邮件要求他们改进工作' } },
      { id: 'D', text: { en: 'Wait and see if things improve on their own', zh: '等待看情况是否自行改善' } }
    ],
    correctOptionId: 'B',
    explanation: {
      en: "EQ involves perceiving emotional cues and responding with empathy. A private conversation allows understanding the underlying issue before taking any action.",
      zh: "情商包括感知情绪线索并以同理心回应。私下谈话可以在采取任何行动之前了解潜在问题。"
    }
  },
  {
    id: 'eq3',
    type: 'verbal',
    difficulty: 4,
    text: {
      en: "During a heated meeting, two colleagues start arguing. The tension is escalating. As a team lead, what is the best approach?",
      zh: "在一次激烈的会议中，两位同事开始争吵。紧张气氛在升级。作为团队负责人，最好的做法是什么？"
    },
    options: [
      { id: 'A', text: { en: 'Let them resolve it themselves', zh: '让他们自己解决' } },
      { id: 'B', text: { en: 'Take sides with whoever has the better argument', zh: '站在论点更好的一方' } },
      { id: 'C', text: { en: 'Call for a break, then facilitate calm discussion', zh: '宣布休息，然后引导冷静讨论' } },
      { id: 'D', text: { en: 'End the meeting immediately', zh: '立即结束会议' } }
    ],
    correctOptionId: 'C',
    explanation: {
      en: "Managing emotions in groups requires de-escalation first (break), then facilitating constructive dialogue. This demonstrates emotional regulation and social skills.",
      zh: "管理群体情绪需要先降温（休息），然后促进建设性对话。这体现了情绪调节和社交技能。"
    }
  },
  {
    id: 'eq4',
    type: 'verbal',
    difficulty: 4,
    text: {
      en: "You made a mistake that affected a client. You feel frustrated and embarrassed. Which response shows the highest emotional intelligence?",
      zh: "你犯了一个影响客户的错误。你感到沮丧和尴尬。哪种回应显示最高的情商？"
    },
    options: [
      { id: 'A', text: { en: 'Hide the mistake and hope no one notices', zh: '隐藏错误，希望没人发现' } },
      { id: 'B', text: { en: 'Blame the circumstances or others involved', zh: '责怪环境或其他相关人员' } },
      { id: 'C', text: { en: 'Acknowledge your emotions, then take responsibility and fix it', zh: '承认自己的情绪，然后承担责任并解决问题' } },
      { id: 'D', text: { en: 'Dwell on the negative feelings for days', zh: '在消极情绪中沉溺几天' } }
    ],
    correctOptionId: 'C',
    explanation: {
      en: "High EQ includes self-awareness (acknowledging emotions) and emotional regulation (not letting feelings prevent appropriate action). Taking responsibility shows maturity.",
      zh: "高情商包括自我意识（承认情绪）和情绪调节（不让情绪妨碍适当行动）。承担责任显示成熟度。"
    }
  },
  {
    id: 'eq5',
    type: 'verbal',
    difficulty: 5,
    text: {
      en: "A friend shares exciting news about a promotion, but you recently lost your job. What response demonstrates emotional intelligence?",
      zh: "一位朋友分享了晋升的好消息，但你最近失业了。什么回应展示了情商？"
    },
    options: [
      { id: 'A', text: { en: 'Pretend to be happy while feeling resentful inside', zh: '内心不满但假装高兴' } },
      { id: 'B', text: { en: 'Share your job loss to shift attention', zh: '分享你的失业来转移注意力' } },
      { id: 'C', text: { en: 'Genuinely congratulate them, process your own feelings separately', zh: '真诚祝贺他们，私下处理自己的情绪' } },
      { id: 'D', text: { en: 'Minimize their achievement by changing topic', zh: '通过转移话题来淡化他们的成就' } }
    ],
    correctOptionId: 'C',
    explanation: {
      en: "EQ involves managing your own emotions while still connecting authentically with others. You can feel happy for them AND process your own situation separately.",
      zh: "情商包括管理自己的情绪同时仍能真诚地与他人联系。你可以为他们高兴，同时私下处理自己的情况。"
    }
  },
  {
    id: 'eq6',
    type: 'verbal',
    difficulty: 3,
    text: {
      en: "Reading facial expressions: A person shows raised eyebrows, wide eyes, and an open mouth. What emotion are they likely feeling?",
      zh: "解读面部表情：一个人眉毛扬起，眼睛睁大，嘴巴张开。他们可能感受到什么情绪？"
    },
    svgContent: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-width="3"/>
      <ellipse cx="70" cy="80" rx="15" ry="20" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="70" cy="80" r="8" fill="currentColor"/>
      <ellipse cx="130" cy="80" rx="15" ry="20" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="130" cy="80" r="8" fill="currentColor"/>
      <path d="M 55 55 Q 70 45 85 55" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M 115 55 Q 130 45 145 55" fill="none" stroke="currentColor" stroke-width="2"/>
      <ellipse cx="100" cy="140" rx="20" ry="25" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    options: [
      { id: 'A', text: { en: 'Anger', zh: '愤怒' } },
      { id: 'B', text: { en: 'Surprise', zh: '惊讶' } },
      { id: 'C', text: { en: 'Sadness', zh: '悲伤' } },
      { id: 'D', text: { en: 'Disgust', zh: '厌恶' } }
    ],
    correctOptionId: 'B',
    explanation: {
      en: "Surprise is characterized by raised eyebrows, widened eyes, and an open mouth. This is one of the basic universal emotions identified by Ekman.",
      zh: "惊讶的特征是眉毛扬起、眼睛睁大和嘴巴张开。这是Ekman确定的基本普遍情绪之一。"
    }
  }
];

// ============================================================================
// 处理速度测试 (Processing Speed)
// 基于 Symbol Search and Coding subtests from WAIS-IV
// ============================================================================
export const processingSpeedQuestions: Question[] = [
  {
    id: 'ps1',
    type: 'pattern',
    difficulty: 2,
    text: {
      en: "Symbol Search: Does the target symbol appear in the search group? Target: ◆",
      zh: "符号搜索：目标符号是否出现在搜索组中？目标：◆"
    },
    svgContent: `<svg viewBox="0 0 350 100" class="w-full h-full">
      <rect x="10" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="40" y="60" text-anchor="middle" font-size="32">◆</text>
      <text x="90" y="55" font-size="24" fill="currentColor">|</text>
      <text x="120" y="60" font-size="28">○</text>
      <text x="160" y="60" font-size="28">△</text>
      <text x="200" y="60" font-size="28">□</text>
      <text x="240" y="60" font-size="28">◇</text>
      <text x="280" y="60" font-size="28">☆</text>
    </svg>`,
    options: [
      { id: 'A', text: { en: 'Yes', zh: '是' } },
      { id: 'B', text: { en: 'No', zh: '否' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "◆ (filled diamond) is not in the group. ◇ (outline diamond) is different.", zh: "◆（实心菱形）不在组中。◇（空心菱形）是不同的。" }
  },
  {
    id: 'ps2',
    type: 'pattern',
    difficulty: 3,
    text: {
      en: "Count how many times '7' appears: 7 4 7 2 9 7 1 7 5 7 8 3",
      zh: "数一数'7'出现了多少次：7 4 7 2 9 7 1 7 5 7 8 3"
    },
    options: [
      { id: 'A', text: { en: '4', zh: '4' } },
      { id: 'B', text: { en: '5', zh: '5' } },
      { id: 'C', text: { en: '6', zh: '6' } },
      { id: 'D', text: { en: '3', zh: '3' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "7 appears at positions 1, 3, 6, 8, 10. Total = 5 times.", zh: "7出现在位置1、3、6、8、10。总共=5次。" }
  },
  {
    id: 'ps3',
    type: 'pattern',
    difficulty: 4,
    text: {
      en: "Coding: If A=1, B=2, C=3, D=4, what is BAD?",
      zh: "编码：如果A=1, B=2, C=3, D=4，BAD是什么？"
    },
    options: [
      { id: 'A', text: { en: '214', zh: '214' } },
      { id: 'B', text: { en: '241', zh: '241' } },
      { id: 'C', text: { en: '124', zh: '124' } },
      { id: 'D', text: { en: '412', zh: '412' } }
    ],
    correctOptionId: 'A',
    explanation: { en: "B=2, A=1, D=4. BAD = 214", zh: "B=2, A=1, D=4。BAD = 214" }
  },
  {
    id: 'ps4',
    type: 'pattern',
    difficulty: 4,
    text: {
      en: "Find the different one quickly:",
      zh: "快速找出不同的那个："
    },
    svgContent: `<svg viewBox="0 0 350 80" class="w-full h-full">
      <text x="30" y="50" font-size="32">○</text>
      <text x="70" y="50" font-size="32">○</text>
      <text x="110" y="50" font-size="32">○</text>
      <text x="150" y="50" font-size="32">◎</text>
      <text x="190" y="50" font-size="32">○</text>
      <text x="230" y="50" font-size="32">○</text>
      <text x="270" y="50" font-size="32">○</text>
      <text x="310" y="50" font-size="32">○</text>
      <text x="30" y="75" font-size="12" fill="currentColor">1</text>
      <text x="70" y="75" font-size="12" fill="currentColor">2</text>
      <text x="110" y="75" font-size="12" fill="currentColor">3</text>
      <text x="150" y="75" font-size="12" fill="currentColor">4</text>
      <text x="190" y="75" font-size="12" fill="currentColor">5</text>
      <text x="230" y="75" font-size="12" fill="currentColor">6</text>
      <text x="270" y="75" font-size="12" fill="currentColor">7</text>
      <text x="310" y="75" font-size="12" fill="currentColor">8</text>
    </svg>`,
    options: [
      { id: 'A', text: { en: 'Position 3', zh: '位置3' } },
      { id: 'B', text: { en: 'Position 4', zh: '位置4' } },
      { id: 'C', text: { en: 'Position 5', zh: '位置5' } },
      { id: 'D', text: { en: 'Position 6', zh: '位置6' } }
    ],
    correctOptionId: 'B',
    explanation: { en: "Position 4 has ◎ (double circle), others have ○ (single circle).", zh: "位置4是◎（双圈），其他是○（单圈）。" }
  }
];
