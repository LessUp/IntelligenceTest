'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, User, Loader2, ArrowLeft, Github, Chrome, QrCode, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';
import { useUserStore } from '@/store/useUserStore';
import { WeChatLogin } from '@/components/auth/WeChatLogin';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  
  const { language } = useTestStore();
  const { login, register, isLoading } = useUserStore();
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showWeChatQR, setShowWeChatQR] = useState(false);

  const texts = {
    login: { en: 'Sign In', zh: '登录' },
    register: { en: 'Create Account', zh: '创建账户' },
    email: { en: 'Email', zh: '邮箱' },
    password: { en: 'Password', zh: '密码' },
    name: { en: 'Full Name', zh: '姓名' },
    forgotPassword: { en: 'Forgot password?', zh: '忘记密码？' },
    noAccount: { en: "Don't have an account?", zh: '没有账户？' },
    hasAccount: { en: 'Already have an account?', zh: '已有账户？' },
    signUp: { en: 'Sign Up', zh: '注册' },
    signIn: { en: 'Sign In', zh: '登录' },
    orContinueWith: { en: 'Or continue with', zh: '或使用以下方式' },
    back: { en: 'Back', zh: '返回' },
    welcome: { en: 'Welcome to NeuroMetrics', zh: '欢迎来到 NeuroMetrics' },
    subtitle: { en: 'Unlock your cognitive potential', zh: '解锁您的认知潜能' },
    demoHint: { en: 'Demo: Use any email/password', zh: '演示：使用任意邮箱/密码' },
    wechat: { en: 'WeChat', zh: '微信' },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let success = false;
      if (mode === 'login') {
        success = await login(email, password);
      } else {
        success = await register(email, password, name);
      }

      if (success) {
        router.push(redirect);
      } else {
        setError(language === 'en' ? 'Authentication failed' : '认证失败');
      }
    } catch (err) {
      setError(language === 'en' ? 'An error occurred' : '发生错误');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <Brain size={40} />
            <span className="text-2xl font-bold tracking-tight">NEURO/METRICS</span>
          </div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white mb-6 leading-tight">
            {language === 'en' 
              ? 'Measure Your Mind.\nUnlock Your Potential.' 
              : '测量思维\n释放潜能'}
          </h1>
          <p className="text-blue-100 text-lg max-w-md">
            {language === 'en'
              ? 'Join thousands of users who have discovered their cognitive strengths with our scientifically validated assessments.'
              : '加入数千名用户，通过我们经过科学验证的评估发现认知优势。'}
          </p>
        </div>

        <div className="relative z-10 flex gap-8 text-blue-100">
          <div>
            <div className="text-4xl font-black text-white">50K+</div>
            <div className="text-sm">{language === 'en' ? 'Tests Completed' : '已完成测试'}</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white">10+</div>
            <div className="text-sm">{language === 'en' ? 'Assessment Types' : '评估类型'}</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white">98%</div>
            <div className="text-sm">{language === 'en' ? 'Satisfaction' : '满意度'}</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            {texts.back[language]}
          </button>

          <div className="lg:hidden flex items-center gap-2 text-blue-600 mb-8">
            <Brain size={32} />
            <span className="text-xl font-bold">NEURO/METRICS</span>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {mode === 'login' ? texts.login[language] : texts.register[language]}
          </h2>
          <p className="text-slate-500 mb-8">{texts.subtitle[language]}</p>

          {/* Demo Hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-blue-700 text-sm">{texts.demoHint[language]}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {texts.name[language]}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder={language === 'en' ? 'John Doe' : '张三'}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {texts.email[language]}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {texts.password[language]}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-sm text-blue-600 hover:underline">
                  {texts.forgotPassword[language]}
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                mode === 'login' ? texts.login[language] : texts.register[language]
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">{texts.orContinueWith[language]}</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => setShowWeChatQR(true)}
              className="flex items-center justify-center gap-2 py-3 border border-green-200 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .241-.11.241-.245 0-.06-.024-.119-.04-.178l-.325-1.233a.492.492 0 01.178-.554c1.521-1.125 2.51-2.78 2.51-4.617 0-3.39-3.407-6.126-7.07-6.126zm-2.164 3.684a.973.973 0 11.002 1.946.973.973 0 01-.002-1.946zm4.329 0a.973.973 0 11.002 1.946.973.973 0 01-.002-1.946z"/>
              </svg>
              <span className="font-medium text-green-700 text-sm">{texts.wechat[language]}</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Chrome size={18} />
              <span className="font-medium text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Github size={18} />
              <span className="font-medium text-sm">GitHub</span>
            </button>
          </div>

          {/* WeChat QR Modal */}
          {showWeChatQR && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl relative max-w-sm w-full mx-4"
              >
                <button
                  onClick={() => setShowWeChatQR(false)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
                <WeChatLogin 
                  onCancel={() => setShowWeChatQR(false)}
                  onSuccess={(userInfo) => {
                    setShowWeChatQR(false);
                    router.push(redirect);
                  }}
                />
              </motion.div>
            </div>
          )}

          {/* Toggle Mode */}
          <p className="mt-8 text-center text-slate-500">
            {mode === 'login' ? texts.noAccount[language] : texts.hasAccount[language]}{' '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-blue-600 font-medium hover:underline"
            >
              {mode === 'login' ? texts.signUp[language] : texts.signIn[language]}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" size={32} /></div>}>
      <AuthContent />
    </Suspense>
  );
}
