'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Calendar, Clock, TrendingUp, Filter, Search, ChevronRight, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';
import { tests } from '@/data/tests';
import { MobileHeader } from '@/components/layout/MobileHeader';
import dynamic from 'next/dynamic';

const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });

export default function HistoryPage() {
  const router = useRouter();
  const { language, history } = useTestStore();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const texts = {
    title: { en: 'Test History', zh: '测试历史' },
    noHistory: { en: 'No test records', zh: '暂无测试记录' },
    startTest: { en: 'Start a test now', zh: '立即开始测试' },
    all: { en: 'All', zh: '全部' },
    week: { en: 'Week', zh: '本周' },
    month: { en: 'Month', zh: '本月' },
    search: { en: 'Search tests...', zh: '搜索测试...' },
    trend: { en: 'Score Trend', zh: '分数趋势' },
    questions: { en: 'questions', zh: '题' },
    correct: { en: 'correct', zh: '正确' },
    time: { en: 'Time', zh: '用时' },
    score: { en: 'Score', zh: '分数' },
    viewDetail: { en: 'View Details', zh: '查看详情' },
  };

  // 过滤历史记录
  const filteredHistory = history.filter(item => {
    const date = new Date(item.date);
    const now = new Date();
    
    if (filter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (date < weekAgo) return false;
    } else if (filter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      if (date < monthAgo) return false;
    }
    
    if (searchQuery) {
      const test = tests.find(t => t.id === item.testId);
      const testName = test?.name[language] || item.testId;
      return testName.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });

  const chartData = history.slice(-10).reverse().map((h, i) => ({
    name: `#${i + 1}`,
    score: h.score,
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 130) return 'text-purple-600 bg-purple-50';
    if (score >= 115) return 'text-blue-600 bg-blue-50';
    if (score >= 100) return 'text-green-600 bg-green-50';
    if (score >= 85) return 'text-yellow-600 bg-yellow-50';
    return 'text-slate-600 bg-slate-50';
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-8">
      <MobileHeader title={texts.title[language]} />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Trend Chart */}
        {history.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 mb-6 shadow-sm"
          >
            <h3 className="font-bold text-slate-900 mb-4">{texts.trend[language]}</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
            {(['all', 'week', 'month'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                  filter === f ? "bg-blue-600 text-white" : "text-slate-500"
                )}
              >
                {texts[f][language]}
              </button>
            ))}
          </div>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={texts.search[language]}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-3">
            {filteredHistory.map((item, i) => {
              const test = tests.find(t => t.id === item.testId);
              const totalQuestions = test?.questions.length || 0;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Brain size={24} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">
                        {test?.name[language] || item.testId}
                      </h4>
                      
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {formatTime(item.timeElapsed)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-slate-400">
                          {item.correctCount}/{totalQuestions} {texts.correct[language]}
                        </span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(item.correctCount / totalQuestions) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className={cn(
                        "px-3 py-1.5 rounded-xl font-bold text-lg",
                        getScoreColor(item.score)
                      )}>
                        {item.score}
                      </div>
                      <span className="text-[10px] text-slate-400">IQ</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Award className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 mb-4">{texts.noHistory[language]}</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium"
            >
              {texts.startTest[language]}
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
