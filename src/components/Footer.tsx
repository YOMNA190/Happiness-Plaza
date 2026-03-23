import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Building2
} from 'lucide-react';
import { contactInfo } from '@/data/mockData';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.tour'), href: '#tour' },
    { label: t('nav.units'), href: '#units' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.management'), href: '#management' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const unitTypes = [
    { label: t('units.filters.retail'), href: '#units' },
    { label: t('units.filters.office'), href: '#units' },
    { label: t('units.filters.hotel'), href: '#units' },
    { label: t('tour.zoneInfo.services'), href: '#tour' },
    { label: t('management.services.technical.title'), href: '#tour' },
    { label: t('management.services.marketing.title'), href: '#tour' },
  ];

  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-12 ${isRTL ? 'rtl-grid' : ''}`}>
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-2xl font-heading font-bold text-white">H</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">{t('app.name')}</h3>
                <p className="text-white/50 text-sm">{t('hero.location')}</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: contactInfo.socialMedia.facebook },
                { icon: Instagram, href: contactInfo.socialMedia.instagram },
                { icon: Linkedin, href: contactInfo.socialMedia.linkedin },
                { icon: Youtube, href: contactInfo.socialMedia.youtube },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Unit Types */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">{t('footer.unitTypes')}</h4>
            <ul className="space-y-3">
              {unitTypes.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">{t('footer.contactUs')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-white/60 text-sm">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-white/60 text-sm">{contactInfo.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-white/60 text-sm">{contactInfo.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? 'rtl-grid' : ''}`}>
            <p className="text-white/50 text-sm text-center sm:text-left">
              {currentYear} {t('app.name')}. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/50 hover:text-gold text-sm transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-white/50 hover:text-gold text-sm transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={scrollToTop}
        className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} w-12 h-12 bg-gold hover:bg-gold-dark rounded-full flex items-center justify-center shadow-luxury transition-colors z-40`}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>
    </footer>
  );
}
