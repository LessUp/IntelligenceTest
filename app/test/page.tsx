'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { tests } from '@/data/tests';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Save, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TestPage() {
  const router = useRouter();
  const { 
    status, currentQuestionIndex, answers, timeElapsed, language, currentTestId,
    answerQuestion, nextQuestion, prevQuestion, finishTest, tickTimer
  } = useTestStore();
  
  const [mounted, setMounted] = useState(false);
  const currentTest = tests.find(t => t.id === currentTestId);
  const questions = currentTest?.questions || [];
  
  useEffect(() => {
    setMounted(true);
    if (status === 'idle' || !currentTest) {
      router.replace('/');
    }
  }, [status, router, currentTest]);

  useEffect(() => {
    if (status !== 'in_progress') return;
    const timer = setInterval(tickTimer, 1000);
    return () => clearInterval(timer);
  }, [status, tickTimer]);

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!mounted || status !== 'in_progress' || !currentQuestion) return null;

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
    hint: { en: 'Select the best answer.', zh: '请选择最恰当的答案。' }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={handleSaveAndQuit}
            className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <Save size={18} />
            <span className="hidden sm:inline">{texts.save[language]}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2 font-mono font-medium text-lg text-slate-700 bg-slate-100 px-3 py-1 rounded-md">
          <Clock size={18} className="text-blue-600" />
          {formatTime(timeElapsed)}
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-2">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Question</span>
          <div className="text-lg font-bold text-blue-600">
            {currentQuestionIndex + 1} <span className="text-slate-300 text-base font-normal">/ {totalQuestions}</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1.5 bg-slate-200 w-full">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 max-w-5xl mx-auto w-full gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Question Area */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10 mb-6">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
                  {currentQuestion.type} reasoning
                </span>
                <HelpCircle size={20} className="text-slate-300" />
              </div>
              
              <h2 className="text-xl md:text-2xl font-medium mb-8 leading-snug text-slate-800">
                {currentQuestion.text[language]}
              </h2>

              {/* SVG Content Render */}
              {currentQuestion.svgContent && (
                <div className="mb-10 bg-slate-50 rounded-xl border border-slate-100 p-6 flex justify-center overflow-hidden">
                  <div 
                    className="w-full max-w-2xl text-slate-800"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.svgContent }}
                  />
                </div>
              )}

              {/* Options Grid */}
              <div className={cn(
                "grid gap-4",
                currentQuestion.options.some(o => o.svgContent) ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"
              )}>
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={cn(
                        "relative p-4 rounded-xl border-2 text-left transition-all group",
                        isSelected 
                          ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-100 z-10" 
                          : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                      )}
                    >
                      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 justify-center h-full">
                         {/* Option Label (A, B, C, D) */}
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-colors shrink-0",
                          isSelected 
                            ? "border-blue-600 bg-blue-600 text-white" 
                            : "border-slate-200 text-slate-400 group-hover:border-blue-300 group-hover:text-blue-500"
                        )}>
                          {option.id}
                        </div>

                        {/* Option Content */}
                        {option.svgContent ? (
                           <div 
                             className="w-16 h-16 md:w-24 md:h-24 text-slate-700"
                             dangerouslySetInnerHTML={{ __html: option.svgContent }}
                           />
                        ) : (
                          <span className="text-lg font-medium text-slate-700">
                            {option.text?.[language]}
                          </span>
                        )}
                      </div>
                      
                      {isSelected && (
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-white rounded-full text-blue-600 shadow-sm"
                        >
                          <CheckCircle size={24} fill="currentColor" className="text-blue-600" />
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
      <footer className="bg-white border-t border-slate-200 p-4 md:p-6 sticky bottom-0 z-10">
        <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-xl font-medium text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">{texts.prev[language]}</span>
          </button>
          
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className={cn(
              "px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2",
              answers[currentQuestion.id] 
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            )}
          >
            {currentQuestionIndex === totalQuestions - 1 ? texts.finish[language] : texts.next[language]}
            {currentQuestionIndex !== totalQuestions - 1 && <ChevronRight size={20} />}
          </button>
        </div>
      </footer>
    </div>
  );
}
