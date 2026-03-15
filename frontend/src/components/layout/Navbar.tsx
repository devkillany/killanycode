'use client';

import { Languages, Moon, Sun, Code2, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import '@/lib/i18n';

const navLinks = [
  { href: '/', label: 'nav_home' },
  { href: '/languages', label: 'nav_languages' },
  { href: '/compiler', label: 'nav_compiler' },
  { href: '/lessons', label: 'nav_lessons' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl group transition-all duration-300">
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
              <div className="absolute -inset-1 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="hidden sm:inline-block text-gradient font-black tracking-tighter">
              {t('app_name')}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 ml-4 p-1 rounded-full bg-muted/20 border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{t(link.label)}</span>
                </Link>
              );
            })}
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
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-background/80 backdrop-blur-3xl overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-semibold px-4 py-2 rounded-xl transition-colors",
                    pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
