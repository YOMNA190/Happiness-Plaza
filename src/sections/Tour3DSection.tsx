import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, ZoomIn, Hand, Sparkles } from 'lucide-react';
import Complex3D from '@/components/3d/Complex3D';
import ZoneInfoPanel from '@/components/3d/ZoneInfoPanel';
import type { Zone } from '@/types';
import { zones } from '@/data/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function Tour3DSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const zonesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Canvas reveal animation
      gsap.fromTo(
        canvasRef.current,
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: canvasRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Zone cards stagger animation
      gsap.fromTo(
        zonesRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: zonesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone);
    setShowInfoPanel(true);
  };

  const handleClosePanel = () => {
    setShowInfoPanel(false);
    setTimeout(() => setSelectedZone(null), 300);
  };

  const handleInquire = (zone: Zone) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      localStorage.setItem('selectedZone', JSON.stringify(zone));
    }
    handleClosePanel();
  };

  return (
    <section 
      id="tour" 
      ref={sectionRef}
      className="relative py-24 bg-dark overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-light to-dark" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(197, 160, 40, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(197, 160, 40, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold/5 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            {t('tour.badge')}
          </motion.span>
          <h2 className="font-heading text-5xl sm:text-6xl font-bold text-white mb-4">
            {t('tour.title')}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t('tour.description')}
          </p>
        </div>

        {/* 3D Viewer Container */}
        <div 
          ref={canvasRef}
          className="relative opacity-0"
        >
          {/* Controls Info */}
          <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-10 flex flex-wrap gap-2`}>
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 bg-dark/80 backdrop-blur-sm rounded-lg text-white/70 text-xs border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(197, 160, 40, 0.2)' }}
            >
              <Hand className="w-4 h-4 text-gold" />
              <span>{t('tour.controls.drag')}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 bg-dark/80 backdrop-blur-sm rounded-lg text-white/70 text-xs border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(197, 160, 40, 0.2)' }}
            >
              <ZoomIn className="w-4 h-4 text-gold" />
              <span>{t('tour.controls.zoom')}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 bg-gold/20 backdrop-blur-sm rounded-lg text-gold text-xs border border-gold/30"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-4 h-4" />
              <span>{t('tour.controls.click')}</span>
            </motion.div>
          </div>

          {/* Legend */}
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 bg-dark/90 backdrop-blur-md rounded-xl p-4 border border-white/10`}>
            <h4 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-gold" />
              {t('tour.legend')}
            </h4>
            <div className="space-y-2">
              {zones.map((zone) => (
                <motion.button
                  key={zone.id}
                  onClick={() => handleZoneClick(zone)}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg transition-all ${
                    selectedZone?.id === zone.id 
                      ? 'bg-gold/20' 
                      : 'hover:bg-white/5'
                  }`}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                >
                  <motion.div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: zone.color }}
                    animate={{ 
                      scale: hoveredZone === zone.id ? 1.3 : 1,
                      boxShadow: hoveredZone === zone.id ? `0 0 10px ${zone.color}` : 'none'
                    }}
                  />
                  <span className={`text-xs ${selectedZone?.id === zone.id ? 'text-gold font-medium' : 'text-white/70'}`}>
                    {isRTL ? zone.nameAr : zone.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 3D Canvas */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-2xl"
            whileHover={{ boxShadow: '0 0 60px rgba(197, 160, 40, 0.3)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/30 z-10 pointer-events-none" />
            <Complex3D onZoneClick={handleZoneClick} selectedZone={selectedZone} />
          </motion.div>
        </div>

        {/* Zone Quick Info */}
        <div 
          ref={zonesRef}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {zones.map((zone) => (
            <motion.button
              key={zone.id}
              onClick={() => handleZoneClick(zone)}
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              className={`p-4 rounded-xl border transition-all text-left relative overflow-hidden group ${
                selectedZone?.id === zone.id
                  ? 'bg-gold/20 border-gold/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-gold/30'
              }`}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ background: `radial-gradient(circle at center, ${zone.color}, transparent)` }}
              />
              
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 relative z-10"
                style={{ backgroundColor: `${zone.color}30` }}
              >
                <motion.div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: zone.color }}
                  animate={{ 
                    scale: hoveredZone === zone.id ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: hoveredZone === zone.id ? Infinity : 0 }}
                />
              </div>
              <h4 className={`text-sm font-medium relative z-10 ${selectedZone?.id === zone.id ? 'text-gold' : 'text-white'}`}>
                {isRTL ? zone.nameAr : zone.name}
              </h4>
              <p className="text-white/50 text-xs mt-1 relative z-10">
                {zone.availableUnits} {t('tour.available')}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Zone Info Panel */}
      <AnimatePresence>
        {showInfoPanel && selectedZone && (
          <ZoneInfoPanel 
            zone={selectedZone} 
            onClose={handleClosePanel}
            onInquire={handleInquire}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
