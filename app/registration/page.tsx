'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { api } from '@/lib/api';
import { Users, CheckCircle } from 'lucide-react';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  reason: z.string().min(10, 'Describe brevemente tu motivación (mínimo 10 caracteres)'),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function RegistrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { dict } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationForm) => {
    setIsLoading(true);
    try {
      const result = await api.registerForStreaming(data);
      if (result.success) {
        setIsSuccess(true);
        toast.success(dict.registration?.form?.success || 'Registro exitoso!');
        reset();
      } else {
        toast.error(result.message || 'Error en el registro');
      }
    } catch (error) {
      toast.error(dict.registration?.form?.error || 'Error en el registro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">{dict.registration?.title || 'Registro para Streaming'}</span>
              </h1>
              <p className="text-xl text-gray-300">
                {dict.registration?.subtitle || 'Únete a nosotros virtualmente'}
              </p>
            </div>

            {isSuccess ? (
              /* Success State */
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Card className="glass border-green-500/20 p-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-white mb-4">
                    ¡Registro Exitoso!
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Te hemos enviado un email de confirmación con todos los detalles del streaming.
                  </p>
                  <p className="text-sm text-gray-400 mb-8">
                    El día del evento recibirás el enlace directo para unirte al streaming en vivo.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="glass border-white/20 hover:bg-white/10"
                  >
                    Registrar otra persona
                  </Button>
                </Card>
              </motion.div>
            ) : (
              /* Registration Form */
              <Card className="glass border-white/10 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        {dict.registration?.form?.firstName || 'Nombre'}
                      </Label>
                      <Input
                        id="firstName"
                        {...register('firstName')}
                        className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400"
                        placeholder="Tu nombre"
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-sm">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        {dict.registration?.form?.lastName || 'Apellido'}
                      </Label>
                      <Input
                        id="lastName"
                        {...register('lastName')}
                        className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400"
                        placeholder="Tu apellido"
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-sm">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      {dict.registration?.form?.email || 'Email'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400"
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-white">
                      {dict.registration?.form?.reason || '¿Por qué quieres participar?'}
                    </Label>
                    <Textarea
                      id="reason"
                      {...register('reason')}
                      className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400 min-h-[120px]"
                      placeholder="Cuéntanos qué te motiva a participar en TEDxViedma..."
                    />
                    {errors.reason && (
                      <p className="text-red-400 text-sm">{errors.reason.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-tedx-red hover:bg-red-700 glow py-3 text-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {dict.registration?.form?.submitting || 'Registrando...'}
                      </>
                    ) : (
                      <>
                        <Users className="h-5 w-5 mr-2" />
                        {dict.registration?.form?.submit || 'Registrarse'}
                      </>
                    )}
                  </Button>
                </form>

                {/* Additional Info */}
                <div className="mt-8 p-4 glass rounded-lg border border-blue-500/20">
                  <h3 className="font-semibold text-white mb-2">Información del Streaming</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Fecha: 8 de Septiembre, 2025 - 19:00 hs (Argentina)</li>
                    <li>• Duración aproximada: 3 horas</li>
                    <li>• Plataforma: YouTube Live (enlace enviado por email)</li>
                    <li>• Chat interactivo disponible durante el evento</li>
                  </ul>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}