'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Cpu, Lightbulb, Zap, Rocket } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-grid-pattern pb-20">
      {/* ─── Hero Background ──────────────────────────────── */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[160px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[160px] rounded-full" 
        />
        
        {/* Floating Particles Simulation */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              scale: [0, 1.5, 0],
              y: [0, -200],
              x: Math.random() * 200 - 100
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute bg-primary/30 rounded-full blur-[2px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              aspectRatio: '1',
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 pt-32 md:pt-48 pb-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-12"
        >
          {/* ─── Badge ───────────────────────────────────── */}
          <motion.div 
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md text-primary text-sm font-bold tracking-widest uppercase animate-pulse-glow"
          >
            Revolutionizing Developer Experience
          </motion.div>

          {/* ─── Main Headline ───────────────────────────── */}
          <motion.div variants={itemVariants} className="space-y-6 max-w-5xl">
            <h1 className="text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9]">
              <span className="block text-foreground drop-shadow-2xl">Shape the Future of</span>
              <span className="text-gradient block pb-4 mt-2">
                {t('app_name')}
              </span>
            </h1>
            <p className="mx-auto max-w-[850px] text-xl text-muted-foreground/80 md:text-2xl leading-relaxed lg:text-3xl font-medium px-4">
              A high-precision ecosystem for snippet storage, real-time code execution in 60+ languages, 
              and AI-driven insights—designed for the elite developer.
            </p>
          </motion.div>

          {/* ─── Actions ─────────────────────────────────── */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <Link 
              href="/languages" 
              className={cn(buttonVariants({ size: 'lg' }), "h-14 px-10 text-lg rounded-2xl glow-primary font-bold")}
            >
              Explore Languages
            </Link>
            <Link 
              href="/compiler" 
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), "h-14 px-10 text-lg rounded-2xl glass font-bold border-white/10 hover:bg-muted/30")}
            >
              Online Compiler
            </Link>
          </motion.div>

          {/* ─── Features Grid ───────────────────────────── */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mt-24">
            <FeatureCard 
              icon={<Cpu className="h-10 w-10" />}
              title="Cloud Compiler v2"
              description="Execute complex algorithms in 60+ languages with near-zero latency and real-time streaming output."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Lightbulb className="h-10 w-10" />}
              title="Neural AI Assistant"
              description="Harness the power of Google AI to explain, optimize, and document your codebase instantly."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Zap className="h-10 w-10" />}
              title="Hyper-Fast Search"
              description="Locate critical snippets in milliseconds using our global indexing and tagging engine."
              delay={0.3}
            />
          </motion.div>

          {/* ─── Interactive Sections ────────────────────── */}
          <div className="w-full max-w-7xl mt-32 space-y-40">
            
            {/* Study Flow Section */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-20"
            >
              <motion.div variants={itemVariants} className="text-left space-y-8 lg:pr-10">
                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                  <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  Educational Path
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
                  How to Study like a <span className="text-primary italic">Pro</span>?
                </h2>
                <div className="space-y-8">
                  <StudyStep 
                    number="01" 
                    title="Find Your Language" 
                    desc="Browse over 60 languages with curated lessons and documentation." 
                  />
                  <StudyStep 
                    number="02" 
                    title="Live Practice" 
                    desc="Run lesson examples directly in the built-in compiler—no setup required." 
                  />
                  <StudyStep 
                    number="03" 
                    title="AI Deep Dive" 
                    desc="Use the AI explain button to break down complex logical blocks instantly." 
                  />
                  <StudyStep 
                    number="04" 
                    title="Build Your Library" 
                    desc="Save useful snippets from lessons to your personal cloud for future reference." 
                  />
                </div>
                <Link href="/lessons">
                  <Button size="lg" className="mt-8 gap-3 h-14 rounded-2xl group">
                    Start Learning Now 
                    <Rocket className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                 <div className="absolute -inset-4 bg-primary/10 blur-[60px] rounded-full animate-pulse-glow" />
                 <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden border border-white/10 glass shadow-[0_32px_128px_-12px_rgba(0,0,0,0.5)] flex items-center justify-center p-6 sm:p-12 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                    <div className="p-8 rounded-3xl bg-background/40 backdrop-blur-2xl border border-white/5 shadow-inner space-y-6 w-full relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                       <div className="flex gap-2 mb-4">
                         <div className="h-3 w-3 rounded-full bg-red-500/50" />
                         <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                         <div className="h-3 w-3 rounded-full bg-green-500/50" />
                       </div>
                       <div className="space-y-4 font-mono text-sm sm:text-base leading-relaxed">
                          <p className="text-primary/70">{`// Study Algorithm`}</p>
                          <p className="text-foreground"><span className="text-primary">const</span> killanyCode = <span className="text-accent">{'{'}</span></p>
                          <p className="pl-6 text-foreground">efficiency: <span className="animate-blink font-bold text-accent">"MAXIMUM"</span>,</p>
                          <p className="pl-6 text-foreground">aiAssistance: <span className="text-primary-foreground bg-primary px-1 rounded italic">true</span>,</p>
                          <p className="pl-6 text-foreground">learningCurve: <span className="text-destructive">"SMOOTH"</span></p>
                          <p className="text-accent">{'};'}</p>
                          <p className="text-muted-foreground pt-4">Ready to optimize your brain...</p>
                       </div>
                    </div>
                 </div>
              </motion.div>
            </motion.section>

            {/* Snippets / Tooling Section */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="py-20 bg-muted/20 rounded-[4rem] border border-white/5 p-10 md:p-20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <motion.div variants={itemVariants} className="order-2 lg:order-1">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-4">
                          <div className="aspect-square rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center"><Code2 className="h-12 w-12 text-primary" /></div>
                          <div className="h-40 rounded-3xl bg-accent/5 border border-accent/10" />
                       </div>
                       <div className="space-y-4 pt-8">
                          <div className="h-40 rounded-3xl bg-foreground/5 border border-foreground/10" />
                          <div className="aspect-square rounded-3xl bg-primary/20 border border-primary/30 flex items-center justify-center"><Rocket className="h-12 w-12 text-foreground" /></div>
                       </div>
                    </div>
                 </motion.div>
                 <motion.div variants={itemVariants} className="text-left space-y-6 order-1 lg:order-2">
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">Your Digital Ark of Code</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                       Don't lose your brilliance in the chaos of local folders. Save snippets with one click, 
                       organize them with intelligent tags, and keep them synced across all your devices.
                    </p>
                    <div className="flex flex-col gap-4 text-lg font-medium">
                       <div className="flex items-center gap-3 text-foreground"><div className="h-5 w-5 rounded-full bg-primary/20 border border-primary flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-primary" /></div> End-to-End Encryption</div>
                       <div className="flex items-center gap-3 text-foreground"><div className="h-5 w-5 rounded-full bg-primary/20 border border-primary flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-primary" /></div> Smart Tagging System</div>
                       <div className="flex items-center gap-3 text-foreground"><div className="h-5 w-5 rounded-full bg-primary/20 border border-primary flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-primary" /></div> Version History Control</div>
                    </div>
                 </motion.div>
              </div>
            </motion.section>

            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] glass p-12 md:p-20 border shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="grid grid-cols-2 gap-12 md:grid-cols-4 relative z-10">
                <StatItem label="Compiler Nodes" value="60+" sub="Global Regions" />
                <StatItem label="Code Snippets" value="15k" sub="Community Cloud" />
                <StatItem label="AI Operations" value="2M+" sub="Per Month" />
                <StatItem label="Response Time" value="45ms" sub="Ultra-Low Latency" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      whileHover={{ y: -15, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card className="border border-white/5 dark:bg-white/[0.03] backdrop-blur-2xl hover:bg-muted/10 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] h-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="p-10 flex flex-col items-center text-center space-y-6 relative z-10">
          <div className="p-5 rounded-[2rem] bg-primary/10 text-primary glow-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:-translate-y-2">
            {icon}
          </div>
          <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground/80 leading-relaxed text-lg">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StudyStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="text-5xl font-black text-primary/10 transition-colors group-hover:text-primary/100 leading-none">
        {number}
      </div>
      <div className="space-y-1">
        <h4 className="text-2xl font-bold tracking-tight text-foreground">{title}</h4>
        <p className="text-muted-foreground leading-snug">{desc}</p>
      </div>
    </div>
  );
}

function StatItem({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <span className="text-5xl font-black tracking-tighter sm:text-6xl text-gradient">{value}</span>
      <div className="text-center">
        <div className="text-sm font-black uppercase text-foreground tracking-widest">{label}</div>
        <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-[0.2em]">{sub}</div>
      </div>
    </div>
  );
}
