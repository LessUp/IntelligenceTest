'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { questions } from '@/data/questions';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Save, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TestPage() {
  const router = useRouter();
  const { 
    status, currentQuestionIndex, answers, timeElapsed, language,
    answerQuestion, nextQuestion, prevQuestion, finishTest, tickTimer,
    saveResult // Oops, actually we just finishTest here, calculation is in result usually or here.
  } = useTestStore();
  
  // Hydration check
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (status === 'idle') {
      router.replace('/');
    }
  }, [status, router]);

  // Timer
  useEffect(() => {
    if (status !== 'in_progress') return;
    const timer = setInterval(tickTimer, 1000);
    return () => clearInterval(timer);
  }, [status, tickTimer]);

  if (!mounted || status !== 'in_progress') return null;

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleOptionSelect = (optionId: string) => {
    answerQuestion(currentQuestion.id, optionId);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      nextQuestion();
    } else {
      finishTest(totalQuestions);
      router.push('/result');
    }
  };

  const handlePrev = () => {
    prevQuestion();
  };

  const handleSaveAndQuit = () => {
    router.push('/');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const texts = {
    save: { en: 'Save & Quit', zh: '保存并退出' },
    prev: { en: 'Previous', zh: '上一题' },
    next: { en: 'Next', zh: '下一题' },
    finish: { en: 'Finish', zh: '提交试卷' },
    question: { en: 'Question', zh: '问题' },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b bg-card/50 backdrop-blur sticky top-0 z-10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={handleSaveAndQuit}
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <Save size={18} />
            <span className="hidden sm:inline">{texts.save[language]}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2 font-mono font-medium text-lg tabular-nums">
          <Clock size={20} className="text-primary" />
          {formatTime(timeElapsed)}
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="text-sm font-medium text-muted-foreground">
            {currentQuestionIndex + 1} / {totalQuestions}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-secondary w-full">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Question Card */}
            <div className="bg-card border rounded-3xl shadow-sm p-6 md:p-10">
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {currentQuestion.type}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">
                {currentQuestion.text[language]}
              </h2>

              {currentQuestion.imageUrl && (
                <div className="mb-8 bg-muted/50 rounded-xl p-4 flex justify-center">
                  {/* In a real app, use next/image. Here using a placeholder div or simple text */}
                  <div className="h-48 w-full md:w-2/3 bg-accent rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                    <span className="text-muted-foreground">Visual Pattern Placeholder</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={cn(
                        "relative p-4 md:p-6 rounded-xl border-2 text-left transition-all hover:border-primary/50 active:scale-[0.99]",
                        isSelected 
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                          : "border-muted bg-background hover:bg-accent/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-colors",
                          isSelected 
                            ? "border-primary bg-primary text-primary-foreground" 
                            : "border-muted-foreground text-muted-foreground"
                        )}>
                          {option.id}
                        </div>
                        <span className="text-lg font-medium">
                          {option.text?.[language] || `Option ${option.id}`}
                        </span>
                      </div>
                      {isSelected && (
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 text-primary"
                        >
                          <CheckCircle size={20} />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer className="p-4 md:p-8 flex justify-center gap-4 max-w-4xl mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 rounded-xl font-medium text-muted-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          {texts.prev[language]}
        </button>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          className={cn(
            "px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-sm flex items-center gap-2",
            answers[currentQuestion.id] 
              ? "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-md" 
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {currentQuestionIndex === totalQuestions - 1 ? texts.finish[language] : texts.next[language]}
          {currentQuestionIndex !== totalQuestions - 1 && <ChevronRight size={20} />}
        </button>
      </footer>
    </div>
  );
}
