# Rediseño landing estilo Nimble — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la landing de Jeshua Software adoptando la estructura narrativa de nimble.com, conservando la marca (azul/amarillo/navy/Poppins/logo) y reusando el código de calidad existente.

**Architecture:** Next 16 App Router, una página client-side con `LanguageProvider` ES/EN. Cada sección es un componente enfocado que consume el diccionario `t`. Se reusan `lib/animations.ts`, `section-head.tsx`, tokens de `globals.css` y el `CrmWindow`/`BotPhone` del hero actual. Fondo del hero permanece oscuro (marca Jeshua) pero se reestructura a 2 columnas estilo Nimble.

**Tech Stack:** Next 16.1.6, React 19, Tailwind v4, framer-motion 12, lucide-react, Poppins.

## Global Constraints

- **Marca (verbatim):** azul acento `#4285F4`, amarillo CTA `#FBBC04` (clase `.btn-primary`, texto navy), navy `#2A3350`, Poppins. NO adoptar verde/Roboto/nav-azul de Nimble.
- **Bilingüe ES/EN**: todo texto visible vive en `src/lib/i18n.ts` (dict `ES` y `EN`), se consume con `useLanguage()`.
- **Sin rayas largas en UI**: nunca ` — ` ni `–`; usar `:` o `.` (regla del usuario).
- **Reusar**: `fadeInUp`/`fadeIn`/`staggerContainer`/`scaleIn` de `lib/animations.ts`; `SectionHead`; tokens de `globals.css`. No duplicar helpers.
- **Mockups**: reusar `CrmWindow`/`BotPhone` (CSS) del hero y `public/images/handysales-crm.jpg`, `jeyma-site.jpg`. Sin assets con copyright de terceros.
- **Endpoint**: el hero y contacto usan `/api/lead` CON anti-spam (traer de `feat/anti-spam-form`).
- **Commits**: autor `jms` (`git -c user.name="jms" -c user.email="jms@jeshuasoftware.com"`), sin Co-Authored-By.
- **Verificación por tarea**: `npm run build` limpio. Verificación visual final con Playwright (ES + EN, desktop + móvil).

**Nota de granularidad:** por ser trabajo visual, cada tarea especifica archivo, responsabilidad, interfaz de datos (`t`) y criterios de diseño/aceptación; el JSX lo produce el implementador siguiendo el spec, los tokens y los componentes existentes (no se transcribe JSX completo aquí para no fijar estética prematuramente).

---

### Task 1: Fundamentos (rama, i18n, orden de secciones, tokens)

**Files:**
- Modify: `src/lib/i18n.ts` (agregar copy; quitar `tms`/`Testimonial` si queda sin uso)
- Modify: `src/app/page.tsx` (nuevo orden de secciones)
- Modify: `src/app/globals.css` (utilidades: fondo alterno `--color-surface`, helpers si hacen falta)
- Create: `src/components/decor.tsx` (SVG decoración: círculos outline + `+` + blob, en azul, `aria-hidden`)

**Interfaces:**
- Produces: nuevas claves en `Dict` — `heroEmailPh` (placeholder correo), `heroEmailCta`, `techTitle`, `feat1..3` (title/desc/bullets para servicios estrella), `proofTitle`, `proofStats` (array {n, label}), `proofFacts` (array string). `Decor` export default con prop `variant?: "hero"|"section"`.

- [ ] **Step 1:** Traer el anti-spam a esta rama: `git merge feat/anti-spam-form --no-edit` (resuelve base de `/api/lead` + `contact.tsx`). Verificar `git status` limpio.
- [ ] **Step 2:** En `i18n.ts` agregar las claves nuevas a `ES` y `EN` (copy real, sin rayas largas). Quitar `tms` y el render de testimonios.
- [ ] **Step 3:** Reordenar `page.tsx`: Nav, Hero, Trust(techstrip), ServiceFeatures, Services, Process, Projects, Pricing, SocialProof, Faq, Cta, Contact, Footer.
- [ ] **Step 4:** Crear `decor.tsx` (SVG inline ligero).
- [ ] **Step 5:** `npm run build` → limpio. Commit: `feat(web): fundamentos rediseno (i18n, orden, decor, anti-spam)`.

---

### Task 2: Hero estilo Nimble (2 columnas + captura de correo)

**Files:**
- Modify: `src/components/hero.tsx`

**Interfaces:**
- Consumes: `t.h1`, `t.sub`, `t.heroEmailPh`, `t.heroEmailCta`, `t.tiny`; `CrmWindow`/`BotPhone` (ya en el archivo); `Decor`.
- Produces: hero de 2 columnas (texto+correo izquierda, `CrmWindow`+`BotPhone` derecha). Mantiene `id="top"`, fondo `bg-ink`.

- [ ] **Step 1:** Reestructurar a grid 2 columnas en `lg`: izquierda h1 grande + `sub` + **form de correo inline** (input email + botón `.btn-primary` "Agenda llamada") + `t.tiny`; derecha `CrmWindow` + `BotPhone` con blob (`Decor variant="hero"`). En móvil se apilan.
- [ ] **Step 2:** El form postea a `/api/lead` con `{ email, event_id, elapsed_ms, website:"" }` + `fbqTrack("Lead")`; al enviar muestra confirmación inline. Reusar patrón de `contact.tsx`.
- [ ] **Step 3:** `npm run build` → limpio. Commit: `feat(web): hero 2 columnas + captura de correo`.

---

### Task 3: Tech strip (evoluciona Trust)

**Files:**
- Modify: `src/components/trust.tsx`

**Interfaces:**
- Consumes: `t.techTitle` (o `t.trustLab`); lista de stack.
- Produces: banda clara con título centrado + fila de nombres/logos del stack (React, Next.js, .NET, React Native, PostgreSQL, Azure, Google Cloud, Stripe).

- [ ] **Step 1:** Rediseñar como banda `bg-surface` con `SectionHead`-lite y una fila responsive de chips/nombres de stack, animación `staggerContainer`.
- [ ] **Step 2:** `npm run build` → limpio. Commit: `feat(web): tech strip`.

---

### Task 4: Servicios estrella (alternadas) + grid de servicios

**Files:**
- Create: `src/components/service-feature.tsx` (bloque imagen↔texto reutilizable)
- Modify: `src/components/services.tsx` (grid 3×2 pulido)
- Modify: `src/app/page.tsx` (insertar `<ServiceFeatures/>` antes de `<Services/>`)

**Interfaces:**
- Consumes: `t.feat1..3` (title, desc, bullets[]), `t.svc1..6` (grid); mockups (`CrmWindow` reutilizable o imágenes).
- Produces: `ServiceFeature` con props `{ eyebrow, title, desc, bullets, media, flip }`.

- [ ] **Step 1:** Crear `service-feature.tsx`: grid 2 col alternado (`flip` invierte orden), texto (eyebrow azul + h2 + desc + bullets con check) y `media` (mockup). Animación `fadeInUp`.
- [ ] **Step 2:** Componer 3 servicios estrella (Web, Bots/IA, Software a medida) con `flip` alterno.
- [ ] **Step 3:** Rediseñar `services.tsx` a grid 3×2 de tarjetas limpias (icono lucide + título + desc), hover elevación.
- [ ] **Step 4:** `npm run build` → limpio. Commit: `feat(web): servicios estrella alternados + grid`.

---

### Task 5: Proceso (timeline numerado)

**Files:**
- Modify: `src/components/process.tsx`

**Interfaces:**
- Consumes: `t.procEy`, `t.procTitle`, `t.steps[]`.
- Produces: 4 pasos en timeline/tarjetas numeradas.

- [ ] **Step 1:** Rediseñar a fila/timeline de 4 pasos con número grande azul, título navy, descripción; conector sutil. `staggerContainer`.
- [ ] **Step 2:** `npm run build` → limpio. Commit: `feat(web): proceso timeline`.

---

### Task 6: Proyectos showcase (mockups reales)

**Files:**
- Modify: `src/components/projects.tsx`

**Interfaces:**
- Consumes: `t.projEy/projTitle/projSub`, `t.featName/featTag/featDesc/featBadge`, `t.proj2*`, `t.proj3*`; `handysales-crm.jpg`, `jeyma-site.jpg`.
- Produces: showcase de 3 proyectos (Handy Sales destacado grande + Jeyma + "tu proyecto aquí").

- [ ] **Step 1:** Rediseñar: Handy Sales como card grande con mockup + badge "En producción"; Jeyma card con `jeyma-site.jpg` + badge "En desarrollo"; "Tu proyecto aquí" como card CTA con `proj3Cta`.
- [ ] **Step 2:** `npm run build` → limpio. Commit: `feat(web): proyectos showcase`.

---

### Task 7: Precios

**Files:**
- Modify: `src/components/pricing.tsx`

**Interfaces:**
- Consumes: `t.priceEy/priceTitle/priceSub/popular/priceNote`, `t.plans[]`.
- Produces: 3 tarjetas de precio, la `popular` destacada (borde azul + badge).

- [ ] **Step 1:** Rediseñar tarjetas al estilo Nimble limpio: plan popular elevado con badge amarillo/azul, features con check, CTA `.btn-primary` en la popular y outline en las otras.
- [ ] **Step 2:** `npm run build` → limpio. Commit: `feat(web): precios`.

---

### Task 8: FAQ (acordeón) + CTA (banda ancha)

**Files:**
- Modify: `src/components/faq.tsx`
- Modify: `src/components/cta.tsx`

**Interfaces:**
- Consumes: `t.faqEy/faqTitle/faqs[]`; `t.ctaTitle/ctaSub/ctaBtn/ctaWa`, `WHATSAPP_URL`.
- Produces: FAQ acordeón accesible; CTA banda ancha.

- [ ] **Step 1:** FAQ como acordeón (un item abierto a la vez), chevron lucide, animación de altura.
- [ ] **Step 2:** CTA como banda ancha `bg-navy` o gradiente azul: título grande blanco + `.btn-primary` + link WhatsApp. `Decor`.
- [ ] **Step 3:** `npm run build` → limpio. Commit: `feat(web): faq acordeon + cta ancho`.

---

### Task 9: Contacto (piel) + Prueba social real

**Files:**
- Modify: `src/components/contact.tsx` (nueva piel, conserva anti-spam honeypot/time-trap)
- Create: `src/components/social-proof.tsx`
- Delete: `src/components/testimonials.tsx` (placeholder inventado)
- Modify: `src/app/page.tsx` (insertar `<SocialProof/>` antes de `<Faq/>`)

**Interfaces:**
- Consumes: `t.proofTitle`, `t.proofStats[]`, `t.proofFacts[]`; contacto usa las claves `f*` existentes.
- Produces: banda de prueba social real (stats + facts verificables); contacto pulido.

- [ ] **Step 1:** Crear `social-proof.tsx`: banda con 3-4 stats (ej. "proyectos en producción", "años de stack .NET/React", "app en tiendas") + lista de hechos verificables. Sin testimonios inventados.
- [ ] **Step 2:** Repiel de `contact.tsx` conservando honeypot `website` + `elapsed_ms` (anti-spam). Verificar que el campo trampa siga invisible.
- [ ] **Step 3:** Eliminar `testimonials.tsx` y su import si existiera.
- [ ] **Step 4:** `npm run build` → limpio. Commit: `feat(web): prueba social real + contacto`.

---

### Task 10: Verificación final + ventana

**Files:** ninguno (verificación)

- [ ] **Step 1:** `npm run build` limpio en la rama completa.
- [ ] **Step 2:** `npm run dev`; con Playwright, capturas ES y EN, desktop (1440) y móvil (390) de todas las secciones. Revisar: sin scroll horizontal, sin solapes, contraste, honeypot invisible, hero-correo postea a `/api/lead`.
- [ ] **Step 3:** Abrir el navegador del usuario en `http://localhost:3000` (`Start-Process`).
- [ ] **Step 4:** Ajustes de pulido según revisión visual. Commit final.

## Self-Review

- **Spec coverage:** Hero+correo (T2), tech strip (T3), servicios estrella+grid (T4), proceso (T5), proyectos showcase (T6), precios (T7), FAQ+CTA (T8), prueba social real + contacto anti-spam (T9), decoración (T1), assets reusados, verificación ES/EN + ventana (T10). Nav/Footer ya existen. ✅
- **Placeholders:** contenido "N proyectos" se fija con el número real en T9 (Handy Sales + Jeyma = 2 en producción/desarrollo). Sin TODOs.
- **Consistencia:** claves `t.*` nuevas definidas en T1 y consumidas en T2-T9; `Decor` definido en T1.
