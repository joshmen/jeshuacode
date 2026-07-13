# Jeshua Software Web: Vercel + Meta Pixel + Marca — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar `jeshuasoftware.com` en Vercel con la identidad de marca oficial y con Meta Pixel + Conversions API captando leads.

**Architecture:** El sitio ya existe (Next.js App Router, landing de una sola página client-side con `LanguageProvider`). Se deja de exportar estático para correr como app Next en Vercel, se reemplaza la capa visual por la marca oficial, se agrega un route handler `/api/lead` que notifica por Telegram y reporta el `Lead` a la Conversions API, y se instrumenta el Pixel client-side con eventos deduplicados por `event_id`.

**Tech Stack:** Next.js 16.1.6, React 19.2.3, Tailwind CSS v4, Framer Motion, lucide-react, TypeScript. Deploy en Vercel. Notificaciones vía Telegram Bot API. Tracking vía Meta Pixel + Conversions API (Graph API v21.0). Sin dependencias npm nuevas (fetch nativo).

## Global Constraints

- Repo: `C:\Users\AW AREA 51M R2\OneDrive\ProyectsJoshMen\jeshuacode`, branch `main`, remote `github.com/joshmen/jeshuacode`.
- Commits SIEMPRE a nombre `jms`, SIN `Co-Authored-By` ni menciones a Anthropic/Claude. Usar: `git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" commit`.
- Idioma del sitio: español (México) por defecto + inglés (no romper el bilingüe).
- NO rehacer estructura ni copy salvo lo indicado explícitamente. Cambios de branding = capa visual (color, logo, tipografía, acentos).
- Secretos NUNCA al repo. `.env.local` y `.env*` en `.gitignore`.
- Nombre de marca canónico: **Jeshua Software** (reemplaza "JeShua Code" donde aparezca en UI/metadata).
- Paleta oficial: azul Google `#4285F4`, amarillo `#FBBC04`, navy `#2A3350`, blanco. Fuente wordmark: Poppins.
- WhatsApp de contacto: `https://wa.me/526681396431`.
- No hay framework de tests en el repo; cada tarea cierra con una **verificación** concreta (build / dev / curl / inspección), no con TDD ceremonial.

---

## File Structure

**Modificados:**
- `next.config.ts` — quitar `output: "export"`.
- `src/app/globals.css` — tokens de color de marca + utility `.btn-primary`.
- `src/app/layout.tsx` — fuente Poppins, metadata de marca, montar `<Pixel/>`.
- `src/lib/i18n.ts` — constantes de contacto (WhatsApp/dominio), nombre de marca.
- `src/components/nav.tsx` — logo folder + nombre + botón amarillo.
- `src/components/footer.tsx` — logo folder + nombre + quitar social Email.
- `src/components/contact.tsx` — form real a `/api/lead`, dejar solo WhatsApp como método.
- `src/components/cta.tsx` — botón primario amarillo + evento Contact en WhatsApp.
- `src/app/page.tsx` — dejar de renderizar `<Testimonials/>`.

**Creados:**
- `.env.example` — plantilla de variables.
- `public/images/jeshua-folder.png` — logo folder oficial (copiado del asset de marca).
- `src/lib/fbq.ts` — helper de eventos de Pixel.
- `src/lib/telegram.ts` — notificación de lead por Telegram.
- `src/lib/meta-capi.ts` — envío de evento Lead a la Conversions API.
- `src/app/api/lead/route.ts` — endpoint que recibe el form.
- `src/components/pixel.tsx` — snippet del Pixel + PageView.

**Eliminados:**
- `staticwebapp.config.json` — config de Azure, ya no aplica.

---

### Task 1: Preparar el build para Vercel

**Files:**
- Modify: `next.config.ts`
- Delete: `staticwebapp.config.json`
- Create: `.env.example`
- Modify: `.gitignore` (verificar que ignore `.env*`)

**Interfaces:**
- Produces: build de servidor Next (no `out/`), y los nombres de env vars que el resto del plan consume: `NEXT_PUBLIC_META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_CAPI_PIXEL_ID`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

- [ ] **Step 1: Quitar el static export de `next.config.ts`**

Reemplazar el contenido completo por:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 2: Eliminar la config de Azure**

Run: `git -C . rm staticwebapp.config.json`
Expected: `rm 'staticwebapp.config.json'`

- [ ] **Step 3: Crear `.env.example`**

```bash
# Meta Pixel (público, va al navegador)
NEXT_PUBLIC_META_PIXEL_ID=

# Meta Conversions API (secreto, solo servidor)
META_CAPI_PIXEL_ID=
META_CAPI_TOKEN=

# Telegram (notificaciones de lead)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

- [ ] **Step 4: Verificar `.gitignore` ignora envs**

Run: `grep -n "env" .gitignore`
Expected: aparece `.env*` (create-next-app lo trae). Si no, añadir la línea `.env*` (dejando `!.env.example`).

Añadir al final de `.gitignore` si falta:
```
.env*
!.env.example
```

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: compila sin errores y ya NO crea la carpeta `out/` (ahora es build de servidor). Puede advertir sobre rutas dinámicas; no debe fallar.

- [ ] **Step 6: Commit**

```bash
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" add next.config.ts .env.example .gitignore
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" commit -m "chore: preparar build Next para Vercel (quitar static export)"
```

---

### Task 2: Branding — paleta de color y tipografía

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: tokens CSS `--color-accent` (=#4285F4), `--color-brand-yellow`, `--color-brand-yellow-hover`, `--color-navy`, y la clase `.btn-primary` (usada en Task 3 y 4). Fuente Poppins vía variable `--font-poppins`.

- [ ] **Step 1: Reescribir `src/app/globals.css`**

```css
@import "tailwindcss";

@theme inline {
  --color-accent: #4285F4;
  --color-accent-hover: #3367D6;
  --color-accent-light: #E8F0FE;
  --color-brand-yellow: #FBBC04;
  --color-brand-yellow-hover: #E5A800;
  --color-navy: #2A3350;
  --color-ink: #0A0A0A;
  --color-foreground: #101828;
  --color-muted: #475467;
  --color-faint: #667085;
  --color-surface: #F6F7F9;
  --color-line: #EAECF0;
  --color-success: #12B76A;
  --font-sans: var(--font-poppins), ui-sans-serif, system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #ffffff;
  color: var(--color-foreground);
  font-family: var(--font-sans);
}

.btn-primary {
  background: var(--color-brand-yellow);
  color: var(--color-navy);
}
.btn-primary:hover {
  background: var(--color-brand-yellow-hover);
}
```

- [ ] **Step 2: Cambiar la fuente y metadata en `src/app/layout.tsx`**

Reemplazar el bloque de import de fuente + `metadata` + apertura de `<html>` así (dejando `RootLayout` con el `<Pixel/>` que se añade en Task 7; por ahora sin Pixel):

```tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jeshuasoftware.com"),
  title: "Jeshua Software | Construimos el software que tu negocio necesita",
  description:
    "Desarrollo de software a medida, apps, bots de WhatsApp, automatización e integraciones para PyMEs en México.",
  keywords: [
    "desarrollo de software",
    "software a la medida",
    "bots de WhatsApp",
    "apps móviles",
    "automatización",
    "integraciones",
    "Next.js",
    ".NET",
  ],
  openGraph: {
    title: "Jeshua Software | Construimos el software que tu negocio necesita",
    description:
      "Desarrollo de software a medida, apps, bots de WhatsApp, automatización e integraciones para PyMEs en México.",
    type: "website",
    url: "https://jeshuasoftware.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verificar en dev**

Run: `npm run dev` y abrir `http://localhost:3000`
Expected: el sitio carga en Poppins; el azul de links/toggles/botones ahora es `#4285F4` (Google) en vez del azul Dropbox. Sin errores en consola.

- [ ] **Step 4: Commit**

```bash
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" add src/app/globals.css src/app/layout.tsx
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" commit -m "feat: paleta de marca (azul Google + amarillo + navy) y tipografia Poppins"
```

---

### Task 3: Branding — logo folder oficial y nombre de marca

**Files:**
- Create: `public/images/jeshua-folder.png` (copia del asset de marca)
- Modify: `src/components/nav.tsx`
- Modify: `src/components/footer.tsx`
- Modify: `src/lib/i18n.ts` (nombre del bot)

**Interfaces:**
- Consumes: `.btn-primary` de Task 2.
- Produces: componente `Brand` reutilizable con el folder oficial.

- [ ] **Step 1: Copiar el asset del folder al `public/images/`**

Run (PowerShell):
```powershell
Copy-Item -Force "C:\Users\AW AREA 51M R2\Pictures\jeshua-logo\jeshua-folder-vector.png" "C:\Users\AW AREA 51M R2\OneDrive\ProyectsJoshMen\jeshuacode\public\images\jeshua-folder.png"
```
Expected: el archivo existe en `public/images/jeshua-folder.png`.

- [ ] **Step 2: Cambiar el `Brand` de `src/components/nav.tsx`**

Reemplazar la función `Brand` (líneas 7-16) por:

```tsx
function Brand() {
  return (
    <a href="#top" className="flex items-center gap-[10px] text-xl font-bold tracking-[-0.02em] text-inherit">
      <img src="/images/jeshua-folder.png" alt="Jeshua Software" className="h-8 w-8 shrink-0" />
      <span>
        <span className="text-accent">J</span>eshua <span className="text-accent">S</span>oftware
      </span>
    </a>
  );
}
```

Y en el botón CTA del nav (línea ~85-90, el `<a href="#contacto" ...{t.navCta}</a>` de escritorio) cambiar las clases de color: quitar `bg-accent`, `text-white`, `hover:bg-accent-hover` y añadir `btn-primary`. El botón queda:

```tsx
        <a
          href="#contacto"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-[11px] btn-primary px-[22px] py-[13px] text-[15px] font-bold leading-none transition-all hover:-translate-y-px"
        >
          {t.navCta}
        </a>
```

Repetir el mismo swap de clases en el botón CTA del menú móvil (línea ~122-128): quitar `bg-accent text-white`, añadir `btn-primary`.

- [ ] **Step 3: Cambiar el logo de `src/components/footer.tsx`**

Reemplazar el bloque del logo (líneas 21-26) por:

```tsx
            <a href="#top" className="flex items-center gap-[10px] text-xl font-bold tracking-[-0.02em]">
              <img src="/images/jeshua-folder.png" alt="Jeshua Software" className="h-8 w-8 shrink-0" />
              <span>
                <span className="text-accent">J</span>eshua <span className="text-accent">S</span>oftware
              </span>
            </a>
```

En el mismo archivo, quitar el social "Email" del array `socials` (líneas 10-14) para no exponer un correo aún inexistente. Debe quedar:

```tsx
  const socials = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/joshmen", label: "GitHub" },
  ];
```

Y eliminar el import ahora sin uso `Mail` de la línea 3 y el import `CONTACT_EMAIL` de la línea 5 (footer ya no los usa).

- [ ] **Step 4: Actualizar el nombre del bot en `src/lib/i18n.ts`**

En el diccionario `ES` cambiar `botName: "Asistente JeShua"` → `botName: "Asistente Jeshua"`. En `EN` cambiar `botName: "JeShua Assistant"` → `botName: "Jeshua Assistant"`. (El resto del copy ya usa "Jeshua Software".)

- [ ] **Step 5: Verificar en dev**

Run: `npm run dev`
Expected: en nav y footer aparece el folder + "Jeshua Software" con la J y la S en azul; el botón "Agenda una llamada" del nav es amarillo con texto navy. Sin "JeShua Code" ni "JS" en cuadro.

- [ ] **Step 6: Commit**

```bash
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" add public/images/jeshua-folder.png src/components/nav.tsx src/components/footer.tsx src/lib/i18n.ts
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" commit -m "feat: logo folder oficial y nombre Jeshua Software en nav y footer"
```

---

### Task 4: Branding — CTAs primarios en amarillo

**Files:**
- Modify: `src/components/cta.tsx`
- Modify: `src/components/contact.tsx` (solo el botón submit en este task)
- Modify: `src/components/hero.tsx` y `src/components/projects.tsx` (barrido de botón primario)

**Interfaces:**
- Consumes: `.btn-primary` de Task 2.

- [ ] **Step 1: Botón primario amarillo en `src/components/cta.tsx`**

En el primer `<a href="#contacto" ...>{t.ctaBtn} →</a>` (líneas ~26-31) quitar `bg-accent text-white hover:bg-accent-hover` y añadir `btn-primary`. Queda:

```tsx
            <a
              href="#contacto"
              className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-[11px] btn-primary px-7 py-4 text-base font-bold leading-none transition-all hover:-translate-y-px"
            >
              {t.ctaBtn} →
            </a>
```

- [ ] **Step 2: Botón submit amarillo en `src/components/contact.tsx`**

En el `<button type="submit" ...>` (líneas ~65-70) quitar `bg-accent text-white hover:bg-accent-hover` y añadir `btn-primary`. Queda:

```tsx
                <button
                  type="submit"
                  className="mt-[18px] inline-flex w-full items-center justify-center whitespace-nowrap rounded-[11px] btn-primary px-7 py-4 text-base font-bold leading-none transition-all hover:-translate-y-px"
                >
                  {t.fSend}
                </button>
```

- [ ] **Step 3: Barrido del botón primario en hero y projects**

Run: `grep -rn "bg-accent" src/components/hero.tsx src/components/projects.tsx`
Para cada resultado que sea un **botón/enlace de acción principal** (el CTA del hero y el botón "Hablemos" de projects), aplicar el mismo swap: quitar `bg-accent`/`text-white`/`hover:bg-accent-hover` y añadir `btn-primary`. NO cambiar usos de `accent` que sean texto, bordes, iconos o fondos decorativos (esos se quedan azul Google).

- [ ] **Step 4: Verificar en dev**

Run: `npm run dev`
Expected: los botones de acción principal (hero, CTA final, enviar formulario, "Hablemos") son amarillos con texto navy; los enlaces/acentos secundarios siguen en azul Google. Combina con la portada de Facebook.

- [ ] **Step 5: Commit**

```bash
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" add src/components/cta.tsx src/components/contact.tsx src/components/hero.tsx src/components/projects.tsx
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" commit -m "feat: CTAs primarios en amarillo de marca"
```

---

### Task 5: Correcciones de contenido (contacto, dominio, testimonios)

**Files:**
- Modify: `src/lib/i18n.ts` (constantes de contacto)
- Modify: `src/components/contact.tsx` (dejar solo WhatsApp)
- Modify: `src/app/page.tsx` (ocultar testimonios)

**Interfaces:**
- Produces: `WHATSAPP_URL` real usado por `cta.tsx`, `contact.tsx` y Task 7.

- [ ] **Step 1: Actualizar constantes en `src/lib/i18n.ts`**

Reemplazar las 3 constantes del final (líneas 476-478) por:

```ts
export const WHATSAPP_URL =
  "https://wa.me/526681396431?text=" +
  encodeURIComponent("Hola, quiero cotizar un proyecto con Jeshua Software.");
```

(Se eliminan `CALENDLY_URL` y `CONTACT_EMAIL`: no hay Calendly ni correo aún. Cualquier import de esas constantes debe quedar removido — footer ya se limpió en Task 3; contact se limpia abajo.)

- [ ] **Step 2: Dejar solo WhatsApp en `src/components/contact.tsx`**

Cambiar el import de la línea 6 a: `import { WHATSAPP_URL } from "@/lib/i18n";`
Cambiar el import de iconos de la línea 4 a: `import { MessageCircle } from "lucide-react";`
Reemplazar el array `methods` (líneas 21-25) por un único método WhatsApp:

```tsx
  const methods = [
    {
      icon: MessageCircle,
      label: t.methodWa,
      value: "+52 668 139 6431",
      href: WHATSAPP_URL,
    },
  ];
```

- [ ] **Step 3: Ocultar testimonios en `src/app/page.tsx`**

Quitar la línea 10 `import Testimonials from "@/components/testimonials";` y la línea 27 `<Testimonials />`. (El componente y sus textos se conservan en el repo para reactivarlos en fase 2.)

- [ ] **Step 4: Barrido de referencias viejas**

Run: `grep -rn "jeshuacode.com" src ; grep -rn "CALENDLY_URL\|CONTACT_EMAIL" src`
Expected: sin resultados. Si aparece alguno: reemplazar `jeshuacode.com` → `jeshuasoftware.com`, y eliminar cualquier import/uso restante de `CALENDLY_URL` o `CONTACT_EMAIL` (constantes ya borradas en Step 1).

- [ ] **Step 5: Verificar en dev**

Run: `npm run dev`
Expected: la sección de Testimonios ya no aparece; en Contacto solo se muestra la tarjeta de WhatsApp; el botón/enlace de WhatsApp apunta a `wa.me/526681396431` con texto pre-cargado. Sin errores de imports ni de compilación.

- [ ] **Step 6: Commit**

```bash
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" add src/lib/i18n.ts src/components/contact.tsx src/app/page.tsx
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" commit -m "chore: WhatsApp real, quitar Calendly/email y ocultar testimonios placeholder"
```

---

### Task 6: Backend de leads — Telegram + Conversions API + `/api/lead`

**Files:**
- Create: `src/lib/telegram.ts`
- Create: `src/lib/meta-capi.ts`
- Create: `src/app/api/lead/route.ts`

**Interfaces:**
- Consumes: env vars de Task 1.
- Produces:
  - `sendTelegramLead(lead: LeadInput): Promise<void>` de `telegram.ts`
  - `sendLeadEvent(lead: LeadInput, eventId: string, sourceUrl: string): Promise<void>` de `meta-capi.ts`
  - `LeadInput = { name: string; email?: string; company?: string; message: string }` (definido y exportado en `telegram.ts`, reusado por los demás)
  - Endpoint `POST /api/lead` que recibe `{ name, email?, company?, message, event_id }`.

- [ ] **Step 1: Crear `src/lib/telegram.ts`**

```ts
export type LeadInput = {
  name: string;
  email?: string;
  company?: string;
  message: string;
};

export async function sendTelegramLead(lead: LeadInput): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[telegram] faltan TELEGRAM_BOT_TOKEN/CHAT_ID; se omite notificación");
    return;
  }

  const text =
    `🟦 *Nuevo lead — jeshuasoftware.com*\n\n` +
    `*Nombre:* ${lead.name}\n` +
    (lead.email ? `*Correo:* ${lead.email}\n` : "") +
    (lead.company ? `*Empresa:* ${lead.company}\n` : "") +
    `*Mensaje:* ${lead.message}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
  if (!res.ok) {
    console.error("[telegram] sendMessage falló:", res.status, await res.text());
  }
}
```

- [ ] **Step 2: Crear `src/lib/meta-capi.ts`**

```ts
import { createHash } from "node:crypto";
import type { LeadInput } from "./telegram";

const API_VERSION = "v21.0";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendLeadEvent(
  lead: LeadInput,
  eventId: string,
  sourceUrl: string,
): Promise<void> {
  const pixelId = process.env.META_CAPI_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) {
    console.warn("[capi] faltan META_CAPI_PIXEL_ID/TOKEN; se omite evento server-side");
    return;
  }

  const userData: Record<string, string[]> = {};
  if (lead.email) userData.em = [sha256(lead.email)];

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: sourceUrl,
        user_data: userData,
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!res.ok) {
    console.error("[capi] evento Lead falló:", res.status, await res.text());
  }
}
```

- [ ] **Step 3: Crear `src/app/api/lead/route.ts`**

```ts
import { NextResponse } from "next/server";
import { sendTelegramLead, type LeadInput } from "@/lib/telegram";
import { sendLeadEvent } from "@/lib/meta-capi";

export async function POST(req: Request) {
  let body: Partial<LeadInput> & { event_id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();
  if (!name || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const lead: LeadInput = {
    name,
    message,
    email: body.email?.toString().trim() || undefined,
    company: body.company?.toString().trim() || undefined,
  };
  const eventId = (body.event_id ?? crypto.randomUUID()).toString();
  const sourceUrl = req.headers.get("referer") ?? "https://jeshuasoftware.com/";

  // No bloquear la respuesta si un canal falla.
  await Promise.allSettled([
    sendTelegramLead(lead),
    sendLeadEvent(lead, eventId, sourceUrl),
  ]);

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Preparar `.env.local` de desarrollo**

Crear `.env.local` (NO se commitea) con el token real del bot de Telegram del proyecto de bots y el chat_id del dueño, para probar la notificación en local. Los valores de Meta CAPI pueden quedar vacíos (Task 8 los llena):

```bash
TELEGRAM_BOT_TOKEN=<token del bot @jeshuasoftware_avisosbot>
TELEGRAM_CHAT_ID=<chat_id del dueño>
```

(El token vive en el `.env.prod` del proyecto `jeshua-bots`; pedírselo al usuario, no inventarlo.)

- [ ] **Step 5: Verificar el endpoint en dev**

Run: `npm run dev` y en otra terminal:
```bash
curl -s -X POST http://localhost:3000/api/lead -H "Content-Type: application/json" -d "{\"name\":\"Prueba\",\"message\":\"hola desde curl\",\"event_id\":\"test-123\"}"
```
Expected: responde `{"ok":true}` y llega un mensaje "🟦 Nuevo lead" al Telegram del dueño. (El evento CAPI se omite con log de warning si aún no hay credenciales de Meta: es lo esperado.)

- [ ] **Step 6: Commit**

```bash
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" add src/lib/telegram.ts src/lib/meta-capi.ts src/app/api/lead/route.ts
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" commit -m "feat: endpoint /api/lead con notificacion Telegram y Conversions API"
```

---

### Task 7: Pixel client-side + form conectado + evento Contact

**Files:**
- Create: `src/lib/fbq.ts`
- Create: `src/components/pixel.tsx`
- Modify: `src/app/layout.tsx` (montar `<Pixel/>`)
- Modify: `src/components/contact.tsx` (submit real + evento Lead)
- Modify: `src/components/cta.tsx` (evento Contact en WhatsApp)

**Interfaces:**
- Consumes: `POST /api/lead` de Task 6; `NEXT_PUBLIC_META_PIXEL_ID` de Task 1.
- Produces: `fbqTrack(event, params?, options?)` de `fbq.ts`.

- [ ] **Step 1: Crear `src/lib/fbq.ts`**

```ts
type FbqOptions = { eventID?: string };

export function fbqTrack(
  event: string,
  params?: Record<string, unknown>,
  options?: FbqOptions,
): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (typeof w.fbq !== "function") return;
  if (options) w.fbq("track", event, params ?? {}, options);
  else w.fbq("track", event, params ?? {});
}
```

- [ ] **Step 2: Crear `src/components/pixel.tsx`**

```tsx
import Script from "next/script";

export default function Pixel() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!id) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${id}');
        fbq('track','PageView');
      `}
    </Script>
  );
}
```

- [ ] **Step 3: Montar `<Pixel/>` en `src/app/layout.tsx`**

Añadir el import `import Pixel from "@/components/pixel";` y renderizarlo dentro de `<body>` antes de `{children}`:

```tsx
      <body className="font-sans antialiased">
        <Pixel />
        {children}
      </body>
```

- [ ] **Step 4: Convertir el submit de `src/components/contact.tsx` en real**

Reemplazar `onSubmit` (líneas 16-19) por una versión async que postea a `/api/lead`, genera `event_id` y dispara el `Lead` client-side:

```tsx
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      message: String(data.get("message") ?? ""),
      event_id: eventId,
    };
    setSent(true);
    fbqTrack("Lead", {}, { eventID: eventId });
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // el usuario ya vio confirmación; el lead viaja best-effort
    }
  };
```

Añadir el import al inicio del archivo: `import { fbqTrack } from "@/lib/fbq";`

- [ ] **Step 5: Evento Contact al clic de WhatsApp en `src/components/cta.tsx`**

Añadir `import { fbqTrack } from "@/lib/fbq";` y en el `<a href={WHATSAPP_URL} ...>` agregar `onClick={() => fbqTrack("Contact")}`.

- [ ] **Step 6: Verificar en dev con Pixel Helper**

Run: `npm run dev` (con `NEXT_PUBLIC_META_PIXEL_ID` puesto en `.env.local`, valor real de Task 8 o uno de prueba).
Expected: la extensión **Meta Pixel Helper** detecta `PageView` al cargar; al enviar el formulario marca `Lead`; al hacer clic en WhatsApp marca `Contact`. El curl/registro del form sigue llegando a Telegram.

- [ ] **Step 7: Commit**

```bash
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" add src/lib/fbq.ts src/components/pixel.tsx src/app/layout.tsx src/components/contact.tsx src/components/cta.tsx
git -c user.name="jms" -c user.email="jms@jeshuasoftware.com" commit -m "feat: Meta Pixel (PageView/Lead/Contact) y formulario conectado a /api/lead"
```

---

### Task 8: Copiloto — Pixel en Meta, Vercel y dominio (con el usuario)

**Nota:** Esta tarea es asistida en el navegador (Playwright) con el usuario presente para 2FA/contraseñas. No hay código; produce las credenciales y el deploy en producción.

- [ ] **Step 1: Crear el Pixel en Meta Events Manager**

Con el usuario: `business.facebook.com` → Events Manager → Conectar orígenes de datos → Web → crear dataset/Pixel "Jeshua Software". Copiar el **Pixel ID** → `NEXT_PUBLIC_META_PIXEL_ID` y `META_CAPI_PIXEL_ID`. Generar el **token de la Conversions API** (Configuración del dataset → Conversions API → Generar token de acceso) → `META_CAPI_TOKEN`.

- [ ] **Step 2: Importar el repo en Vercel**

Con el usuario: `vercel.com` → Add New → Project → importar `github.com/joshmen/jeshuacode`. Framework autodetectado: Next.js. Antes de desplegar, en **Environment Variables** agregar: `NEXT_PUBLIC_META_PIXEL_ID`, `META_CAPI_PIXEL_ID`, `META_CAPI_TOKEN`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. Deploy.

- [ ] **Step 3: Conectar el dominio**

En Vercel → Project → Settings → Domains → agregar `jeshuasoftware.com` (apex canónico) y `www.jeshuasoftware.com` (redirect al apex). En Cloudflare (donde está el DNS) agregar los registros que indique Vercel (A/ALIAS para apex, CNAME para www), **sin proxy** (DNS-only) para que Vercel emita el certificado. Ojo: el subdominio `bots.jeshuasoftware.com` del bot de WhatsApp NO se toca.

- [ ] **Step 4: Verificación de producción**

- `https://jeshuasoftware.com` carga con HTTPS y muestra el branding oficial (folder, azul Google, amarillo, Poppins).
- Meta Pixel Helper marca `PageView`, `Lead` y `Contact` en verde sobre el sitio en producción.
- Enviar el formulario real → llega la notificación a Telegram **y** en Events Manager aparece el evento `Lead` recibido por Navegador + Servidor, **deduplicado** por `event_id` (Meta muestra "conexión: Browser + Server").
- Clic en WhatsApp abre `wa.me/526681396431` con el texto pre-cargado.

---

## Notas de ejecución

- Las Tasks 1–7 son 100% código y se prueban en local con `npm run dev` (usando `.env.local` con el token de Telegram real y, si se tiene, el Pixel ID). Se pueden completar sin el usuario.
- La Task 8 necesita al usuario (2FA/contraseñas de Meta y Vercel) y se hace vía Playwright.
- El número del bot de WhatsApp es de PRUEBA (no público); por eso el CTA usa el celular real `668 139 6431`. Cuando exista la SIM de producción, se cambia SOLO la constante `WHATSAPP_URL` en `src/lib/i18n.ts`.
