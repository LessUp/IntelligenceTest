import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserTier, TestHistoryItem, PricingPlan } from '@/data/types';

interface UserState {
  // 用户状态
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // 历史记录
  testHistory: TestHistoryItem[];
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  upgradeTier: (tier: UserTier) => void;
  addTestHistory: (item: TestHistoryItem) => void;
  clearHistory: () => void;
  
  // Helpers
  canAccessTest: (testId: string, isPremium?: boolean) => boolean;
  getRemainingTests: () => number;
}

// 定义会员计划
export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: { en: 'Free', zh: '免费版' },
    price: { monthly: 0, yearly: 0 },
    features: [
      { en: '2 Standard Tests', zh: '2个标准测试' },
      { en: 'Basic Score Report', zh: '基础分数报告' },
      { en: '7-day History', zh: '7天历史记录' },
    ],
    testsIncluded: ['standard-iq', 'processing-speed'],
    aiAnalysis: false,
    paperAccess: false,
    historyDays: 7,
  },
  {
    id: 'basic',
    name: { en: 'Basic', zh: '基础版' },
    price: { monthly: 9.99, yearly: 99 },
    features: [
      { en: '5 Assessment Tests', zh: '5个评估测试' },
      { en: 'Detailed Analysis', zh: '详细分析报告' },
      { en: '30-day History', zh: '30天历史记录' },
      { en: 'Performance Trends', zh: '表现趋势图' },
    ],
    testsIncluded: ['standard-iq', 'clinical-battery', 'processing-speed', 'verbal-reasoning', 'working-memory'],
    aiAnalysis: false,
    paperAccess: false,
    historyDays: 30,
  },
  {
    id: 'premium',
    name: { en: 'Premium', zh: '高级版' },
    price: { monthly: 19.99, yearly: 199 },
    features: [
      { en: 'All Assessment Tests', zh: '所有评估测试' },
      { en: 'AI-Powered Analysis', zh: 'AI驱动分析' },
      { en: 'Unlimited History', zh: '无限历史记录' },
      { en: 'Scientific Papers Access', zh: '科学论文访问' },
      { en: 'Personalized Training', zh: '个性化训练建议' },
    ],
    testsIncluded: ['all'],
    aiAnalysis: true,
    paperAccess: true,
    historyDays: -1, // unlimited
  },
  {
    id: 'professional',
    name: { en: 'Professional', zh: '专业版' },
    price: { monthly: 49.99, yearly: 499 },
    features: [
      { en: 'Everything in Premium', zh: '包含高级版所有功能' },
      { en: 'API Access', zh: 'API访问' },
      { en: 'Batch Testing', zh: '批量测试' },
      { en: 'White-label Reports', zh: '白标报告' },
      { en: 'Priority Support', zh: '优先支持' },
      { en: 'Custom Assessments', zh: '定制评估' },
    ],
    testsIncluded: ['all'],
    aiAnalysis: true,
    paperAccess: true,
    historyDays: -1,
  },
];

// 免费用户可访问的测试
const FREE_TESTS = ['standard-iq', 'processing-speed'];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      testHistory: [],

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // 模拟API调用 - 实际项目中应该调用后端
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo用户
        const demoUser: User = {
          id: 'demo-' + Date.now(),
          email,
          name: email.split('@')[0],
          tier: 'free',
          createdAt: new Date().toISOString(),
        };
        
        set({ user: demoUser, isAuthenticated: true, isLoading: false });
        return true;
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: 'user-' + Date.now(),
          email,
          name,
          tier: 'free',
          createdAt: new Date().toISOString(),
        };
        
        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      upgradeTier: (tier: UserTier) => {
        const { user } = get();
        if (user) {
          const expiresAt = new Date();
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
          set({ 
            user: { 
              ...user, 
              tier, 
              expiresAt: expiresAt.toISOString() 
            } 
          });
        }
      },

      addTestHistory: (item: TestHistoryItem) => {
        set((state) => ({
          testHistory: [item, ...state.testHistory].slice(0, 100) // 最多保留100条
        }));
      },

      clearHistory: () => {
        set({ testHistory: [] });
      },

      canAccessTest: (testId: string, isPremium?: boolean) => {
        const { user } = get();
        
        // 未登录用户只能访问免费测试
        if (!user) {
          return FREE_TESTS.includes(testId);
        }
        
        // 根据会员等级判断
        const plan = pricingPlans.find(p => p.id === user.tier);
        if (!plan) return false;
        
        if (plan.testsIncluded.includes('all')) return true;
        if (plan.testsIncluded.includes(testId)) return true;
        
        // 非会员专属测试
        if (!isPremium) return true;
        
        return false;
      },

      getRemainingTests: () => {
        const { user, testHistory } = get();
        if (!user) return 2; // 免费用户每天2次
        
        const today = new Date().toDateString();
        const todayTests = testHistory.filter(
          t => new Date(t.date).toDateString() === today
        ).length;
        
        switch (user.tier) {
          case 'free': return Math.max(0, 3 - todayTests);
          case 'basic': return Math.max(0, 10 - todayTests);
          case 'premium': return -1; // unlimited
          case 'professional': return -1;
          default: return 0;
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
