'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, NotebookPen } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/blog', label: 'Blog', icon: NotebookPen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Mobile top bar: plain links, so navigation works even before (or without) JavaScript. */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-white/20 bg-black/60 backdrop-blur-md px-4 h-14">
        <Link href="/" className="font-semibold text-neutral-heading">
          Sam McAnelly
        </Link>
        <nav className="flex gap-1" aria-label="Main">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                isActive(href)
                  ? 'bg-white/10 text-neutral-heading'
                  : 'text-neutral-accent hover:text-neutral-heading'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <aside
        id="site-sidebar"
        className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-20 flex-col items-center border-r border-white/20 bg-black/70 backdrop-blur-md py-6"
      >
        <Link
          href="/"
          className="w-10 h-10 shrink-0 relative overflow-hidden rounded-full border-2 border-neutral-accent/30"
        >
          <Image
            src="/images/header/IMG_5132.jpg"
            alt="Sam McAnelly"
            fill
            className="object-cover"
            sizes="40px"
          />
        </Link>

        <nav className="mt-8 flex-1 flex flex-col gap-2" aria-label="Main">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'flex w-14 flex-col items-center gap-1 rounded-md py-2 text-[11px] font-medium transition-colors',
                isActive(href)
                  ? 'bg-white/10 text-neutral-heading'
                  : 'text-neutral-accent hover:bg-white/5 hover:text-neutral-heading'
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="https://www.linkedin.com/in/sam-mcanelly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-accent hover:text-neutral-heading transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/sam-f-mcanelly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-accent hover:text-neutral-heading transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
