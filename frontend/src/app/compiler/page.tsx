'use client';

import { useState, useRef } from 'react';
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
  Cpu
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { MOCK_LANGUAGES } from '@/lib/mock-data';

export default function CompilerPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [language, setLanguage] = useState(MOCK_LANGUAGES[0]);
  const [code, setCode] = useState('// Write your code here...\nconsole.log("Hello, KillanyCode!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isAISuggesting, setIsAISuggesting] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and running...\n');
    
    // Simulate API call to Piston
    setTimeout(() => {
      setOutput(prev => prev + 'Hello, KillanyCode!\n\nProgram exited with code 0');
      setIsRunning(false);
    }, 1000);
  };

  const handleClearOutput = () => setOutput('');

  const handleAIImprove = () => {
    setIsAISuggesting(true);
    setTimeout(() => {
      // Mock suggestion
      setOutput(prev => prev + '\n\n[AI Suggestion]: Consider using typed variables for better performance in larger projects.');
      setIsAISuggesting(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 gap-4 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-muted/30 p-2 rounded-lg border">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="gap-2" />}>
              <span className={cn("font-bold text-xs uppercase", language.color)}>{language.icon}</span>
              {language.name}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {MOCK_LANGUAGES.map((lang) => (
                <DropdownMenuItem key={lang.id} onClick={() => setLanguage(lang)}>
                  <span className={cn("mr-2 font-bold text-[10px]", lang.color)}>{lang.icon}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="text-primary hover:text-primary hover:bg-primary/10 gap-2 border-primary/20"
            onClick={handleAIImprove}
            disabled={isAISuggesting}
          >
            <Sparkles className="h-4 w-4" />
            {isAISuggesting ? 'Analyzing...' : t('improve_code')}
          </Button>
          <Button 
            size="sm" 
            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
            onClick={handleRunCode}
            disabled={isRunning}
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'Running...' : t('run_code')}
          </Button>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4 min-h-0">
        <Card className="flex flex-col overflow-hidden border">
          <CardContent className="p-0 flex-1 relative">
            <Editor
              height="100%"
              language={language.id === 'js' ? 'javascript' : language.name.toLowerCase()}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                automaticLayout: true,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </CardContent>
        </Card>

        {/* Output Console */}
        <Card className="flex flex-col overflow-hidden bg-black text-white border-zinc-800">
          <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-400">
              <Terminal className="h-3 w-3" />
              Console Output
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={handleClearOutput}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-white hover:bg-zinc-800">
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <CardContent className="p-4 flex-1 font-mono text-sm overflow-auto">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                <Cpu className="h-8 w-8 mb-2 opacity-20" />
                <p className="text-xs uppercase tracking-widest">Ready to execute</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
