# Happiness Plaza - هابينيس بلازا

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-Latest-000000?logo=three.js" alt="Three.js" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/i18n-Multilingual-26A69A" alt="i18n" />
</p>

<p align="center">
  <strong>🌍 The First Integrated Complex in Upper Egypt</strong><br>
  <strong>أول مجمع متكامل في صعيد مصر</strong>
</p>

---

## 🌐 Live Demo | العرض المباشر

**URL:** [https://happiness-plaza.vercel.app](https://happiness-plaza.vercel.app)

---

## ✨ Features | المميزات

### 🎨 Design & UI | التصميم والواجهة
- ✅ **Luxury Design** - Premium gold & dark theme
- ✅ **Responsive** - Works on all devices
- ✅ **RTL Support** - Full Arabic language support
- ✅ **Animations** - Smooth Framer Motion animations
- ✅ **Dark/Light Mode** - (Coming soon)

### 🌐 Internationalization | التعددية اللغوية
- ✅ **Bilingual** - Arabic & English
- ✅ **Auto-detection** - Detects browser language
- ✅ **Persistent** - Saves language preference
- ✅ **RTL/LTR** - Automatic direction switching

### 🎮 3D Interactive Experience | تجربة ثلاثية الأبعاد تفاعلية
- ✅ **Three.js** - Real-time 3D visualization
- ✅ **Interactive Markers** - Click to explore zones
- ✅ **Orbit Controls** - Rotate, zoom, pan
- ✅ **Zone Information** - Detailed info panels

### 🏢 Commercial Units | الوحدات التجارية
- ✅ **Filter & Search** - Find units easily
- ✅ **Unit Details** - Size, price, features
- ✅ **Status Tracking** - Available, Reserved, Sold
- ✅ **Inquiry System** - Direct contact form

### 📊 Project Statistics | إحصائيات المشروع
- ✅ **Animated Counters** - Beautiful number animations
- ✅ **Progress Tracking** - Construction progress
- ✅ **Key Metrics** - Area, units, parking

### 📱 Additional Features | مميزات إضافية
- ✅ **SEO Ready** - Meta tags, Open Graph
- ✅ **PWA Ready** - Can be installed as app
- ✅ **Fast Loading** - Optimized performance
- ✅ **Accessibility** - WCAG compliant

---

## 🛠️ Tech Stack | التقنيات المستخدمة

| Technology | Purpose | الاستخدام |
|------------|---------|-----------|
| React 19 | UI Framework | إطار الواجهة |
| TypeScript | Type Safety | الأمان النوعي |
| Vite | Build Tool | أداة البناء |
| Three.js | 3D Graphics | الرسومات ثلاثية الأبعاد |
| React Three Fiber | React 3D | ربط Three.js مع React |
| Tailwind CSS | Styling | التنسيق |
| shadcn/ui | Components | المكونات |
| Framer Motion | Animations | الحركات |
| i18next | Internationalization | التعددية اللغوية |
| Lucide React | Icons | الأيقونات |

---

## 📸 Screenshots / GIFs | لقطات الشاشة / صور متحركة

*(Add screenshots or GIFs here to showcase the application's UI/UX and key features.)*

---

## 🚀 Getting Started | البدء

### Prerequisites | المتطلبات
- Node.js 18+
- npm or yarn

### Installation | التثبيت

```bash
# Clone the repository | استنساخ المستودع
git clone https://github.com/alhabeeb-group/happiness-plaza.git
cd happiness-plaza

# Install dependencies | تثبيت التبعيات
npm install

# Start development server | تشغيل خادم التطوير
npm run dev

# Open http://localhost:5173
```

### Build for Production | البناء للإنتاج

```bash
npm run build
```

---

## 📁 Project Structure | هيكل المشروع

```	src/
	├── components/
	│   ├── 3d/
	│   │   ├── Complex3D.tsx       # Main 3D scene
	│   │   └── ZoneInfoPanel.tsx   # Zone details panel
	│   ├── Navigation.tsx          # Header navigation
	│   ├── Footer.tsx              # Footer
	│   └── LanguageSwitcher.tsx    # Language toggle
	├── sections/
	│   ├── HeroSection.tsx         # Hero section
	│   ├── Tour3DSection.tsx       # 3D tour
	│   ├── UnitsSection.tsx        # Units showcase
	│   ├── StatsSection.tsx        # Statistics
	│   ├── ManagementSection.tsx   # Management info
	│   └── ContactSection.tsx      # Contact form
	├── i18n/
	│   ├── locales/
	│   │   ├── en.json            # English translations
	│   │   └── ar.json            # Arabic translations
	│   └── index.ts               # i18n config
	├── data/
	│   └── mockData.ts            # Project data
	├── types/
	│   └── index.ts               # TypeScript types
	└── App.tsx                    # Main app
```

---

## 🌍 Localization | الترجمة

### Adding a New Language | إضافة لغة جديدة

1. Create a new JSON file in `src/i18n/locales/`
2. Add translations following the existing structure
3. Register in `src/i18n/index.ts`

```typescript
import frTranslations from './locales/fr.json';

const resources = {
  // ... existing languages
  fr: {
    translation: frTranslations,
  },
};
```

### Language Structure | هيكل اللغة

```json
{
  "app": {
    "name": "Happiness Plaza",
    "tagline": "The First Integrated Complex in Upper Egypt"
  },
  "nav": {
    "home": "Home",
    "tour": "3D Tour",
    "units": "Units",
    "about": "About",
    "management": "Management",
    "contact": "Contact"
  },
  // ... more keys
}
```

---

## 🎨 Customization | التخصيص

### Colors | الألوان

Edit `tailwind.config.js`:

```javascript
colors: {
  gold: {
    DEFAULT: '#C5A028',
    light: '#D4B43A',
    dark: '#A88820',
  },
  dark: {
    DEFAULT: '#1E1E1E',
    light: '#2D2D2D',
  },
}
```

### Project Data | بيانات المشروع

Edit `src/data/mockData.ts`:

```typescript
export const projectStats = {
  totalArea: 20000,
  constructionProgress: 80,
  openingDate: 'December 2026',
  // ... more data
};
```

### 3D Model | النموذج ثلاثي الأبعاد

Edit zone positions in `src/data/mockData.ts`:

```typescript
export const zones = [
  {
    id: 'retail',
    name: 'Retail Zone',
    position: [-3, 1, -2], // x, y, z coordinates
    color: '#C5A028',
    // ... more properties
  },
];
```

---

## 📊 Feasibility Study | دراسة الجدوى

A comprehensive feasibility study is included in the `docs/` folder:

📄 [FEASIBILITY_STUDY.md](./docs/FEASIBILITY_STUDY.md)

**Key Highlights:**
- 💰 Total Investment: 478.5M EGP
- 📈 Expected Revenue: 1.11B EGP
- 🎯 ROI: 132%
- ⏱️ Payback Period: 3.5 years

---

## 🚀 Deployment | النشر

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables | متغيرات البيئة

Create `.env` file:

```env
VITE_API_URL=https://api.happinessplaza.com
VITE_GOOGLE_ANALYTICS=GA_TRACKING_ID
VITE_FACEBOOK_PIXEL=PIXEL_ID
```

---

## 📱 PWA Configuration | إعداد PWA

The app is PWA-ready. To enable:

1. Uncomment PWA code in `vite.config.ts`
2. Add icons to `public/icons/`
3. Update `manifest.json`

---

## 🔧 Browser Support | دعم المتصفحات

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| IE 11 | ❌ Not supported |

---

## 🤝 Contributing | المساهمة

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License | الترخيص

This project is proprietary software owned by Al-Habeeb Group.

© 2024 Al-Habeeb Group. All rights reserved.

---

## 📞 Contact | التواصل

For any inquiries or support, please contact Yomna via:

*   **Email:** [your-email@example.com](mailto:your-email@example.com)
*   **Portfolio:** [Your Portfolio Link](https://your-portfolio.com)
*   **GitHub:** [YOMNA190](https://github.com/YOMNA190)

**Al-Habeeb Group | مجموعة الحبيب**
- 🌐 Website: [www.happinessplaza.com](https://www.happinessplaza.com)
- 📧 Email: info@happinessplaza.com
- 📱 Phone: +20 100 123 4567
- 📍 Address: Main Entrance, New Qena, Egypt

**JKFacilities | جيه كيه للمرافق**
- 📧 Email: info@jkfacilities.com
- 📱 Phone: +20 100 987 6543

---

<p align="center">
  <strong>Developed with ❤️ by Al-Habeeb Group</strong><br>
  <strong>تم التطوير  بواسطة بشمهندسه يمنى علي  لمجموعة الحبيب</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20in-Egypt-C5A028" alt="Made in Egypt" />
</p>
