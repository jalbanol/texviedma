'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Upload, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Speaker } from '@/lib/api';

const speakerSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  biography: z.string().min(50, 'La biografía debe tener al menos 50 caracteres'),
  topic: z.string().min(10, 'El tema debe tener al menos 10 caracteres'),
  photo: z.string().url('Debe ser una URL válida'),
  order: z.number().min(1, 'El orden debe ser mayor a 0'),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
});

type SpeakerForm = z.infer<typeof speakerSchema>;

interface SpeakerModalProps {
  open: boolean;
  onClose: () => void;
  speaker?: Speaker | null;
  onSave: () => void;
}

export function SpeakerModal({ open, onClose, speaker, onSave }: SpeakerModalProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<SpeakerForm>({
    resolver: zodResolver(speakerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      biography: '',
      topic: '',
      photo: '',
      order: 1,
      linkedin: '',
      twitter: '',
      instagram: '',
    }
  });

  const photoUrl = watch('photo');

  useEffect(() => {
    if (speaker) {
      reset({
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        biography: speaker.biography,
        topic: speaker.topic,
        photo: speaker.photo,
        order: speaker.order,
        linkedin: speaker.social.linkedin || '',
        twitter: speaker.social.twitter || '',
        instagram: speaker.social.instagram || '',
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        biography: '',
        topic: '',
        photo: '',
        order: 1,
        linkedin: '',
        twitter: '',
        instagram: '',
      });
    }
  }, [speaker, reset]);

  const onSubmit = async (data: SpeakerForm) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving speaker:', error);
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
              {speaker ? 'Editar Orador' : 'Agregar Orador'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">Nombre</Label>
                    <Input
                      id="firstName"
                      {...register('firstName')}
                      className="glass border-white/20 bg-white/5"
                      placeholder="Nombre"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Apellido</Label>
                    <Input
                      id="lastName"
                      {...register('lastName')}
                      className="glass border-white/20 bg-white/5"
                      placeholder="Apellido"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="topic" className="text-white">Tema de la Charla</Label>
                  <Input
                    id="topic"
                    {...register('topic')}
                    className="glass border-white/20 bg-white/5"
                    placeholder="Título de la charla"
                  />
                  {errors.topic && (
                    <p className="text-red-400 text-sm mt-1">{errors.topic.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="biography" className="text-white">Biografía</Label>
                  <Textarea
                    id="biography"
                    {...register('biography')}
                    className="glass border-white/20 bg-white/5 min-h-[120px]"
                    placeholder="Biografía del orador..."
                  />
                  {errors.biography && (
                    <p className="text-red-400 text-sm mt-1">{errors.biography.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="photo" className="text-white">URL de la Foto</Label>
                    <Input
                      id="photo"
                      {...register('photo')}
                      className="glass border-white/20 bg-white/5"
                      placeholder="https://..."
                    />
                    {errors.photo && (
                      <p className="text-red-400 text-sm mt-1">{errors.photo.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="order" className="text-white">Orden</Label>
                    <Input
                      id="order"
                      type="number"
                      {...register('order', { valueAsNumber: true })}
                      className="glass border-white/20 bg-white/5"
                      placeholder="1"
                    />
                    {errors.order && (
                      <p className="text-red-400 text-sm mt-1">{errors.order.message}</p>
                    )}
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-3">
                  <Label className="text-white">Redes Sociales (Opcional)</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Linkedin className="h-4 w-4 text-blue-500" />
                      <Input
                        {...register('linkedin')}
                        className="glass border-white/20 bg-white/5"
                        placeholder="LinkedIn URL"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Twitter className="h-4 w-4 text-blue-400" />
                      <Input
                        {...register('twitter')}
                        className="glass border-white/20 bg-white/5"
                        placeholder="Twitter URL"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Instagram className="h-4 w-4 text-pink-500" />
                      <Input
                        {...register('instagram')}
                        className="glass border-white/20 bg-white/5"
                        placeholder="Instagram URL"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-4">
                <Label className="text-white">Vista Previa</Label>
                <Card className="glass border-white/10 overflow-hidden">
                  {photoUrl && (
                    <img
                      src={photoUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-white">
                      {watch('firstName')} {watch('lastName')}
                    </h3>
                    <p className="text-sm tedx-red font-medium">{watch('topic')}</p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-3">
                      {watch('biography')}
                    </p>
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