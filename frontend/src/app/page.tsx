'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Cpu, Lightbulb, Zap, Rocket, Github } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container px-4 py-12 md:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center space-y-8"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-foreground">Master Your Code with</span>
            <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {t('app_name')}
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            The ultimate companion for developers. Store snippets, run code in 60+ languages, 
            and get AI-powered insights to boost your productivity.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            href="/languages" 
            className={cn(buttonVariants({ size: 'lg' }), "h-12 px-8")}
          >
            {t('nav_languages')}
          </Link>
          <Link 
            href="/compiler" 
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), "h-12 px-8")}
          >
            {t('nav_compiler')}
          </Link>
          <a 
            href="https://github.com/devkillany" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), "h-12 px-8")}
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mt-16">
          <FeatureCard 
            icon={<Cpu className="h-10 w-10 text-primary" />}
            title="Multi-Language Compiler"
            description="Execute code in over 60 languages directly in your browser with real-time output."
          />
          <FeatureCard 
            icon={<Lightbulb className="h-10 w-10 text-yellow-500" />}
            title="AI Code Insights"
            description="Get instant explanations and improvement suggestions for your code snippets."
          />
          <FeatureCard 
            icon={<Zap className="h-10 w-10 text-blue-500" />}
            title="Blazing Fast Search"
            description="Find your snippets in milliseconds with our optimized search and categorization system."
          />
        </motion.div>

        <motion.div variants={itemVariants} className="w-full max-w-5xl mt-16 space-y-24">
          {/* Detailed Features / How it Works */}
          <section id="guide" className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-20 border-t">
            <div className="text-left space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">How to Study with KillanyCode?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  1. <strong className="text-foreground">Browse Lessons:</strong> Head to the lessons section to find structured tutorials on your favorite languages.
                </p>
                <p>
                  2. <strong className="text-foreground">Practice in Compiler:</strong> Don't just read—execute! Every lesson is linked to our multi-language compiler.
                </p>
                <p>
                  3. <strong className="text-foreground">AI Assistance:</strong> Use the AI chat to ask questions about complex code or get instant summaries of long lessons.
                </p>
                <p>
                  4. <strong className="text-foreground">Save Snippets:</strong> Found a useful block of code? Save it to your personal library for future reference.
                </p>
              </div>
              <Link href="/lessons">
                <Button className="mt-4 gap-2">Start Learning Now <Rocket className="h-4 w-4" /></Button>
              </Link>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-primary/20 bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center p-8">
               <div className="p-8 rounded-2xl bg-background shadow-2xl space-y-4 w-full">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <pre className="text-sm font-mono text-primary animate-pulse">
                    {`async function learn(topic) {
  const code = await fetch(topic);
  return executeWithAI(code);
}`}
                  </pre>
               </div>
            </div>
          </section>

          {/* Stats Bar */}
          <div className="rounded-3xl bg-muted/50 p-12 border backdrop-blur-md">
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              <StatItem label="Active Languages" value="60+" />
              <StatItem label="Code Snippets" value="1.2k+" />
              <StatItem label="Happy Developers" value="500+" />
              <StatItem label="AI Tokens Used" value="1M+" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-none bg-muted/30 hover:bg-muted/50 transition-colors">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-3xl font-bold tracking-tighter sm:text-4xl">{value}</span>
      <span className="text-sm font-medium text-muted-foreground uppercase">{label}</span>
    </div>
  );
}
