"use client";

import LegalLayout, { LegalHeading, LegalSection, type LegalSectionData } from "@/components/legal/legal-layout";
import type { LegalLang } from "@/components/legal/legal-layout";

interface PrivacyDict {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSectionData[];
}

const ES: PrivacyDict = {
  eyebrow: "LEGAL",
  title: "Política de privacidad",
  updated: "Última actualización: 13 de agosto de 2026.",
  intro:
    "Jeshua Software es el nombre comercial bajo el que opera Josué Mendoza Segovia. Esta política explica qué datos personales recopilamos, para qué los usamos y qué derechos tienes sobre ellos, tanto en este sitio web como en la plataforma de bots de atención que ofrecemos a negocios clientes. Si tienes dudas, escríbenos a josue@jeshuasoftware.com.",
  sections: [
    {
      heading: "1. Datos que recopilamos en este sitio web",
      paragraphs: [
        "Formulario de contacto: cuando nos escribes desde este sitio, guardamos el nombre, el correo electrónico, la empresa (si la indicas) y el mensaje que nos envías. Usamos esta información únicamente para responderte y darle seguimiento a tu solicitud.",
        "Chat del sitio: si conversas con el asistente que aparece en la esquina de la página, tu navegador guarda un identificador de visitante y el historial de esa conversación en el almacenamiento local del navegador (localStorage), para que el hilo siga disponible si recargas la página o vuelves más tarde. El identificador se conserva hasta que borres los datos del sitio en tu navegador; la conversación se conserva hasta 7 días y tus preferencias de la ventana de chat (por ejemplo, si ya la cerraste) hasta 30 días. Pasado ese tiempo se descartan automáticamente. Los mensajes que escribes se envían a nuestro motor de bots para generar las respuestas.",
      ],
    },
    {
      heading: "2. Datos que procesamos en la plataforma de bots (para negocios clientes)",
      paragraphs: [
        "Además de este sitio, Jeshua Software opera una plataforma de bots de atención (por WhatsApp y por chat web) que negocios clientes contratan para atender a sus propios clientes. Si le escribes a un negocio que usa nuestra plataforma, procesamos los mensajes que envías y los datos de contacto que compartas voluntariamente en la conversación, como tu nombre, teléfono o correo electrónico.",
        "Para esos datos, el negocio al que le escribiste es el responsable del tratamiento: es quien decide para qué los usa y a quién los muestra. Jeshua Software actúa como encargado del tratamiento, es decir, procesamos esos datos por cuenta e instrucción del negocio, para prestarle el servicio, y no los usamos para fines propios distintos de operar la plataforma.",
      ],
    },
    {
      heading: "3. Cómo se procesan tus mensajes",
      paragraphs: [
        "Queremos ser claros sobre esto: los mensajes de WhatsApp se transmiten a través de la WhatsApp Business Platform de Meta, y las respuestas del bot se generan procesando tus mensajes con modelos de inteligencia artificial, de proveedores como Google. No hay una persona leyendo tus mensajes en tiempo real, salvo que pidas hablar con un asesor humano o el negocio decida revisarlos.",
      ],
    },
    {
      heading: "4. Para qué usamos tus datos",
      bullets: [
        "Prestar el servicio de atención automatizada y responder tus preguntas.",
        "Enrutar la conversación a un asesor humano cuando lo pides o el bot no puede ayudarte.",
        "Registrar clientes potenciales (leads) para el negocio correspondiente.",
        "Mejorar la calidad de las respuestas y corregir errores del servicio.",
      ],
    },
    {
      heading: "5. Seguridad",
      bullets: [
        "Toda la comunicación entre tu navegador y nuestros servidores viaja cifrada (HTTPS).",
        "Las credenciales de WhatsApp de cada negocio se guardan cifradas; el resto de credenciales de proveedores se gestionan como secretos de infraestructura con acceso restringido.",
        "El acceso a los datos está restringido a quien lo necesita para operar el servicio.",
      ],
    },
    {
      heading: "6. Tus derechos (ARCO) y revocación del consentimiento",
      paragraphs: [
        "Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), tienes derecho a acceder, rectificar, cancelar y oponerte (derechos ARCO) al uso de tus datos personales, así como a revocar tu consentimiento en cualquier momento.",
        "Para ejercerlos, escríbenos a josue@jeshuasoftware.com. Si tus datos fueron capturados porque le escribiste a un negocio que usa nuestra plataforma de bots, lo más rápido es contactar directamente a ese negocio, ya que es el responsable de esos datos; si prefieres, también podemos ayudarte a canalizar tu solicitud.",
      ],
    },
    {
      heading: "7. Cookies y tecnologías similares",
      paragraphs: [
        "Este sitio usa el píxel de Meta (Facebook/Instagram) para medir la efectividad de nuestros anuncios: Meta coloca cookies en tu navegador para eso. También usamos, del lado del servidor, la API de conversiones de Meta: cuando nos escribes por el formulario de contacto, tu correo electrónico se envía a Meta convertido con un algoritmo de un solo sentido (hash SHA-256) que Meta no puede revertir a tu correo original; solo sirve para relacionar tu contacto con el anuncio correspondiente.",
        "No usamos Google Analytics ni otras herramientas de analítica de terceros en este sitio.",
        "El chat del sitio guarda información en el almacenamiento local de tu navegador (localStorage), no en cookies, y solo para que el hilo de conversación siga disponible entre visitas, como se explica arriba.",
        "Puedes bloquear cookies y el píxel desde la configuración de tu navegador o con un bloqueador de rastreadores. El sitio sigue funcionando igual; lo único que puede perderse es la memoria del formulario o del chat entre visitas.",
      ],
    },
    {
      heading: "8. Cambios a esta política",
      paragraphs: [
        "Podemos actualizar este aviso cuando cambien nuestras prácticas o lo exija la ley. La fecha de última actualización, al inicio de esta página, indica la versión vigente. Si hacemos un cambio importante, lo avisaremos en este mismo sitio.",
      ],
    },
    {
      heading: "9. Contacto",
      paragraphs: ["¿Dudas sobre esta política o quieres ejercer tus derechos ARCO? Escríbenos a josue@jeshuasoftware.com."],
    },
  ],
};

const EN: PrivacyDict = {
  eyebrow: "LEGAL",
  title: "Privacy policy",
  updated: "Last updated: August 13, 2026.",
  intro:
    "Jeshua Software is the trade name under which Josué Mendoza Segovia operates. This policy explains what personal data we collect, what we use it for, and what rights you have over it, both on this website and on the support bot platform we offer to client businesses. If you have questions, write to us at josue@jeshuasoftware.com.",
  sections: [
    {
      heading: "1. Data we collect on this website",
      paragraphs: [
        "Contact form: when you write to us from this site, we store the name, email address, company (if you provide it), and the message you send us. We use this information only to reply to you and follow up on your request.",
        "Site chat: if you talk with the assistant that appears in the corner of the page, your browser stores a visitor identifier and the history of that conversation in your browser's local storage (localStorage), so the thread stays available if you reload the page or come back later. The identifier is kept until you clear this site's data in your browser; the conversation is kept for up to 7 days, and your chat window preferences (for example, whether you already closed it) for up to 30 days. After that they are discarded automatically. The messages you write are sent to our bot engine to generate the replies.",
      ],
    },
    {
      heading: "2. Data we process on the bot platform (for client businesses)",
      paragraphs: [
        "Beyond this site, Jeshua Software operates a support bot platform (WhatsApp and web chat) that client businesses hire to serve their own customers. If you message a business that uses our platform, we process the messages you send and any contact details you voluntarily share in the conversation, such as your name, phone number, or email.",
        "For that data, the business you messaged is the data controller: it decides what the data is used for and who sees it. Jeshua Software acts as a data processor, meaning we process that data on behalf of and under the instructions of the business, to provide it the service, and we do not use it for our own purposes beyond operating the platform.",
      ],
    },
    {
      heading: "3. How your messages are processed",
      paragraphs: [
        "We want to be clear about this: WhatsApp messages are transmitted through Meta's WhatsApp Business Platform, and the bot's replies are generated by processing your messages with artificial intelligence models, from providers such as Google. No one is reading your messages in real time, unless you ask to speak with a human advisor or the business chooses to review them.",
      ],
    },
    {
      heading: "4. What we use your data for",
      bullets: [
        "Providing the automated support service and answering your questions.",
        "Routing the conversation to a human advisor when you ask for one or the bot cannot help.",
        "Recording leads for the corresponding business.",
        "Improving the quality of the replies and fixing service issues.",
      ],
    },
    {
      heading: "5. Security",
      bullets: [
        "All communication between your browser and our servers travels encrypted (HTTPS).",
        "Each business's WhatsApp credentials are stored encrypted; other provider credentials are managed as infrastructure secrets with restricted access.",
        "Access to the data is restricted to whoever needs it to operate the service.",
      ],
    },
    {
      heading: "6. Your rights and withdrawing consent",
      paragraphs: [
        "Under Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP), you have the right to access, rectify, cancel, and object (ARCO rights) to the use of your personal data, as well as to withdraw your consent at any time.",
        "To exercise these rights, write to us at josue@jeshuasoftware.com. If your data was captured because you messaged a business that uses our bot platform, the fastest way is to contact that business directly, since it is the controller of that data; if you prefer, we can also help you route your request.",
      ],
    },
    {
      heading: "7. Cookies and similar technologies",
      paragraphs: [
        "This site uses the Meta pixel (Facebook/Instagram) to measure the effectiveness of our ads: Meta places cookies in your browser for that. We also use, server-side, Meta's Conversions API: when you write to us through the contact form, your email address is sent to Meta converted with a one-way algorithm (SHA-256 hash) that Meta cannot reverse back into your original email; it only serves to match your contact with the corresponding ad.",
        "We do not use Google Analytics or other third-party analytics tools on this site.",
        "The site chat stores information in your browser's local storage (localStorage), not in cookies, and only so the conversation thread stays available between visits, as explained above.",
        "You can block cookies and the pixel from your browser settings or with a tracker blocker. The site keeps working the same way; the only thing you may lose is the contact form's or chat's memory between visits.",
      ],
    },
    {
      heading: "8. Changes to this policy",
      paragraphs: [
        "We may update this notice when our practices change or the law requires it. The last-updated date at the top of this page indicates the version in effect. If we make a significant change, we will announce it on this same site.",
      ],
    },
    {
      heading: "9. Contact",
      paragraphs: ["Questions about this policy or want to exercise your ARCO rights? Write to us at josue@jeshuasoftware.com."],
    },
  ],
};

const DICT: Record<LegalLang, PrivacyDict> = { es: ES, en: EN };

export default function PrivacyContent() {
  return (
    <LegalLayout>
      {(lang) => {
        const t = DICT[lang];
        return (
          <>
            <LegalHeading eyebrow={t.eyebrow} title={t.title} updated={t.updated} />
            <p className="mt-8 max-w-[680px] text-[15.5px] leading-relaxed text-muted">{t.intro}</p>
            {t.sections.map((s) => (
              <LegalSection key={s.heading} {...s} />
            ))}
          </>
        );
      }}
    </LegalLayout>
  );
}
