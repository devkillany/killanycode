'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Mail, 
  Calendar, 
  Code2, 
  BookOpen, 
  LogOut, 
  Edit3,
  Award,
  Zap,
  Cpu
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const [stats, setStats] = useState({
    snippets: 0,
    lessons: 0,
    contributionDays: 0
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    
    if (user) {
      setStats({
        snippets: 12,
        lessons: 5,
        contributionDays: 42
      });
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="container py-24 space-y-12 animate-pulse">
        <Skeleton className="h-48 w-full rounded-3xl bg-primary/5" />
        <div className="grid gap-8 md:grid-cols-3">
          <Skeleton className="h-40 rounded-3xl bg-primary/5" />
          <Skeleton className="h-40 rounded-3xl bg-primary/5" />
          <Skeleton className="h-40 rounded-3xl bg-primary/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-grid-pattern pb-20">
      <div className="container px-4 pt-32 pb-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* ─── Profile Header ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <Card className="border border-white/5 bg-background/40 backdrop-blur-3xl overflow-hidden rounded-[3rem] shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
              <div className="h-48 bg-gradient-to-r from-primary/40 via-accent/20 to-primary/40 relative animate-gradient">
                 <div className="absolute inset-0 bg-black/20" />
                 <div className="absolute -bottom-14 left-12 p-1.5 bg-background/50 backdrop-blur-xl rounded-[2.5rem] border-4 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                   <div className="bg-primary/20 p-8 rounded-[2rem] glow-primary">
                     <User className="h-16 w-16 text-primary" />
                   </div>
                 </div>
              </div>
              <CardContent className="pt-20 pb-12 px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                  <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tighter text-gradient">{user.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium">
                      <span className="flex items-center gap-2 px-3 py-1 bg-muted/30 rounded-full border border-white/5">
                        <Mail className="h-4 w-4 text-primary" /> {user.email}
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 bg-muted/30 rounded-full border border-white/5">
                        <Award className="h-4 w-4 text-accent" /> Premium Engineer
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="rounded-2xl glass border-white/10 hover:bg-primary/10 gap-2 h-14 px-8 font-bold">
                      <Edit3 className="h-5 w-5" /> Edit Profile
                    </Button>
                    <Button variant="destructive" size="lg" className="rounded-2xl gap-2 h-14 px-8 font-bold shadow-lg shadow-destructive/20" onClick={() => {
                      logout();
                      router.push('/');
                    }}>
                      <LogOut className="h-5 w-5" /> Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ─── Stats Grid ───────────────────────────────── */}
          <div className="grid gap-8 md:grid-cols-3">
            <StatCard 
              icon={<Code2 className="h-8 w-8" />}
              label="Snippets Saved"
              value={stats.snippets}
              color="primary"
              delay={0.1}
            />
            <StatCard 
              icon={<BookOpen className="h-8 w-8" />}
              label="Lessons Mastered"
              value={stats.lessons}
              color="accent"
              delay={0.2}
            />
            <StatCard 
              icon={<Zap className="h-8 w-8" />}
              label="Activity Streak"
              value={`${stats.contributionDays} Days`}
              color="primary"
              delay={0.3}
            />
          </div>

          {/* ─── Bottom Layout ───────────────────────────── */}
          <div className="grid gap-8 lg:grid-cols-5">
            
            {/* Achievements */}
            <Card className="lg:col-span-3 border border-white/5 bg-background/40 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-xl">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary"><Award className="h-6 w-6" /></div>
                  Personal Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <AchievementItem 
                    title="Early Adopter" 
                    description="Pioneer member of the KillanyCode ecosystem." 
                    icon={<Zap className="h-4 w-4" />}
                  />
                  <AchievementItem 
                    title="Speed Demon" 
                    description="Over 100 snippet executions recorded." 
                    icon={<Cpu className="h-4 w-4" />}
                  />
                  <AchievementItem 
                    title="Polyglot" 
                    description="Mastery across 5+ diverse languages." 
                    icon={<Code2 className="h-4 w-4" />}
                  />
                  <AchievementItem 
                    title="Library Architect" 
                    description="Structured 10+ custom snippet categories." 
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="lg:col-span-2 border border-white/5 bg-background/40 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent/10 text-accent"><Calendar className="h-6 w-6" /></div>
                  Ecosystem Status
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6 mt-4">
                 <StatusRow label="Account Tier" value="Standard Elite" highlight />
                 <StatusRow label="Identity Status" value="Verified" color="text-green-500" />
                 <StatusRow label="Inception Date" value="March 2024" />
                 <div className="pt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Developer Tip</p>
                    <p className="text-sm text-muted-foreground leading-snug">Use the AI Optimizer to reduce your snippet complexity by up to 40%.</p>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, delay }: { icon: React.ReactNode; label: string; value: string | number; color: 'primary' | 'accent'; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Card className="border border-white/5 bg-background/40 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-xl group cursor-default h-full">
        <div className="flex items-center gap-6">
          <div className={`p-4 rounded-2xl bg-${color}/10 text-${color} transition-all duration-500 group-hover:bg-${color} group-hover:text-white shadow-lg`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
            <p className="text-4xl font-black tracking-tighter mt-1">{value}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function AchievementItem({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-3xl bg-muted/30 border border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 group">
      <div className="mt-1 p-2 rounded-lg bg-background border border-white/5 text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm font-black tracking-tight">{title}</p>
        <p className="text-xs text-muted-foreground leading-snug mt-1">{description}</p>
      </div>
    </div>
  );
}

function StatusRow({ label, value, highlight, color }: { label: string; value: string; highlight?: boolean; color?: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className={cn(
        "font-bold",
        highlight ? "text-primary px-3 py-1 bg-primary/10 rounded-full" : color || "text-foreground"
      )}>
        {value}
      </span>
    </div>
  );
}
