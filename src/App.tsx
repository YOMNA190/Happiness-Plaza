import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/sections/HeroSection';
import Tour3DSection from '@/sections/Tour3DSection';
import UnitsSection from '@/sections/UnitsSection';
import StatsSection from '@/sections/StatsSection';
import ManagementSection from '@/sections/ManagementSection';
import ContactSection from '@/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    // Set document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isRTL]);

  return (
    <div className={`min-h-screen bg-dark ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* 3D Interactive Tour */}
        <Tour3DSection />
        
        {/* Commercial Units Showcase */}
        <UnitsSection />
        
        {/* Project Statistics */}
        <StatsSection />
        
        {/* Management & Operation */}
        <ManagementSection />
        
        {/* Contact & Inquiry Form */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
