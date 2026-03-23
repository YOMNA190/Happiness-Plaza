import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle2,
  Loader2,
  Building2,
  User,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { contactInfo, unitTypeOptions } from '@/data/mockData';
import type { InquiryForm } from '@/types';

export default function ContactSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState<InquiryForm>({
    name: '',
    phone: '',
    email: '',
    unitType: 'any',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryForm, string>>>({});

  // Check for pre-selected unit/zone from localStorage
  useEffect(() => {
    const selectedUnit = localStorage.getItem('selectedUnit');
    const selectedZone = localStorage.getItem('selectedZone');
    
    if (selectedUnit) {
      const unit = JSON.parse(selectedUnit);
      setFormData(prev => ({
        ...prev,
        unitType: unit.type,
        message: `I'm interested in ${unit.name} (${unit.size} sqm). Please provide more information.`,
      }));
      localStorage.removeItem('selectedUnit');
    } else if (selectedZone) {
      const zone = JSON.parse(selectedZone);
      setFormData(prev => ({
        ...prev,
        unitType: zone.type === 'food' ? 'retail' : zone.type,
        message: `I'm interested in the ${zone.name}. Please provide more information about available units.`,
      }));
      localStorage.removeItem('selectedZone');
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryForm, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.errors.nameRequired');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.form.errors.phoneRequired');
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = t('contact.form.errors.phoneInvalid');
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call - Replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store in localStorage for demo purposes
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    inquiries.push({
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        unitType: 'any',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (field: keyof InquiryForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getUnitTypeLabel = (type: string) => {
    switch (type) {
      case 'any':
        return t('units.filters.all');
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

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            {t('contact.badge')}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-dark mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-dark/60 text-lg max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className={`grid lg:grid-cols-5 gap-12 ${isRTL ? 'rtl-grid' : ''}`}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-light-gray rounded-xl">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark mb-1">{t('contact.info.location')}</h4>
                  <p className="text-dark/60 text-sm">{contactInfo.address}</p>
                  <p className="text-gold text-sm mt-1">{contactInfo.addressAr}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-light-gray rounded-xl">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark mb-1">{t('contact.info.phone')}</h4>
                  <p className="text-dark/60 text-sm">{contactInfo.phone}</p>
                  <p className="text-dark/60 text-sm">{contactInfo.phone2}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-light-gray rounded-xl">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark mb-1">{t('contact.info.email')}</h4>
                  <p className="text-dark/60 text-sm">{contactInfo.email}</p>
                  <p className="text-dark/60 text-sm">{contactInfo.website}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-light-gray rounded-xl">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark mb-1">{t('contact.info.hours')}</h4>
                  <p className="text-dark/60 text-sm">{contactInfo.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-dark to-dark-light rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-gold" />
                <h4 className="font-heading font-semibold text-white">{t('contact.quickResponse.title')}</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">
                {t('contact.quickResponse.desc')}
              </p>
              <ul className="space-y-2">
                {[
                  t('contact.quickResponse.items.0'),
                  t('contact.quickResponse.items.1'),
                  t('contact.quickResponse.items.2'),
                  t('contact.quickResponse.items.3'),
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-white/60 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-light-gray rounded-2xl p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-dark mb-2">
                    {t('contact.form.success.title')}
                  </h3>
                  <p className="text-dark/60">
                    {t('contact.form.success.desc')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-dark">
                        <User className="w-4 h-4 inline mr-2" />
                        {t('contact.form.name')} *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('contact.form.namePlaceholder')}
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`h-12 bg-white border-dark/10 focus:border-gold focus:ring-gold/20 ${
                          errors.name ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-dark">
                        <Phone className="w-4 h-4 inline mr-2" />
                        {t('contact.form.phone')} *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t('contact.form.phonePlaceholder')}
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`h-12 bg-white border-dark/10 focus:border-gold focus:ring-gold/20 ${
                          errors.phone ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-dark">
                        <Mail className="w-4 h-4 inline mr-2" />
                        {t('contact.form.email')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('contact.form.emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`h-12 bg-white border-dark/10 focus:border-gold focus:ring-gold/20 ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    {/* Unit Type */}
                    <div className="space-y-2">
                      <Label htmlFor="unitType" className="text-dark">
                        <Building2 className="w-4 h-4 inline mr-2" />
                        {t('contact.form.unitType')}
                      </Label>
                      <Select
                        value={formData.unitType}
                        onValueChange={(value) => handleChange('unitType', value)}
                      >
                        <SelectTrigger className="h-12 bg-white border-dark/10 focus:border-gold focus:ring-gold/20">
                          <SelectValue placeholder={t('contact.form.unitType')} />
                        </SelectTrigger>
                        <SelectContent>
                          {unitTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {getUnitTypeLabel(option.value)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-dark">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      {t('contact.form.message')}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={t('contact.form.messagePlaceholder')}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="min-h-[120px] bg-white border-dark/10 focus:border-gold focus:ring-gold/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gold hover:bg-gold-dark text-white text-lg font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t('contact.form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </Button>

                  <p className="text-center text-dark/50 text-sm">
                    {t('contact.form.privacy')}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
