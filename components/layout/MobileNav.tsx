'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Brain, BarChart3, User, BookOpen, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';
import { useUserStore } from '@/store/useUserStore';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: { en: string; zh: string };
  path: string;
  requireAuth?: boolean;
}

const navItems: NavItem[] = [
  { id: 'home', icon: Brain, label: { en: 'Tests', zh: '测试' }, path: '/' },
  { id: 'dashboard', icon: BarChart3, label: { en: 'Stats', zh: '统计' }, path: '/dashboard', requireAuth: true },
  { id: 'papers', icon: BookOpen, label: { en: 'Papers', zh: '论文' }, path: '/papers' },
  { id: 'pricing', icon: Crown, label: { en: 'Pro', zh: '会员' }, path: '/pricing' },
  { id: 'profile', icon: User, label: { en: 'Me', zh: '我的' }, path: '/profile' },
];

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useTestStore();
  const { isAuthenticated } = useUserStore();

  // 测试页面隐藏底部导航
  if (pathname === '/test') return null;

  const handleNavClick = (item: NavItem) => {
    if (item.requireAuth && !isAuthenticated) {
      router.push('/auth?redirect=' + item.path);
    } else {
      router.push(item.path);
    }
  };

  return (
    <nav className="mobile-nav md:hidden safe-area-inset">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || 
            (item.path !== '/' && pathname.startsWith(item.path));
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-1 min-w-[60px] transition-colors",
                isActive ? "text-blue-600" : "text-slate-400"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn(
                "text-[10px] mt-1",
                isActive ? "font-bold" : "font-medium"
              )}>
                {item.label[language]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
