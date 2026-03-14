'use client';

import { useMemo, useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_LESSONS, MOCK_LANGUAGES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function LessonDetailsPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const lesson = useMemo(() => MOCK_LESSONS.find(l => l.id === id), [id]);
  const lang = useMemo(() => MOCK_LANGUAGES.find(l => l.id === lesson?.languageId), [lesson]);

  const handleAISummary = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setAiSummary("This lesson covers the core concepts of Promises in JavaScript, explaining how they manage asynchronous tasks through pendings, fulfilled, and rejected states. Using Promises helps developers write cleaner and more manageable code compared to nested callbacks.");
      setIsSummarizing(false);
    }, 1200);
  };

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
            <Badge variant="outline" className={cn("font-bold uppercase tracking-wider", lang?.color)}>
              {lang?.name}
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

        {/* Content Viewer (Simulated) */}
        <article className="prose prose-zinc dark:prose-invert max-w-none bg-card p-8 rounded-2xl border shadow-sm">
          <div className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Asynchronous programming is a essential part of modern web development. Whether you're fetching data from an API, dealing with user input, or setting up timers, understanding how to manage long-running operations without blocking the main execution thread is vital.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                // The old way (Callback Hell)<br />
                getData(function(a) {'{'}<br />
                &nbsp;&nbsp;getMoreData(a, function(b) {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;getEvenMoreData(b, function(c) {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(c);<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'}'});<br />
                &nbsp;&nbsp;{'}'});<br />
                {'}'});
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Enter Promises</h2>
              <p className="text-muted-foreground leading-relaxed">
                A Promise represents a value that might be available now, or in the future, or never. It provides a more structured way to handle these operations than callbacks.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                // The Promise way<br />
                getData()<br />
                &nbsp;&nbsp;.then(a =&gt; getMoreData(a))<br />
                &nbsp;&nbsp;.then(b =&gt; getEvenMoreData(b))<br />
                &nbsp;&nbsp;.then(c =&gt; console.log(c))<br />
                &nbsp;&nbsp;.catch(err =&gt; console.error(err));
              </div>
            </section>
          </div>
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
