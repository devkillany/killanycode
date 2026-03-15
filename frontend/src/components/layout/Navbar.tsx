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
import { useAuth } from '@/context/AuthContext';
import '@/lib/i18n';

export function Navbar() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const { setTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    // Update font family dynamically if needed, though Tailwind font-sans + font-arabic handles it.
    if (lng === 'ar') {
      document.body.style.fontFamily = 'var(--font-arabic)';
    } else {
      document.body.style.fontFamily = 'var(--font-sans)';
    }
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

          <div className="h-6 w-px bg-border mx-2 hidden sm:block" />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="sm" className="gap-2 px-2" />}>
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">{user.name.substring(0, 1).toUpperCase()}</span>
                </div>
                <span className="hidden md:inline-block text-sm font-medium">{user.name.split(' ')[0]}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem render={<Link href="/profile" className="cursor-pointer w-full" />}>My Profile</DropdownMenuItem>
                {user.role === 'admin' || user.email === 'admin@killanycode.com' ? (
                  <DropdownMenuItem render={<Link href="/dashboard" className="cursor-pointer w-full" />}>{t('nav_dashboard')}</DropdownMenuItem>
                ) : null}
                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={() => logout()}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "hidden sm:flex")}
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
