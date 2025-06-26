'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api, Sponsor } from '@/lib/api';

const sponsorTypes = ['Platino', 'Oro', 'Plata', 'Bronce'] as const;

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      const data = await api.getSponsors();
      setSponsors(data);
    } catch (error) {
      console.error('Error loading sponsors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSponsors = sponsors.filter(sponsor =>
    sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sponsor.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedSponsors = sponsorTypes.reduce((acc, type) => {
    acc[type] = filteredSponsors.filter(sponsor => sponsor.type === type);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Platino': return 'bg-gray-300 text-gray-800';
      case 'Oro': return 'bg-yellow-500 text-yellow-900';
      case 'Plata': return 'bg-gray-400 text-gray-900';
      case 'Bronce': return 'bg-orange-600 text-orange-100';
      default: return 'bg-gray-500 text-gray-100';
    }
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
          <h1 className="text-3xl font-bold text-white">Auspiciadores</h1>
          <p className="text-gray-400">Gestiona los patrocinadores del evento</p>
        </div>
        <Button className="bg-tedx-red hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Auspiciador
        </Button>
      </div>

      {/* Search */}
      <Card className="glass border-white/10 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar auspiciadores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-white/20 bg-white/5"
          />
        </div>
      </Card>

      {/* Sponsors by Type */}
      {sponsorTypes.map((type) => (
        <div key={type} className="space-y-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-white">{type}</h2>
            <Badge className={getTypeColor(type)}>
              {groupedSponsors[type]?.length || 0} auspiciadores
            </Badge>
          </div>

          {groupedSponsors[type]?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedSponsors[type].map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass border-white/10 p-4 hover:glow transition-all">
                    <div className="flex items-center space-x-4 mb-3">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-12 h-12 object-contain rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{sponsor.name}</h3>
                        <p className="text-xs text-gray-400">{sponsor.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 glass border-white/20">
                        <Edit className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="glass border-white/20"
                        onClick={() => window.open(sponsor.link, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="glass border-red-500/20 text-red-400"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="glass border-white/10 p-8 text-center">
              <p className="text-gray-400">No hay auspiciadores {type.toLowerCase()}</p>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}