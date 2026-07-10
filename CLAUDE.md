# Jeshua Software — Claude Code Configuration

## Project Overview
- **Company**: JeShua Code / Jeshua Software (consultoría tecnológica + desarrollo de software a medida)
- **Owner**: Josue
- **Purpose**: Landing bilingüe (ES/EN) B2B + URL requerida por Stripe Connect
- **Status**: REDISEÑO COMPLETO (jul 2026), NOT DEPLOYED
- **Repo**: https://github.com/joshmen/jeshuacode

## Tech Stack
- Next.js 16 (App Router) + Tailwind v4 + Framer Motion + Lucide React
- Static export (`output: "export"`) for Azure Static Web Apps
- Font: Archivo (Google Fonts, 400–900)
- Build: **0 errors**, static export generates `out/`

## Design Style — CRITICAL
**Estilo audaz tipo Dropbox 2024**: negro puro en hero/CTA/footer, mucho blanco/gris,
tipografía grande y contundente. Fuente de verdad del diseño: prototipo HTML en
`JeshuaCode.zip` (Downloads) + `PROMPT-completo.md`.
- NO morados/índigo, NO Inter/Space Grotesk, NO gradientes exagerados, NO emojis (salvo 👋 del bot)
- Tono B2B profesional, **sin historia de fe**

### Design Tokens (globals.css → @theme)
```
accent: #0061FE (hover #0053D6, light #EAF1FF)  — azul eléctrico
ink: #0A0A0A                                     — negro hero/CTA/footer
foreground: #101828 · muted: #475467 · faint: #667085
surface: #F6F7F9 (secciones grises) · line: #EAECF0 · success: #12B76A
Titulares: 800, tracking -0.03em · Botones: radio 11px · Secciones: py-28 desktop
```

## i18n (ES/EN)
- Client-side, compatible con static export. Sin rutas por idioma.
- `src/lib/i18n.ts` — diccionarios `ES`/`EN` completos + constantes `WHATSAPP_URL`, `CALENDLY_URL`, `CONTACT_EMAIL`
- `src/lib/language-context.tsx` — `LanguageProvider` + hook `useLanguage()` → `{ lang, setLang, t }`
- Toggle ES/EN en la nav cambia TODO el texto del sitio

## Project Structure
```
src/app/layout.tsx          # Archivo font, SEO metadata, lang="es"
src/app/page.tsx            # LanguageProvider + composición de secciones
src/app/globals.css         # Tailwind v4 + tokens
src/components/
├── nav.tsx                 # Fija, transparente→blanca con blur al scroll >60px, hamburger móvil
├── hero.tsx                # Negro, centrado. CrmWindow (HTML/CSS), BotPhone (chat), SidePhoto ×2
├── trust.tsx               # Franja de 8 tecnologías
├── services.tsx            # 6 tarjetas (grid 3×2), iconos lucide
├── process.tsx             # 4 pasos numerados (cuadro negro)
├── projects.tsx            # Handy Sales CRM destacado + Jeyma + "Tu proyecto aquí" (azul)
├── testimonials.tsx        # 2 tarjetas (PLACEHOLDERS: Carlos M. / Ana R.)
├── pricing.tsx             # 3 planes, el 2° "Más popular" (borde azul)
├── faq.tsx                 # Acordeón, una abierta a la vez (estado openFaq)
├── cta.tsx                 # Negro + botón azul + fantasma WhatsApp
├── contact.tsx             # Form (éxito fake al enviar) + email/WhatsApp/Calendly
├── footer.tsx              # Negro, columnas + social
└── section-head.tsx        # Eyebrow + título + sub (compartido)
src/lib/animations.ts       # Variants Framer Motion (fadeInUp, stagger…)
```

## Assets (public/images/) — generados con gemini-media (nano banana)
- `hero-team.jpg` — foto equipo (hero izq, 250×372 slot)
- `hero-client.jpg` — foto cliente con app (hero der)
- `handysales-crm.jpg` — mockup dashboard CRM (proyecto destacado)
- `jeyma-site.jpg` — mockup e-commerce Jeyma (recortado al hero del navegador)
- Originales PNG 2K en `images/generated-src/` (no deployados)
- Assets del diseño anterior (videos, logos DeliveryGo) en `images/archive/` (no deployados)
- Prompts de regeneración: `PROMPTS-nano-banana.md` (Downloads)

## Branding
- Marca: cuadro azul con "JS" + wordmark "JeShua Code" (componente inline en nav/footer)
- El logo anterior (`logo-transparente.png`) quedó archivado

## Commands
```bash
npm run dev    # localhost:3000
npm run build  # genera out/
```

## Pending
- [ ] Deploy to Azure Static Web Apps
- [ ] WhatsApp real (placeholder: wa.me/5210000000000) — en `src/lib/i18n.ts`
- [ ] Calendly real (placeholder: calendly.com/jeshuacode) — en `src/lib/i18n.ts`
- [ ] Precios reales (referencias: $8,900 / $4,500 MXN)
- [ ] Testimonios reales (Carlos M. / Ana R. son placeholders)
- [ ] Form de contacto: hoy es éxito fake (static export, sin backend) — integrar servicio real
- [ ] Links Legal (Privacidad/Términos) apuntan a "#"
- [ ] SEO (robots.txt, sitemap) + custom domain

## Design Agent Instructions

### REGLA #1: SIEMPRE revisar diseños existentes antes de crear
1. Usar `batch_get` para leer nodos similares existentes
2. Copiar exactamente los mismos patrones (colores, iconos, tamaños)
3. NO inventar estilos nuevos

### REGLA #2: SIEMPRE avisar antes de gastar créditos AI de Pencil
- `G(node, "ai", prompt)` = 18 créditos por imagen → **informar y preguntar antes**
- `G(node, "stock", query)` = GRATIS (Unsplash) · `I()`, `U()`, `C()`, `R()`, `D()`, `M()` = GRATIS
- (Para imágenes fotorrealistas/mockups usar el MCP gemini-media, es lo que prefiere el usuario)

## Agent Configuration
- **Haiku**: Búsquedas, validaciones, builds
- **Sonnet**: Escribir/modificar código, tests, refactoring
- **Opus**: Diseño de sistemas, decisiones críticas, UX/UI complejos
