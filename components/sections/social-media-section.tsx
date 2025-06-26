'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink, Play, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api, SocialMediaPost } from '@/lib/api';

export function SocialMediaSection() {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getSocialMediaPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching social media posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const openInstagramPost = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-2 border-red-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando contenido...</p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 glass rounded-full mr-4">
                <Instagram className="h-8 w-8 tedx-red" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-gradient">Síguenos en Instagram</span>
              </h2>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Mantente al día con las últimas novedades, detrás de escenas y momentos especiales de TEDxViedma
            </p>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="glass border-gray-200 dark:border-white/10 overflow-hidden hover:glow transition-all duration-300 h-full">
                  {/* Embed Container */}
                  <div className="relative aspect-square bg-gray-900">
                    {/* Instagram Embed */}
                    <iframe
                      src={post.embedUrl}
                      className="w-full h-full border-0"
                      scrolling="no"
                      allowTransparency={true}
                      loading="lazy"
                      title={post.title}
                    />
                    
                    {/* Overlay with type badge and external link */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-start justify-between p-3">
                      <Badge 
                        className={`${
                          post.type === 'reel' 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white border-0`}
                      >
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
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-white/20 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={() => openInstagramPost(post.url)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 leading-relaxed">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {post.createdAt.toLocaleDateString('es-AR')}
                      </span>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs hover:tedx-red transition-colors p-1 h-auto text-gray-600 dark:text-gray-400"
                        onClick={() => openInstagramPost(post.url)}
                      >
                        Ver en Instagram
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Card className="glass border-gray-200 dark:border-white/10 p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 tedx-red mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    ¡No te pierdas nada!
                  </h3>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Seguinos en Instagram para contenido exclusivo, actualizaciones en tiempo real 
                  y momentos únicos del evento más inspirador del año.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}