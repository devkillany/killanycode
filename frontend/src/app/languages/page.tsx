'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Code2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock data for languages
const LANGUAGES = [
  { id: 'js', name: 'JavaScript', icon: 'JS', snippets: 120, color: 'text-yellow-500' },
  { id: 'ts', name: 'TypeScript', icon: 'TS', snippets: 85, color: 'text-blue-500' },
  { id: 'py', name: 'Python', icon: 'PY', snippets: 150, color: 'text-blue-400' },
  { id: 'cpp', name: 'C++', icon: 'C++', snippets: 60, color: 'text-blue-600' },
  { id: 'java', name: 'Java', icon: 'JV', snippets: 45, color: 'text-red-500' },
  { id: 'go', name: 'Go', icon: 'GO', snippets: 30, color: 'text-cyan-500' },
  { id: 'rust', name: 'Rust', icon: 'RS', snippets: 25, color: 'text-orange-600' },
  { id: 'php', name: 'PHP', icon: 'PHP', snippets: 40, color: 'text-indigo-400' },
];

export default function LanguagesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{t('nav_languages')}</h1>
          <p className="text-muted-foreground">
            Browse our extensive collection of code snippets across various programming languages.
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder={t('search')} 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filteredLanguages.map((lang) => (
            <motion.div key={lang.id} variants={itemVariants}>
              <Link href={`/languages/${lang.id}`}>
                <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className={cn("p-4 rounded-full bg-muted/50 font-bold text-2xl w-16 h-16 flex items-center justify-center", lang.color)}>
                      {lang.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{lang.name}</h3>
                      <p className="text-sm text-muted-foreground">{lang.snippets} {t('snippets')}</p>
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      Browse
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredLanguages.length === 0 && (
          <div className="text-center py-20">
            <Code2 className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
            <h3 className="mt-4 text-lg font-medium text-muted-foreground">No languages found</h3>
          </div>
        )}
      </div>
    </div>
  );
}
