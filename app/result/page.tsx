'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore, TestResult } from '@/store/useTestStore';
import { tests } from '@/data/tests';
import { motion } from 'framer-motion';
import { Share2, Download, Home, Brain, Loader2, BookOpen } from 'lucide-react';
import html2canvas from 'html2canvas';
import dynamic from 'next/dynamic';

// Dynamically import Recharts components to avoid SSR issues
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const RadarChart = dynamic(() => import('recharts').then(mod => mod.RadarChart), { ssr: false });
const PolarGrid = dynamic(() => import('recharts').then(mod => mod.PolarGrid), { ssr: false });
const PolarAngleAxis = dynamic(() => import('recharts').then(mod => mod.PolarAngleAxis), { ssr: false });
const PolarRadiusAxis = dynamic(() => import('recharts').then(mod => mod.PolarRadiusAxis), { ssr: false });
const Radar = dynamic(() => import('recharts').then(mod => mod.Radar), { ssr: false });

export default function ResultPage() {
  const router = useRouter();
  const { 
    status, answers, timeElapsed, language, saveResult, currentTestId
  } = useTestStore();
  const [scoreData, setScoreData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentTest = tests.find(t => t.id === currentTestId) || tests[0];
  const questions = currentTest.questions;

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if we have answers. If not, redirect to home.
    // We use a timeout to allow store hydration if needed, but usually persist works fast.
    // If status is idle and no answers, it's an invalid access.
    if (status === 'idle' && Object.keys(answers).length === 0) {
       router.replace('/');
       return;
    }

    if (Object.keys(answers).length > 0 && !scoreData) {
      calculateScore();
    }
  }, [status, answers, router, scoreData]);

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
    
    // Scientific Scoring Logic (Simulated)
    // Mean 100, SD 15. 
    // Assume our hard test has a mean raw score of 40% for average population (IQ 100).
    // This is just a simulation.
    const percentage = rawScore / total;
    // Standard Deviation 15, Mean 100
    const zScore = (percentage - 0.4) / 0.2; // Very rough approximation
    const iq = Math.round(100 + (zScore * 15));
    // Clamp for safety
    const clampedIq = Math.max(70, Math.min(160, iq));

    const result: TestResult = {
      date: new Date().toISOString(),
      testId: currentTestId || 'unknown',
      score: clampedIq,
      totalQuestions: total,
      correctCount: correct,
      timeElapsed,
      answers
    };

    saveResult(result);
    setScoreData({ iq: clampedIq, rawScore, total, typeScores });
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      // Wait a bit for fonts/charts to be fully ready
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // High res
        useCORS: true,
        logging: false
      });
      const image = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = image;
      link.download = `IQ-Test-Result-${new Date().getTime()}.png`;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!scoreData) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );

  const chartData = Object.entries(scoreData.typeScores).map(([type, data]: [string, any]) => ({
    subject: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize
    A: (data.correct / data.total) * 100,
    fullMark: 100,
  }));

  const texts = {
    title: { en: 'Test Results', zh: '测试结果' },
    iqLabel: { en: 'Estimated IQ Score', zh: '预估智商 (IQ)' },
    correct: { en: 'Correct Answers', zh: '答对题目' },
    time: { en: 'Time Used', zh: '用时' },
    share: { en: 'Download Card', zh: '下载卡片' },
    home: { en: 'Back to Home', zh: '返回首页' },
    analysis: { en: 'Performance Analysis', zh: '能力分析' },
    references: { en: 'Scientific References', zh: '科学参考文献' }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const shareText = `I just scored ${scoreData.iq} (Top ${(100 - ((scoreData.iq - 85) / 60 * 100)).toFixed(1)}%) on this Scientific IQ Test! Can you beat me? #IQTest #BrainTraining`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToWeibo = () => {
    window.open(`http://service.weibo.com/share/share.php?title=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-12 px-4 flex flex-col items-center font-sans text-foreground">
      <div className="max-w-5xl w-full flex justify-between items-center mb-12">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-muted-foreground hover:text-foreground"
        >
          <Home size={20} />
          {texts.home[language]}
        </button>
        <div className="flex gap-3">
          <button
            onClick={shareToTwitter}
            className="p-3 rounded-full bg-black text-white hover:scale-110 transition-transform shadow-sm"
            title="Share to X (Twitter)"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </button>
          <button
            onClick={shareToWeibo}
            className="p-3 rounded-full bg-[#df2029] text-white hover:scale-110 transition-transform shadow-sm"
            title="Share to Weibo"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={handleShare}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
            {texts.share[language]}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl items-start">
        {/* Shareable Card Area - Centered on mobile, left on desktop */}
        <div className="flex justify-center lg:justify-end">
          <div 
            ref={cardRef} 
            className="w-full max-w-[400px] bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl border border-slate-100 relative overflow-hidden"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Modern Scientific Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-50 rounded-full blur-3xl opacity-60" />

            <div className="relative z-10 h-full flex flex-col items-center justify-between">
              <div className="text-center w-full">
                <div className="flex items-center justify-center gap-2 mb-4 text-blue-600">
                  <Brain size={28} strokeWidth={2.5} />
                  <span className="font-extrabold text-lg tracking-widest">NEURO/METRICS</span>
                </div>
                <div className="h-px w-full bg-slate-100" />
              </div>

              <div className="text-center flex-1 flex flex-col justify-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                  {texts.iqLabel[language]}
                </div>
                <div className="text-8xl font-black text-slate-900 tracking-tighter leading-none mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  {scoreData.iq}
                </div>
                <div className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
                   Top {(100 - ((scoreData.iq - 85) / 60 * 100)).toFixed(1)}%
                </div>
              </div>

              <div className="w-full h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Score"
                      dataKey="A"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 text-center border-t border-slate-100 pt-6">
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {scoreData.rawScore}<span className="text-base text-slate-400 font-medium">/{scoreData.total}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{texts.correct[language]}</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {formatTime(scoreData.timeElapsed)}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{texts.time[language]}</div>
                </div>
              </div>
              
              <div className="text-[10px] text-slate-300 mt-6 text-center font-medium">
                Certified by NeuroMetrics • {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-6 pt-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/50"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                 <Brain size={20} />
              </div>
              {texts.analysis[language]}
            </h3>
            
            <div className="space-y-8">
              {Object.entries(scoreData.typeScores).map(([type, data]: [string, any]) => (
                <div key={type} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-slate-700 capitalize text-lg">{type}</span>
                    <span className="text-sm font-medium text-slate-500">
                      {data.correct} / {data.total}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.correct / data.total) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-slate-50 rounded-2xl text-slate-600 leading-relaxed border border-slate-100">
              <p className="mb-3 font-bold text-slate-900 flex items-center gap-2">
                <Loader2 className="animate-pulse text-blue-500" size={16} />
                AI Analysis
              </p>
              <p className="text-sm">
                Your abstract reasoning scores indicate a strong ability to identify patterns in complex data. 
                {scoreData.iq > 115 
                  ? " You demonstrate exceptional cognitive processing speed and analytical capabilities, placing you in the upper echelons of logical reasoning." 
                  : " Consistent practice with spatial puzzles can further enhance your cognitive flexibility and pattern recognition speed."}
              </p>
            </div>

             {/* References Section */}
             <div className="mt-6 border-t border-slate-100 pt-6">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen size={14} />
                  {texts.references[language]}
                </h4>
                <ul className="space-y-2">
                  {currentTest.references.map((ref, idx) => (
                    <li key={idx} className="text-xs text-slate-500 leading-relaxed">
                      <span className="font-medium text-slate-700">{ref.author}</span> ({ref.year}). 
                      <span className="italic"> {ref.title}</span>. 
                      {ref.journal && <span> {ref.journal}.</span>}
                    </li>
                  ))}
                </ul>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
