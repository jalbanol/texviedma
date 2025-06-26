import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { LanguageProvider } from '@/components/language-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TEDxViedma - Ideas que transforman',
  description: 'Evento independiente organizado bajo licencia TED. Únete a nosotros para una experiencia de ideas que vale la pena difundir.',
  keywords: 'TEDx, Viedma, ideas, conferencias, innovación, tecnología, arte, ciencia',
  authors: [{ name: 'TEDxViedma Team' }],
  openGraph: {
    title: 'TEDxViedma - Ideas que transforman',
    description: 'Evento independiente organizado bajo licencia TED',
    type: 'website',
    locale: 'es_AR',
    siteName: 'TEDxViedma'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEDxViedma - Ideas que transforman',
    description: 'Evento independiente organizado bajo licencia TED'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <LanguageProvider>
            {children}
            <Toaster 
              position="bottom-right"
              theme="dark"
              richColors
            />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}