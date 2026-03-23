import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import { 
  Maximize2, 
  Building2, 
  Hotel, 
  Briefcase, 
  Car,
  TrendingUp,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { projectStats } from '@/data/mockData';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  suffix?: string;
  delay: number;
  isInView: boolean;
  index: number;
}

function AnimatedCounter({ 
  end, 
  duration = 2.5, 
  suffix = '' 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <span ref={countRef} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function StatItem({ icon: Icon, value, label, suffix = '', delay, isInView }: StatItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView || !itemRef.current) return;

    gsap.fromTo(
      itemRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: delay,
        ease: 'power3.out',
      }
    );
  }, [isInView, delay]);

  return (
    <motion.div
      ref={itemRef}
      className="relative group opacity-0"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition-all duration-500 hover:shadow-luxury-lg overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center group-hover:bg-gold/20 transition-colors"
              whileHover={{ rotate: 10 }}
            >
              <Icon className="w-7 h-7 text-gold" />
            </motion.div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-gold" />
            </div>
          </div>
          
          <div className="text-4xl sm:text-5xl font-heading font-bold text-white mb-2 group-hover:text-gold transition-colors">
            {typeof value === 'number' ? (
              <AnimatedCounter end={value as number} suffix={suffix} />
            ) : (
              value
            )}
          </div>
          
          <p className="text-white/50 text-sm">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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
            onEnter: () => setIsInView(true),
          },
        }
      );

      // Banner animation
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Highlights animation
      gsap.fromTo(
        highlightsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Progress bar animation
      gsap.fromTo(
        '.progress-bar',
        { width: '0%' },
        {
          width: `${projectStats.constructionProgress}%`,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Maximize2, value: projectStats.totalArea, label: t('stats.items.area'), suffix: '' },
    { icon: TrendingUp, value: projectStats.constructionProgress, label: t('stats.items.progress'), suffix: '%' },
    { icon: Building2, value: projectStats.retailUnits, label: t('stats.items.retail'), suffix: '+' },
    { icon: Briefcase, value: projectStats.officeUnits, label: t('stats.items.office'), suffix: '+' },
    { icon: Hotel, value: projectStats.hotelRooms, label: t('stats.items.hotel'), suffix: '+' },
    { icon: Car, value: projectStats.parkingSpaces, label: t('stats.items.parking'), suffix: '' },
  ];

  const highlights = [
    { title: t('stats.highlights.location.title'), description: t('stats.highlights.location.desc') },
    { title: t('stats.highlights.design.title'), description: t('stats.highlights.design.desc') },
    { title: t('stats.highlights.management.title'), description: t('stats.highlights.management.desc') },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 bg-dark overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-light to-dark" />
        
        {/* Radial Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(197, 160, 40, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            {t('stats.badge')}
          </motion.span>
          <h2 className="font-heading text-5xl sm:text-6xl font-bold text-white mb-4">
            {t('stats.title')}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t('stats.description')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={0.1 * index}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>

        {/* Opening Date Banner */}
        <div 
          ref={bannerRef}
          className="relative rounded-3xl overflow-hidden opacity-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/aerial-view.jpg"
              alt="Happiness Plaza Aerial View"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/60" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gold text-sm uppercase tracking-widest mb-2">
                {t('stats.opening.title')}
              </p>
              <h3 className="font-heading text-5xl sm:text-6xl font-bold text-white mb-4">
                {projectStats.openingDate}
              </h3>
              <p className="text-white/70 max-w-xl mx-auto text-lg">
                {t('stats.opening.description')}
              </p>
            </motion.div>
            
            {/* Progress Bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>{t('stats.opening.progress')}</span>
                <span className="text-gold font-bold">{projectStats.constructionProgress}%</span>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="progress-bar h-full bg-gradient-to-r from-gold via-gold-light to-gold rounded-full relative"
                  style={{ width: '0%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div 
          ref={highlightsRef}
          className="mt-16 grid sm:grid-cols-3 gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div 
              key={highlight.title} 
              className="text-center group"
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <span className="text-3xl font-heading font-bold text-gold">{index + 1}</span>
              </motion.div>
              <h4 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-gold transition-colors">
                {highlight.title}
              </h4>
              <p className="text-white/50 text-sm">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
