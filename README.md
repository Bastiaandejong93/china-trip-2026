# China Explained — Cinematic Scrollytelling Website

A fully interactive, cinematic website showcasing China's geography, demography, and cultural highlights through an animated grand tour experience.

## 🚀 Quick Start

### Installation
```bash
npm install
npm run dev
```

### Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

Get your Mapbox token at [mapbox.com](https://mapbox.com)

## 🎯 Features

- **Cinematic Scrollytelling**: Smooth scroll-driven animations and transitions
- **Interactive Maps**: Mapbox-powered exploration with custom animations
- **Geography Deep Dive**: Physical, political, and demographic visualization
- **Grand Tour Route**: Interactive journey through 8 major Chinese cities
- **Cultural Highlights**: Food, ethnic groups, and iconic experiences

## 🗂️ Project Structure

```
/app
  /page.tsx              # Main scrollytelling page
  /layout.tsx            # Root layout with providers
/components
  /MapView.tsx           # Interactive map component
  /ScrollSection.tsx     # Reusable scroll section
  /Timeline.tsx          # Route timeline
  /GeoSectionPhysical.tsx    # Physical geography
  /GeoSectionPolitical.tsx   # Political geography
  /GeoSectionDemographic.tsx # Demographics
  /RouteOverview.tsx     # City highlights
  /Header.tsx            # Navigation
  /Footer.tsx            # Footer
/lib
  /tripData.ts           # Route and city data
  /countryOverview.ts    # Country information
  /theme.ts              # Design system
/data
  /ppt_outline.json      # Presentation structure
  /storyBeats.json       # Animation timeline
/public/assets
  /city-images/          # City photos
```

## 🎨 Customization

### Trip Data
Edit `/lib/tripData.ts` to modify:
- City information and coordinates
- Route segments and transport types
- City highlights and experiences

### Theme
Modify `/lib/theme.ts` to customize:
- Color palette
- Typography scales
- Animation presets

### Map Styling
Update Mapbox styles in `/components/MapView.tsx`:
- Base map style
- Custom layers and overlays
- Animation parameters

## 🎬 Animation System

The website uses a story beats system defined in `/data/storyBeats.json`:
```json
[
  {"section":"hero","camera":"zoom_to_shanghai"},
  {"section":"physical","camera":"pan_east_china_plain"},
  {"section":"route","camera":"follow_train_shanghai_wuhan"}
]
```

Each beat triggers:
- Map camera movements
- Content transitions
- Scroll progress indicators

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📦 Dependencies

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Mapbox GL
- GSAP
- shadcn/ui
- Zustand

## 🌟 Key Experiences

### Must-See Highlights
- **热干面 (Hot Dry Noodles)** in Wuhan
- **Avatar Mountains** in Zhangjiajie
- **Chongqing Hotpot** experience
- **Panda Conservation** in Chengdu
- **Erhai Lake** in Dali
- **Jade Dragon Snow Mountain** in Lijiang
- **Great Wall** at Mutianyu

### Cultural Journey
- Tujia ethnic culture (Zhangjiajie)
- Bai traditions (Dali)
- Naxi heritage (Lijiang)
- Modern megacity life (Shanghai, Beijing)

## 🎯 Interactive Elements

- **Hoverable provinces** with detailed information
- **Population heatmaps** showing distribution patterns
- **City popup cards** with photo galleries
- **Smooth scroll indicators** showing progress
- **Animated route lines** connecting destinations

## 📱 Responsive Design

Fully responsive design optimized for:
- Desktop (1920px+)
- Tablet (768px-1024px)
- Mobile (320px-768px)

## 🎭 Performance

- Optimized image loading with Next.js Image
- Lazy loading for map tiles
- Smooth 60fps animations
- Efficient scroll event handling

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.