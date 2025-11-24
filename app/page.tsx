'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { questions } from '@/data/questions';
import { motion } from 'framer-motion';
import { Brain, Play, RotateCw, History, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamic import for charts
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

export default function Home() {
  const router = useRouter();
  const { 
    language, setLanguage, status, startTest, resumeTest, history, resetTest
  } = useTestStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const texts = {
    title: { en: 'Scientific IQ Test', zh: '科学智力测试' },
    subtitle: { 
      en: 'Evaluate your cognitive abilities with our advanced psychometric assessment. Covers abstract, verbal, spatial, and numerical reasoning.', 
      zh: '通过我们先进的心理测量评估来测试您的认知能力。涵盖抽象、语言、空间和数值推理。' 
    },
    start: { en: 'Start New Assessment', zh: '开始新测试' },
    resume: { en: 'Resume Session', zh: '继续测试' },
    history: { en: 'Performance History', zh: '历史成绩趋势' },
    questions: { en: 'Questions', zh: '道题目' },
    features: {
        science: { en: 'Scientific Method', zh: '科学方法' },
        adaptive: { en: 'Multi-Dimensional', zh: '多维度分析' },
        secure: { en: 'Private & Secure', zh: '隐私安全' }
    }
  };

  const handleStart = () => {
    resetTest();
    startTest();
    router.push('/test');
  };

  const handleResume = () => {
    resumeTest();
    router.push('/test');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-xl tracking-tight">
          <Brain className="w-8 h-8" />
          <span>NEURO/METRICS</span>
        </div>
        <div className="flex gap-1 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
              language === 'en' ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
            )}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('zh')}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
              language === 'zh' ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
            )}
          >
            中文
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 text-center max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 border border-blue-100">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             v2.0 Updated Question Bank
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
            {texts.title[language]}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            {texts.subtitle[language]}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            {status === 'in_progress' && (
              <button
                onClick={handleResume}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-blue-200 transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                <RotateCw size={20} className="text-blue-500 group-hover:rotate-180 transition-transform duration-500" />
                {texts.resume[language]}
              </button>
            )}
            <button
              onClick={handleStart}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 w-full sm:w-auto"
            >
              <Play size={20} fill="currentColor" />
              {texts.start[language]}
              <ArrowRight size={20} className="opacity-50 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-12 flex justify-center gap-8 md:gap-16 text-sm font-medium text-slate-400">
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                {texts.features.science[language]}
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                {texts.features.adaptive[language]}
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                {texts.features.secure[language]}
             </div>
          </div>
        </motion.div>
      </section>

      {/* History Section */}
      {history.length > 0 && (
        <section className="w-full bg-white border-t border-slate-100 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="md:w-1/3">
                 <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-slate-900">
                    <History className="text-blue-600" />
                    {texts.history[language]}
                 </h2>
                 <p className="text-slate-500 mb-6">
                   {language === 'en' ? 'Track your cognitive development over time.' : '追踪您随时间变化的认知发展情况。'}
                 </p>
                 <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">Best Score</div>
                    <div className="text-4xl font-black text-blue-700">
                        {Math.max(...history.map(h => h.score))}
                    </div>
                 </div>
              </div>
              
              <div className="md:w-2/3 h-[300px] bg-white rounded-3xl border border-slate-100 shadow-sm p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})} 
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                    />
                    <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        axisLine={false}
                        tickLine={false}
                        dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', padding: '12px' }}
                      cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#2563eb" 
                      strokeWidth={4} 
                      dot={{ fill: '#ffffff', stroke: '#2563eb', strokeWidth: 3, r: 6 }}
                      activeDot={{ r: 8, fill: '#2563eb' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      
      <footer className="py-8 text-center text-sm text-slate-400 bg-slate-50">
        <p>© 2024 NeuroMetrics Inc. • {questions.length} {texts.questions[language]}</p>
      </footer>
    </main>
  );
}
