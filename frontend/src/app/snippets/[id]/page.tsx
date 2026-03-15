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
      <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-grid-pattern">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="relative min-h-screen bg-grid-pattern flex items-center justify-center pt-20">
        <div className="text-center space-y-8 glass p-12 rounded-[3rem] border-white/5 shadow-2xl">
          <h2 className="text-4xl font-black tracking-tighter text-gradient">Snippet Not Found</h2>
          <p className="text-muted-foreground font-medium">The requested digital asset is missing or has been relocated.</p>
          <Link 
            href="/languages" 
            className={cn(buttonVariants({ size: 'lg' }), "rounded-2xl h-14 px-10 glow-primary font-black")}
          >
            Back to Ecosystem
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-grid-pattern pb-20 pt-32">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* ─── Navigation & Meta ───────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6">
              <Link 
                href={`/languages/${snippet.languageId}`} 
                className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform"
              >
                <ChevronLeft className="h-4 w-4" /> RECURSIVE BACK TO {snippet.language?.name}
              </Link>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                {snippet.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground/80 font-medium">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" /> Eng. Mohamed Elkillany
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" /> {new Date(snippet.createdAt).toLocaleDateString()}
                </span>
                <Badge variant="outline" className="rounded-full px-3 py-1 border-white/5 bg-white/5 text-[10px] font-black uppercase text-primary tracking-widest">
                  OPTIMIZED v2.0
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button size="lg" variant="outline" onClick={copyToClipboard} className="h-14 px-8 rounded-2xl glass border-white/10 font-bold gap-3 hover:bg-primary/5">
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                {copied ? 'BUFFER COPIED' : 'CLONE CODE'}
              </Button>
              <Button size="lg" variant="outline" className="h-14 w-14 rounded-2xl glass border-white/10 flex items-center justify-center p-0">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* ─── Code Ecosystem ─────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            <div className="lg:col-span-2 space-y-8">
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                {snippet.description}
              </p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative rounded-[2.5rem] border border-white/5 bg-black/90 shadow-[0_32px_128px_-12px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                <div className="bg-zinc-900/50 px-8 py-5 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
                   <div className="flex items-center gap-3">
                      <div className="flex gap-2 mr-4">
                        <div className="h-3 w-3 rounded-full bg-red-500/30" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/30" />
                        <div className="h-3 w-3 rounded-full bg-green-500/30" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                        {snippet.language?.name} KERNEL
                      </span>
                   </div>
                   <Link href="/compiler">
                     <Button size="sm" variant="secondary" className="rounded-xl h-10 px-6 text-[10px] font-black uppercase tracking-widest gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all">
                       <Play className="h-3 w-3 fill-current" /> RUN IN COMPILER
                     </Button>
                   </Link>
                </div>
                <div className="h-[500px] relative">
                  <Editor
                    height="100%"
                    language={snippet.language?.name?.toLowerCase() || 'javascript'}
                    defaultValue={snippet.code}
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      minimap: { enabled: true },
                      fontSize: 16,
                      padding: { top: 32, bottom: 32 },
                      scrollBeyondLastLine: false,
                      fontFamily: 'var(--font-mono)',
                      renderLineHighlight: 'all',
                      lineNumbers: 'on',
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* AI Sidebar */}
            <div className="space-y-8">
              <Card className="border border-white/5 bg-background/40 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
                <CardHeader className="p-0 mb-6 relative z-10">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary glow-primary"><Sparkles className="h-6 w-6" /></div>
                    Neural Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-6 relative z-10">
                  <p className="text-sm font-medium text-muted-foreground/80 leading-relaxed">
                    Instantly analyze architecture, logic flow, and optimization vectors using our Google AI core.
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      className="w-full h-14 rounded-2xl glow-primary font-black tracking-tight gap-3 shadow-lg group-active:scale-95 transition-all"
                      onClick={handleAIExplain} 
                      disabled={isExplaining}
                    >
                      {isExplaining ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                      {isExplaining ? 'DECODING LOGIC...' : 'ANALYZE SYNTAX'}
                    </Button>
                    <Button variant="outline" className="w-full h-14 rounded-2xl glass border-white/10 font-bold hover:bg-primary/5">
                      Suggest Refactor
                    </Button>
                  </div>
                  
                  {explanation && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-3xl bg-black/40 border border-white/5 text-sm font-mono leading-relaxed text-primary/90 italic shadow-inner"
                    >
                      {explanation}
                      <span className="inline-block w-2 h-4 bg-primary/50 ml-1 animate-pulse" />
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-white/5 bg-background/40 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
                 <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl font-black flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-accent/10 text-accent"><MessageSquareText className="h-6 w-6" /></div>
                      Discussion
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="p-0 text-center space-y-4">
                    <p className="text-sm text-muted-foreground font-medium italic">
                      Neural interface for community feedback is currently in read-only mode for this cluster.
                    </p>
                    <Button variant="link" className="text-primary font-black uppercase text-[10px] tracking-widest p-0 h-fit hover:underline-offset-4">
                      JOIN THE DEVELOPER GUILD
                    </Button>
                 </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
