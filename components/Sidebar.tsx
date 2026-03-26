'use client';

import Link from 'next/link';

const items = [
  'Listen Now',
  'Browse',
  'Recently Added',
  'Artists',
  'Albums',
  'Songs',
];

export default function Sidebar() {
  return (
    <aside className="rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur-md dark:bg-black/70">
      <nav className="space-y-1">
        {items.map((item) => (
          <Link key={item} href="#" className="block rounded-lg px-3 py-2 text-sm text-apple-gray-900 hover:bg-black/5 dark:text-white dark:hover:bg-white/10">
            {item}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
