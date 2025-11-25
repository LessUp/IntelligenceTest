import { NextRequest, NextResponse } from 'next/server';

interface AnalysisRequest {
  score: number;
  totalQuestions: number;
  correctCount: number;
  timeElapsed: number;
  typeScores: Record<string, { correct: number; total: number }>;
  language: 'en' | 'zh';
}

interface AnalysisResponse {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  percentile: number;
  cognitiveProfile: {
    domain: string;
    score: number;
    description: string;
  }[];
}

// 模拟AI分析（实际项目中应该调用OpenAI/Claude等API）
function generateAnalysis(data: AnalysisRequest): AnalysisResponse {
  const { score, typeScores, language, timeElapsed, totalQuestions, correctCount } = data;
  const accuracy = (correctCount / totalQuestions) * 100;
  
  // 计算各领域得分
  const domainScores = Object.entries(typeScores).map(([domain, scores]) => ({
    domain,
    score: Math.round((scores.correct / scores.total) * 100),
  }));

  // 找出强项和弱项
  const sortedDomains = [...domainScores].sort((a, b) => b.score - a.score);
  const strengths = sortedDomains.slice(0, 2).filter(d => d.score >= 60);
  const weaknesses = sortedDomains.slice(-2).filter(d => d.score < 60);

  // 计算百分位数（简化版）
  const percentile = Math.min(99, Math.max(1, Math.round((score - 70) / 60 * 100)));

  // 生成分析文本
  const isEnglish = language === 'en';
  
  const summaryTemplates = {
    high: {
      en: `Your cognitive assessment reveals exceptional abilities, placing you in the top ${100 - percentile}% of test-takers. Your overall IQ score of ${score} demonstrates strong analytical and reasoning capabilities.`,
      zh: `您的认知评估显示出卓越的能力，在所有测试者中位于前${100 - percentile}%。您的总体智商分数${score}表明了强大的分析和推理能力。`
    },
    medium: {
      en: `Your cognitive profile shows solid performance across multiple domains. With an IQ score of ${score}, you demonstrate competent reasoning abilities and potential for growth in specific areas.`,
      zh: `您的认知档案显示在多个领域表现稳定。智商分数${score}表明您具备良好的推理能力，在特定领域有提升潜力。`
    },
    low: {
      en: `Your assessment indicates areas where targeted practice can significantly improve your cognitive performance. With focused training, you can enhance your problem-solving abilities.`,
      zh: `您的评估表明有些领域通过针对性练习可以显著提升认知表现。通过专注训练，您可以增强解决问题的能力。`
    }
  };

  const summary = score >= 115 
    ? summaryTemplates.high[language]
    : score >= 90 
      ? summaryTemplates.medium[language]
      : summaryTemplates.low[language];

  const strengthMessages = {
    pattern: { en: 'Pattern Recognition', zh: '模式识别' },
    spatial: { en: 'Spatial Reasoning', zh: '空间推理' },
    verbal: { en: 'Verbal Intelligence', zh: '言语智力' },
    logic: { en: 'Logical Reasoning', zh: '逻辑推理' },
    math: { en: 'Mathematical Ability', zh: '数学能力' },
    memory: { en: 'Working Memory', zh: '工作记忆' },
  };

  const recommendations = {
    en: [
      'Practice daily cognitive exercises for 15-20 minutes',
      'Focus on timed problem-solving to improve processing speed',
      'Engage in activities that challenge working memory',
      'Read diverse materials to enhance crystallized intelligence',
      'Try spatial puzzles like Rubik\'s cube or tangrams',
    ],
    zh: [
      '每天进行15-20分钟的认知训练',
      '专注于限时解题以提高处理速度',
      '参与挑战工作记忆的活动',
      '阅读多样化材料以增强晶体智力',
      '尝试空间谜题如魔方或七巧板',
    ]
  };

  const cognitiveProfile = domainScores.map(d => ({
    domain: strengthMessages[d.domain as keyof typeof strengthMessages]?.[language] || d.domain,
    score: d.score,
    description: d.score >= 80 
      ? (isEnglish ? 'Excellent performance' : '表现优秀')
      : d.score >= 60 
        ? (isEnglish ? 'Good performance' : '表现良好')
        : (isEnglish ? 'Room for improvement' : '有提升空间')
  }));

  return {
    summary,
    strengths: strengths.map(s => 
      strengthMessages[s.domain as keyof typeof strengthMessages]?.[language] || s.domain
    ),
    weaknesses: weaknesses.map(w => 
      strengthMessages[w.domain as keyof typeof strengthMessages]?.[language] || w.domain
    ),
    recommendations: recommendations[language].slice(0, 3),
    percentile,
    cognitiveProfile,
  };
}

export async function POST(request: NextRequest) {
  try {
    const data: AnalysisRequest = await request.json();
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = generateAnalysis(data);
    
    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate analysis' },
      { status: 500 }
    );
  }
}
