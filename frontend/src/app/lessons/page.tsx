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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{t('nav_lessons')}</h1>
          <p className="text-muted-foreground max-w-2xl">
            Level up your coding skills with our curated tutorials and deep dives into modern technologies.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {lessons.map((lesson) => (
            <motion.div key={lesson.id} variants={itemVariants}>
              <Card className="h-full flex flex-col hover:border-primary/50 transition-all group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="font-bold">
                      {lesson.language?.name || 'General'}
                    </Badge>
                    <Badge variant="secondary">Beginner</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors leading-tight">
                    {lesson.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    Tutorial for {lesson.language?.name || 'coding'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 15m
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> 1 lesson
                    </div>
                  </div>
                  <Link 
                    href={`/lessons/${lesson.id}`} 
                    className={cn(buttonVariants({ variant: 'link', size: 'sm' }), "mt-6 p-0 h-fit justify-start gap-1")}
                  >
                    Start Learning <ChevronRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
