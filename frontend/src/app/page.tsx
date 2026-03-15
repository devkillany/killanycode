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
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container px-4 py-24 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block text-foreground drop-shadow-sm">Master Your Code with</span>
              <span className="text-gradient drop-shadow-lg">
                {t('app_name')}
              </span>
            </h1>
            <p className="mx-auto max-w-[800px] text-xl text-muted-foreground md:text-2xl leading-relaxed">
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
              <Rocket className="mr-2 h-5 w-5" />
              Start Now
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
                <h2 className="text-4xl font-bold tracking-tight">How to Study with KillanyCode?</h2>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>
                    1. <strong className="text-foreground">Browse Lessons:</strong> Head to the lessons section to find structured tutorials.
                  </p>
                  <p>
                    2. <strong className="text-foreground">Practice in Compiler:</strong> Execute code samples directly as you learn.
                  </p>
                  <p>
                    3. <strong className="text-foreground">AI Assistance:</strong> Ask questions about complex code or get summaries.
                  </p>
                  <p>
                    4. <strong className="text-foreground">Save Snippets:</strong> Build your personal code library for future work.
                  </p>
                </div>
                <Link href="/lessons">
                  <Button size="lg" className="mt-4 gap-2 px-8 h-12">Start Learning now <Rocket className="h-4 w-4" /></Button>
                </Link>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 glass shadow-2xl flex items-center justify-center p-8 group">
                 <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                 <div className="p-8 rounded-2xl bg-background/50 backdrop-blur-md shadow-2xl space-y-4 w-full relative z-10">
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
            <div className="rounded-3xl glass p-12 border shadow-2xl">
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
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="border border-white/5 dark:bg-white/5 backdrop-blur-md hover:bg-muted/10 transition-colors shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardContent className="p-8 flex flex-col items-center text-center space-y-5 relative z-10">
          <div className="p-3 rounded-2xl bg-background/50 glow-primary">
            {icon}
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
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
