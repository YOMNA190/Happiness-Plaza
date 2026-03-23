import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.tour'), href: '#tour' },
    { label: t('nav.units'), href: '#units' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.management'), href: '#management' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-luxury' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                isScrolled ? 'bg-gold' : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <span className="text-xl font-heading font-bold text-white">H</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={`font-heading font-bold text-xl transition-colors ${
                  isScrolled ? 'text-dark' : 'text-white'
                }`}>
                  {t('app.name')}
                </h1>
                <p className={`text-xs transition-colors ${
                  isScrolled ? 'text-dark/60' : 'text-white/70'
                }`}>
                  {t('hero.location')}
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className={`text-sm font-medium transition-colors hover:text-gold ${
                    isScrolled ? 'text-dark/70' : 'text-white/80'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA, Language Switcher & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              <Button
                onClick={() => scrollToSection('#contact')}
                className={`hidden sm:flex items-center gap-2 transition-all ${
                  isScrolled 
                    ? 'bg-gold hover:bg-gold-dark text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>{t('nav.contact')}</span>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isScrolled 
                    ? 'bg-dark/5 hover:bg-dark/10' 
                    : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className={`w-5 h-5 ${isScrolled ? 'text-dark' : 'text-white'}`} />
                ) : (
                  <Menu className={`w-5 h-5 ${isScrolled ? 'text-dark' : 'text-white'}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 h-full w-80 max-w-full bg-white shadow-luxury-xl`}
            >
              <div className="p-6 pt-24">
                {/* Language Switcher Mobile */}
                <div className="mb-6">
                  <LanguageSwitcher />
                </div>

                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                      className="block px-4 py-3 text-dark/80 hover:text-gold hover:bg-gold/5 rounded-lg transition-colors font-medium"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-dark/10">
                  <Button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full bg-gold hover:bg-gold-dark text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t('nav.contact')}
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-8 space-y-4">
                  <div>
                    <p className="text-xs text-dark/50 uppercase tracking-wider">{t('contact.info.phone')}</p>
                    <p className="text-dark font-medium">+20 100 123 4567</p>
                  </div>
                  <div>
                    <p className="text-xs text-dark/50 uppercase tracking-wider">{t('contact.info.email')}</p>
                    <p className="text-dark font-medium">info@happinessplaza.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
