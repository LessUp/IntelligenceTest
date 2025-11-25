'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Sparkles, Brain, Crown, Building2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';
import { useUserStore, pricingPlans } from '@/store/useUserStore';

export default function PricingPage() {
  const router = useRouter();
  const { language } = useTestStore();
  const { user, isAuthenticated, upgradeTier } = useUserStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const texts = {
    title: { en: 'Choose Your Plan', zh: '选择您的计划' },
    subtitle: { en: 'Unlock your cognitive potential with premium assessments', zh: '使用高级评估解锁您的认知潜能' },
    monthly: { en: 'Monthly', zh: '月付' },
    yearly: { en: 'Yearly', zh: '年付' },
    savePercent: { en: 'Save 17%', zh: '省17%' },
    currentPlan: { en: 'Current Plan', zh: '当前计划' },
    upgrade: { en: 'Upgrade', zh: '升级' },
    getStarted: { en: 'Get Started', zh: '开始使用' },
    mostPopular: { en: 'Most Popular', zh: '最受欢迎' },
    perMonth: { en: '/month', zh: '/月' },
    perYear: { en: '/year', zh: '/年' },
    back: { en: 'Back', zh: '返回' },
  };

  const planIcons = {
    free: Brain,
    basic: Sparkles,
    premium: Crown,
    professional: Building2,
  };

  const handleUpgrade = (planId: string) => {
    if (!isAuthenticated) {
      router.push('/auth?redirect=/pricing');
      return;
    }
    // 在实际应用中，这里应该跳转到支付页面
    upgradeTier(planId as any);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={20} />
          {texts.back[language]}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {texts.title[language]}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            {texts.subtitle[language]}
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 p-1 rounded-full flex gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                billingCycle === 'monthly'
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {texts.monthly[language]}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                billingCycle === 'yearly'
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {texts.yearly[language]}
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {texts.savePercent[language]}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => {
            const Icon = planIcons[plan.id];
            const isCurrentPlan = user?.tier === plan.id;
            const isPopular = plan.id === 'premium';
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly / 12;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative bg-white rounded-3xl border-2 p-6 flex flex-col",
                  isPopular ? "border-blue-500 shadow-xl shadow-blue-500/10" : "border-slate-200",
                  isCurrentPlan && "ring-2 ring-green-500"
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      {texts.mostPopular[language]}
                    </span>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {texts.currentPlan[language]}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    plan.id === 'free' && "bg-slate-100 text-slate-600",
                    plan.id === 'basic' && "bg-blue-100 text-blue-600",
                    plan.id === 'premium' && "bg-purple-100 text-purple-600",
                    plan.id === 'professional' && "bg-amber-100 text-amber-600"
                  )}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name[language]}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">
                      ${price.toFixed(price % 1 === 0 ? 0 : 2)}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {texts.perMonth[language]}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-sm text-slate-400 mt-1">
                      ${plan.price.yearly}{texts.perYear[language]}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{feature[language]}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isCurrentPlan}
                  className={cn(
                    "w-full py-3 rounded-xl font-bold transition-all",
                    isCurrentPlan
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : isPopular
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                  )}
                >
                  {isCurrentPlan
                    ? texts.currentPlan[language]
                    : user && pricingPlans.findIndex(p => p.id === user.tier) < pricingPlans.findIndex(p => p.id === plan.id)
                      ? texts.upgrade[language]
                      : texts.getStarted[language]
                  }
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-sm mb-4">
            {language === 'en' ? 'Trusted by researchers worldwide' : '受全球研究人员信赖'}
          </p>
          <div className="flex justify-center items-center gap-8 text-slate-300">
            <span className="text-2xl font-bold">Harvard</span>
            <span className="text-2xl font-bold">MIT</span>
            <span className="text-2xl font-bold">Stanford</span>
            <span className="text-2xl font-bold">Oxford</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
