"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Code2, Loader2, Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

export default function LanguagesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [languages, setLanguages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await api.get('/languages');
        setLanguages(response.data);
      } catch (error) {
        console.error('Failed to fetch languages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["Web", "Software", "DevOps", "Mobile", "Data Science"];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const finalLanguages = selectedCategory 
    ? filteredLanguages.filter(lang => lang.category?.name === selectedCategory)
    : filteredLanguages;

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder={t('search')} 
              className="pl-10 h-11 border-primary/20 bg-background/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === null ? "default" : "outline"}
              className="px-4 py-1.5 cursor-pointer transition-all hover:bg-primary/80"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map(cat => (
              <Badge 
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className="px-4 py-1.5 cursor-pointer transition-all hover:bg-primary/80"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {finalLanguages.map((lang) => (
            <motion.div key={lang.id} variants={itemVariants}>
              <Link href={`/languages/${lang.id}`}>
                <Card className="group hover:border-primary/50 transition-all duration-300 cursor-pointer h-full relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-primary/10">
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                       <Plus className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-5">
                    <div className={cn("p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-600/10 font-bold text-3xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner")}>
                      {lang.icon?.substring(0, 2).toUpperCase() || '??'}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{lang.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{lang.snippets?.length || 0} {t('snippets')}</p>
                    </div>
                    <div className="flex gap-2">
                       <Badge variant="secondary" className="bg-primary/5 text-[10px] font-medium">
                         {lang.category?.name || 'General'}
                       </Badge>
                       <Badge variant="outline" className="text-[10px] opacity-60">
                         {lang.lessons?.length || 0} Lessons
                       </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {finalLanguages.length === 0 && (
          <div className="text-center py-24 sm:py-32 rounded-3xl border-2 border-dashed border-primary/5 bg-muted/5">
            <Code2 className="mx-auto h-16 w-16 text-muted-foreground opacity-10" />
            <h3 className="mt-6 text-xl font-medium text-muted-foreground">No matches found for "{search || selectedCategory}"</h3>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
            <Button variant="outline" className="mt-8" onClick={() => {setSearch(''); setSelectedCategory(null);}}>
               Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
