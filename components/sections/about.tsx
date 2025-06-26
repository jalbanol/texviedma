'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Heart, Globe, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';

export function About() {
  const { dict } = useLanguage();

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">{dict.about?.title || 'Sobre TEDx'}</span>
          </h2>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
          >
            {dict.about?.description || 'TED es una organización sin fines de lucro dedicada a difundir ideas. TEDx es un programa de eventos locales, organizados independientemente, bajo licencia de TED.'}
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 mb-12"
          >
            {dict.about?.communityNote || 'Este evento es autoorganizado por una comunidad local comprometida con compartir ideas que vale la pena difundir.'}
          </motion.p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg"
            >
              <Globe className="h-12 w-12 tedx-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Conectamos ideas locales con una audiencia mundial
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg"
            >
              <Users className="h-12 w-12 tedx-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Comunidad</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Organizado por y para la comunidad de Viedma
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg"
            >
              <Heart className="h-12 w-12 tedx-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Pasión</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Impulsado por la pasión de compartir ideas transformadoras
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <a
              href={dict.about?.tedxLink || 'https://www.ted.com/tedx'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="glass border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white">
                <ExternalLink className="h-4 w-4 mr-2" />
                {dict.about?.learnMore || 'Conoce más sobre TEDx'}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}