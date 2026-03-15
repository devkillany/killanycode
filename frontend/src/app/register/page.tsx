'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { User, Mail, Lock, ArrowRight, UserPlus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      login(response.data.token, response.data.user);
      router.push('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-grid-pattern flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring' as const, stiffness: 100 }}
        className="w-full max-w-lg relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-[3rem] blur-2xl opacity-20 animate-pulse" />
        
        <Card className="relative border-white/5 bg-background/40 backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <CardHeader className="space-y-6 text-center pb-10">
            <div className="mx-auto p-4 rounded-3xl bg-accent/10 border border-accent/20 w-fit glow-accent">
              <UserPlus className="h-10 w-10 text-accent" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-4xl font-black tracking-tighter text-gradient-alt leading-tight">Neural Enrollment</CardTitle>
              <CardDescription className="text-lg font-medium text-muted-foreground/80 leading-relaxed">
                Register your unique signature within the KillanyCode global network.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-4">
                <div className="group relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <Input 
                    name="name"
                    type="text" 
                    placeholder="Full Signature Name" 
                    className="pl-14 h-16 rounded-2xl border-white/5 bg-background/50 backdrop-blur-xl font-bold transition-all focus-visible:ring-accent/20"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="group relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    name="email"
                    type="email" 
                    placeholder="E-mail Vector" 
                    className="pl-14 h-16 rounded-2xl border-white/5 bg-background/50 backdrop-blur-xl font-bold transition-all focus-visible:ring-primary/20"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="group relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="Access Key" 
                    className="pl-14 h-16 rounded-2xl border-white/5 bg-background/50 backdrop-blur-xl font-bold transition-all focus-visible:ring-accent/20"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="group relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                  <Input 
                    name="confirmPassword"
                    type="password" 
                    placeholder="Verify Access Key" 
                    className="pl-14 h-16 rounded-2xl border-white/5 bg-background/50 backdrop-blur-xl font-bold transition-all focus-visible:ring-accent/20"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-black uppercase tracking-widest text-destructive text-center bg-destructive/5 p-4 rounded-xl border border-destructive/10"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-16 rounded-2xl glow-accent bg-accent text-accent-foreground font-black tracking-tight flex items-center justify-center gap-3 text-lg group-active:scale-95 transition-all shadow-xl hover:bg-accent/90 mt-4" 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                {isLoading ? 'SYNCING DATA...' : 'REALIZE ENROLLMENT'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="p-0 pt-10 flex flex-col space-y-6 border-t border-white/5 mt-10">
            <div className="text-center w-full">
              <span className="text-sm font-medium text-muted-foreground">Existing Operative? </span>
              <Link href="/login" className="text-accent hover:text-accent-foreground hover:bg-accent/10 px-3 py-1 rounded-lg transition-all font-black uppercase text-xs tracking-widest">
                 Log In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
