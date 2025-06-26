'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Download, Upload, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { locales, localeNames } from '@/lib/shared-i18n';

export default function AdminTranslations() {
  const [selectedLocale, setSelectedLocale] = useState<string>('es');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTranslations();
  }, [selectedLocale]);

  const loadTranslations = async () => {
    try {
      const module = await import(`@/dictionaries/${selectedLocale}.json`);
      setTranslations(module.default);
    } catch (error) {
      console.error('Error loading translations:', error);
      setTranslations({});
    } finally {
      setLoading(false);
    }
  };

  const updateTranslation = (path: string, value: string) => {
    const keys = path.split('.');
    const newTranslations = { ...translations };
    let current = newTranslations;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setTranslations(newTranslations);
  };

  const saveTranslations = async () => {
    setSaving(true);
    try {
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Traducciones guardadas exitosamente');
    } catch (error) {
      console.error('Error saving translations:', error);
    } finally {
      setSaving(false);
    }
  };

  const exportTranslations = () => {
    const dataStr = JSON.stringify(translations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedLocale}.json`;
    link.click();
  };

  const renderTranslationField = (key: string, value: any, path: string = '') => {
    const fullPath = path ? `${path}.${key}` : key;
    
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={fullPath} className="space-y-4">
          <h3 className="text-lg font-semibold text-white capitalize">{key}</h3>
          <div className="pl-4 space-y-4">
            {Object.entries(value).map(([subKey, subValue]) =>
              renderTranslationField(subKey, subValue, fullPath)
            )}
          </div>
        </div>
      );
    }

    return (
      <div key={fullPath} className="space-y-2">
        <Label htmlFor={fullPath} className="text-white capitalize">
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </Label>
        <Textarea
          id={fullPath}
          value={value || ''}
          onChange={(e) => updateTranslation(fullPath, e.target.value)}
          className="glass border-white/20 bg-white/5 text-white min-h-[60px]"
          placeholder={`Traducción para ${key}`}
        />
      </div>
    );
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
          <h1 className="text-3xl font-bold text-white">Traducciones</h1>
          <p className="text-gray-400">Gestiona el contenido multilingüe del sitio</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportTranslations} variant="outline" className="glass border-white/20">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={saveTranslations} disabled={saving} className="bg-tedx-red hover:bg-red-700">
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>

      {/* Language Selector */}
      <Card className="glass border-white/10 p-4">
        <div className="flex items-center space-x-4">
          <Globe className="h-5 w-5 text-gray-400" />
          <span className="text-white font-medium">Idioma:</span>
          <div className="flex space-x-2">
            {locales.map((locale) => (
              <Button
                key={locale}
                variant={selectedLocale === locale ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLocale(locale)}
                className={selectedLocale === locale ? 'bg-tedx-red' : 'glass border-white/20'}
              >
                {localeNames[locale]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Translation Fields */}
      <Card className="glass border-white/10 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Editando: {localeNames[selectedLocale as keyof typeof localeNames]}
            </h2>
            <Badge className="bg-blue-600">
              {Object.keys(translations).length} secciones
            </Badge>
          </div>
          
          <div className="space-y-8">
            {Object.entries(translations).map(([key, value]) =>
              renderTranslationField(key, value)
            )}
          </div>
        </div>
      </Card>

      {/* Help */}
      <Card className="glass border-blue-500/20 p-4">
        <div className="flex items-start space-x-3">
          <Globe className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white mb-1">Consejos para traducir</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Mantén la consistencia en el tono y estilo</li>
              <li>• Adapta el contenido a la cultura local cuando sea necesario</li>
              <li>• Verifica que los enlaces y referencias sean apropiados para cada idioma</li>
              <li>• Guarda frecuentemente para no perder cambios</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}