# Rediseño de la landing de Jeshua Software (estilo Nimble)

**Fecha:** 2026-07-16
**Repo:** `jeshuacode` (Next 16 + React 19 + Tailwind v4 + Framer Motion + Poppins)
**Rama:** `feat/web-rediseno-nimble`
**Enfoque aprobado:** B — reestructuración completa.

## 1. Objetivo

Rediseñar por completo la landing de una sola página (`jeshuasoftware.com`) adoptando la **estructura y limpieza narrativa** de [nimble.com](https://www.nimble.com), **manteniendo la identidad de marca** de Jeshua Software. No es un calco: tomamos su layout y storytelling, no sus colores ni su contenido.

## 2. Contexto

- Landing actual ya en producción (Next 16, App Router, `LanguageProvider` ES/EN, Meta Pixel + CAPI, `/api/lead` → Telegram). Secciones actuales: Nav, Hero, Trust, Services, Process, Projects, Pricing, FAQ, CTA, Contact, Footer.
- **Referencia analizada (nimble.com):** WordPress + jQuery + GSAP. Roboto. Página larga (~7,150px) con: hero con captura de correo + mockups de producto, fila de premios, feature switcher, secciones alternadas imagen↔texto, "All Features One Price", grid 3×3 de features, logos de clientes, testimonios con métricas grandes, CTA final ancho, footer. CTA verde `#3BD784`, nav azul sólido, títulos navy 800.
- **Marca oficial Jeshua** (no se toca): azul Google `#4285F4`, amarillo `#FBBC04`, navy `#2A3350`, Poppins, logo horizontal con ® (ya en nav y footer).
- **Diferencia clave:** Nimble vende UN producto SaaS (muestra su CRM). Jeshua es **agencia** (construye software para otros) → los "mockups de producto" se sustituyen por mockups reales de proyectos entregados.

## 3. Decisiones (brainstorming aprobado)

1. **Identidad:** LAYOUT de Nimble + **marca Jeshua** (conservar azul/amarillo/navy/Poppins/logo; NO adoptar verde/Roboto/nav azul de Nimble).
2. **Visuales:** mockups **reales** — Handy Sales (dashboard web + app móvil) y Jeyma.
3. **Prueba social:** SOLO lo verificable. **Nada de testimonios inventados** (los actuales `tms` de Carlos M./Ana R. eran placeholder → se eliminan). Hueco de diseño listo para testimonios reales futuros.
4. **Hero:** captura de correo inline (estilo Nimble) → el correo entra como lead a Telegram vía `/api/lead` (con anti-spam).
5. **Alcance:** reestructuración completa (enfoque B).

## 4. Sistema de diseño (piel Nimble, marca Jeshua)

| Rol | Decisión |
|---|---|
| Títulos | Navy `#2A3350`, Poppins, muy grandes y bold (h1 ~56px, h2 ~40px, responsive) |
| Cuerpo | Gris `#475467` |
| CTA primario | Amarillo `#FBBC04`, texto navy (`.btn-primary` existente) |
| CTA/acento secundario | Azul `#4285F4` (eyebrows en mayúsculas con tracking, links, detalles, botón outline navy) |
| Fondos | Blanco alternado con `#F6F7F9` para separar secciones |
| Decoración | SVG inline: círculos outline y signos `+` en azul + "blobs" suaves detrás de los mockups. Ligero, sin imágenes pesadas |
| Animación | Framer Motion: componente reutilizable `Reveal` (fade-up on-scroll), equivalente moderno al GSAP de Nimble |
| Cards | Radio ~14px, borde `line`, hover con leve elevación |

Los tokens de `globals.css` se mantienen; se agregan utilidades si hacen falta (fondo alterno, helpers de decoración).

## 5. Estructura nueva (flujo narrativo Nimble)

1. **Nav** — logo con ® + links + botón amarillo "Agenda una llamada" (transparente sobre hero → blanco al scroll). *Ya implementado, se conserva.*
2. **Hero** — eyebrow + h1 grande + subtítulo + **captura de correo + botón "Agenda llamada"** + microcopy "Respuesta en 24h · sin compromiso". A la derecha: **mockup real Handy Sales** (web + móvil, blob azul detrás) + decoración geométrica.
3. **Tech strip** — "Construimos con tecnología de primer nivel" + stack (React, Next.js, .NET, React Native, PostgreSQL, Azure, Google Cloud, Stripe). Versión honesta de la "fila de premios" de Nimble.
4. **Servicios estrella (alternadas)** — 3 servicios top (Web · Bots/IA · Software a medida) en secciones grandes imagen↔texto alternado, con mockup/ilustración, bullets y micro-CTA.
5. **Grid de servicios** — los 6 servicios completos en tarjetas limpias 3×2 (icono + título + descripción).
6. **Proceso** — 4 pasos (Descubrimiento → Diseño & arquitectura → Desarrollo → Lanzamiento & soporte) en timeline numerado.
7. **Proyectos showcase** — Handy Sales (web+móvil, "En producción") + Jeyma ("En desarrollo") + "Tu proyecto aquí", con mockups reales. El "producto" real de la agencia.
8. **Precios** — 3 planes (Sitio web / Bots & Automatización / Software a medida), el de en medio destacado "Más popular".
9. **Prueba social real** — banda con datos verificables: "N proyectos en producción", el stack, y hechos reales (facturación CFDI real, app en las tiendas, plataforma multi-tenant). SIN testimonios inventados. Hueco de diseño para testimonios reales futuros.
10. **FAQ** — 5 preguntas en acordeón.
11. **CTA final** — banda ancha color (navy/azul): "¿Listo para construir tu próximo producto?" + botón amarillo + WhatsApp.
12. **Contacto** — formulario (con anti-spam) + WhatsApp directo.
13. **Footer** — logo blanco con ® + links + legal + redes. *Ya implementado, se conserva.*

**Cambios vs. actual:** + Tech strip (evoluciona el actual "Trust"), + Servicios estrella alternados (nuevo), Testimonios placeholder → **Prueba social real**, CTA final más potente. Se elimina el bloque de testimonios inventados.

## 6. Assets / mockups

- **Handy Sales web:** captura del dashboard real (levantar el web de HandySales en local o reutilizar capturas existentes) → montado en marco de navegador.
- **Handy Sales móvil:** screenshot de la app (emulador) → marco de teléfono.
- **Jeyma:** captura del sitio si está disponible; si no, tarjeta "en desarrollo".
- Son screenshots del **propio producto** → sin problema de copyright. Se optimizan y van a `public/images/`.
- Decoración geométrica: SVG inline (círculos, `+`, blobs).

## 7. Arquitectura técnica

- **Next 16 App Router**, `page.tsx` orquesta las secciones. `LanguageProvider` ES/EN se mantiene.
- **i18n.ts:** se actualiza el diccionario (copy nuevo para tech strip, servicios estrella, prueba social real; se elimina `tms` y su tipo `Testimonial` si queda sin uso). Todo bilingüe ES/EN.
- **Componentes:** cada sección es un componente enfocado con una responsabilidad. Nuevos: `hero` (con captura de correo), `servicios estrella` (alternadas), `prueba social real`, `Reveal` (wrapper de animación). El resto se rediseña conservando su interfaz de datos (`t`).
- **Hero → `/api/lead`:** la captura de correo reusa el endpoint existente (con anti-spam). Ajuste menor: aceptar un lead de solo-correo (nombre/mensaje opcionales; se rellena un mensaje por defecto "Lead desde hero").
- **Tokens** (`globals.css`): se mantienen; se agregan utilidades donde convenga.

## 8. Testing / verificación

- `npm run build` (type-check estricto de Next) limpio.
- **Playwright:** capturas desktop + móvil de cada sección; revisión de layout y responsive (sin scroll horizontal, sin solapes).
- Verificar que el correo del hero postea a `/api/lead` y llega a Telegram (respetando el anti-spam).
- Revisión en **ES y EN**.
- Deploy: rama + PR (lo mergea el usuario) → Vercel redeploya `jeshuasoftware.com`.

## 9. Dependencias y orden

- **Depende de:** el anti-spam de `/api/lead` (PR #3 `feat/anti-spam-form`, pendiente de merge). El rediseño debe construirse sobre main **con el anti-spam ya mergeado** (o rebasear), porque el hero email-capture y el contacto usan ese endpoint. Confirmar merge de PR #3 antes de implementar.
- **Ejecución:** rediseño grande y multi-sección → se construye con subagentes (subagent-driven-development) siguiendo el plan de implementación.

## 10. Fuera de alcance (fase 2)

- Testimonios reales (cuando el usuario los consiga) en el hueco de "prueba social real".
- Email corporativo, Calendly, legal (Privacidad/Términos) reales, SEO avanzado.
- Migrar `<img>` de mockups a `next/image`.
- Blog / páginas internas.
