'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function Footer() {
  const { dict } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/tedxviedma', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/tedxviedma', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/tedxviedma', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/tedxviedma', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-black/90 border-t border-gray-200 dark:border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-bold text-2xl">
              <span className="tedx-red">TEDx</span>
              <span className="text-gray-900 dark:text-white">Viedma</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {dict.footer?.description || 'Evento independiente organizado bajo licencia TED'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              TEDx es un programa de eventos locales, autoorganizados, que reúnen a personas para compartir una experiencia similar a TED.{' '}
              <a
                href="https://www.ted.com/tedx"
                target="_blank"
                rel="noopener noreferrer"
                className="tedx-red hover:underline"
              >
                Más información
              </a>
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">{dict.footer?.contact || 'Contacto'}</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 tedx-red" />
                <span>info@tedxviedma.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 tedx-red" />
                <span>Viedma, Río Negro, Argentina</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Enlaces Rápidos</h3>
            <div className="space-y-2 text-sm">
              <Link href="/speakers" className="block text-gray-600 dark:text-gray-400 hover:tedx-red transition-colors">
                {dict.nav?.speakers || 'Oradores'}
              </Link>
              <Link href="/gallery" className="block text-gray-600 dark:text-gray-400 hover:tedx-red transition-colors">
                {dict.nav?.gallery || 'Galería'}
              </Link>
              <Link href="/team" className="block text-gray-600 dark:text-gray-400 hover:tedx-red transition-colors">
                {dict.nav?.team || 'Equipo'}
              </Link>
              <Link href="/contact" className="block text-gray-600 dark:text-gray-400 hover:tedx-red transition-colors">
                {dict.nav?.contact || 'Contacto'}
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">{dict.footer?.followUs || 'Síguenos'}</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 glass rounded-full hover:glow transition-all"
                >
                  <Icon className="h-5 w-5 tedx-red" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 TEDxViedma. This independent TEDx event is operated under license from TED.
          </div>
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/privacy" className="hover:tedx-red transition-colors">
              {dict.footer?.privacy || 'Política de Privacidad'}
            </Link>
            <Link href="/terms" className="hover:tedx-red transition-colors">
              {dict.footer?.terms || 'Términos y Condiciones'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}