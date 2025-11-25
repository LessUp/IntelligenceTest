'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Brain, TrendingUp, Clock, Target, Crown, History, 
  ChevronRight, Star, Zap, BookOpen, Settings, LogOut,
  BarChart3, Calendar, Award, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';
import { useUserStore, pricingPlans } from '@/store/useUserStore';
import { tests } from '@/data/tests';
import dynamic from 'next/dynamic';

const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });

export default function DashboardPage() {
  const router = useRouter();
  const { language, history } = useTestStore();
  const { user, isAuthenticated, logout, testHistory, canAccessTest } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/auth?redirect=/dashboard');
    }
  }, [isAuthenticated, router]);

  if (!mounted || !user) return null;

  const currentPlan = pricingPlans.find(p => p.id === user.tier);
  const stats = {
    totalTests: history.length,
    averageScore: history.length > 0 
      ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length)
      : 0,
    bestScore: history.length > 0 ? Math.max(...history.map(h => h.score)) : 0,
    totalTime: history.reduce((a, b) => a + b.timeElapsed, 0),
  };

  const texts = {
    dashboard: { en: 'Dashboard', zh: '仪表板' },
    welcome: { en: `Welcome back, ${user.name}!`, zh: `欢迎回来，${user.name}！` },
    yourPlan: { en: 'Your Plan', zh: '您的计划' },
    upgrade: { en: 'Upgrade', zh: '升级' },
    totalTests: { en: 'Total Tests', zh: '总测试数' },
    avgScore: { en: 'Average Score', zh: '平均分数' },
    bestScore: { en: 'Best Score', zh: '最高分数' },
    timeSpent: { en: 'Time Spent', zh: '用时' },
    recentActivity: { en: 'Recent Activity', zh: '最近活动' },
    availableTests: { en: 'Available Tests', zh: '可用测试' },
    premiumTests: { en: 'Premium Tests', zh: '高级测试' },
    startTest: { en: 'Start', zh: '开始' },
    locked: { en: 'Locked', zh: '锁定' },
    performanceTrend: { en: 'Performance Trend', zh: '表现趋势' },
    aiInsights: { en: 'AI Insights', zh: 'AI洞察' },
    logout: { en: 'Logout', zh: '退出' },
    noTests: { en: 'No tests completed yet', zh: '还没有完成任何测试' },
    settings: { en: 'Settings', zh: '设置' },
    papers: { en: 'Research Papers', zh: '研究论文' },
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const chartData = history.slice(-10).map((h, i) => ({
    name: `Test ${i + 1}`,
    score: h.score,
    date: new Date(h.date).toLocaleDateString(),
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-2 text-blue-600 mb-8">
          <Brain size={28} />
          <span className="font-bold text-lg">NEURO/METRICS</span>
        </div>

        <nav className="space-y-1 flex-1">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium">
            <BarChart3 size={20} />
            {texts.dashboard[language]}
          </a>
          <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Brain size={20} />
            {texts.availableTests[language]}
          </a>
          <a href="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <History size={20} />
            {texts.recentActivity[language]}
          </a>
          <a href="/papers" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <BookOpen size={20} />
            {texts.papers[language]}
          </a>
          <a href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Settings size={20} />
            {texts.settings[language]}
          </a>
        </nav>

        {/* User Card */}
        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-2 text-slate-500 hover:text-red-500 text-sm transition-colors w-full"
          >
            <LogOut size={16} />
            {texts.logout[language]}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{texts.welcome[language]}</h1>
            <p className="text-slate-500">
              {language === 'en' ? 'Track your cognitive progress' : '追踪您的认知进步'}
            </p>
          </div>
          
          {/* Plan Badge */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full border",
              user.tier === 'free' && "bg-slate-50 border-slate-200",
              user.tier === 'basic' && "bg-blue-50 border-blue-200",
              user.tier === 'premium' && "bg-purple-50 border-purple-200",
              user.tier === 'professional' && "bg-amber-50 border-amber-200"
            )}>
              <Crown size={16} className={cn(
                user.tier === 'free' && "text-slate-400",
                user.tier === 'basic' && "text-blue-500",
                user.tier === 'premium' && "text-purple-500",
                user.tier === 'professional' && "text-amber-500"
              )} />
              <span className="font-medium text-sm">{currentPlan?.name[language]}</span>
            </div>
            {user.tier === 'free' && (
              <button
                onClick={() => router.push('/pricing')}
                className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {texts.upgrade[language]}
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: texts.totalTests, value: stats.totalTests, icon: Target, color: 'blue' },
            { label: texts.avgScore, value: stats.averageScore, icon: TrendingUp, color: 'green' },
            { label: texts.bestScore, value: stats.bestScore, icon: Star, color: 'yellow' },
            { label: texts.timeSpent, value: formatTime(stats.totalTime), icon: Clock, color: 'purple' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-5"
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                stat.color === 'blue' && "bg-blue-100 text-blue-600",
                stat.color === 'green' && "bg-green-100 text-green-600",
                stat.color === 'yellow' && "bg-yellow-100 text-yellow-600",
                stat.color === 'purple' && "bg-purple-100 text-purple-600"
              )}>
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label[language]}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{texts.performanceTrend[language]}</h2>
            {chartData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-slate-400">
                {texts.noTests[language]}
              </div>
            )}
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} />
              <h2 className="font-bold">{texts.aiInsights[language]}</h2>
            </div>
            {currentPlan?.aiAnalysis ? (
              <div className="space-y-3">
                <p className="text-sm text-white/90">
                  {language === 'en'
                    ? 'Based on your test results, your strongest cognitive domain is pattern recognition.'
                    : '根据您的测试结果，您最强的认知领域是模式识别。'}
                </p>
                <p className="text-sm text-white/90">
                  {language === 'en'
                    ? 'Consider practicing working memory exercises to improve your overall cognitive flexibility.'
                    : '建议练习工作记忆训练以提高整体认知灵活性。'}
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-white/80 mb-4">
                  {language === 'en'
                    ? 'Upgrade to Premium for AI-powered insights'
                    : '升级到高级版获取AI驱动的洞察'}
                </p>
                <button
                  onClick={() => router.push('/pricing')}
                  className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  {texts.upgrade[language]}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Available Tests */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">{texts.availableTests[language]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.slice(0, 6).map((test) => {
              const canAccess = canAccessTest(test.id, test.isPremium);
              return (
                <motion.div
                  key={test.id}
                  whileHover={{ scale: canAccess ? 1.02 : 1 }}
                  className={cn(
                    "bg-white rounded-xl border p-5 relative overflow-hidden",
                    canAccess ? "border-slate-200 cursor-pointer" : "border-slate-100 opacity-60"
                  )}
                  onClick={() => canAccess && router.push(`/?test=${test.id}`)}
                >
                  {test.isPremium && (
                    <div className="absolute top-3 right-3">
                      <Crown size={16} className="text-amber-500" />
                    </div>
                  )}
                  <h3 className="font-bold text-slate-900 mb-1 pr-6">{test.name[language]}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">{test.description[language]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {test.questions.length} {language === 'en' ? 'questions' : '题'}
                    </span>
                    {canAccess ? (
                      <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                        {texts.startTest[language]} <ChevronRight size={16} />
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">{texts.locked[language]}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
