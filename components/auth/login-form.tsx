'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Lock, Mail, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/auth/auth-provider';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        toast.error(error);
      } else {
        toast.success('¡Bienvenido al panel de administración!');
      }
    } catch (error) {
      toast.error('Error inesperado al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background Elements - Centered properly */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full border border-red-500/20"
        />
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] lg:w-[1200px] lg:h-[1200px] rounded-full border border-red-500/10"
        />
        
        {/* Additional gradient overlay for more depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-background/50" />
        
        {/* Floating particles effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="absolute inset-0"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Login Card - Perfectly centered */}
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm relative z-10"
      >
        <Card className="glass border-white/20 dark:border-white/10 p-6 sm:p-8 mx-auto backdrop-blur-xl bg-white/90 dark:bg-black/20">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 glass rounded-full mb-4 bg-gradient-to-br from-red-500/20 to-transparent">
                <Lock className="h-7 w-7 tedx-red" />
              </div>
            </motion.div>
            
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Panel de Administración
            </h1>
            <div className="font-bold text-lg mb-3">
              <span className="tedx-red">TEDx</span>
              <span className="text-gray-800 dark:text-white">Viedma</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800 dark:text-white text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="pl-10 glass border-gray-300 dark:border-white/20 bg-white/70 dark:bg-white/5 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 h-12 text-sm focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50"
                  placeholder="admin@tedxviedma.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-800 dark:text-white text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="pl-10 pr-10 glass border-gray-300 dark:border-white/20 bg-white/70 dark:bg-white/5 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 h-12 text-sm focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50"
                  placeholder="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-white/10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-tedx-red hover:bg-red-700 glow py-3 h-12 text-sm font-medium transition-all duration-200"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 glass rounded-lg border border-blue-500/20 bg-blue-500/5">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm">Credenciales de prueba:</h3>
            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
              <p><strong>Email:</strong> admin@tedxviedma.com</p>
              <p><strong>Contraseña:</strong> admin123</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}