'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Lock, Mail, Key, ArrowRight, ShieldCheck } from 'lucide-react';
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
      
      // If it's the admin, they might want to go to dashboard
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
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/20 shadow-xl overflow-hidden">
          <div className="h-2 bg-primary" />
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
            <CardDescription>
              Enter the administration password to manage KillanyCode.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    className="pl-10 h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="pl-10 h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-xs text-destructive font-medium ml-1">{error}</p>}
              </div>
              <Button type="submit" className="w-full h-12 gap-2 text-base" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Login Now'} <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col bg-muted/30 border-t p-4 space-y-3">
            <p className="text-sm text-center w-full">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-bold">
                Create one
              </Link>
            </p>
            <p className="text-xs text-center w-full text-muted-foreground">
              Built by <span className="font-bold">Eng. Mohamed Elkillany</span>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
