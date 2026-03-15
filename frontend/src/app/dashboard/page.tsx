'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileCode,
  GraduationCap,
  Globe,
  Settings,
  Plus,
  BarChart3,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SnippetManager } from '@/components/dashboard/SnippetManager';
import { LessonManager } from '@/components/dashboard/LessonManager';
import { LanguageManager } from '@/components/dashboard/LanguageManager';

export default function DashboardPage() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated !== 'true') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="relative min-h-screen bg-grid-pattern pb-20 pt-32">
      <div className="container px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* ─── Dashboard Header ───────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
                 <LayoutDashboard className="h-3 w-3" /> System Root
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-gradient leading-tight">
                Admin Command Center
              </h1>
              <p className="text-xl text-muted-foreground/80 font-medium max-w-2xl">
                Global orchestration of code assets, educational modules, and ecosystem parameters.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[10px] font-black">
                      OP
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-background bg-primary/20 text-primary flex items-center justify-center text-[10px] font-black">
                    +5
                  </div>
               </div>
               <div className="h-10 w-px bg-white/10 mx-2" />
               <Button variant="outline" className="h-12 rounded-xl glass border-white/10 font-bold gap-2">
                 <Settings className="h-4 w-4" /> Global Config
               </Button>
            </div>
          </div>

          {/* ─── Stats Grid ─────────────────────────────── */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="NETWORK STATUS" 
              value="SECURE" 
              description="ALL SYSTEMS VIGILANT" 
              icon={<div className="p-2 rounded-lg bg-green-500/10 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]"><Globe className="h-5 w-5" /></div>} 
              trend="+0ms latency"
            />
            <StatCard 
              title="ACCESS VECTOR" 
              value="ROOT" 
              description="PRIVILEGED SESSION ACTIVE" 
              icon={<div className="p-2 rounded-lg bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]"><Users className="h-5 w-5" /></div>} 
              trend="2FA Verified"
            />
            <StatCard 
              title="THROUGHPUT" 
              value="ACTIVE" 
              description="PROCESSING REQUESTS" 
              icon={<div className="p-2 rounded-lg bg-accent/10 text-accent shadow-[0_0_15px_rgba(var(--accent),0.2)]"><TrendingUp className="h-5 w-5" /></div>} 
              trend="1.2k ops/s"
            />
            <StatCard 
              title="COMPILER NODE" 
              value="SYNCED" 
              description="RTS ENABLED" 
              icon={<div className="p-2 rounded-lg bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"><BarChart3 className="h-5 w-5" /></div>} 
              trend="99.9% Uptime"
            />
          </div>

          {/* ─── Management Interface ───────────────────── */}
          <Tabs defaultValue="snippets" className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <TabsList className="bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl h-14">
                <TabsTrigger value="snippets" className="rounded-xl px-8 font-black text-xs uppercase tracking-widest gap-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:glow-primary transition-all">
                  <FileCode className="h-4 w-4" /> Snippets
                </TabsTrigger>
                <TabsTrigger value="lessons" className="rounded-xl px-8 font-black text-xs uppercase tracking-widest gap-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:glow-primary transition-all">
                  <GraduationCap className="h-4 w-4" /> Lessons
                </TabsTrigger>
                <TabsTrigger value="languages" className="rounded-xl px-8 font-black text-xs uppercase tracking-widest gap-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:glow-primary transition-all">
                  <Globe className="h-4 w-4" /> Languages
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex items-center gap-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Cluster: EU-CENTRAL-1</span>
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-[3rem] blur-2xl opacity-50" />
              <TabsContent value="snippets" className="relative z-10 space-y-4 focus-visible:outline-none focus-visible:ring-0">
                <SnippetManager />
              </TabsContent>
              
              <TabsContent value="lessons" className="relative z-10 space-y-4 focus-visible:outline-none focus-visible:ring-0">
                <LessonManager />
              </TabsContent>
              
              <TabsContent value="languages" className="relative z-10 space-y-4 focus-visible:outline-none focus-visible:ring-0">
                <LanguageManager />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, description, icon, trend }: { title: string; value: string; description: string; icon: React.ReactNode; trend: string }) {
  return (
    <Card className="group relative border border-white/5 bg-background/40 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
      <CardHeader className="p-0 flex flex-row items-center justify-between mb-6 relative z-10">
        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="p-0 space-y-1 relative z-10">
        <div className="text-4xl font-black tracking-tighter text-white group-hover:text-gradient transition-all">{value}</div>
        <p className="text-xs font-bold text-muted-foreground/60 leading-tight uppercase tracking-widest">{description}</p>
        <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
           <span className="text-[10px] font-black text-primary/60">{trend}</span>
           <div className="flex gap-1">
              {[1,2,3].map(i => <div key={i} className="h-1 w-3 rounded-full bg-primary/20" />)}
           </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ManagementItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
      <div className="p-2 bg-background rounded-md shadow-sm">{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
      </div>
      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
