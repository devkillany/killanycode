'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: 'Hello! I am the KillanyCode AI assistant, developed by Eng. Mohamed Elkillany. How can I help you today?' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const assistantMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: `I'm a mock AI assistant for this demo. Eng. Mohamed Elkillany built this amazing platform! I received your message: "${input}".` 
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px]"
          >
            <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur">
              <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row items-center justify-between rounded-t-lg">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white/20 rounded-md">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">KillanyCode AI</CardTitle>
                    <p className="text-[10px] opacity-80">By Eng. Mohamed Elkillany</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-white/20 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent 
                className="p-4 h-[400px] overflow-y-auto space-y-4 flex flex-col"
                ref={scrollRef}
              >
                {messages.map((m) => (
                  <div 
                    key={m.id} 
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "shrink-0 p-1.5 rounded-full h-8 w-8 flex items-center justify-center",
                      m.role === 'user' ? "bg-secondary" : "bg-primary/20 text-primary"
                    )}>
                      {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm",
                      m.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-muted rounded-tl-none border"
                    )}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 mr-auto max-w-[85%] animate-pulse">
                    <div className="shrink-0 p-1.5 rounded-full h-8 w-8 flex items-center justify-center bg-primary/20 text-primary">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-3 rounded-2xl text-sm bg-muted rounded-tl-none border">
                      Thinking...
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form 
                  className="flex w-full gap-2"
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                >
                  <Input 
                    placeholder="Ask me anything about code..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bg-zinc-800 rotate-90" : "bg-primary hover:scale-110"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  );
}
