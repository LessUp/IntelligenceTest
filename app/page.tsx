'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { tests } from '@/data/tests';
import { motion } from 'framer-motion';
import { Brain, Play, RotateCw, History, ArrowRight, CheckCircle2, FileText, Clock, Crown, User, LogIn, BookOpen, Sparkles, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useUserStore, pricingPlans } from '@/store/useUserStore';

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
  const { user, isAuthenticated, canAccessTest } = useUserStore();
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
    mins: { en: 'mins', zh: '分钟' },
    login: { en: 'Sign In', zh: '登录' },
    dashboard: { en: 'Dashboard', zh: '仪表板' },
    pricing: { en: 'Pricing', zh: '价格' },
    papers: { en: 'Papers', zh: '论文' },
    premium: { en: 'Premium', zh: '高级' },
    locked: { en: 'Premium Only', zh: '仅限会员' },
    freeTests: { en: 'Free Tests', zh: '免费测试' },
    premiumTests: { en: 'Premium Tests', zh: '高级测试' },
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
        
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => router.push('/papers')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <BookOpen size={16} />
              {texts.papers[language]}
            </button>
            <button
              onClick={() => router.push('/pricing')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Sparkles size={16} />
              {texts.pricing[language]}
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex gap-1 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium transition-all",
                language === 'en' ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium transition-all",
                language === 'zh' ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
              )}
            >
              中文
            </button>
          </div>

          {/* Auth Button */}
          {isAuthenticated ? (
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              {texts.dashboard[language]}
            </button>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <LogIn size={16} />
              {texts.login[language]}
            </button>
          )}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-12 text-left">
            {tests.map((test) => {
              const canAccess = canAccessTest(test.id, test.isPremium);
              const isLocked = test.isPremium && !canAccess;
              
              return (
                <button
                  key={test.id}
                  onClick={() => !isLocked && setSelectedTestId(test.id)}
                  className={cn(
                    "relative p-6 rounded-2xl border-2 transition-all group",
                    isLocked 
                      ? "border-slate-100 bg-slate-50/50 cursor-not-allowed"
                      : selectedTestId === test.id
                        ? "border-blue-600 bg-blue-50/30 ring-4 ring-blue-100/50"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg"
                  )}
                >
                  {/* Premium Badge */}
                  {test.isPremium && (
                    <div className="absolute top-4 right-4">
                      <span className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold",
                        canAccess 
                          ? "bg-amber-100 text-amber-700" 
                          : "bg-slate-100 text-slate-500"
                      )}>
                        {canAccess ? <Crown size={12} /> : <Lock size={12} />}
                        {canAccess ? texts.premium[language] : texts.locked[language]}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "p-3 rounded-xl shadow-sm border transition-transform",
                      isLocked 
                        ? "bg-slate-100 border-slate-200 text-slate-400"
                        : "bg-white border-slate-100 text-blue-600 group-hover:scale-110"
                    )}>
                      <Brain size={24} />
                    </div>
                    {selectedTestId === test.id && !isLocked && (
                      <CheckCircle2 className="text-blue-600" size={24} />
                    )}
                  </div>
                  
                  <h3 className={cn(
                    "text-lg font-bold mb-2 pr-16",
                    isLocked ? "text-slate-400" : "text-slate-900"
                  )}>
                    {test.name[language]}
                  </h3>
                  
                  <p className={cn(
                    "text-sm mb-4 line-clamp-2",
                    isLocked ? "text-slate-400" : "text-slate-500"
                  )}>
                    {test.description[language]}
                  </p>

                  <div className={cn(
                    "flex items-center gap-4 text-xs font-medium uppercase tracking-wider",
                    isLocked ? "text-slate-300" : "text-slate-400"
                  )}>
                    <div className="flex items-center gap-1.5">
                      <FileText size={14} />
                      {test.questions.length} {texts.questions[language]}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {test.timeLimit ? Math.round(test.timeLimit / 60) : '∞'} {texts.mins[language]}
                    </div>
                  </div>
                  
                  {/* Unlock Button for locked tests */}
                  {isLocked && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => { e.stopPropagation(); router.push('/pricing'); }}
                    >
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg">
                        {language === 'en' ? 'Unlock Now' : '立即解锁'}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
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
