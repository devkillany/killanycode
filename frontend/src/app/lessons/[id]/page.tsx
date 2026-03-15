"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  Clock,
  ArrowRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

export default function LessonDetailsPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await api.get(`/lessons/${id}`);
        setLesson(response.data);
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchLesson();
  }, [id]);

  const handleAISummary = async () => {
    if (!lesson) return;
    setIsSummarizing(true);
    try {
      const response = await api.post('/ai/chat', {
        message: `Write a very brief summary (2-3 sentences) of this technical lesson: ${lesson.title}\nContent: ${lesson.content.substring(0, 500)}`,
        context: 'Platform Lesson Summary'
      });
      setAiSummary(response.data.reply);
    } catch (error) {
      console.error('AI summary failed:', error);
      setAiSummary("Could not generate summary at this time.");
    } finally {
      setIsSummarizing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">Lesson not found</h2>
        <Link 
          href="/lessons" 
          className={cn(buttonVariants({ variant: 'default' }), "mt-4")}
        >
          Back to Lessons
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto flex flex-col space-y-8">
        {/* Navigation */}
        <Link 
          href="/lessons" 
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "w-fit gap-1")}
        >
          <ChevronLeft className="h-4 w-4" /> Back to Lessons
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-bold uppercase tracking-wider">
              {lesson.language?.name || 'General'}
            </Badge>
            <Badge variant="secondary">{lesson.level}</Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4" /> {lesson.duration}
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <BookOpen className="h-4 w-4" /> 5 Chapters
            </div>
          </div>
        </div>

        {/* AI Action Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="font-bold text-lg flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Summary
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get a concise AI-generated summary of this lesson to grasp the key points faster.
                </p>
              </div>
              <Button size="sm" onClick={handleAISummary} disabled={isSummarizing}>
                {isSummarizing ? 'Generating...' : 'Summarize Now'}
              </Button>
            </div>
            
            {aiSummary && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-background border-2 border-primary/10 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{aiSummary}</p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Content Viewer */}
        <article className="prose prose-zinc dark:prose-invert max-w-none bg-card p-8 rounded-2xl border shadow-sm">
          <div 
            className="space-y-6"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </article>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-8 border-t">
          <Button variant="ghost" disabled>
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button variant="outline" className="gap-2">
            Next Lesson <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
