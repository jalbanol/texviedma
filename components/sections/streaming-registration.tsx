'use client';

import { motion } from 'framer-motion';
import { Users, Gift, Play, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

export function StreamingRegistration() {
  const { dict } = useLanguage();

  const benefits = [
    {
      icon: Play,
      title: 'Streaming en Vivo',
      description: 'Acceso garantizado a todas las charlas en tiempo real'
    },
    {
      icon: Gift,
      title: 'Sorteo Presencial',
      description: 'Participás automáticamente por uno de los 50 cupos presenciales'
    },
    {
      icon: Users,
      title: 'Chat Interactivo',
      description: 'Conectá con otros participantes durante el evento'
    },
    {
      icon: Sparkles,
      title: 'Contenido Exclusivo',
      description: 'Material adicional y behind-the-scenes post-evento'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Card */}
          <Card className="glass border-gray-200 dark:border-white/10 p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-500/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              {/* Header */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 glass rounded-full mr-4">
                    <Gift className="h-8 w-8 tedx-red" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="text-gradient">¡Súmate al streaming y participá por tu entrada presencial!</span>
                  </h2>
                </div>
                
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  Registrate gratis, viví TEDxViedma online y entrá en el sorteo de uno de los 50 cupos presenciales gratuitos.
                </p>
              </motion.div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Description */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Diseñado para todo el mundo
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      TEDxViedma 2025 está diseñado para que todo el mundo pueda inspirarse desde cualquier lugar mediante streaming en tiempo real. Al registrarte, obtendrás acceso online garantizado y entrarás automáticamente en el sorteo de algunos cupos presenciales que se estarán sorteando.
                    </p>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit.title}
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3"
                      >
                        <div className="p-2 glass rounded-lg flex-shrink-0">
                          <benefit.icon className="h-5 w-5 tedx-red" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{benefit.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right side - CTA */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Card className="glass border-red-500/20 p-8 bg-gradient-to-br from-red-500/5 to-transparent">
                    <div className="space-y-6">
                      {/* Icon */}
                      <div className="flex justify-center">
                        <div className="p-4 glass rounded-full bg-gradient-to-br from-red-500/20 to-transparent">
                          <Users className="h-12 w-12 tedx-red" />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold tedx-red">∞</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Cupos Streaming</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold tedx-red">50</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Cupos Presenciales</div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-gray-700 dark:text-gray-300">Registro 100% gratuito</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-gray-700 dark:text-gray-300">Acceso inmediato al streaming</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-gray-700 dark:text-gray-300">Participación automática en sorteo</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link href="/registration">
                        <Button 
                          size="lg" 
                          className="w-full bg-tedx-red hover:bg-red-700 glow text-lg py-4 font-semibold"
                        >
                          <Gift className="h-5 w-5 mr-2" />
                          Registrarme y entrar al sorteo
                        </Button>
                      </Link>

                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        El sorteo se realizará 30 días antes del evento
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Bottom Info */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">8 de Septiembre</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">19:00 hs (Argentina)</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">10 Charlas</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Ideas transformadoras</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Centro Cultural</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Viedma, Río Negro</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}