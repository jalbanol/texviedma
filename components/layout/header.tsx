'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLanguage } from '@/components/language-provider';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dict } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: dict.nav?.home || 'Home' },
    { href: '/speakers', label: dict.nav?.speakers || 'Speakers' },
    { href: '/gallery', label: dict.nav?.gallery || 'Gallery' },
    { href: '/team', label: dict.nav?.team || 'Team' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: dict.nav?.contact || 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/10 dark:border-white/10' : 'transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-bold text-lg sm:text-xl tedx-red"
            >
              TEDx<span className="text-white dark:text-white">Viedma</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.span
                  whileHover={{ y: -2 }}
                  className="text-sm font-medium hover:tedx-red transition-colors text-gray-800 dark:text-white"
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link href="/registration">
              <Button size="sm" className="bg-tedx-red hover:bg-red-700 glow text-xs lg:text-sm px-3 lg:px-4">
                <Play className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                <span className="hidden lg:inline">{dict.nav?.streaming || 'Streaming'}</span>
                <span className="lg:hidden">Stream</span>
              </Button>
            </Link>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-white"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 dark:border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 hover:tedx-red transition-colors text-sm text-gray-800 dark:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 dark:border-white/10">
                <Link href="/registration" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full bg-tedx-red hover:bg-red-700 glow">
                    <Play className="h-4 w-4 mr-2" />
                    {dict.nav?.streaming || 'Streaming'}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}