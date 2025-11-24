'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore, TestResult } from '@/store/useTestStore';
import { questions } from '@/data/questions';
import { motion } from 'framer-motion';
import { Share2, Download, Home, Brain, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export default function ResultPage() {
  const router = useRouter();
  const { 
    status, answers, timeElapsed, language, saveResult
  } = useTestStore();
  const [scoreData, setScoreData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== 'completed' && status !== 'idle') { 
        // If reloading on result page without completing, redirect. 
        // But usually status is completed after finishTest.
        // If coming from history, we might want to support that later.
        // For now, assume flow is correct.
        if (Object.keys(answers).length === 0) router.replace('/');
    }

    if (Object.keys(answers).length > 0 && !scoreData) {
      calculateScore();
    }
  }, [status, answers]);

  const calculateScore = () => {
    let correct = 0;
    const typeScores: Record<string, { total: number; correct: number }> = {};

    questions.forEach(q => {
      if (!typeScores[q.type]) typeScores[q.type] = { total: 0, correct: 0 };
      typeScores[q.type].total++;
      
      if (answers[q.id] === q.correctOptionId) {
        correct++;
        typeScores[q.type].correct++;
      }
    });

    const rawScore = correct;
    const total = questions.length;
    // Fake IQ calculation: Base 85 + (raw/total * 60) -> range 85-145 roughly
    const iq = Math.round(85 + (rawScore / total) * 60);

    const result: TestResult = {
      date: new Date().toISOString(),
      score: iq,
      totalQuestions: total,
      correctCount: correct,
      timeElapsed,
      answers
    };

    saveResult(result);
    setScoreData({ iq, rawScore, total, typeScores });
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `IQ-Test-Result-${new Date().getTime()}.png`;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    }
  };

  const shareText = `I just scored ${scoreData.iq} (Top ${(100 - ((scoreData.iq - 85) / 60 * 100)).toFixed(1)}%) on this Scientific IQ Test! Can you beat me? #IQTest #BrainTraining`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToWeibo = () => {
    window.open(`http://service.weibo.com/share/share.php?title=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  if (!scoreData) return null;

  const chartData = Object.entries(scoreData.typeScores).map(([type, data]: [string, any]) => ({
    subject: type.toUpperCase(),
    A: (data.correct / data.total) * 100,
    fullMark: 100,
  }));

  const texts = {
    title: { en: 'Test Results', zh: '测试结果' },
    iqLabel: { en: 'Estimated IQ Score', zh: '预估智商 (IQ)' },
    correct: { en: 'Correct Answers', zh: '答对题目' },
    time: { en: 'Time Used', zh: '用时' },
    share: { en: 'Download Result Card', zh: '下载结果卡片' },
    home: { en: 'Back to Home', zh: '返回首页' },
    analysis: { en: 'Performance Analysis', zh: '能力分析' }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full flex justify-between items-center mb-8">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home size={20} />
          {texts.home[language]}
        </button>
        <div className="flex gap-2">
          <button
            onClick={shareToTwitter}
            className="p-2 rounded-full bg-black text-white hover:opacity-80 transition-opacity"
            title="Share to X (Twitter)"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </button>
          <button
            onClick={shareToWeibo}
            className="p-2 rounded-full bg-[#df2029] text-white hover:opacity-80 transition-opacity"
            title="Share to Weibo"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
          >
            <Download size={18} />
            {texts.share[language]}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Shareable Card Area */}
        <div className="flex justify-center">
          <div 
            ref={cardRef} 
            className="w-full max-w-md bg-white text-black p-8 rounded-3xl shadow-xl border relative overflow-hidden"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Decorators */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

            <div className="relative z-10 h-full flex flex-col items-center justify-between">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2 text-blue-600">
                  <Brain size={32} />
                  <span className="font-bold text-xl tracking-wider">NEURO/METRICS</span>
                </div>
                <div className="h-px w-12 bg-gray-200 mx-auto" />
              </div>

              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">
                  {texts.iqLabel[language]}
                </div>
                <div className="text-8xl font-black text-gray-900 tracking-tighter leading-none">
                  {scoreData.iq}
                </div>
                <div className="inline-block mt-4 px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                  Top {(100 - ((scoreData.iq - 85) / 60 * 100)).toFixed(1)}% Percentile
                </div>
              </div>

              <div className="w-full h-48">
                 {/* Radar Chart for Card */}
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Score"
                      dataKey="A"
                      stroke="#2563eb"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 text-center border-t border-gray-100 pt-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {scoreData.rawScore}/{scoreData.total}
                  </div>
                  <div className="text-xs text-gray-500 uppercase">{texts.correct[language]}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatTime(scoreData.timeElapsed)}
                  </div>
                  <div className="text-xs text-gray-500 uppercase">{texts.time[language]}</div>
                </div>
              </div>
              
              <div className="text-[10px] text-gray-400 mt-4 text-center">
                Certified by NeuroMetrics AI Platform • {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis for User (Not on card) */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border rounded-3xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              {texts.analysis[language]}
            </h3>
            
            <div className="space-y-6">
              {Object.entries(scoreData.typeScores).map(([type, data]: [string, any]) => (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{type} Reasoning</span>
                    <span className="text-sm text-muted-foreground">
                      {data.correct} / {data.total}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(data.correct / data.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded-xl text-sm leading-relaxed text-muted-foreground">
              <p className="mb-2 font-semibold text-foreground">Performance Insight:</p>
              <p>
                Your abstract reasoning scores indicate a strong ability to identify patterns in complex data. 
                {scoreData.iq > 115 
                  ? " You demonstrate exceptional cognitive processing speed and analytical capabilities." 
                  : " Consistent practice with spatial puzzles can further enhance your cognitive flexibility."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
