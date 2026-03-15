'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronLeft, 
  Share2, 
  MessageSquareText,
  Clock,
  User
} from 'lucide-react';
import Link from 'next/link';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function SnippetDetailsPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [snippet, setSnippet] = useState<{
    title: string;
    description: string;
    code: string;
    languageId: string;
    createdAt: string;
    language?: { name: string };
    tags?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await api.get(`/snippets/${id}`);
        setSnippet(response.data);
      } catch (error) {
        console.error('Failed to fetch snippet:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchSnippet();
  }, [id]);

  const copyToClipboard = () => {
    if (snippet) {
      navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAIExplain = async () => {
    if (!snippet) return;
    setIsExplaining(true);
    try {
      const response = await api.post('/ai/explain', {
        code: snippet.code,
        language: snippet.language?.name || 'Javascript'
      });
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error('AI explanation failed:', error);
      setExplanation("Sorry, I couldn't generate an explanation at this time.");
    } finally {
      setIsExplaining(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">Snippet not found</h2>
        <Link 
          href="/languages" 
          className={cn(buttonVariants({ variant: 'default' }), "mt-4")}
        >
          Back to Languages
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-6 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href={`/languages/${snippet.languageId}`} 
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "w-fit gap-1")}
        >
          <ChevronLeft className="h-4 w-4" /> Back to {snippet.language?.name}
        </Link>

        {/* Title and Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{snippet.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" /> Eng. Mohamed Elkillany
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {new Date(snippet.createdAt).toLocaleDateString()}
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                Optimized
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </div>

        <p className="text-lg text-muted-foreground">{snippet.description}</p>

        {/* Code Block */}
        <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
          <div className="bg-muted/50 px-4 py-2 border-b flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-widest">{snippet.language?.name}</span>
            <Link href="/compiler">
              <Button size="xs" variant="secondary" className="h-7 text-[10px] uppercase font-bold gap-1">
                <Play className="h-3 w-3" /> Run in Compiler
              </Button>
            </Link>
          </div>
          <div className="h-[400px]">
            <Editor
              height="100%"
              language={snippet.language?.name?.toLowerCase() || 'javascript'}
              defaultValue={snippet.code}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
              }}
            />
          </div>
        </div>

        {/* AI & Interaction Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Code Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Get an instant explanation or optimization suggestions for this snippet powered by AI.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAIExplain} disabled={isExplaining}>
                  {isExplaining ? 'Thinking...' : 'Explain Code'}
                </Button>
                <Button size="sm" variant="outline">
                  Improve Code
                </Button>
              </div>
              
              {explanation && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 rounded-lg bg-background border text-sm italic"
                >
                  {explanation}
                </motion.div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquareText className="h-5 w-5 text-blue-500" />
                Discussion
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground italic">
                Currently, comments are disabled. Join our community to discuss this!
              </p>
              <Button variant="link" size="sm">
                Join Community
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
