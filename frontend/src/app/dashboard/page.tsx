'use client';

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

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your content and monitor platform performance.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add New Snippet
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Snippets" value="1,284" change="+12% from last month" icon={<FileCode className="h-4 w-4" />} />
          <StatCard title="Active Users" value="2,350" change="+180.1% since yesterday" icon={<Users className="h-4 w-4" />} />
          <StatCard title="Total Lessons" value="24" change="+2 from last month" icon={<GraduationCap className="h-4 w-4" />} />
          <StatCard title="Page Views" value="45,231" change="+20.1% from last month" icon={<Eye className="h-4 w-4" />} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Main Content Area */}
          <Card className="col-span-full lg:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px] flex items-center justify-center text-muted-foreground italic border-2 border-dashed rounded-lg mx-4">
                Chart Placeholder (Chart.js / Recharts integration coming soon)
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions / Categories */}
          <Card className="col-span-full lg:col-span-3">
            <CardHeader>
              <CardTitle>Quick Management</CardTitle>
              <CardDescription>Direct access to content creation and editing.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ManagementItem 
                icon={<Globe className="h-5 w-5 text-blue-500" />}
                title="Manage Languages"
                description="Edit icons and display names for supported languages."
              />
              <ManagementItem 
                icon={<FileCode className="h-5 w-5 text-yellow-500" />}
                title="Manage Snippets"
                description="Review, edit, or delete existing code snippets."
              />
              <ManagementItem 
                icon={<GraduationCap className="h-5 w-5 text-green-500" />}
                title="Manage Lessons"
                description="Create new tutorials or update existing ones."
              />
              <ManagementItem 
                icon={<Settings className="h-5 w-5 text-zinc-500" />}
                title="Platform Settings"
                description="Configure AI limits and general app preferences."
              />
            </CardContent>
          </Card>
        </div>
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
