'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: '¿Qué es una charla TED y cuánto dura?',
    answer: 'Es el destilado de una sola IDEA potente –un hallazgo, una mirada nueva o una solución concreta– compartida con claridad y emoción en menos de 18 minutos. No es una clase magistral, ni un pitch comercial, ni una biografía; es ese insight capaz de cambiar cómo pensamos o actuamos.'
  },
  {
    id: '2',
    question: '¿Cuál es la diferencia entre streaming y presencia física?',
    answer: 'El streaming es la forma principal de vivir TEDxViedma: verás las 10 charlas en directo, participarás en el chat y recibirás contenido exclusivo post‑evento desde cualquier lugar. Los 50 cupos presenciales son un upgrade que se sortea entre todas las personas inscritas al streaming y te permiten asistir el día de la grabación en el Centro Cultural de Viedma.'
  },
  {
    id: '3',
    question: '¿Tiene costo la inscripción?',
    answer: 'No. La inscripción al streaming es gratuita y se sortean 50 cupos presenciales gratuitos sin costo. Podés apoyar el evento como voluntario/a o sponsor.'
  },
  {
    id: '4',
    question: '¿Puedo inscribirme como orador o proponer a alguien?',
    answer: 'Sí, la convocatoria a oradores estará abierta hasta finales de abril. Una vez cerrada la convocatoria se seleccionan 10 oradores mediante un proceso curatorial de cuatro meses: postulación abierta, entrevistas y mentorías personalizadas. Buscamos diversidad de campos (ciencia, arte, emprendimiento, impacto social, tecnología) y calidad de ideas. Sus nombres se revelarán a partir de agosto 2025 en nuestras redes y por correo a los registrados.'
  },
  {
    id: '5',
    question: '¿Cómo puedo involucrarme además de asistir?',
    answer: 'Hay dos vías: Voluntariado (producción, hospitality, comunicación, diseño) y Sponsoreo en categorías LITE · RED · BLACK. Encontrarás los formularios respectivos en la sección de arriba.'
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { dict } = useLanguage();

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

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
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="h-12 w-12 tedx-red mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">Preguntas Frecuentes</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre TEDxViedma
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(item.id);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass border-white/10 overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white pr-4">
                          {item.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </motion.div>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-white/10">
                            <motion.p
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="text-gray-300 leading-relaxed pt-4"
                            >
                              {item.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Card className="glass border-white/10 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿No encontraste lo que buscabas?
              </h3>
              <p className="text-gray-300 mb-6">
                Si tenés alguna pregunta específica que no está aquí, no dudes en contactarnos. 
                Estamos aquí para ayudarte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@tedxviedma.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-tedx-red hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Enviar Email
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 glass border border-white/20 hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
                >
                  Formulario de Contacto
                </a>
              </div>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <Card className="glass border-white/10 p-6 text-center">
              <div className="text-3xl font-bold tedx-red mb-2">10</div>
              <div className="text-gray-300 text-sm">Charlas confirmadas</div>
            </Card>
            
            <Card className="glass border-white/10 p-6 text-center">
              <div className="text-3xl font-bold tedx-red mb-2">50</div>
              <div className="text-gray-300 text-sm">Cupos presenciales</div>
            </Card>
            
            <Card className="glass border-white/10 p-6 text-center">
              <div className="text-3xl font-bold tedx-red mb-2">18</div>
              <div className="text-gray-300 text-sm">Minutos máximo por charla</div>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}