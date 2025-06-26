import { cookies } from 'next/headers';
import { Locale, defaultLocale, locales } from './shared-i18n';

export function getLocale(): Locale {
  const cookieStore = cookies();
  const locale = cookieStore.get('locale')?.value as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}

export async function getDictionary(locale: Locale) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch (error) {
    console.warn(`Dictionary for locale ${locale} not found, falling back to ${defaultLocale}`);
    const fallback = await import(`@/dictionaries/${defaultLocale}.json`);
    return fallback.default;
  }
}