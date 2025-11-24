'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { tests } from '@/data/tests';
import { motion } from 'framer-motion';
import { Brain, Play, RotateCw, History, ArrowRight, CheckCircle2, FileText, Clock } from 'lucide-react';
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
    language, setLanguage, status, startTest, resumeTest, history, resetTest, currentTestId
  } = useTestStore();
  const [mounted, setMounted] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<string>(tests[0].id);

  useEffect(() => {
    setMounted(true);
    if (currentTestId) {
      setSelectedTestId(currentTestId);
    }
  }, [currentTestId]);

  if (!mounted) return null;

  const texts = {
    title: { en: 'Scientific IQ Assessment', zh: '科学智力评估' },
    subtitle: { 
      en: 'Choose a specialized cognitive battery validated by latest research.', 
      zh: '选择经最新研究验证的专业认知评估组。' 
    },
    start: { en: 'Start Assessment', zh: '开始评估' },
    resume: { en: 'Resume Session', zh: '继续测试' },
    history: { en: 'Performance History', zh: '历史成绩趋势' },
    selectTest: { en: 'Select Assessment Battery', zh: '选择评估组' },
    questions: { en: 'Questions', zh: '题' },
    mins: { en: 'mins', zh: '分钟' }
  };

  const handleStart = () => {
    resetTest();
    startTest(selectedTestId);
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
      <section className="flex-1 flex flex-col items-center px-4 py-12 md:py-20 text-center max-w-6xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 border border-blue-100">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             v2.0 Updated Question Bank
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
            {texts.title[language]}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto">
            {texts.subtitle[language]}
          </p>

          {/* Test Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-12 text-left">
            {tests.map((test) => (
              <button
                key={test.id}
                onClick={() => setSelectedTestId(test.id)}
                className={cn(
                  "relative p-6 rounded-2xl border-2 transition-all group hover:shadow-lg",
                  selectedTestId === test.id
                    ? "border-blue-600 bg-blue-50/30 ring-4 ring-blue-100/50"
                    : "border-slate-200 bg-white hover:border-blue-300"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-white shadow-sm border border-slate-100 text-blue-600 group-hover:scale-110 transition-transform">
                    <Brain size={24} />
                  </div>
                  {selectedTestId === test.id && (
                    <CheckCircle2 className="text-blue-600" size={24} />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {test.name[language]}
                </h3>
                
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                  {test.description[language]}
                </p>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <FileText size={14} />
                    {test.questions.length} {texts.questions[language]}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {test.timeLimit ? Math.round(test.timeLimit / 60) : '∞'} {texts.mins[language]}
                  </div>
                </div>
                
                {/* Methodology Badge */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                   <span className="px-2 py-1 rounded text-[10px] bg-slate-100 text-slate-500 font-bold uppercase">
                     {test.methodology.id}
                   </span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            {status === 'in_progress' && currentTestId === selectedTestId && (
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
        <p>© 2024 NeuroMetrics Inc.</p>
      </footer>
    </main>
  );
}
