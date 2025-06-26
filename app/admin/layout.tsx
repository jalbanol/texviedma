'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Image, 
  UserCheck, 
  MessageSquare, 
  DollarSign, 
  Languages,
  Instagram,
  Menu,
  X,
  LogOut,
  Settings,
  User as UserIcon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/components/auth/auth-provider';
import { toast } from 'sonner';

const sidebarItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/speakers', icon: Users, label: 'Oradores' },
  { href: '/admin/sponsors', icon: Building2, label: 'Auspiciadores' },
  { href: '/admin/gallery', icon: Image, label: 'Galería' },
  { href: '/admin/social-media', icon: Instagram, label: 'Redes Sociales' },
  { href: '/admin/team', icon: UserCheck, label: 'Equipo' },
  { href: '/admin/registrations', icon: Users, label: 'Inscriptos' },
  { href: '/admin/contact', icon: MessageSquare, label: 'Contacto' },
  { href: '/admin/donations', icon: DollarSign, label: 'Aportes' },
  { href: '/admin/translations', icon: Languages, label: 'Traducciones' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Sesión cerrada exitosamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black dark:bg-black">
        <AnimatedBackground />
        
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Desktop Layout */}
        <div className="hidden lg:flex min-h-screen">
          {/* Desktop Sidebar - Always visible */}
          <aside className="w-64 glass border-r border-white/10 dark:border-white/10 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/10 dark:border-white/10 flex-shrink-0">
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <div className="font-bold text-xl">
                  <span className="tedx-red">TEDx</span>
                  <span className="text-gray-800 dark:text-white">Admin</span>
                </div>
              </Link>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-white/10 dark:border-white/10 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 glass rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-4 w-4 text-gray-800 dark:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Administrador</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-tedx-red text-white' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white'
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium truncate">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 dark:border-white/10 space-y-2 flex-shrink-0">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="truncate">Configuración</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="truncate">Cerrar Sesión</span>
              </Button>
            </div>
          </aside>

          {/* Desktop Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Bar */}
            <header className="glass border-b border-white/10 dark:border-white/10 p-4 flex-shrink-0">
              <div className="flex items-center justify-end space-x-2">
                <ThemeToggle />
                <Link href="/" target="_blank">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass border-white/20 dark:border-white/20"
                  >
                    Ver Sitio Público
                  </Button>
                </Link>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Sidebar */}
          <motion.aside
            initial={false}
            animate={{
              x: sidebarOpen ? 0 : '-100%'
            }}
            className="fixed left-0 top-0 h-full w-64 glass border-r border-white/10 dark:border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 dark:border-white/10 flex-shrink-0">
              <div className="flex items-center justify-between">
                <Link href="/admin/dashboard" className="flex items-center space-x-2">
                  <div className="font-bold text-xl">
                    <span className="tedx-red">TEDx</span>
                    <span className="text-gray-800 dark:text-white">Admin</span>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-800 dark:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-white/10 dark:border-white/10 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 glass rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-4 w-4 text-gray-800 dark:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Administrador</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-tedx-red text-white' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white'
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium truncate">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 dark:border-white/10 space-y-2 flex-shrink-0">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="truncate">Configuración</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="truncate">Cerrar Sesión</span>
              </Button>
            </div>
          </motion.aside>

          {/* Mobile Main Content */}
          <div className="min-h-screen">
            {/* Mobile Top Bar */}
            <header className="glass border-b border-white/10 dark:border-white/10 p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-800 dark:text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                
                <div className="flex items-center space-x-2">
                  <ThemeToggle />
                  <Link href="/" target="_blank">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="glass border-white/20 dark:border-white/20"
                    >
                      Sitio
                    </Button>
                  </Link>
                </div>
              </div>
            </header>

            {/* Mobile Page Content */}
            <main className="p-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}