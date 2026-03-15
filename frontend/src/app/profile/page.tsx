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
  Zap
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
    
    // Simulate fetching user stats
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
      <div className="container py-12 space-y-8">
        <Skeleton className="h-40 w-full rounded-xl" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary/20 bg-muted/20 backdrop-blur-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/30 to-blue-600/30 relative">
               <div className="absolute -bottom-10 left-8 p-1 bg-background rounded-full border-4 border-muted">
                 <div className="bg-primary/10 p-6 rounded-full">
                   <User className="h-12 w-12 text-primary" />
                 </div>
               </div>
            </div>
            <CardContent className="pt-14 pb-8 px-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" /> {user.email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit3 className="h-4 w-4" /> Edit Profile
                  </Button>
                  <Button variant="destructive" size="sm" className="gap-2" onClick={() => {
                    logout();
                    router.push('/');
                  }}>
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard 
            icon={<Code2 className="h-5 w-5 text-blue-500" />}
            label="Snippets Saved"
            value={stats.snippets}
            color="blue"
          />
          <StatCard 
            icon={<BookOpen className="h-5 w-5 text-green-500" />}
            label="Lessons Completed"
            value={stats.lessons}
            color="green"
          />
          <StatCard 
            icon={<Zap className="h-5 w-5 text-yellow-500" />}
            label="Contribution Streak"
            value={`${stats.contributionDays} Days`}
            color="yellow"
          />
        </div>

        {/* Recent Activity Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AchievementItem title="Early Adopter" description="Joined KillanyCode in its first year." />
                <AchievementItem title="Speed Demon" description="Ran over 100 snippets in the compiler." />
                <AchievementItem title="Code Master" description="Saved snippets in 5 different languages." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground">Account Type</span>
                 <span className="font-bold text-primary px-2 py-0.5 bg-primary/10 rounded">Standard User</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground">Email Status</span>
                 <span className="text-green-500 font-medium">Verified</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground">Member Since</span>
                 <span>March 2024</span>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AchievementItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-transparent hover:border-border transition-colors">
      <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
