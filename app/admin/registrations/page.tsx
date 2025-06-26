'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Filter, Eye, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}

const mockRegistrations: Registration[] = [
  {
    id: '1',
    firstName: 'Ana',
    lastName: 'García',
    email: 'ana.garcia@email.com',
    reason: 'Me interesa mucho el tema de innovación y tecnología. Creo que TEDx es una excelente plataforma para aprender.',
    createdAt: '2025-01-15T10:30:00Z',
    status: 'confirmed'
  },
  {
    id: '2',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.rodriguez@email.com',
    reason: 'Soy emprendedor y busco inspiración para mi startup. Las charlas TED siempre me motivan.',
    createdAt: '2025-01-15T09:15:00Z',
    status: 'confirmed'
  },
  {
    id: '3',
    firstName: 'María',
    lastName: 'López',
    email: 'maria.lopez@email.com',
    reason: 'Trabajo en educación y me interesan las nuevas metodologías de enseñanza.',
    createdAt: '2025-01-14T16:45:00Z',
    status: 'pending'
  }
];

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending'>('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRegistrations(mockRegistrations);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      `${reg.firstName} ${reg.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const exportToExcel = () => {
    // Simulate export
    alert('Exportando a Excel...');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-red-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Inscriptos al Streaming</h1>
          <p className="text-gray-400">Gestiona las inscripciones al evento virtual</p>
        </div>
        <Button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Exportar Excel
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass border-white/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{registrations.length}</p>
            <p className="text-sm text-gray-400">Total Inscriptos</p>
          </div>
        </Card>
        <Card className="glass border-white/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {registrations.filter(r => r.status === 'confirmed').length}
            </p>
            <p className="text-sm text-gray-400">Confirmados</p>
          </div>
        </Card>
        <Card className="glass border-white/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {registrations.filter(r => r.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-400">Pendientes</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass border-white/10 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-white/20 bg-white/5"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
              size="sm"
            >
              Todos
            </Button>
            <Button
              variant={statusFilter === 'confirmed' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('confirmed')}
              size="sm"
            >
              Confirmados
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('pending')}
              size="sm"
            >
              Pendientes
            </Button>
          </div>
        </div>
      </Card>

      {/* Registrations List */}
      <div className="space-y-4">
        {filteredRegistrations.map((registration, index) => (
          <motion.div
            key={registration.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass border-white/10 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-white">
                      {registration.firstName} {registration.lastName}
                    </h3>
                    <Badge 
                      variant={registration.status === 'confirmed' ? 'default' : 'secondary'}
                      className={registration.status === 'confirmed' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {registration.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{registration.email}</p>
                  <p className="text-sm text-gray-300 line-clamp-2">{registration.reason}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Inscrito: {new Date(registration.createdAt).toLocaleDateString('es-AR')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    <Eye className="h-3 w-3 mr-1" />
                    Ver
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    <Mail className="h-3 w-3 mr-1" />
                    Contactar
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredRegistrations.length === 0 && (
        <Card className="glass border-white/10 p-12 text-center">
          <p className="text-gray-400">No se encontraron inscripciones</p>
        </Card>
      )}
    </div>
  );
}