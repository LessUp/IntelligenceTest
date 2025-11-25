'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BookOpen, Search, Filter, ExternalLink, ArrowLeft, 
  Brain, FileText, Users, Calendar, Star, Lock, Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';
import { useUserStore, pricingPlans } from '@/store/useUserStore';

// 模拟的论文数据
const papers = [
  {
    id: 1,
    title: "The neuroscience of human intelligence differences",
    authors: ["Deary, I. J.", "Penke, L.", "Johnson, W."],
    journal: "Nature Reviews Neuroscience",
    year: 2010,
    citations: 2847,
    category: "neuroscience",
    abstract: "Understanding the neural bases of individual differences in cognitive ability is one of the greatest challenges in psychology and neuroscience.",
    doi: "10.1038/nrn2793",
    isPremium: false,
  },
  {
    id: 2,
    title: "Unity and diversity of executive functions",
    authors: ["Miyake, A.", "Friedman, N. P.", "Emerson, M. J."],
    journal: "Cognitive Psychology",
    year: 2000,
    citations: 8521,
    category: "cognitive",
    abstract: "This study examined the organization of executive functions and how they relate to intelligence and academic achievement.",
    doi: "10.1006/cogp.1999.0734",
    isPremium: false,
  },
  {
    id: 3,
    title: "Emotional intelligence as a standard intelligence",
    authors: ["Mayer, J. D.", "Salovey, P.", "Caruso, D. R."],
    journal: "Emotion",
    year: 2001,
    citations: 3156,
    category: "emotional",
    abstract: "This article introduces emotional intelligence as a new intelligence that can be measured and that develops over time.",
    doi: "10.1037/1528-3542.1.3.232",
    isPremium: true,
  },
  {
    id: 4,
    title: "The Parieto-Frontal Integration Theory (P-FIT) of intelligence",
    authors: ["Jung, R. E.", "Haier, R. J."],
    journal: "Behavioral and Brain Sciences",
    year: 2007,
    citations: 1823,
    category: "neuroscience",
    abstract: "We propose that variations in a distributed network predict individual differences in intelligence.",
    doi: "10.1017/S0140525X07001185",
    isPremium: true,
  },
  {
    id: 5,
    title: "Theory of fluid and crystallized intelligence",
    authors: ["Cattell, R. B."],
    journal: "Journal of Educational Psychology",
    year: 1963,
    citations: 5892,
    category: "theory",
    abstract: "This paper presents the distinction between fluid intelligence (Gf) and crystallized intelligence (Gc).",
    doi: "10.1037/h0046743",
    isPremium: false,
  },
  {
    id: 6,
    title: "Working memory capacity and fluid intelligence",
    authors: ["Engle, R. W."],
    journal: "Current Directions in Psychological Science",
    year: 2002,
    citations: 2341,
    category: "cognitive",
    abstract: "Working memory capacity is a key predictor of fluid intelligence and complex cognitive tasks.",
    doi: "10.1111/1467-8721.00168",
    isPremium: true,
  },
  {
    id: 7,
    title: "Intelligence: New findings and theoretical developments",
    authors: ["Nisbett, R. E.", "Aronson, J.", "Blair, C."],
    journal: "American Psychologist",
    year: 2012,
    citations: 2156,
    category: "theory",
    abstract: "A comprehensive review of recent developments in intelligence research.",
    doi: "10.1037/a0026699",
    isPremium: true,
  },
  {
    id: 8,
    title: "The episodic buffer: A new component of working memory",
    authors: ["Baddeley, A. D."],
    journal: "Trends in Cognitive Sciences",
    year: 2000,
    citations: 4123,
    category: "cognitive",
    abstract: "This paper introduces the episodic buffer as a fourth component of working memory.",
    doi: "10.1016/S1364-6613(00)01538-2",
    isPremium: false,
  },
];

const categories = [
  { id: 'all', name: { en: 'All', zh: '全部' } },
  { id: 'neuroscience', name: { en: 'Neuroscience', zh: '神经科学' } },
  { id: 'cognitive', name: { en: 'Cognitive Psychology', zh: '认知心理学' } },
  { id: 'emotional', name: { en: 'Emotional Intelligence', zh: '情绪智力' } },
  { id: 'theory', name: { en: 'Theory', zh: '理论' } },
];

export default function PapersPage() {
  const router = useRouter();
  const { language } = useTestStore();
  const { user, isAuthenticated } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const currentPlan = pricingPlans.find(p => p.id === user?.tier);
  const hasPaperAccess = currentPlan?.paperAccess || false;

  const texts = {
    title: { en: 'Research Papers', zh: '研究论文' },
    subtitle: { en: 'Explore the scientific foundation of cognitive assessment', zh: '探索认知评估的科学基础' },
    search: { en: 'Search papers...', zh: '搜索论文...' },
    citations: { en: 'citations', zh: '引用' },
    readPaper: { en: 'Read Paper', zh: '阅读论文' },
    unlockAccess: { en: 'Unlock Access', zh: '解锁访问' },
    back: { en: 'Back', zh: '返回' },
    premiumOnly: { en: 'Premium Only', zh: '仅限高级会员' },
    upgradeMessage: { en: 'Upgrade to Premium for full access to all research papers', zh: '升级到高级版获取所有研究论文的完整访问权限' },
  };

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
            {texts.back[language]}
          </button>
          <div className="flex items-center gap-2 text-blue-600">
            <Brain size={24} />
            <span className="font-bold">NEURO/METRICS</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            {texts.title[language]}
          </h1>
          <p className="text-slate-500">{texts.subtitle[language]}</p>
        </motion.div>

        {/* Premium Banner */}
        {!hasPaperAccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Crown size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{texts.premiumOnly[language]}</h3>
                  <p className="text-white/80 text-sm">{texts.upgradeMessage[language]}</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/pricing')}
                className="px-6 py-2 bg-white text-purple-600 rounded-lg font-bold hover:bg-white/90 transition-colors"
              >
                {texts.unlockAccess[language]}
              </button>
            </div>
          </motion.div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={texts.search[language]}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"
                )}
              >
                {cat.name[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map((paper, index) => {
            const canAccess = !paper.isPremium || hasPaperAccess;
            
            return (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "bg-white rounded-2xl border p-6 relative overflow-hidden",
                  canAccess ? "border-slate-200" : "border-slate-100"
                )}
              >
                {paper.isPremium && !hasPaperAccess && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="mx-auto text-slate-400 mb-2" size={24} />
                      <p className="text-sm text-slate-500">{texts.premiumOnly[language]}</p>
                    </div>
                  </div>
                )}

                {paper.isPremium && (
                  <div className="absolute top-4 right-4">
                    <Crown size={16} className="text-amber-500" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 mb-1 line-clamp-2 pr-6">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">
                      {paper.authors.join(', ')}
                    </p>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                      {paper.abstract}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {paper.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={12} />
                          {paper.citations} {texts.citations[language]}
                        </span>
                      </div>
                      
                      {canAccess && (
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
                        >
                          {texts.readPaper[language]}
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
