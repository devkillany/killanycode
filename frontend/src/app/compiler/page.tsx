"use client";

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Play, 
  Sparkles, 
  Trash2, 
  Download, 
  Settings, 
  ChevronDown,
  Terminal,
  Cpu,
  Loader2
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

export default function CompilerPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [languages, setLanguages] = useState<any[]>([]);
  const [language, setLanguage] = useState<any>(null);
  const [code, setCode] = useState('// Write your code here...\nconsole.log("Hello, KillanyCode!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isAISuggesting, setIsAISuggesting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await api.get('/languages');
        setLanguages(response.data);
        if (response.data.length > 0) {
          setLanguage(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch languages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  const handleRunCode = async () => {
    if (!language) return;
    setIsRunning(true);
    setOutput('Compiling and running...\n');
    
    try {
      const response = await api.post('/compiler/run', {
        language: language.name.toLowerCase(),
        code: code,
        version: language.version || 'latest'
      });
      setOutput(response.data.output || response.data.error || 'No output');
    } catch (error: any) {
      console.error('Run failed:', error);
      setOutput('Error connecting to compiler service: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsRunning(false);
    }
  };

  const handleClearOutput = () => setOutput('');

  const handleAIImprove = async () => {
    if (!language) return;
    setIsAISuggesting(true);
    try {
      const response = await api.post('/ai/explain', {
        code,
        language: language.name.toLowerCase()
      });
      setOutput(prev => prev + '\n\n[AI Suggestion]: ' + response.data.explanation);
    } catch (error: any) {
      console.error('AI Suggestion failed:', error);
      setOutput(prev => prev + '\n\n[AI Error]: Failed to get suggestion.');
    } finally {
      setIsAISuggesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-grid-pattern h-[calc(100vh-4rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 gap-6 bg-grid-pattern overflow-hidden pt-24">
      {/* ─── Toolbar ─────────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 glass border-white/10 p-3 rounded-2xl shadow-xl relative z-20"
      >
        <div className="flex items-center gap-3">
          {language && (
            <DropdownMenu>
              {/* @ts-ignore */}
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="gap-3 rounded-xl border-white/5 bg-background/30 hover:bg-primary/5 h-12">
                  <div className="p-1 rounded bg-primary/20 text-primary text-[10px] font-black uppercase w-6 h-6 flex items-center justify-center">
                    {language.icon?.substring(0, 2).toUpperCase() || '??'}
                  </div>
                  <span className="font-bold">{language.name}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[220px] glass rounded-xl border-white/10 mt-2">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.id} onClick={() => setLanguage(lang)} className="gap-3 p-3 cursor-pointer">
                    <div className="p-1 rounded bg-muted/50 text-muted-foreground text-[10px] font-bold uppercase w-6 h-6 flex items-center justify-center">
                      {lang.icon?.substring(0, 2) || '??'}
                    </div>
                    <span className="font-medium">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button variant="outline" size="lg" className="gap-2 rounded-xl border-white/5 bg-background/30 h-12">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="font-bold">Preferences</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            size="lg" 
            variant="outline" 
            className="text-primary hover:text-primary hover:bg-primary/10 gap-2 border-primary/30 rounded-xl h-12 px-6 font-bold"
            onClick={handleAIImprove}
            disabled={isAISuggesting}
          >
            <Sparkles className={cn("h-4 w-4", isAISuggesting && "animate-spin")} />
            {isAISuggesting ? 'Analyzing Architecture...' : 'AI Optimizer'}
          </Button>
          <Button 
            size="lg" 
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-8 font-black glow-primary transition-all active:scale-95"
            onClick={handleRunCode}
            disabled={isRunning}
          >
            {isRunning ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5 fill-current" />}
            {isRunning ? 'Executing Logic...' : 'EXECUTIVE RUN'}
          </Button>
        </div>
      </motion.div>

      {/* ─── Editor and Output ────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_500px] gap-6 min-h-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-full"
        >
          <Card className="flex flex-col h-full overflow-hidden border-white/5 bg-background/40 backdrop-blur-2xl rounded-[2rem] shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 opacity-50" />
            <CardContent className="p-0 flex-1 relative">
              <Editor
                height="100%"
                language={language?.id === 'js' ? 'javascript' : language?.name?.toLowerCase() || 'javascript'}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: true },
                  fontSize: 16,
                  automaticLayout: true,
                  padding: { top: 24, bottom: 24 },
                  scrollBeyondLastLine: false,
                  fontFamily: 'var(--font-mono)',
                  cursorSmoothCaretAnimation: 'on',
                  smoothScrolling: true,
                  roundedSelection: true,
                }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Output Console ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-full"
        >
          <Card className="flex flex-col h-full overflow-hidden bg-black/90 text-white border-zinc-800 rounded-[2rem] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.8)] border-white/5">
            <div className="bg-zinc-900/50 px-6 py-4 border-b border-white/5 flex justify-between items-center shrink-0 backdrop-blur-md">
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                <Terminal className="h-4 w-4 text-primary" />
                Kernel Output
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl"
                  onClick={handleClearOutput}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-8 flex-1 font-mono text-sm overflow-auto custom-scrollbar leading-relaxed">
              {output ? (
                <motion.pre 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre-wrap text-green-400/90"
                >
                  {output}
                  <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                </motion.pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
                  <div className="p-6 rounded-full bg-white/[0.02] border border-white/5">
                    <Cpu className="h-12 w-12 opacity-20" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40">System Idle</p>
                    <p className="text-xs text-zinc-500">Awaiting executive run command...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
