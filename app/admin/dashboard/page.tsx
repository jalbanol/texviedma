'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Image, 
  MessageSquare, 
  DollarSign,
  TrendingUp,
  Calendar,
  Globe
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  {
    title: 'Oradores Confirmados',
    value: '8',
    change: '+2 esta semana',
    icon: Users,
    color: 'text-blue-500',
    href: '/admin/speakers'
  },
  {
    title: 'Inscriptos al Streaming',
    value: '1,247',
    change: '+89 hoy',
    icon: Globe,
    color: 'text-green-500',
    href: '/admin/registrations'
  },
  {
    title: 'Auspiciadores',
    value: '12',
    change: '+1 esta semana',
    icon: Building2,
    color: 'text-purple-500',
    href: '/admin/sponsors'
  },
  {
    title: 'Aportes Recibidos',
    value: '$45,230',
    change: '+$2,100 esta semana',
    icon: DollarSign,
    color: 'text-yellow-500',
    href: '/admin/donations'
  }
];

const recentActivity = [
  {
    type: 'speaker',
    message: 'Nuevo orador agregado: María González',
    time: 'Hace 2 horas',
    icon: Users
  },
  {
    type: 'registration',
    message: '15 nuevas inscripciones al streaming',
    time: 'Hace 4 horas',
    icon: Globe
  },
  {
    type: 'contact',
    message: '3 nuevos mensajes de contacto',
    time: 'Hace 6 horas',
    icon: MessageSquare
  },
  {
    type: 'donation',
    message: 'Nueva donación de $500',
    time: 'Hace 1 día',
    icon: DollarSign
  }
];

const quickActions = [
  { title: 'Agregar Orador', href: '/admin/speakers', icon: Users },
  { title: 'Subir Contenido', href: '/admin/gallery', icon: Image },
  { title: 'Ver Mensajes', href: '/admin/contact', icon: MessageSquare },
  { title: 'Gestionar Traducciones', href: '/admin/translations', icon: Globe }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Panel de administración TEDxViedma</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <Card className="glass border-gray-200 dark:border-white/10 p-4 sm:p-6 hover:glow transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-green-400 mt-1 truncate">{stat.change}</p>
                  </div>
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} flex-shrink-0 ml-2`} />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass border-gray-200 dark:border-white/10 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">Actividad Reciente</h3>
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 glass rounded-full flex-shrink-0">
                    <activity.icon className="h-3 w-3 sm:h-4 sm:w-4 tedx-red" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white leading-relaxed">{activity.message}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="glass border-gray-200 dark:border-white/10 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {quickActions.map((action, index) => (
                <Link key={action.title} href={action.href}>
                  <Button
                    variant="outline"
                    className="w-full h-16 sm:h-20 glass border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-gray-800 dark:text-white"
                  >
                    <action.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm text-center leading-tight">{action.title}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Event Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="glass border-gray-200 dark:border-white/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">TEDxViedma 2025</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>8 de Septiembre, 2025</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 flex-shrink-0" />
                  <span>En preparación</span>
                </div>
              </div>
            </div>
            <Link href="/" target="_blank" className="flex-shrink-0">
              <Button className="bg-tedx-red hover:bg-red-700 w-full sm:w-auto">
                <span className="hidden sm:inline">Ver Sitio Público</span>
                <span className="sm:hidden">Ver Sitio</span>
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}