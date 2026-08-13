"use client";

import LegalLayout, { LegalHeading, LegalSection, type LegalSectionData } from "@/components/legal/legal-layout";
import type { LegalLang } from "@/components/legal/legal-layout";

interface TermsDict {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSectionData[];
}

const ES: TermsDict = {
  eyebrow: "LEGAL",
  title: "Términos de servicio",
  updated: "Vigentes desde el 13 de agosto de 2026.",
  intro:
    "Estos términos aplican al uso de este sitio y a los servicios que ofrece Jeshua Software, nombre comercial de Josué Mendoza Segovia. Al usar el sitio o contratar un servicio, aceptas estos términos.",
  sections: [
    {
      heading: "1. Nuestros servicios",
      paragraphs: [
        "Ofrecemos, según lo que contrates: desarrollo de software y sitios web a medida, aplicaciones móviles, integraciones y consultoría tecnológica, así como una plataforma de bots de atención con inteligencia artificial (WhatsApp y chat web) que responde a tus clientes y captura clientes potenciales para tu negocio.",
      ],
    },
    {
      heading: "2. Planes y pagos",
      paragraphs: [
        "Los precios y condiciones de pago se acuerdan por proyecto o por plan de suscripción, según el servicio que contrates. Los precios de referencia publicados en este sitio pueden cambiar; el precio final es el que se acuerda por escrito antes de iniciar el trabajo o la suscripción.",
      ],
    },
    {
      heading: "3. Disponibilidad del servicio",
      paragraphs: [
        "Ponemos nuestro mejor esfuerzo para mantener la plataforma de bots y los sistemas que desarrollamos funcionando de forma continua, pero no garantizamos disponibilidad ininterrumpida. Puede haber mantenimientos programados, fallas de proveedores externos (como Meta o los proveedores de inteligencia artificial que usamos) o causas fuera de nuestro control.",
      ],
    },
    {
      heading: "4. Propiedad intelectual",
      paragraphs: [
        "El código, diseño y contenido de este sitio son propiedad de Jeshua Software / Josué Mendoza Segovia, salvo que se indique lo contrario. El software que desarrollamos a la medida para un cliente se entrega bajo los términos de propiedad acordados en la propuesta o contrato correspondiente.",
      ],
    },
    {
      heading: "5. Uso aceptable",
      paragraphs: [
        "No debes usar nuestros servicios ni la plataforma de bots para actividades ilegales, envío de spam, ni para distribuir contenido que infrinja derechos de terceros.",
      ],
    },
    {
      heading: "6. Limitación de responsabilidad",
      paragraphs: [
        "Trabajamos con cuidado y buenas prácticas de la industria, pero en la medida que lo permita la ley, no somos responsables de daños indirectos ni de pérdidas que superen lo pagado por el servicio en cuestión.",
      ],
    },
    {
      heading: "7. Cambios a estos términos",
      paragraphs: [
        "Podemos actualizar estos términos cuando cambien nuestros servicios o lo exija la ley. La fecha al inicio de esta página indica la versión vigente.",
      ],
    },
    {
      heading: "8. Legislación aplicable",
      paragraphs: [
        "Estos términos se rigen por las leyes de México. Cualquier controversia relacionada con ellos se resolverá conforme a la legislación mexicana aplicable.",
      ],
    },
    {
      heading: "9. Contacto",
      paragraphs: ["¿Dudas sobre estos términos? Escríbenos a josue@jeshuasoftware.com."],
    },
  ],
};

const EN: TermsDict = {
  eyebrow: "LEGAL",
  title: "Terms of service",
  updated: "In effect since August 13, 2026.",
  intro:
    "These terms apply to the use of this site and to the services offered by Jeshua Software, trade name of Josué Mendoza Segovia. By using the site or hiring a service, you accept these terms.",
  sections: [
    {
      heading: "1. Our services",
      paragraphs: [
        "Depending on what you hire, we offer: custom software and website development, mobile apps, integrations and technology consulting, as well as an AI-powered support bot platform (WhatsApp and web chat) that answers your customers and captures leads for your business.",
      ],
    },
    {
      heading: "2. Plans and payments",
      paragraphs: [
        "Prices and payment terms are agreed per project or per subscription plan, depending on the service you hire. The reference prices published on this site may change; the final price is the one agreed in writing before starting the work or the subscription.",
      ],
    },
    {
      heading: "3. Service availability",
      paragraphs: [
        "We make our best effort to keep the bot platform and the systems we build running continuously, but we do not guarantee uninterrupted availability. There may be scheduled maintenance, failures from external providers (such as Meta or the artificial intelligence providers we use), or causes beyond our control.",
      ],
    },
    {
      heading: "4. Intellectual property",
      paragraphs: [
        "The code, design, and content of this site belong to Jeshua Software / Josué Mendoza Segovia, unless stated otherwise. Custom software we build for a client is delivered under the ownership terms agreed in the corresponding proposal or contract.",
      ],
    },
    {
      heading: "5. Acceptable use",
      paragraphs: [
        "You must not use our services or the bot platform for illegal activities, sending spam, or distributing content that infringes third-party rights.",
      ],
    },
    {
      heading: "6. Limitation of liability",
      paragraphs: [
        "We work carefully and follow industry best practices, but to the extent permitted by law, we are not liable for indirect damages or for losses exceeding what was paid for the service in question.",
      ],
    },
    {
      heading: "7. Changes to these terms",
      paragraphs: [
        "We may update these terms when our services change or the law requires it. The date at the top of this page indicates the version in effect.",
      ],
    },
    {
      heading: "8. Governing law",
      paragraphs: [
        "These terms are governed by the laws of Mexico. Any dispute related to them will be resolved under applicable Mexican law.",
      ],
    },
    {
      heading: "9. Contact",
      paragraphs: ["Questions about these terms? Write to us at josue@jeshuasoftware.com."],
    },
  ],
};

const DICT: Record<LegalLang, TermsDict> = { es: ES, en: EN };

export default function TermsContent() {
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
