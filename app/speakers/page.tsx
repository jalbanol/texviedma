'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, ExternalLink } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { api, Speaker } from '@/lib/api';

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const { dict } = useLanguage();

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await api.getSpeakers();
        setSpeakers(data);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen">
        <AnimatedBackground />
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 border-2 border-red-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-400">Cargando oradores...</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{dict.speakers?.title || 'Nuestros Oradores'}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {dict.speakers?.subtitle || 'Mentes brillantes compartiendo ideas transformadoras'}
            </p>
          </motion.div>

          {/* Speakers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="glass border-white/10 overflow-hidden group hover:glow transition-all duration-300">
                  {/* Speaker Photo */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={speaker.photo}
                      alt={`${speaker.firstName} ${speaker.lastName}`}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Social Links Overlay */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {speaker.social.linkedin && (
                        <a
                          href={speaker.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 glass rounded-full hover:glow"
                        >
                          <Linkedin className="h-4 w-4 text-white" />
                        </a>
                      )}
                      {speaker.social.twitter && (
                        <a
                          href={speaker.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 glass rounded-full hover:glow"
                        >
                          <Twitter className="h-4 w-4 text-white" />
                        </a>
                      )}
                      {speaker.social.instagram && (
                        <a
                          href={speaker.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 glass rounded-full hover:glow"
                        >
                          <Instagram className="h-4 w-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Speaker Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {speaker.firstName} {speaker.lastName}
                      </h3>
                      <p className="text-sm tedx-red font-medium">
                        {dict.speakers?.topic || 'Tema:'} {speaker.topic}
                      </p>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {speaker.biography}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full glass border-white/20 hover:bg-white/10"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {dict.speakers?.viewBio || 'Ver Biografía'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="glass p-8 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Listo para la experiencia?
              </h3>
              <p className="text-gray-300 mb-6">
                No te pierdas estas increíbles charlas. Regístrate para el streaming y vive TEDxViedma desde donde estés.
              </p>
              <Button className="bg-tedx-red hover:bg-red-700 glow">
                Registrarse al Streaming
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}