# VEDIX - Digital Heritage Platform

An immersive, production-ready frontend for VEDIX, a digital heritage platform focused on teaching and showcasing Bharatiya Natya mudras using modern, cinematic 3D web experiences.

## 🚀 Features

- **Cinematic 3D Experiences**: Built with Three.js and React Three Fiber
- **Interactive Mudra Practice**: Real-time webcam hand tracking with MediaPipe
- **Immersive UI/UX**: Glassmorphism design with smooth animations
- **Performance Optimized**: 60 FPS with adaptive quality scaling
- **PWA Support**: Installable progressive web app
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Three.js** + **@react-three/fiber** + **@react-three/drei** - 3D graphics
- **Framer Motion** - Animations
- **GSAP** + **ScrollTrigger** - Scroll animations
- **Lenis** - Smooth scrolling
- **MediaPipe** - Hand tracking
- **Tailwind CSS** - Styling
- **PWA** - Progressive Web App support

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🐳 Docker

```bash
docker build -t vedix-frontend .
docker run -p 80:80 vedix-frontend
```

## 📁 Project Structure

```
/frontend
 ├─ src/
 │   ├─ three/          # Three.js components
 │   ├─ shaders/        # GLSL shaders
 │   ├─ components/      # React components
 │   ├─ pages/          # Page components
 │   ├─ hooks/          # Custom hooks
 │   ├─ animations/     # Animation configs
 │   └─ styles/         # Global styles
 ├─ public/             # Static assets
 └─ dist/               # Build output
```

## 🎨 Design System

- **Colors**: Saffron (#FFA000), Gold (#B8860B), Maroon (#800020)
- **Typography**: Playfair Display (headings), Inter (body), Noto Sans Devanagari (Sanskrit)
- **Effects**: Glassmorphism, glow effects, particle systems

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**: Ensure your code is pushed to GitHub
2. **Import Project**: 
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
3. **Auto Configuration**: Vercel will auto-detect Vite settings
4. **Deploy**: Click "Deploy" - it's that simple!

**Configuration Files:**
- `vercel.json` - Already configured for SPA routing
- Build settings are auto-detected

**Build Settings (Auto-detected):**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Other Deployment Options

- **Netlify**: Similar to Vercel, auto-detects Vite
- **Docker**: Use the included Dockerfile
- **Any Static Host**: Upload the `dist` folder after building

## 📱 PWA

The app is fully PWA-enabled with:
- Service worker for offline support
- Installable on mobile and desktop
- App shortcuts for quick access

## 🎯 Pages

- **Landing**: Cinematic 3D hero section
- **About**: Storytelling with scroll animations
- **Practice**: Live mudra interaction with webcam
- **Library**: 3D mudra gallery
- **Progress**: Gamification and statistics
- **Profile**: User settings and preferences

## ⚡ Performance

- Lazy-loaded 3D assets
- Device-adaptive quality scaling
- GPU-optimized shaders
- Mobile fallback with reduced 3D

## 📄 License

MIT

