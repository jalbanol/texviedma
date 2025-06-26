'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Instagram, Play, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SocialMediaPost, api } from '@/lib/api';
import { toast } from 'sonner';

const socialMediaSchema = z.object({
  type: z.enum(['reel', 'post']),
  url: z.string().url('Debe ser una URL válida de Instagram'),
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  thumbnail: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  isActive: z.boolean().default(true),
});

type SocialMediaForm = z.infer<typeof socialMediaSchema>;

interface SocialMediaModalProps {
  open: boolean;
  onClose: () => void;
  post?: SocialMediaPost | null;
  onSave: () => void;
}

export function SocialMediaModal({ open, onClose, post, onSave }: SocialMediaModalProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<SocialMediaForm>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      type: 'post',
      url: '',
      title: '',
      description: '',
      thumbnail: '',
      isActive: true,
    }
  });

  const watchedType = watch('type');
  const watchedUrl = watch('url');

  useEffect(() => {
    if (post) {
      reset({
        type: post.type,
        url: post.url,
        title: post.title,
        description: post.description,
        thumbnail: post.thumbnail || '',
        isActive: post.isActive,
      });
    } else {
      reset({
        type: 'post',
        url: '',
        title: '',
        description: '',
        thumbnail: '',
        isActive: true,
      });
    }
  }, [post, reset]);

  // Auto-generate embed URL from Instagram URL
  useEffect(() => {
    if (watchedUrl) {
      const instagramRegex = /https:\/\/www\.instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/;
      const match = watchedUrl.match(instagramRegex);
      if (match) {
        const postId = match[2];
        const embedUrl = `https://www.instagram.com/p/${postId}/embed`;
        // This would be used internally, not exposed in the form
      }
    }
  }, [watchedUrl]);

  const onSubmit = async (data: SocialMediaForm) => {
    setLoading(true);
    try {
      // Generate embed URL
      const instagramRegex = /https:\/\/www\.instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/;
      const match = data.url.match(instagramRegex);
      
      if (!match) {
        toast.error('URL de Instagram inválida');
        setLoading(false);
        return;
      }

      const postId = match[2];
      const embedUrl = `https://www.instagram.com/p/${postId}/embed`;

      const postData = {
        ...data,
        embedUrl,
        thumbnail: data.thumbnail || undefined,
      };

      let result;
      if (post) {
        result = await api.updateSocialMediaPost(post.id, postData);
      } else {
        result = await api.createSocialMediaPost(postData);
      }

      if (result.success) {
        toast.success(post ? 'Publicación actualizada' : 'Publicación agregada');
        onSave();
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Error al guardar la publicación');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="glass border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {post ? 'Editar Publicación' : 'Agregar Publicación'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type" className="text-white">Tipo de Contenido</Label>
                  <Select
                    value={watchedType}
                    onValueChange={(value: 'reel' | 'post') => setValue('type', value)}
                  >
                    <SelectTrigger className="glass border-white/20 bg-white/5">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">
                        <div className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Post de Instagram
                        </div>
                      </SelectItem>
                      <SelectItem value="reel">
                        <div className="flex items-center">
                          <Play className="h-4 w-4 mr-2" />
                          Instagram Reel
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="url" className="text-white">URL de Instagram</Label>
                  <Input
                    id="url"
                    {...register('url')}
                    className="glass border-white/20 bg-white/5"
                    placeholder="https://www.instagram.com/p/..."
                  />
                  {errors.url && (
                    <p className="text-red-400 text-sm mt-1">{errors.url.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Copia la URL completa de la publicación de Instagram
                  </p>
                </div>

                <div>
                  <Label htmlFor="title" className="text-white">Título</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    className="glass border-white/20 bg-white/5"
                    placeholder="Título descriptivo de la publicación"
                  />
                  {errors.title && (
                    <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">Descripción</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    className="glass border-white/20 bg-white/5 min-h-[100px]"
                    placeholder="Descripción de la publicación..."
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="thumbnail" className="text-white">Thumbnail (Opcional)</Label>
                  <Input
                    id="thumbnail"
                    {...register('thumbnail')}
                    className="glass border-white/20 bg-white/5"
                    placeholder="https://... (URL de imagen de vista previa)"
                  />
                  {errors.thumbnail && (
                    <p className="text-red-400 text-sm mt-1">{errors.thumbnail.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Imagen que se mostrará como vista previa (opcional)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    {...register('isActive')}
                    className="rounded border-white/20"
                  />
                  <Label htmlFor="isActive" className="text-white">
                    Publicación activa (visible en el sitio)
                  </Label>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-4">
                <Label className="text-white">Vista Previa</Label>
                <Card className="glass border-white/10 overflow-hidden">
                  <div className="aspect-square bg-gray-900 flex items-center justify-center">
                    {watchedType === 'reel' ? (
                      <div className="text-center">
                        <Play className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Instagram Reel</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Instagram Post</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white line-clamp-2">
                      {watch('title') || 'Título de la publicación'}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                      {watch('description') || 'Descripción de la publicación'}
                    </p>
                  </div>
                </Card>

                {/* Instagram URL Info */}
                <Card className="glass border-blue-500/20 p-4">
                  <div className="flex items-start space-x-3">
                    <Instagram className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Cómo obtener la URL</h3>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>1. Ve a la publicación en Instagram</li>
                        <li>2. Haz clic en los tres puntos (...)</li>
                        <li>3. Selecciona "Copiar enlace"</li>
                        <li>4. Pega la URL aquí</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-white/10">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="bg-tedx-red hover:bg-red-700">
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}