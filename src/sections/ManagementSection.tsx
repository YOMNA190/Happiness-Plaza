import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Wrench, 
  FileText, 
  TrendingUp, 
  Shield,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { partners } from '@/data/mockData';

export default function ManagementSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const jkServices = [
    {
      icon: Wrench,
      title: t('management.services.technical.title'),
      description: t('management.services.technical.desc'),
    },
    {
      icon: FileText,
      title: t('management.services.admin.title'),
      description: t('management.services.admin.desc'),
    },
    {
      icon: TrendingUp,
      title: t('management.services.marketing.title'),
      description: t('management.services.marketing.desc'),
    },
    {
      icon: Users,
      title: t('management.services.consulting.title'),
      description: t('management.services.consulting.desc'),
    },
  ];

  const benefits = [
    ' Guaranteed professional property maintenance',
    'Strategic marketing for maximum occupancy',
    'Transparent financial reporting',
    '24/7 security and facility management',
    'Regular property value appreciation',
    'Hassle-free ownership experience',
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="management" 
      ref={sectionRef}
      className="relative py-24 bg-light-gray overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            {t('management.badge')}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-dark mb-4">
            {t('management.title')}
          </h2>
          <p className="text-dark/60 text-lg max-w-2xl mx-auto">
            {t('management.description')}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Al-Habeeb Group */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-dark/5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-dark">
                  {partners[0].name}
                </h3>
                <p className="text-gold text-sm">{partners[0].nameAr}</p>
              </div>
            </div>
            <p className="text-dark/70 mb-6 leading-relaxed">
              {partners[0].description}
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-dark/60 uppercase tracking-wider">
                {t('management.partners.alhabeeb.title')}
              </p>
              <div className="flex flex-wrap gap-2">
                {partners[0].services.map((service) => (
                  <span 
                    key={service}
                    className="px-3 py-1 bg-light-gray rounded-full text-sm text-dark/70"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* JKFacilities */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-dark/5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-dark">
                  {partners[1].name}
                </h3>
                <p className="text-gold text-sm">{partners[1].nameAr}</p>
              </div>
            </div>
            <p className="text-dark/70 mb-6 leading-relaxed">
              {partners[1].description}
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-dark/60 uppercase tracking-wider">
                {t('management.partners.jkfacilities.title')}
              </p>
              <div className="flex flex-wrap gap-2">
                {partners[1].services.slice(0, 4).map((service) => (
                  <span 
                    key={service}
                    className="px-3 py-1 bg-light-gray rounded-full text-sm text-dark/70"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* JKFacilities Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="font-heading text-2xl font-bold text-dark text-center mb-8">
            JKFacilities {t('management.partners.jkfacilities.title')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jkServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-dark/5 hover:shadow-luxury transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-heading font-semibold text-dark mb-2">
                    {service.title}
                  </h4>
                  <p className="text-dark/60 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-dark to-dark-light rounded-2xl p-8 sm:p-12"
        >
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'rtl-grid' : ''}`}>
            <div>
              <h3 className="font-heading text-3xl font-bold text-white mb-4">
                {t('management.whyInvest.title')}
              </h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                {t('management.whyInvest.desc')}
              </p>
              <Button
                onClick={scrollToContact}
                className="bg-gold hover:bg-gold-dark text-white"
              >
                {t('management.whyInvest.cta')}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'} ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-white/80">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
