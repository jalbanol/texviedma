'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Play, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

export function Hero() {
  const { dict } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-red-500/20"
        />
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-red-500/10"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold hero-text"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, type: "spring" }}
          >
            <span className="tedx-red">TEDx</span>
            <span className="text-gray-900 dark:text-white">Viedma</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light"
          >
            {dict.hero?.subtitle || 'Ideas que transforman'}
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {dict.hero?.description || 'Evento independiente organizado bajo licencia TED'}
          </motion.p>
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
        >
          <div className="glass p-6 rounded-lg text-center">
            <Calendar className="h-8 w-8 tedx-red mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Fecha</h3>
            <p className="text-gray-700 dark:text-gray-300">{dict.hero?.date || '15 de Marzo, 2025'}</p>
          </div>
          
          <div className="glass p-6 rounded-lg text-center">
            <MapPin className="h-8 w-8 tedx-red mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Lugar</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {dict.hero?.location || 'Teatro Municipal de Viedma'}
              <br />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {dict.hero?.city || 'Viedma, Río Negro, Argentina'}
              </span>
            </p>
          </div>
          
          <div className="glass p-6 rounded-lg text-center">
            <Users className="h-8 w-8 tedx-red mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Formato</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Presencial + Streaming
              <br />
              <span className="text-xs text-gray-600 dark:text-gray-400">Alcance global</span>
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Link href="/registration">
            <Button size="lg" className="bg-tedx-red hover:bg-red-700 glow text-lg px-8 py-4">
              <Users className="h-5 w-5 mr-2" />
              {dict.hero?.registerStreaming || 'Registrarse al Streaming'}
            </Button>
          </Link>
          
          <Link href="/speakers">
            <Button variant="outline" size="lg" className="glass border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 text-lg px-8 py-4 text-gray-800 dark:text-white">
              <Play className="h-5 w-5 mr-2" />
              {dict.hero?.viewSpeakers || 'Ver Oradores'}
            </Button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-500 dark:bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}