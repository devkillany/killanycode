'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages, Moon, Sun, Code2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import '@/lib/i18n';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { setTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block">{t('app_name')}</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 ml-10">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t('nav_home')}
            </Link>
            <Link href="/languages" className="text-sm font-medium transition-colors hover:text-primary">
              {t('nav_languages')}
            </Link>
            <Link href="/compiler" className="text-sm font-medium transition-colors hover:text-primary">
              {t('nav_compiler')}
            </Link>
            <Link href="/lessons" className="text-sm font-medium transition-colors hover:text-primary">
              {t('nav_lessons')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
              <Languages className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle language</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('ar')}>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link 
            href="/dashboard" 
            className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
          >
            {t('nav_dashboard')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
