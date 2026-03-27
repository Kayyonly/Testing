'use client';

import Link from 'next/link';
import { Home, Library, Search } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

const navItems = [
  { href: '/library', label: 'Library', icon: Library },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/', label: 'Home', icon: Home },
];

export default function BottomNav() {
  const isMobile = useMobile();
  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-white/10 bg-white/90 p-2 backdrop-blur dark:bg-black/90">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 rounded-md py-2 text-xs text-apple-gray-500 hover:bg-black/5 dark:hover:bg-white/10">
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
