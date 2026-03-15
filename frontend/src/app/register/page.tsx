'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { User, Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';
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
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/20 shadow-xl overflow-hidden bg-background/50 backdrop-blur-sm">
          <div className="h-1.5 bg-gradient-to-r from-primary to-blue-600 w-full" />
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Join the KillanyCode community today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="name"
                    type="text" 
                    placeholder="Full Name" 
                    className="pl-10"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="email"
                    type="email" 
                    placeholder="Email Address" 
                    className="pl-10"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    className="pl-10"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="confirmPassword"
                    type="password" 
                    placeholder="Confirm Password" 
                    className="pl-10"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {error && <p className="text-xs text-destructive font-medium text-center">{error}</p>}
              <Button type="submit" className="w-full h-11 gap-2 text-base mt-2" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign Up'} <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
