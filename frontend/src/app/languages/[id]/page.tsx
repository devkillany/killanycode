"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Code2, ChevronRight, Binary, FileCode2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

export default function LanguageDetailsPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [language, setLanguage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await api.get(`/languages/${id}`);
        setLanguage(response.data);
      } catch (error) {
        console.error('Failed to fetch language details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchLanguage();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!language) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">Language not found</h2>
        <Link 
          href="/languages" 
          className={cn(buttonVariants({ variant: 'default' }), "mt-4")}
        >
          Back to Languages
        </Link>
      </div>
    );
  }

  const categories = language.categories || [];
  const snippets = (language.snippets || []).filter((s: { title: string, description: string, categoryId: string }) => {
    let matches = true;
    if (selectedCategory) {
      matches = s.categoryId === selectedCategory;
    }
    if (search && matches) {
      matches = s.title.toLowerCase().includes(search.toLowerCase()) ||
                s.description.toLowerCase().includes(search.toLowerCase());
    }
    return matches;
  });

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn("p-3 rounded-xl bg-muted font-bold text-xl w-14 h-14 flex items-center justify-center", language.color)}>
              {language.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{language.name}</h1>
              <p className="text-muted-foreground">
                Exploring {language.snippetsCount} snippets and {categories.length} categories.
              </p>
            </div>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search snippets..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar Categories */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Categories</h3>
            <Button 
              variant={selectedCategory === null ? "secondary" : "ghost"} 
              className="justify-start"
              onClick={() => setSelectedCategory(null)}
            >
              All Snippets
            </Button>
            {categories.map((cat: { id: string, name: string }) => (
              <Button 
                key={cat.id}
                variant={selectedCategory === cat.id ? "secondary" : "ghost"} 
                className="justify-start"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Snippets List */}
          <div className="flex flex-col space-y-4">
            <AnimatePresence mode="popLayout">
              {snippets.map((snippet: { id: string, title: string, description: string, tags: string }) => (
                <motion.div
                  key={snippet.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                >
                  <Card className="hover:border-primary/50 transition-all group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {snippet.title}
                      </CardTitle>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        Optimized
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{snippet.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {snippet.tags?.split(',').map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold">
                            #{tag.trim()}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <Link 
                          href={`/snippets/${snippet.id}`} 
                          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "gap-1")}
                        >
                          View implementation <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {snippets.length === 0 && (
              <div className="text-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
                <FileCode2 className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                <h3 className="mt-4 text-lg font-medium text-muted-foreground">No snippets found in this category</h3>
                <Button variant="link" onClick={() => { setSelectedCategory(null); setSearch(''); }}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
