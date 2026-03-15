"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { BookOpen, Clock, BarChart, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

export default function LessonsPage() {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get('/lessons');
        setLessons(response.data);
      } catch (error) {
        console.error('Failed to fetch lessons:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[60vh] bg-grid-pattern">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-grid-pattern pb-20 pt-32">
      <div className="container px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* ─── Page Header ─────────────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md text-primary text-xs font-bold tracking-widest uppercase mb-4">
               <BookOpen className="h-4 w-4" /> Path to Mastery
            </div>
            <h1 className="text-6xl font-black tracking-tighter sm:text-7xl leading-tight text-gradient">
              {t('nav_lessons')}
            </h1>
            <p className="mx-auto max-w-[800px] text-xl text-muted-foreground leading-relaxed font-medium">
              Dive into our hyper-curated educational tracks. From basic logic to advanced neural patterns, 
              orchestrate your evolution as an engineer.
            </p>
          </motion.div>

          {/* ─── Lessons Grid ────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {lessons.map((lesson, idx) => (
              <motion.div key={lesson.id} variants={itemVariants}>
                <Card className="group relative h-full flex flex-col border border-white/5 bg-background/40 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:border-primary/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 transition-opacity group-hover:opacity-100" />
                  
                  <CardHeader className="p-8 pb-4 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest bg-primary/5">
                        {lesson.language?.name || 'LOGIC'}
                      </Badge>
                      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                        <BarChart className="h-3 w-3" /> Beginner
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-black leading-[1.1] tracking-tight group-hover:text-primary transition-colors">
                      {lesson.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground/80 font-medium leading-relaxed mt-4 line-clamp-3">
                      High-precision architecture overview for {lesson.language?.name || 'computational'} ecosystems.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-8 pt-0 flex-1 flex flex-col justify-between relative z-10">
                    <div className="flex items-center gap-6 text-sm font-bold text-muted-foreground/80 mt-6 border-t border-white/5 pt-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" /> 15m
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-accent" /> 1 MODULE
                      </div>
                    </div>
                    
                    <Link 
                      href={`/lessons/${lesson.id}`} 
                      className={cn(
                        buttonVariants({ size: 'lg' }), 
                        "mt-8 w-full h-14 rounded-2xl glow-primary font-black tracking-tight flex items-center justify-center gap-2 group-hover:bg-primary"
                      )}
                    >
                      INITIATE LEARNING 
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* ─── Empty State ─────────────────────────────── */}
          {lessons.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem] glass">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/20 mb-4" />
              <p className="text-xl font-bold text-muted-foreground">The digital archives are currently syncing...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
