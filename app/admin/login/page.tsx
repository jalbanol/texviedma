'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { LoginForm } from '@/components/auth/login-form';

export default function AdminLoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/admin/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{
        background: 'radial-gradient(ellipse at center, rgba(230, 43, 30, 0.15) 0%, rgba(0, 0, 0, 1) 70%)'
      }}>
        <div className="animate-spin h-12 w-12 border-2 border-red-500 border-t-transparent rounded-full relative z-10"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{
        background: 'radial-gradient(ellipse at center, rgba(230, 43, 30, 0.15) 0%, rgba(0, 0, 0, 1) 70%)'
      }}>
        <div className="animate-spin h-12 w-12 border-2 border-red-500 border-t-transparent rounded-full relative z-10"></div>
      </div>
    );
  }

  return <LoginForm />;
}