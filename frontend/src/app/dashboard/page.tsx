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
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your platform content and monitor performance.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Platform Overview" value="Secure" change="All systems operational" icon={<LayoutDashboard className="h-4 w-4" />} />
          <StatCard title="Admin Access" value="Granted" change="Logged in successfully" icon={<Users className="h-4 w-4" />} />
          <StatCard title="Active Session" value="Now" change="Managing content" icon={<BarChart3 className="h-4 w-4" />} />
          <StatCard title="System Mode" value="Active" change="CRUD functionality enabled" icon={<Settings className="h-4 w-4" />} />
        </div>

        <Tabs defaultValue="snippets" className="space-y-4">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="snippets" className="gap-2">
              <FileCode className="h-4 w-4" /> Snippets
            </TabsTrigger>
            <TabsTrigger value="lessons" className="gap-2">
              <GraduationCap className="h-4 w-4" /> Lessons
            </TabsTrigger>
            <TabsTrigger value="languages" className="gap-2">
              <Globe className="h-4 w-4" /> Languages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="snippets" className="space-y-4">
            <SnippetManager />
          </TabsContent>
          
          <TabsContent value="lessons" className="space-y-4">
            <LessonManager />
          </TabsContent>
          
          <TabsContent value="languages" className="space-y-4">
            <LanguageManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
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
