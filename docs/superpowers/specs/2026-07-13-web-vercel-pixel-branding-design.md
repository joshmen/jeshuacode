# Jeshua Software Web: Lanzamiento en Vercel + Meta Pixel + Alineación de marca

**Fecha:** 2026-07-13
**Repo:** `jeshuacode` (github.com/joshmen/jeshuacode, branch `main`)
**Estado del sitio:** landing completa y funcional (Next.js 16, React 19, Tailwind 4, Framer Motion, lucide-react, TypeScript, bilingüe ES/EN). Hoy apunta a Azure Static Web Apps (`output: "export"` + `staticwebapp.config.json`), sin tracking.

## Objetivo

Dejar `jeshuasoftware.com` **publicada en Vercel, con la identidad oficial de la marca y midiendo conversiones** (Meta Pixel + Conversions API) para poder correr anuncios y captar leads desde el día 1.

## Alcance (dentro)

1. Reorientar el deploy de Azure/estático a **Next.js server en Vercel**.
2. **Alinear el branding** al oficial (folder + `>_`, azul Google `#4285F4`, amarillo `#FBBC04`, navy `#2A3350`, tipografía Poppins).
3. **Meta Pixel** (client-side) + **Conversions API** (server-side) con eventos `PageView`, `Lead`, `Contact`.
4. **Formulario funcional** que capta leads y notifica por **Telegram** (sin email todavía).
5. **WhatsApp real** en los CTA: `wa.me/526681396431`.
6. Corregir placeholders de dominio (`jeshuacode.com` → `jeshuasoftware.com`), quitar Calendly, ocultar testimonios placeholder.

## Fuera de alcance (fase 2)

- Email corporativo y su integración en el form.
- Reactivar Calendly.
- Precios y testimonios definitivos (los precios actuales se mantienen como referencia salvo cambio posterior).
- Textos legales (Privacidad / Términos).
- SEO avanzado (sitemap.xml, robots.txt, canonical, OG completo) más allá del mínimo.

## Decisiones fijadas

| Tema | Decisión |
|------|----------|
| Deploy | Next.js completo (SSR/route handlers) en Vercel. Se elimina `output: "export"`. |
| Branding | Alinear 100% a la identidad oficial. |
| Pixel | Se crea nuevo en Meta Events Manager (guiado en el navegador) + Conversions API server-side. |
| Dominio | `jeshuasoftware.com` + `www.jeshuasoftware.com` (ya comprado en Cloudflare; el subdominio `bots.` lo usa el bot de WhatsApp). |
| WhatsApp | `668 139 6431` → `wa.me/526681396431` (celular real del dueño; el número del bot es de PRUEBA de Meta y no sirve para público). |
| Leads | Notificación por Telegram al bot de avisos `@jeshuasoftware_avisosbot` (chat_id en env). |
| Testimonios | Ocultos hasta tener reales. |

## Arquitectura

### Deploy
- `next.config.ts`: eliminar `output: "export"`. Mantener el resto. Con Vercel, las imágenes pueden volver a optimizarse (evaluar quitar `images.unoptimized` o dejarlo; no bloqueante).
- Eliminar `staticwebapp.config.json` (config de Azure, ya no aplica).
- Conectar el repo a Vercel (framework autodetectado: Next.js). Ramas: `main` → producción.
- Dominios en Vercel: canónico **`jeshuasoftware.com`** (apex); `www.jeshuasoftware.com` redirige al apex.

### Variables de entorno (Vercel)
- `NEXT_PUBLIC_META_PIXEL_ID` — ID del Pixel (público, va al cliente).
- `META_CAPI_TOKEN` — token de la Conversions API (secreto, solo server).
- `TELEGRAM_BOT_TOKEN` — token del bot de avisos (secreto). Reutiliza el del proyecto de bots.
- `TELEGRAM_CHAT_ID` — chat destino de las notificaciones de lead.

Ningún secreto se commitea; `.env.local` para desarrollo va en `.gitignore`.

### Branding (archivos afectados)
- `src/app/globals.css`: reemplazar los design tokens de color (azul Dropbox `#0061FE` → `#4285F4`; agregar amarillo `#FBBC04` y navy `#2A3350` como tokens de acento). Ajustar fondos negros/hero según la nueva paleta manteniendo el layout audaz.
- `src/app/layout.tsx`: cambiar la fuente a **Poppins** (wordmark) manteniendo una fuente de cuerpo legible.
- `src/components/nav.tsx` y `src/components/footer.tsx`: sustituir el logo "JS" en cuadro por el **folder + `>_`** oficial (asset `jeshua-folder-vector.png`, copiar a `public/images/`). Wordmark "Jeshua Software" con J/S en azul.
- CTAs primarios: fondo amarillo `#FBBC04` con texto navy (consistentes con la portada de FB).
- No se rehace la estructura ni el copy; solo la capa visual (colores, logo, tipografía, acentos).

### Tracking / Meta Pixel
- **Client-side:** componente que inyecta el snippet de `fbq` con `next/script` (`strategy="afterInteractive"`) usando `NEXT_PUBLIC_META_PIXEL_ID`. Dispara `PageView` en cada carga. `noscript` fallback opcional.
- **Eventos:**
  - `Lead` — al enviar el formulario con éxito (client) y también server-side vía CAPI (deduplicado con `event_id` compartido).
  - `Contact` — al hacer clic en cualquier botón de WhatsApp.
- **Server-side (Conversions API):** el route handler `/api/lead` envía el evento `Lead` a Meta con los datos hasheados (SHA-256 de email/teléfono cuando existan) y el mismo `event_id` que el cliente, para deduplicar.

### Formulario / leads
- `src/components/contact.tsx`: el form deja de ser "fake"; hace `POST` a `/api/lead` con nombre, contacto y mensaje. Se quita la opción Calendly de los métodos de contacto.
- Nuevo route handler `src/app/api/lead/route.ts`:
  1. Valida el payload.
  2. Envía notificación a Telegram (`sendMessage` al `TELEGRAM_CHAT_ID`).
  3. Dispara el evento `Lead` a la Conversions API de Meta.
  4. Responde `{ ok: true }` (o error controlado) para que el cliente muestre confirmación y dispare el `fbq('track','Lead')` client-side con el `event_id` compartido.
- Utilidades nuevas: `src/lib/meta-capi.ts` (envío CAPI) y `src/lib/telegram.ts` (notificación). Sin dependencias npm nuevas (fetch nativo).
- Botón WhatsApp (`src/components/cta.tsx` y donde aplique): `https://wa.me/526681396431?text=` con mensaje pre-cargado. Actualizar la constante correspondiente en `src/lib/i18n.ts`.

### Correcciones de contenido
- `src/lib/i18n.ts`: `contacto@jeshuacode.com` y `calendly.com/jeshuacode` → quitar/parametrizar; dominio y URLs a `jeshuasoftware.com`; WhatsApp real.
- `src/components/testimonials.tsx`: ocultar la sección (no renderizar) hasta tener testimonios reales.
- Buscar y reemplazar cualquier `jeshuacode.com` restante → `jeshuasoftware.com`.

## Flujo de datos (lead)

```
Usuario llena form → submit
  → client: genera event_id, fbq('track','Lead',{},{eventID})
  → POST /api/lead {nombre, contacto, mensaje, event_id}
      → Telegram sendMessage (notifica al dueño)
      → Meta CAPI: Lead con event_id (dedup con el client)
      → 200 {ok:true}
  → UI muestra "¡Gracias, te contactamos!"
```

## Verificación

- `npm run build` (sin `output:export`) compila sin errores; `npm run dev` levanta el sitio.
- Deploy preview en Vercel accesible por HTTPS; luego producción en `jeshuasoftware.com`.
- **Meta Pixel Helper** (extensión Chrome) marca `PageView`, `Lead` y `Contact` en verde.
- Envío de prueba del form → llega la notificación al Telegram del dueño **y** aparece el evento `Lead` en Events Manager (con recepción por navegador + servidor, deduplicado).
- Clic en WhatsApp abre `wa.me/526681396431` con el texto pre-cargado.
- Inspección visual: logo folder + colores oficiales + CTAs amarillos en nav, hero, footer.
- El dominio apex y `www` resuelven con certificado válido.

## Riesgos / notas

- El número del bot es de PRUEBA (solo 5 destinatarios); por eso el CTA usa el celular real. Cambiar a la SIM de producción cuando exista (un solo lugar: constante en `i18n.ts`).
- Al quitar `output: "export"`, `staticwebapp.config.json` queda obsoleto (se elimina); si en el futuro se quisiera volver a estático, habría que revertir ambos.
- Deduplicación Pixel/CAPI depende de compartir `event_id`; si no coincide, Meta contaría doble.
