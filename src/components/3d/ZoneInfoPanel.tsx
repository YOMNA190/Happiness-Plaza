import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Zone } from '@/types';
import { 
  X, 
  ShoppingBag, 
  Utensils, 
  Hotel, 
  Stethoscope, 
  Gamepad2, 
  Building2,
  Check,
  MapPin,
  TrendingUp,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ZoneInfoPanelProps {
  zone: Zone | null;
  onClose: () => void;
  onInquire: (zone: Zone) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Utensils,
  Hotel,
  Stethoscope,
  Gamepad2,
  Building2,
};

export default function ZoneInfoPanel({ zone, onClose, onInquire }: ZoneInfoPanelProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  if (!zone) return null;

  const Icon = iconMap[zone.icon] || Home;
  const occupancyRate = Math.round(((zone.totalUnits - zone.availableUnits) / zone.totalUnits) * 100);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: isRTL ? -300 : 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isRTL ? -300 : 300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed ${isRTL ? 'left-0' : 'right-0'} top-0 h-full w-full max-w-md bg-white shadow-luxury-xl z-50 overflow-y-auto`}
      >
        {/* Header with zone color */}
        <div 
          className="relative h-32 flex items-end p-6"
          style={{ background: `linear-gradient(135deg, ${zone.color} 0%, ${zone.color}dd 100%)` }}
        >
          <button
            onClick={onClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors`}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-white">
                {isRTL ? zone.nameAr : zone.name}
              </h2>
              <p className="text-white/80 text-sm font-body">
                {isRTL ? zone.name : zone.nameAr}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-dark/60 uppercase tracking-wider mb-2">
              {t('tour.zoneInfo.description')}
            </h3>
            <p className="text-dark/80 font-body leading-relaxed">{zone.description}</p>
          </div>

          {/* Availability Stats */}
          <div className="bg-gold/5 rounded-xl p-4 border border-gold/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-dark/70">{t('tour.zoneInfo.availability')}</span>
              <span className="text-gold font-bold">{zone.availableUnits} / {zone.totalUnits} {t('units.units')}</span>
            </div>
            <div className="w-full h-2 bg-gold/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold rounded-full transition-all duration-500"
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
            <p className="text-xs text-dark/50 mt-2">{occupancyRate}% {t('tour.zoneInfo.occupied')}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-dark/60 uppercase tracking-wider mb-3">
              {t('tour.zoneInfo.services')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {zone.services.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-2 bg-light-gray rounded-lg"
                >
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${zone.color}20` }}
                  >
                    <Check className="w-3 h-3" style={{ color: zone.color }} />
                  </div>
                  <span className="text-sm text-dark/70">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Info */}
          <div className="flex items-start gap-3 p-4 bg-dark/5 rounded-xl">
            <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-dark">{t('tour.zoneInfo.location')}</p>
              <p className="text-xs text-dark/60 mt-1">{t('tour.zoneInfo.locationAddress')}</p>
            </div>
          </div>

          {/* Investment Potential */}
          <div className="flex items-start gap-3 p-4 bg-gold/5 rounded-xl border border-gold/20">
            <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-dark">{t('tour.zoneInfo.investment')}</p>
              <p className="text-xs text-dark/60 mt-1">
                {t('tour.zoneInfo.investmentDesc')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-dark/10">
            <Button 
              onClick={() => onInquire(zone)}
              className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-6"
            >
              {t('tour.zoneInfo.inquire')}
            </Button>
            <Button 
              variant="outline"
              onClick={onClose}
              className="w-full border-dark/20 text-dark hover:bg-dark/5"
            >
              {t('tour.zoneInfo.continue')}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
