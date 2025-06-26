'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';

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

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>(['1']); // Primera pregunta abierta por defecto
  const { dict } = useLanguage();

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
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
                <HelpCircle className="h-8 w-8 tedx-red" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-gradient">Preguntas Frecuentes</span>
              </h2>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Resolvemos las dudas más comunes sobre TEDxViedma
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-12">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(item.id);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass border-gray-200 dark:border-white/10 overflow-hidden hover:border-gray-300 dark:hover:border-white/20 transition-all">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4 leading-relaxed">
                          {item.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
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
                          <div className="px-6 pb-6 border-t border-gray-200 dark:border-white/10">
                            <motion.p
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className="text-gray-700 dark:text-gray-300 leading-relaxed pt-4"
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

          {/* Bottom CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="glass border-gray-200 dark:border-white/10 p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 tedx-red mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    ¿Tenés más preguntas?
                  </h3>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  Si no encontraste la respuesta que buscabas, no dudes en contactarnos. 
                  Estamos aquí para ayudarte con cualquier consulta sobre TEDxViedma.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/faq">
                    <Button 
                      variant="outline" 
                      className="glass border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white"
                    >
                      Ver todas las FAQ
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="bg-tedx-red hover:bg-red-700 glow">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contactanos
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}