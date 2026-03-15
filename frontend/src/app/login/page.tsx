'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Lock, Mail, Key, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token, response.data.user);
      
      if (response.data.user.email === 'admin@killanycode.com') {
        router.push('/dashboard');
      } else {
        router.push('/profile');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-grid-pattern flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring' as const, stiffness: 100 }}
        className="w-full max-w-lg relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-[3rem] blur-2xl opacity-20 animate-pulse" />
        
        <Card className="relative border-white/5 bg-background/40 backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <CardHeader className="space-y-6 text-center pb-10">
            <div className="mx-auto p-4 rounded-3xl bg-primary/10 border border-primary/20 w-fit glow-primary">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-4xl font-black tracking-tighter text-gradient leading-tight">Identity Verification</CardTitle>
              <CardDescription className="text-lg font-medium text-muted-foreground/80 leading-relaxed">
                Connect your neural fingerprint to access the KillanyCode compute cluster.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="group relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="email" 
                    placeholder="E-mail Vector" 
                    className="pl-14 h-16 rounded-2xl border-white/5 bg-background/50 backdrop-blur-xl font-bold transition-all focus-visible:ring-primary/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="group relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <Input 
                    type="password" 
                    placeholder="Access Key" 
                    className="pl-14 h-16 rounded-2xl border-white/5 bg-background/50 backdrop-blur-xl font-bold transition-all focus-visible:ring-accent/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-destructive bg-destructive/5 p-4 rounded-xl border border-destructive/10"
                  >
                    <ArrowRight className="h-3 w-3" /> {error}
                  </motion.div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-16 rounded-2xl glow-primary font-black tracking-tight flex items-center justify-center gap-3 text-lg group-active:scale-95 transition-all shadow-xl" 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Key className="h-5 w-5" />}
                {isLoading ? 'ESTABLISHING LINK...' : 'INITIATE UPLINK'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="p-0 pt-10 flex flex-col space-y-6 border-t border-white/5 mt-10">
            <div className="text-center w-full">
              <span className="text-sm font-medium text-muted-foreground">New Operative? </span>
              <Link href="/register" className="text-primary hover:text-primary-foreground hover:bg-primary/10 px-3 py-1 rounded-lg transition-all font-black uppercase text-xs tracking-widest">
                Create Credentials
              </Link>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-center w-full text-muted-foreground opacity-30">
              SECURED BY ENG. MOHAMED ELKILLANY
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
