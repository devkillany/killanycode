'use client';

import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} {t('app_name')}. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-sm font-medium">
          <span>{t('footer_text')}</span>
          <a
            href="https://devkillany.github.io/portofolio3/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            Portfolio
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
