'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  onBack?: () => void;
}

export function MobileHeader({ 
  title, 
  showBack = true, 
  rightAction,
  transparent = false,
  onBack 
}: MobileHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-40 flex items-center justify-between px-4 py-3 md:hidden",
      transparent ? "bg-transparent" : "bg-white/80 backdrop-blur-lg border-b border-slate-100"
    )}>
      <div className="w-10">
        {showBack && (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
        )}
      </div>
      
      <h1 className="text-base font-bold text-slate-900 truncate">
        {title}
      </h1>
      
      <div className="w-10 flex justify-end">
        {rightAction}
      </div>
    </header>
  );
}
