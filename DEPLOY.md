# Deployment Guide | دليل النشر

## 🚀 Quick Deploy to Vercel | النشر السريع على Vercel

### Method 1: Vercel CLI | الطريقة الأولى: CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /mnt/okcomputer/output/app
vercel --prod
```

### Method 2: Git Integration | الطريقة الثانية: ربط Git

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Vercel auto-deploys on every push

### Method 3: Vercel Dashboard | الطريقة الثالثة: لوحة التحكم

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your repository
4. Configure settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click "Deploy"

---

## ⚙️ Environment Variables | متغيرات البيئة

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```
# API Configuration
VITE_API_URL=https://api.happinessplaza.com

# Analytics
VITE_GOOGLE_ANALYTICS=G-XXXXXXXXXX
VITE_FACEBOOK_PIXEL=XXXXXXXXXX

# reCAPTCHA (for forms)
VITE_RECAPTCHA_SITE_KEY=XXXXXXXXXX

# Map/Location
VITE_GOOGLE_MAPS_API_KEY=XXXXXXXXXX
```

---

## 🔧 Build Configuration | إعدادات البناء

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
        },
      },
    },
  },
})
```

---

## 📁 File Structure for Deployment | هيكل الملفات للنشر

```
app/
├── dist/                    # Build output (auto-generated)
├── public/                  # Static assets
│   ├── manifest.json        # PWA manifest
│   ├── robots.txt           # SEO robots
│   ├── sitemap.xml          # SEO sitemap
│   └── icons/               # PWA icons
├── src/
│   ├── i18n/                # Translations
│   ├── components/          # React components
│   ├── sections/            # Page sections
│   └── ...
├── index.html               # Entry HTML
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind config
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
├── vercel.json              # Vercel config
└── README.md                # Documentation
```

---

## 🌐 Custom Domain | دومين مخصص

### 1. Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain: `happinessplaza.com`
3. Follow DNS configuration instructions

### 2. DNS Configuration | إعداد DNS

**For A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL Certificate | شهادة SSL

Vercel automatically provisions SSL certificates via Let's Encrypt.

---

## 🔒 Security Headers | رؤوس الأمان

Already configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

## 📊 Performance Optimization | تحسين الأداء

### 1. Image Optimization

Use WebP format for images:
```bash
# Convert images to WebP
npx @squoosh/cli --webp auto input.jpg -d public/images/
```

### 2. Code Splitting

Already configured in vite.config.ts with manual chunks for:
- Three.js (3D library)
- i18n (translations)
- UI components

### 3. Caching Strategy

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## 🧪 Testing Before Deploy | الاختبار قبل النشر

```bash
# Build locally
npm run build

# Preview production build
npm run preview

# Run TypeScript check
npm run type-check

# Run linting
npm run lint
```

---

## 🔄 Continuous Deployment | النشر المستمر

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: vercel/action-deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🐛 Troubleshooting | حل المشكلات

### Issue: Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: 3D scene not loading
- Check Three.js imports
- Verify browser WebGL support
- Check console for errors

### Issue: Language not switching
- Check i18n configuration
- Verify localStorage permissions
- Check browser language detection

### Issue: Styles not applying
- Verify Tailwind config
- Check CSS import order
- Clear browser cache

---

## 📞 Support | الدعم

For deployment issues, contact:
- 📧 dev@happinessplaza.com
- 📱 +20 100 123 4567

---

## 📚 Additional Resources | مصادر إضافية

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React i18next Documentation](https://react.i18next.com/)
- [Three.js Documentation](https://threejs.org/docs/)

---

<p align="center">
  <strong>Happy Deploying! | نشر سعيد!</strong>
</p>
