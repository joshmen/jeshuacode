# Jeshua Software — Claude Code Configuration

## Project Overview
- **Company**: Jeshua Software (consultoría tecnológica + desarrollo de software a medida)
- **Owner**: Josue (cristiano, nombre hebreo Yehoshua = "Dios salva")
- **Purpose**: Portfolio profesional + URL requerida por Stripe Connect
- **Status**: BUILT, NOT DEPLOYED

## Tech Stack
- Next.js 16 (App Router) + Tailwind v4 + Framer Motion + Lucide React
- Static export (`output: "export"`) for Azure Static Web Apps
- Font: Inter (Google Fonts)
- Build: **0 errors**, static export generates `out/`

## Design Style — CRITICAL
**Style**: Clean modern tech (Vercel/Linear/Stripe inspired)
- NO dark themes, NO serif fonts, NO gold accents (user rejected dark+gold as "pagina de muebleria!")

### Design Tokens (globals.css)
```
Background: #FFFFFF (main), #FAFAFA (alternate sections)
Text Primary: #0D0D0D
Text Secondary: #7A7A7A
Accent: #4F46E5 (indigo)
Accent Light: #EEF2FF
Border: #E8E8E8
Font: Inter only
```

## Pencil Design
- **File**: `jeshuacode.pen`
- **Page node**: `GcnXC` (1440px wide, vertical layout)
- Sections: Header → Hero → Services → Projects → About → FinalCTA → Footer

## Project Structure
```
jeshuacode/
├── src/app/layout.tsx          # Inter font, SEO metadata, lang="es"
├── src/app/page.tsx            # Composes all section components
├── src/app/globals.css         # Tailwind v4 + design tokens
├── src/components/header.tsx   # Sticky nav + mobile hamburger + oversized logo
├── src/components/hero.tsx     # Text left + video right (hero-video.mp4)
├── src/components/services.tsx # 4 cards (Apps, Consultoría, SaaS, Cloud)
├── src/components/projects.tsx # DeliveryGo showcase (video + logo) + placeholders
├── src/components/about.tsx    # Story + Hebrew meaning + stats
├── src/components/cta.tsx      # Dark card + indigo CTA button
├── src/components/footer.tsx   # Brand + links + copyright + social
├── src/lib/animations.ts       # Framer Motion variants (typed)
├── staticwebapp.config.json    # Azure SWA fallback config
└── next.config.ts              # output: "export", images: unoptimized
```

## Assets (public/images/)
- `logo-transparente.png` — Logo principal (fondo transparente, ACTIVO en header + footer)
- `jeshua-software-logo-web.svg` — Logo SVG anterior (reemplazado)
- `jeshua-software-logo.svg`, `.png` — Variantes del logo
- `jeshua-software-banner.png`, `.svg` — Banner
- `hero-video.mp4` — Video del hero section
- `deliverygo-video.mp4` — Video del proyecto DeliveryGo
- `deliverygo-logo-pin.png` — Logo pin de DeliveryGo
- `deliverygo-mockup.png` — Mockup de DeliveryGo
- `deliverygo-screenshot.png` — Screenshot de DeliveryGo

## Component Details

### Header
- Logo oversized: `h-[100px]` mobile / `h-[140px]` desktop
- Negative margins (`marginTop: -34px, marginBottom: -34px`) para efecto oversized
- CSS clip-path en `.header-logo` para recortar parte inferior
- Sticky nav + mobile hamburger

### Hero
- Layout horizontal: texto izquierda, video derecha
- Video: `hero-video.mp4` (autoPlay, loop, muted, playsInline)
- Badge + headline + subline + 2 CTAs

### Projects (DeliveryGo)
- Mobile layout: Logo arriba → Video medio → Descripción abajo
- Desktop layout: Video izquierda → Logo + Info derecha
- Implementado con `order-*` classes + logo duplicado (`lg:hidden` / `hidden lg:block`)
- Tech tags: React Native, Expo, .NET 9, PostgreSQL, Stripe Connect, Azure
- Badge: "En desarrollo"
- 2 placeholder cards para futuros proyectos

## Commands
```bash
npm run dev    # localhost:3000
npm run build  # generates out/
```

## Pending
- [ ] Deploy to Azure Static Web Apps
- [ ] Contact form or email integration
- [ ] Custom domain setup
- [ ] SEO (robots.txt, sitemap)
- [ ] Add real screenshots for future project cards

## Design Agent Instructions

### REGLA #1: SIEMPRE revisar diseños existentes antes de crear
Antes de crear CUALQUIER elemento nuevo:
1. Usar `batch_get` para leer nodos similares existentes
2. Copiar exactamente los mismos patrones (colores, iconos, tamaños)
3. NO inventar estilos nuevos

### REGLA #2: SIEMPRE avisar antes de gastar créditos AI de Pencil
Antes de usar `G(node, "ai", prompt)` (generación de imágenes AI):
1. **INFORMAR al usuario** que la operación cuesta **18 créditos** del budget de Pencil
2. **Preguntar si quiere proceder** o si prefiere una alternativa gratuita
3. `G(node, "ai", prompt)` = 18 créditos por imagen
4. `G(node, "stock", query)` = GRATIS (Unsplash)
5. `I()`, `U()`, `C()`, `R()`, `D()`, `M()` = GRATIS

## Agent Configuration
- **Haiku**: Búsquedas, validaciones, builds
- **Sonnet**: Escribir/modificar código, tests, refactoring
- **Opus**: Diseño de sistemas, decisiones críticas, UX/UI complejos
