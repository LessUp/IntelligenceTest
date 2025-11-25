'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  User, Crown, History, Settings, LogOut, ChevronRight,
  Brain, Award, Clock, TrendingUp, Share2, QrCode,
  Smartphone, Globe, Shield, Bell, HelpCircle, FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';
import { useUserStore, pricingPlans } from '@/store/useUserStore';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { tests } from '@/data/tests';

export default function ProfilePage() {
  const router = useRouter();
  const { language, history } = useTestStore();
  const { user, isAuthenticated, logout } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const texts = {
    title: { en: 'Profile', zh: '个人中心' },
    login: { en: 'Sign In / Register', zh: '登录/注册' },
    loginDesc: { en: 'Sync your data across devices', zh: '跨设备同步您的数据' },
    wechatLogin: { en: 'WeChat Login', zh: '微信登录' },
    testHistory: { en: 'Test History', zh: '测试历史' },
    viewAll: { en: 'View All', zh: '查看全部' },
    noHistory: { en: 'No test records yet', zh: '暂无测试记录' },
    stats: { en: 'Statistics', zh: '统计数据' },
    totalTests: { en: 'Total Tests', zh: '总测试数' },
    avgScore: { en: 'Avg Score', zh: '平均分' },
    bestScore: { en: 'Best Score', zh: '最高分' },
    totalTime: { en: 'Total Time', zh: '总用时' },
    settings: { en: 'Settings', zh: '设置' },
    language: { en: 'Language', zh: '语言' },
    notifications: { en: 'Notifications', zh: '通知' },
    privacy: { en: 'Privacy', zh: '隐私' },
    help: { en: 'Help & Feedback', zh: '帮助与反馈' },
    about: { en: 'About', zh: '关于' },
    logout: { en: 'Sign Out', zh: '退出登录' },
    membership: { en: 'Membership', zh: '会员' },
    upgrade: { en: 'Upgrade', zh: '升级' },
    syncData: { en: 'Sync Data', zh: '同步数据' },
    scanToLogin: { en: 'Scan to login on other devices', zh: '扫码在其他设备登录' },
  };

  const currentPlan = pricingPlans.find(p => p.id === user?.tier);

  const stats = {
    totalTests: history.length,
    avgScore: history.length > 0 
      ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length)
      : 0,
    bestScore: history.length > 0 ? Math.max(...history.map(h => h.score)) : 0,
    totalTime: history.reduce((a, b) => a + b.timeElapsed, 0),
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const menuItems = [
    { icon: Globe, label: texts.language, value: language === 'en' ? 'English' : '中文', onClick: () => {} },
    { icon: Bell, label: texts.notifications, onClick: () => {} },
    { icon: Shield, label: texts.privacy, onClick: () => {} },
    { icon: HelpCircle, label: texts.help, onClick: () => {} },
    { icon: FileText, label: texts.about, onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <MobileHeader title={texts.title[language]} showBack={false} />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 mb-6 shadow-sm"
        >
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
                <p className="text-sm text-slate-500">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-bold",
                    user.tier === 'free' && "bg-slate-100 text-slate-600",
                    user.tier === 'basic' && "bg-blue-100 text-blue-600",
                    user.tier === 'premium' && "bg-purple-100 text-purple-600",
                    user.tier === 'professional' && "bg-amber-100 text-amber-600"
                  )}>
                    <Crown size={10} className="inline mr-1" />
                    {currentPlan?.name[language]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => router.push('/pricing')}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-lg"
              >
                {texts.upgrade[language]}
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="w-full flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User size={28} />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-lg font-bold text-slate-900">{texts.login[language]}</h2>
                <p className="text-sm text-slate-500">{texts.loginDesc[language]}</p>
              </div>
              <ChevronRight className="text-slate-400" />
            </button>
          )}
        </motion.div>

        {/* WeChat Login / QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 mb-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Smartphone size={20} />
                <span className="font-bold">{texts.wechatLogin[language]}</span>
              </div>
              <p className="text-sm text-green-100">{texts.scanToLogin[language]}</p>
            </div>
            <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
              <QrCode size={24} />
            </button>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 mb-6 shadow-sm"
        >
          <h3 className="font-bold text-slate-900 mb-4">{texts.stats[language]}</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: texts.totalTests, value: stats.totalTests, icon: Brain },
              { label: texts.avgScore, value: stats.avgScore, icon: TrendingUp },
              { label: texts.bestScore, value: stats.bestScore, icon: Award },
              { label: texts.totalTime, value: formatTime(stats.totalTime), icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="mx-auto text-blue-500 mb-1" size={20} />
                <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                <div className="text-[10px] text-slate-500">{stat.label[language]}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Test History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 mb-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">{texts.testHistory[language]}</h3>
            {history.length > 0 && (
              <button 
                onClick={() => router.push('/history')}
                className="text-sm text-blue-600 font-medium"
              >
                {texts.viewAll[language]}
              </button>
            )}
          </div>
          
          {history.length > 0 ? (
            <div className="space-y-3">
              {history.slice(0, 3).map((item, i) => {
                const test = tests.find(t => t.id === item.testId);
                return (
                  <div 
                    key={i}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <Brain size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate text-sm">
                        {test?.name[language] || item.testId}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{item.score}</p>
                      <p className="text-xs text-slate-400">IQ</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <History className="mx-auto mb-2" size={32} />
              <p className="text-sm">{texts.noHistory[language]}</p>
            </div>
          )}
        </motion.div>

        {/* Settings Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6"
        >
          <h3 className="font-bold text-slate-900 px-5 pt-5 pb-3">{texts.settings[language]}</h3>
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors border-t border-slate-100"
            >
              <item.icon size={20} className="text-slate-400" />
              <span className="flex-1 text-left text-slate-700">{item.label[language]}</span>
              {item.value && <span className="text-sm text-slate-400">{item.value}</span>}
              <ChevronRight size={18} className="text-slate-300" />
            </button>
          ))}
        </motion.div>

        {/* Logout */}
        {isAuthenticated && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => { logout(); router.push('/'); }}
            className="w-full py-3.5 text-red-500 font-medium bg-white rounded-2xl shadow-sm"
          >
            <LogOut size={18} className="inline mr-2" />
            {texts.logout[language]}
          </motion.button>
        )}
      </main>
    </div>
  );
}
