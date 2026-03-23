import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function useLanguage() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || 'ar';
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    // Set document direction and language on mount and language change
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang, isRTL]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Helper to get text with proper direction
  const getText = (key: string, options?: Record<string, unknown>) => {
    return t(key, options);
  };

  // Helper for numbers (Arabic numerals vs English)
  const formatNumber = (num: number): string => {
    if (isRTL) {
      // Convert to Arabic numerals
      const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return num.toString().replace(/[0-9]/g, (w) => arabicDigits[+w]);
    }
    return num.toString();
  };

  // Helper for currency formatting
  const formatCurrency = (amount: number, currency: string = 'EGP'): string => {
    const formatted = new Intl.NumberFormat(isRTL ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
    
    return formatted;
  };

  // Helper for date formatting
  const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(isRTL ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
  };

  return {
    t,
    i18n,
    currentLang,
    isRTL,
    changeLanguage,
    getText,
    formatNumber,
    formatCurrency,
    formatDate,
  };
}
