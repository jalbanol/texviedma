'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Play, Image as ImageIcon, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api, MediaItem } from '@/lib/api';

export default function AdminGallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'photo' | 'video'>('all');

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const data = await api.getGallery();
      setMedia(data);
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

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
          <h1 className="text-3xl font-bold text-white">Galería Multimedia</h1>
          <p className="text-gray-400">Gestiona fotos y videos del evento</p>
        </div>
        <Button className="bg-tedx-red hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Subir Contenido
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass border-white/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{media.length}</p>
            <p className="text-sm text-gray-400">Total Items</p>
          </div>
        </Card>
        <Card className="glass border-white/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {media.filter(m => m.type === 'photo').length}
            </p>
            <p className="text-sm text-gray-400">Fotos</p>
          </div>
        </Card>
        <Card className="glass border-white/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              {media.filter(m => m.type === 'video').length}
            </p>
            <p className="text-sm text-gray-400">Videos</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass border-white/10 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por título, descripción o tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-white/20 bg-white/5"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={typeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setTypeFilter('all')}
              size="sm"
            >
              Todos
            </Button>
            <Button
              variant={typeFilter === 'photo' ? 'default' : 'outline'}
              onClick={() => setTypeFilter('photo')}
              size="sm"
            >
              <ImageIcon className="h-3 w-3 mr-1" />
              Fotos
            </Button>
            <Button
              variant={typeFilter === 'video' ? 'default' : 'outline'}
              onClick={() => setTypeFilter('video')}
              size="sm"
            >
              <Play className="h-3 w-3 mr-1" />
              Videos
            </Button>
          </div>
        </div>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass border-white/10 overflow-hidden group hover:glow transition-all">
              <div className="relative aspect-video">
                {item.type === 'photo' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white/50" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge className={item.type === 'photo' ? 'bg-blue-600' : 'bg-purple-600'}>
                    {item.type === 'photo' ? 'Foto' : 'Video'}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-red-500/20 text-red-400">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-white line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <Card className="glass border-white/10 p-12 text-center">
          <p className="text-gray-400">No se encontró contenido multimedia</p>
        </Card>
      )}
    </div>
  );
}