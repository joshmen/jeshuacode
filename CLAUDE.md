# Jeshua Software — Claude Code Configuration

## Project Overview
- **Company**: Jeshua Software (consultoría tecnológica + desarrollo de software a medida)
- **Owner**: Josue (jms). Responder SIEMPRE en español.
- **Purpose**: Landing bilingüe (ES/EN) B2B + URL requerida por Stripe Connect
- **Status**: **EN VIVO** en https://jeshuasoftware.com (Vercel, deploy por Git)
- **Repo**: https://github.com/joshmen/jeshuacode

## Tech Stack
- Next.js 16 (App Router) + React 19 + Tailwind v4 + Framer Motion + Lucide React
- **NO es static export**: existe `src/app/api/lead/route.ts` (Node runtime). `next.config.ts`
  solo trae `images: { unoptimized: true }`.
- Font: **Roboto** (`next/font/google`, variable `--font-roboto`)
- Deploy: **Vercel**, no Azure

## Design Style — CRITICAL
**Estilo Nimble** (nimble.com es la referencia que el dueño eligió y exigió seguir):
nav azul, hero blanco, CTA verde. NO es el diseño negro tipo Dropbox de la versión anterior.
- NO morados/índigo, NO gradientes exagerados, NO emojis (salvo 👋 del bot)
- Tono B2B profesional, **sin historia de fe**
- **NUNCA rayas largas (— –) en la UI**: usar `:` `.` `·`
- **NUNCA inventar datos**: nada de testimonios, precios ni logos de clientes que no existan.
  Los testimonios placeholder se borraron por esto.

### Design Tokens (`src/app/globals.css` → `@theme inline`)
```
accent:  #159BD7 (hover #0F87BD, light #E4F3FB)  — azul Nimble: nav, links, iconos
cta:     #3BD784 (hover #2BC974)                 — verde Nimble: botones de accion
navy:    #2A3350 · foreground: #101828 · muted: #475467 · faint: #667085
surface: #F6F7F9 · line: #EAECF0 · success: #12B76A
Legacy sin uso: brand-yellow, ink
```
Sombras (medidas contra Nimble, en `globals.css`): `.btn-primary`, `.btn-soft`, `.field-shadow`,
`.card-shadow`. Ojo: `.card-shadow` NO define `:hover` (chocaría con las utilidades de Tailwind).

## i18n (ES/EN)
- Client-side. Sin rutas por idioma.
- `src/lib/i18n.ts` — diccionarios `ES`/`EN` completos + constantes de contacto
- `src/lib/language-context.tsx` — `LanguageProvider` + `useLanguage()` → `{ lang, setLang, t }`
- El toggle de la nav cambia TODO el texto. Al agregar texto: **siempre en ambos idiomas**.

## Project Structure
```
src/app/layout.tsx           # Roboto, SEO metadata, Pixel
src/app/page.tsx             # LanguageProvider + composición de secciones
src/app/globals.css          # Tailwind v4 + tokens + sombras
src/app/api/lead/route.ts    # POST del form: antibot + Telegram + Meta CAPI
src/components/
├── nav.tsx                  # Fija, azul. z-100 (ojo al montar overlays)
├── hero.tsx                 # 2 col. Capturas REALES de Handy + form de email
├── trust.tsx                # Franja de tecnologías
├── services.tsx             # Tarjetas de servicios
├── service-features.tsx     # Servicios estrella; el de bots monta <BotChat/>
├── bot-chat.tsx             # Mockup WhatsApp con textos REALES del bot + lead capturado
├── process.tsx              # Pasos numerados
├── projects.tsx             # Handy Sales (captura real) + Jeyma + Bots + "Tu proyecto aquí"
├── social-proof.tsx         # (NO existe testimonials.tsx: se borró, eran placeholders)
├── pricing.tsx              # Planes. Precios alineados al RAG del bot: $1,500 / $3,500
├── faq.tsx                  # Acordeón (patrón reusable para el tab Ayuda del widget)
├── cta.tsx · contact.tsx · footer.tsx · section-head.tsx · decor.tsx · pixel.tsx
src/lib/
├── animations.ts            # Variants Framer Motion (fadeInUp, staggerContainer, scaleIn)
├── i18n.ts · language-context.tsx
├── telegram.ts · meta-capi.ts · fbq.ts   # avisos de lead + tracking
```

## Antibot del form (`api/lead/route.ts`)
Honeypot + time-trap + rate-limit. Se agregó tras recibir spam real. **El widget de chat debe
usar el MISMO modelo** (no reCAPTCHA): es lo acordado con el engine.

## Assets (`public/images/`)
- `real-handy-web.png` — captura REAL del panel de Handy Sales (2880×1800, ratio 16/10)
- `real-handy-mobile.png` — captura REAL de la app móvil
- `jeyma-site.jpg` — sitio de Jeyma
- Logo con ® en `public/` (las variantes sin ® son viejas: **el logo lleva ®**)

## Bot de Jeshua (contexto)
El bot de WhatsApp está EN VIVO (repo `jeshua-bots`, VPS `hermes-vps`, `bots.jeshuasoftware.com`).
Los textos de `bot-chat.tsx` y los precios de `pricing.tsx` salen de su RAG real: mantenerlos
sincronizados. El engine ya tiene **canal web** (`/public/*` con SSE) para el widget de esta landing.

## Commands
```bash
npm run dev     # localhost:3000
npm run build   # build de produccion
```

## Pending
- [ ] **Widget de chat** estilo Intercom (FASE 2 del plan): `src/components/chat/*`, contra
      `NEXT_PUBLIC_HERMES_URL`. El engine ya expone el contrato.
- [ ] `hola@jeshuasoftware.com` NO existe todavía, pero el RAG del bot ya lo da a los prospectos
      y aparece en la política de privacidad del engine. Decidir buzón (Cloudflare Email Routing)
      o cambiar el dato.
- [ ] Links Legal (Privacidad/Términos) apuntan a "#"
- [ ] SEO (robots.txt, sitemap)

## Git
- **NUNCA** Anthropic/Claude/Co-Authored-By en commits ni PRs. Autor siempre `jms`.
- **NUNCA** push sin que el dueño lo pida. `main` está protegida: se va por PR y **él** mergea.
- Commits en español, explicando el porqué (no el qué).

## Agent Configuration
- **Haiku**: búsquedas, validaciones, builds
- **Sonnet**: escribir/modificar código, tests, refactoring
- **Opus**: diseño de sistemas, decisiones críticas, UX/UI complejos
