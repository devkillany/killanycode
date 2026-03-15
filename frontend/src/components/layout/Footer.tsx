import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-white/5 bg-background/50 backdrop-blur-2xl py-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-30" />
      <div className="container relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h3 className="text-xl font-black text-gradient uppercase tracking-tighter italic">
            {t('app_name')}
          </h3>
          <p className="text-sm text-muted-foreground max-w-[300px] text-center md:text-left">
            Empowering the next generation of engineers with high-performance tools and AI.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <SocialIcon icon={<Github className="h-5 w-5" />} href="https://github.com/devkillany" />
            <SocialIcon icon={<Twitter className="h-5 w-5" />} href="#" />
            <SocialIcon icon={<Linkedin className="h-5 w-5" />} href="#" />
          </div>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> by 
            <a
              href="https://devkillany.github.io/portofolio3/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
            >
              Eng. Mohamed Elkillany
            </a>
          </p>
        </div>

        <div className="text-sm text-muted-foreground flex flex-col items-center md:items-end gap-1">
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      whileHover={{ y: -4, scale: 1.1 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2.5 rounded-xl glass border-white/10 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all shadow-lg"
    >
      {icon}
    </motion.a>
  );
}
