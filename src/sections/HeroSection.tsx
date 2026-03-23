import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, MapPin, Calendar, Building2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projectStats } from '@/data/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Badge animation
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      );

      // Title animation with split effect
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, rotateX: -45 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1 },
        '-=0.4'
      );

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, x: isRTL ? 50 : -50 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.6'
      );

      // Description animation
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );

      // CTA buttons animation
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );

      // Stats cards stagger animation
      tl.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
        '-=0.6'
      );

      // Hero image parallax
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5 },
        '-=1'
      );

      // Scroll-triggered parallax for image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Floating animation for stats
      gsap.to('.stat-card', {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: 'random',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="/images/hero-building.jpg"
          alt="Happiness Plaza"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-dark/40" />
      </div>

      {/* Animated Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'rtl-grid' : ''}`}>
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div ref={badgeRef} className="opacity-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium">
                <Sparkles className="w-4 h-4 animate-pulse" />
                {t('hero.badge')}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 
                ref={titleRef}
                className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none opacity-0"
                style={{ perspective: '1000px' }}
              >
                {t('hero.title')}
              </h1>
              <span 
                ref={subtitleRef}
                className="block font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-gold opacity-0"
              >
                {t('hero.subtitle')}
              </span>
            </div>

            {/* Description */}
            <p 
              ref={descRef}
              className="text-white/70 text-xl max-w-xl leading-relaxed opacity-0"
            >
              {t('hero.description2')}
            </p>

            {/* Key Info */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-white/80">{t('hero.location')}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Calendar className="w-5 h-5 text-gold" />
                <span className="text-white/80">{t('hero.opening')} {projectStats.openingDate}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
              <Button
                onClick={() => scrollToSection('#tour')}
                size="lg"
                className="bg-gold hover:bg-gold-light text-dark font-bold px-8 py-6 text-lg transition-all hover:scale-105 hover:shadow-luxury-lg"
              >
                <Building2 className="w-5 h-5 mr-2" />
                {t('hero.explore3D')}
              </Button>
              <Button
                onClick={() => scrollToSection('#units')}
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-gold px-8 py-6 text-lg transition-all"
              >
                {t('hero.viewUnits')}
              </Button>
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {/* Total Area */}
            <div className="stat-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer group">
              <div className="text-5xl font-heading font-bold text-gold mb-2 group-hover:scale-110 transition-transform">
                {projectStats.totalArea.toLocaleString()}
              </div>
              <div className="text-white/70 text-sm">{t('hero.stats.area')}</div>
              <div className="text-white/40 text-xs mt-1">{t('hero.stats.areaDesc')}</div>
            </div>

            {/* Construction Progress */}
            <div className="stat-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer group">
              <div className="text-5xl font-heading font-bold text-gold mb-2 group-hover:scale-110 transition-transform">
                {projectStats.constructionProgress}%
              </div>
              <div className="text-white/70 text-sm">{t('hero.stats.progress')}</div>
              <div className="text-white/40 text-xs mt-1">{t('hero.stats.progressDesc')}</div>
            </div>

            {/* Retail Units */}
            <div className="stat-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer group">
              <div className="text-5xl font-heading font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                {projectStats.retailUnits}+
              </div>
              <div className="text-white/70 text-sm">{t('hero.stats.retail')}</div>
              <div className="text-white/40 text-xs mt-1">{t('hero.stats.retailDesc')}</div>
            </div>

            {/* Hotel Rooms */}
            <div className="stat-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer group">
              <div className="text-5xl font-heading font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                {projectStats.hotelRooms}+
              </div>
              <div className="text-white/70 text-sm">{t('hero.stats.hotel')}</div>
              <div className="text-white/40 text-xs mt-1">{t('hero.stats.hotelDesc')}</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={() => scrollToSection('#tour')}
            className="flex flex-col items-center gap-2 text-white/50 hover:text-gold transition-colors group"
          >
            <span className="text-sm">{t('hero.scrollToExplore')}</span>
            <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
