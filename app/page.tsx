import { AnimatedBackground } from '@/components/ui/animated-background';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { StreamingRegistration } from '@/components/sections/streaming-registration';
import { SocialMediaSection } from '@/components/sections/social-media-section';
import { FAQSection } from '@/components/sections/faq-section';
import { About } from '@/components/sections/about';

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />
      <Hero />
      <StreamingRegistration />
      <SocialMediaSection />
      <FAQSection />
      <About />
      <Footer />
    </main>
  );
}