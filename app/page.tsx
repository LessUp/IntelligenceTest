'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { questions } from '@/data/questions';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Brain, Play, RotateCw, History } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      en: 'Based on advanced psychometric models. Test your abstract, verbal, and spatial reasoning.', 
      zh: '基于先进的心理测量模型。测试您的抽象、语言和空间推理能力。' 
    },
    start: { en: 'Start New Test', zh: '开始新测试' },
    resume: { en: 'Resume Test', zh: '继续测试' },
    history: { en: 'Score History', zh: '历史成绩' },
    questions: { en: 'Questions', zh: '题目' },
    minutes: { en: 'Minutes', zh: '分钟' },
    accuracy: { en: 'Accuracy', zh: '准确率' }
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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col items-center p-4 md:p-8">
      {/* Header / Language Switch */}
      <div className="w-full max-w-4xl flex justify-end mb-8">
        <div className="flex gap-2 bg-card p-1 rounded-full border shadow-sm">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              "px-4 py-1 rounded-full text-sm font-medium transition-colors",
              language === 'en' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('zh')}
            className={cn(
              "px-4 py-1 rounded-full text-sm font-medium transition-colors",
              language === 'zh' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            中文
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-12"
      >
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
          <Brain size={48} />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-foreground">
          {texts.title[language]}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          {texts.subtitle[language]}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {status === 'in_progress' && (
            <button
              onClick={handleResume}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-bold text-lg hover:bg-secondary/80 transition-all shadow-sm"
            >
              <RotateCw size={20} />
              {texts.resume[language]}
            </button>
          )}
          <button
            onClick={handleStart}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            <Play size={20} />
            {texts.start[language]}
          </button>
        </div>
      </motion.div>

      {/* History Section */}
      {history.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-4xl bg-card border rounded-3xl p-6 md:p-8 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6 text-xl font-semibold">
            <History size={24} className="text-primary" />
            {texts.history[language]}
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <XAxis dataKey="date" stroke="currentColor" fontSize={12} tickFormatter={(val) => new Date(val).toLocaleDateString()} className="text-muted-foreground" />
                <YAxis stroke="currentColor" fontSize={12} className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{ fill: 'hsl(var(--background))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
      
      <div className="mt-12 text-sm text-muted-foreground">
        IQ-Test Platform v1.0 • {questions.length} {texts.questions[language]}
      </div>
    </main>
  );
}
