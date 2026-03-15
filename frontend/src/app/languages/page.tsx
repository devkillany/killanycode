"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Code2, Loader2, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

export default function LanguagesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [languages, setLanguages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const categories = ["Web", "Software", "DevOps", "Mobile", "Data Science"];

  const filteredLanguages = languages.filter(lang => {
    const matchesSearch = lang.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? lang.category?.name === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-grid-pattern">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-grid-pattern pb-20 pt-32">
      <div className="container px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* ─── Page Header ─────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
                 <Code2 className="h-3 w-3" /> Syntax Library
              </div>
              <h1 className="text-6xl font-black tracking-tighter text-gradient leading-tight">
                {t('nav_languages')}
              </h1>
              <p className="text-xl text-muted-foreground/80 font-medium max-w-2xl">
                Explore a comprehensive ecosystem of programming languages. 60+ environments 
                optimized for rapid learning and deployment.
              </p>
            </div>
            
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search ecosystem..." 
                className="pl-12 h-14 border-white/5 bg-background/40 backdrop-blur-xl rounded-2xl font-bold shadow-xl focus-visible:ring-primary/20 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* ─── Category Filter ─────────────────────────── */}
          <div className="flex flex-wrap gap-3 pb-8 border-b border-white/5">
            <FilterBadge 
              active={selectedCategory === null} 
              onClick={() => setSelectedCategory(null)}
              label="All Systems"
            />
            {categories.map(cat => (
              <FilterBadge 
                key={cat}
                active={selectedCategory === cat} 
                onClick={() => setSelectedCategory(cat)}
                label={cat}
              />
            ))}
          </div>

          {/* ─── Languages Grid ──────────────────────────── */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 pt-8"
          >
            {filteredLanguages.map((lang) => (
              <motion.div key={lang.id} variants={itemVariants}>
                <Link href={`/languages/${lang.id}`}>
                  <Card className="group relative hover:border-primary/40 transition-all duration-500 cursor-pointer h-full border-white/5 bg-background/40 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl overflow-hidden hover:-translate-y-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardContent className="p-10 flex flex-col items-center text-center space-y-8 relative z-10">
                      <div className="p-6 rounded-3xl bg-background/50 border border-white/10 text-4xl font-black w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:glow-primary group-hover:text-primary">
                        {lang.icon?.substring(0, 2).toUpperCase() || '??'}
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{lang.name}</h3>
                        <div className="flex items-center justify-center gap-3">
                           <Badge variant="outline" className="border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                             {lang.snippets?.length || 0} Snippets
                           </Badge>
                           <div className="h-1 w-1 rounded-full bg-primary/30" />
                           <Badge variant="outline" className="border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                             {lang.lessons?.length || 0} Tracks
                           </Badge>
                        </div>
                      </div>

                      <div className="pt-4 w-full">
                         <div className="px-4 py-2 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                           Open Console <ChevronRight className="inline h-3 w-3 ml-1" />
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* ─── Empty State ─────────────────────────────── */}
          {filteredLanguages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 rounded-[3.5rem] border border-dashed border-white/10 bg-white/[0.02]"
            >
              <div className="p-8 rounded-full bg-primary/5 border border-primary/10 inline-block mb-8">
                <Code2 className="h-16 w-16 text-primary/20" />
              </div>
              <h3 className="text-3xl font-black tracking-tight text-white mb-4">No Matches in Database</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-10 font-medium">
                Our global search couldn't locate any languages matching your current filter set.
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-2xl h-14 px-10 glass border-white/10 font-bold hover:bg-primary/10" 
                onClick={() => {setSearch(''); setSelectedCategory(null);}}
              >
                 Reset Neural Filter
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterBadge({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border",
        active 
          ? "bg-primary text-primary-foreground border-primary glow-primary scale-105" 
          : "bg-background/20 text-muted-foreground border-white/5 hover:border-primary/30 hover:bg-background/40"
      )}
    >
      {label}
    </button>
  );
}
