import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Store, 
  Hotel, 
  Filter, 
  Maximize2, 
  MapPin, 
  Check,
  ArrowRight,
  Search,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { commercialUnits, unitTypeOptions } from '@/data/mockData';
import type { CommercialUnit } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const unitImages: Record<string, string> = {
  retail: '/images/retail-interior.jpg',
  office: '/images/office-space.jpg',
  hotel: '/images/hotel-lobby.jpg',
};

export default function UnitsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<CommercialUnit | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Filters animation
      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid cards stagger animation
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter units
  const filteredUnits = commercialUnits.filter((unit) => {
    const matchesType = selectedType === 'all' || unit.type === selectedType;
    const matchesSearch = 
      unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'reserved':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'sold':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return t('units.status.available');
      case 'reserved':
        return t('units.status.reserved');
      case 'sold':
        return t('units.status.sold');
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'retail':
        return Store;
      case 'office':
        return Building2;
      case 'hotel':
        return Hotel;
      default:
        return Building2;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'retail':
        return t('units.filters.retail');
      case 'office':
        return t('units.filters.office');
      case 'hotel':
        return t('units.filters.hotel');
      default:
        return type;
    }
  };

  const getUnitImage = (type: string) => {
    return unitImages[type] || '/images/hero-building.jpg';
  };

  const handleInquire = (unit: CommercialUnit) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      localStorage.setItem('selectedUnit', JSON.stringify(unit));
    }
  };

  return (
    <section 
      id="units" 
      ref={sectionRef}
      className="relative py-24 bg-dark overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-light to-dark" />
        
        {/* Diagonal Lines Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(197, 160, 40, 0.1) 10px,
              rgba(197, 160, 40, 0.1) 20px
            )`,
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            {t('units.badge')}
          </motion.span>
          <h2 className="font-heading text-5xl sm:text-6xl font-bold text-white mb-4">
            {t('units.title')}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t('units.description')}
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="opacity-0">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-white/40`} />
              <Input
                type="text"
                placeholder={t('units.filters.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isRTL ? 'pr-12' : 'pl-12'} h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/20 rounded-xl`}
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <motion.button
                onClick={() => setSelectedType('all')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedType === 'all' 
                    ? 'bg-gold text-dark' 
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-4 h-4" />
                {t('units.filters.all')}
              </motion.button>
              {unitTypeOptions.slice(1).map((option) => {
                const Icon = getTypeIcon(option.value);
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => setSelectedType(option.value)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                      selectedType === option.value 
                        ? 'bg-gold text-dark' 
                        : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    {getTypeLabel(option.value)}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-white/50 text-sm mb-6">
            {t('units.showing')} <span className="text-gold font-bold">{filteredUnits.length}</span> {filteredUnits.length === 1 ? t('units.unit') : t('units.units')}
          </p>
        </div>

        {/* Units Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredUnits.map((unit, index) => {
              const Icon = getTypeIcon(unit.type);
              return (
                <motion.div
                  key={unit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all duration-500 hover:shadow-luxury-lg"
                  whileHover={{ y: -10 }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={getUnitImage(unit.type)}
                      alt={unit.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                    
                    {/* Status Badge */}
                    <Badge 
                      className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} capitalize backdrop-blur-md ${getStatusColor(unit.status)}`}
                    >
                      {getStatusText(unit.status)}
                    </Badge>
                    
                    {/* Type Badge */}
                    <Badge className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-gold/90 text-dark font-bold`}>
                      <Icon className="w-3 h-3 mr-1" />
                      {getTypeLabel(unit.type)}
                    </Badge>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gold/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <motion.button
                        onClick={() => setSelectedUnit(unit)}
                        className="bg-white text-dark px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Maximize2 className="w-5 h-5" />
                        {t('units.viewDetails')}
                      </motion.button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-heading font-bold text-xl text-white group-hover:text-gold transition-colors">
                          {unit.name}
                        </h3>
                        <div className="flex items-center gap-2 text-white/50 text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{t('units.floor')} {unit.floor}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gold font-heading font-bold text-2xl">
                          {unit.size}
                          <span className="text-sm text-white/50 ml-1">m²</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-white/50 text-sm line-clamp-2 mb-4">
                      {unit.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {unit.features.slice(0, 3).map((feature, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10"
                        >
                          <Check className="w-3 h-3 text-gold" />
                          {feature}
                        </span>
                      ))}
                      {unit.features.length > 3 && (
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/50 border border-white/10">
                          +{unit.features.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <p className="text-xs text-white/40">{t('units.startingFrom')}</p>
                        <p className="text-white font-heading font-bold text-lg">
                          EGP {unit.price.toLocaleString()}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => handleInquire(unit)}
                        disabled={unit.status === 'sold'}
                        className="bg-gold hover:bg-gold-light text-dark font-bold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('units.inquire')}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredUnits.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Building2 className="w-20 h-20 text-white/10 mx-auto mb-6" />
            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              {t('units.noUnits')}
            </h3>
            <p className="text-white/50">
              {t('units.noUnitsDesc')}
            </p>
          </motion.div>
        )}
      </div>

      {/* Unit Detail Modal */}
      <AnimatePresence>
        {selectedUnit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/90 backdrop-blur-md"
            onClick={() => setSelectedUnit(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-dark-light rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-72">
                <img
                  src={getUnitImage(selectedUnit.type)}
                  alt={selectedUnit.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-light via-dark/50 to-transparent" />
                <button
                  onClick={() => setSelectedUnit(null)}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors text-2xl"
                >
                  ×
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Badge className={`${getStatusColor(selectedUnit.status)} backdrop-blur-md`}>
                    {getStatusText(selectedUnit.status)}
                  </Badge>
                  <Badge className="bg-gold text-dark font-bold">
                    {getTypeLabel(selectedUnit.type)}
                  </Badge>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-white mb-2">
                      {selectedUnit.name}
                    </h2>
                    <p className="text-white/50">
                      {t('units.floor')} {selectedUnit.floor} • {selectedUnit.size} m²
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-heading font-bold text-gold">
                      EGP {selectedUnit.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-white/40">
                      EGP {Math.round(selectedUnit.price / selectedUnit.size).toLocaleString()}/{t('units.perSqm')}
                    </p>
                  </div>
                </div>

                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  {selectedUnit.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" />
                    {t('units.features')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedUnit.features.map((feature, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                      >
                        <Check className="w-5 h-5 text-gold" />
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investment Info */}
                <div className="bg-gold/10 rounded-2xl p-6 mb-8 border border-gold/20">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-gold" />
                    <h4 className="font-bold text-white">Expected ROI</h4>
                  </div>
                  <p className="text-white/70">
                    Based on market analysis, this unit type offers an expected annual return of <span className="text-gold font-bold">12-15%</span>.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => {
                      handleInquire(selectedUnit);
                      setSelectedUnit(null);
                    }}
                    disabled={selectedUnit.status === 'sold'}
                    className="flex-1 bg-gold hover:bg-gold-light text-dark font-bold py-4 rounded-xl transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('units.modal.inquireNow')}
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedUnit(null)}
                    className="px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('units.modal.close')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
