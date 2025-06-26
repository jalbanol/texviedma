export type Locale = 'es' | 'en' | 'pt';

export const defaultLocale: Locale = 'es';
export const locales: Locale[] = ['es', 'en', 'pt'];

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português'
};