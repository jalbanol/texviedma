'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, ExternalLink, Play, Image as ImageIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api, SocialMediaPost } from '@/lib/api';
import { SocialMediaModal } from '@/components/admin/social-media-modal';
import { toast } from 'sonner';

export default function AdminSocialMedia() {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialMediaPost | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await api.getSocialMediaPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Error al cargar las publicaciones');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (post: SocialMediaPost) => {
    setEditingPost(post);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPost(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      try {
        const result = await api.deleteSocialMediaPost(id);
        if (result.success) {
          setPosts(posts.filter(p => p.id !== id));
          toast.success('Publicación eliminada exitosamente');
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error('Error al eliminar la publicación');
      }
    }
  };

  const toggleActive = async (post: SocialMediaPost) => {
    try {
      const result = await api.updateSocialMediaPost(post.id, { isActive: !post.isActive });
      if (result.success) {
        setPosts(posts.map(p => 
          p.id === post.id ? { ...p, isActive: !p.isActive } : p
        ));
        toast.success(`Publicación ${!post.isActive ? 'activada' : 'desactivada'}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Error al actualizar la publicación');
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
          <h1 className="text-3xl font-bold text-white">Redes Sociales</h1>
          <p className="text-gray-400">Gestiona el contenido multimedia embebido</p>
        </div>
        <Button onClick={handleAdd} className="bg-tedx-red hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Publicación
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass border-white/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{posts.length}</p>
            <p className="text-sm text-gray-400">Total Publicaciones</p>
          </div>
        </Card>
        <Card className="glass border-white/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              {posts.filter(p => p.type === 'reel').length}
            </p>
            <p className="text-sm text-gray-400">Reels</p>
          </div>
        </Card>
        <Card className="glass border-white/10 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {posts.filter(p => p.type === 'post').length}
            </p>
            <p className="text-sm text-gray-400">Posts</p>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="glass border-white/10 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar publicaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-white/20 bg-white/5"
          />
        </div>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`glass overflow-hidden group hover:glow transition-all ${
              post.isActive ? 'border-white/10' : 'border-gray-500/20 opacity-60'
            }`}>
              {/* Preview */}
              <div className="relative aspect-square bg-gray-900">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {post.type === 'reel' ? (
                      <Play className="h-12 w-12 text-white/50" />
                    ) : (
                      <ImageIcon className="h-12 w-12 text-white/50" />
                    )}
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button size="sm" variant="outline" className="glass border-white/20">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass border-white/20"
                    onClick={() => window.open(post.url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <Badge className={post.type === 'reel' ? 'bg-purple-600' : 'bg-blue-600'}>
                    {post.type === 'reel' ? (
                      <>
                        <Play className="h-3 w-3 mr-1" />
                        Reel
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-3 w-3 mr-1" />
                        Post
                      </>
                    )}
                  </Badge>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <Badge variant={post.isActive ? 'default' : 'secondary'}>
                    {post.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-white line-clamp-1">{post.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{post.description}</p>
                </div>
                
                <div className="text-xs text-gray-500">
                  {post.createdAt.toLocaleDateString('es-AR')}
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(post)}
                    className="flex-1 glass border-white/20"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(post)}
                    className={`glass border-white/20 ${
                      post.isActive ? 'text-yellow-400' : 'text-green-400'
                    }`}
                  >
                    {post.isActive ? 'Desactivar' : 'Activar'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDelete(post.id)}
                    className="glass border-red-500/20 text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="glass border-white/10 p-12 text-center">
          <p className="text-gray-400">No se encontraron publicaciones</p>
        </Card>
      )}

      <SocialMediaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        post={editingPost}
        onSave={loadPosts}
      />
    </div>
  );
}