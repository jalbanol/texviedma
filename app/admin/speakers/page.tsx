'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api, Speaker } from '@/lib/api';
import { SpeakerModal } from '@/components/admin/speaker-modal';

export default function AdminSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);

  useEffect(() => {
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    try {
      const data = await api.getSpeakers();
      setSpeakers(data);
    } catch (error) {
      console.error('Error loading speakers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSpeakers = speakers.filter(speaker =>
    `${speaker.firstName} ${speaker.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (speaker: Speaker) => {
    setEditingSpeaker(speaker);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSpeaker(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este orador?')) {
      // Simulate delete
      setSpeakers(speakers.filter(s => s.id !== id));
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
          <h1 className="text-3xl font-bold text-white">Oradores</h1>
          <p className="text-gray-400">Gestiona los oradores del evento</p>
        </div>
        <Button onClick={handleAdd} className="bg-tedx-red hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Orador
        </Button>
      </div>

      {/* Search */}
      <Card className="glass border-white/10 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar oradores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-white/20 bg-white/5"
          />
        </div>
      </Card>

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpeakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass border-white/10 overflow-hidden group hover:glow transition-all">
              <div className="relative">
                <img
                  src={speaker.photo}
                  alt={`${speaker.firstName} ${speaker.lastName}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-2 right-2 bg-tedx-red">
                  #{speaker.order}
                </Badge>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-white">
                    {speaker.firstName} {speaker.lastName}
                  </h3>
                  <p className="text-sm tedx-red font-medium">{speaker.topic}</p>
                </div>
                
                <p className="text-xs text-gray-400 line-clamp-2">
                  {speaker.biography}
                </p>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(speaker)}
                    className="flex-1 glass border-white/20"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(speaker.id)}
                    className="glass border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSpeakers.length === 0 && (
        <Card className="glass border-white/10 p-12 text-center">
          <p className="text-gray-400">No se encontraron oradores</p>
        </Card>
      )}

      <SpeakerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        speaker={editingSpeaker}
        onSave={loadSpeakers}
      />
    </div>
  );
}