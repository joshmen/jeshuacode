export type Lang = "es" | "en";

export interface Step {
  t: string;
  d: string;
}

export interface Testimonial {
  q: string;
  n: string;
  r: string;
  ini: string;
}

export interface Plan {
  name: string;
  price: string;
  per: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Dict {
  navServ: string;
  navProc: string;
  navProy: string;
  navPre: string;
  navCont: string;
  navCta: string;
  h1: string;
  sub: string;
  cta1: string;
  cta2: string;
  tiny: string;
  botName: string;
  botStat: string;
  bm1: string;
  bm2: string;
  bm3: string;
  trustLab: string;
  servEy: string;
  servTitle: string;
  servSub: string;
  svc1t: string;
  svc1d: string;
  svc2t: string;
  svc2d: string;
  svc3t: string;
  svc3d: string;
  svc4t: string;
  svc4d: string;
  svc5t: string;
  svc5d: string;
  svc6t: string;
  svc6d: string;
  procEy: string;
  procTitle: string;
  projEy: string;
  projTitle: string;
  projSub: string;
  featBadge: string;
  featName: string;
  featTag: string;
  featDesc: string;
  proj2Badge: string;
  proj2Name: string;
  proj2Desc: string;
  proj3Name: string;
  proj3Desc: string;
  proj3Cta: string;
  tmEy: string;
  tmTitle: string;
  priceEy: string;
  priceTitle: string;
  priceSub: string;
  popular: string;
  priceNote: string;
  faqEy: string;
  faqTitle: string;
  ctaTitle: string;
  ctaSub: string;
  ctaBtn: string;
  ctaWa: string;
  contEy: string;
  contTitle: string;
  contSub: string;
  fName: string;
  fEmail: string;
  fCompany: string;
  fMsg: string;
  fSend: string;
  fSent: string;
  methodEmail: string;
  methodWa: string;
  methodCal: string;
  footTag: string;
  footComp: string;
  footLegal: string;
  footPriv: string;
  footTerms: string;
  footRights: string;
  steps: Step[];
  tms: Testimonial[];
  plans: Plan[];
  faqs: Faq[];
}

const ES: Dict = {
  navServ: "Servicios",
  navProc: "Proceso",
  navProy: "Proyectos",
  navPre: "Precios",
  navCont: "Contacto",
  navCta: "Agenda una llamada",
  h1: "Construimos el software que tu negocio necesita.",
  sub: "Consultoría y desarrollo a medida: páginas web, bots de atención, apps móviles y sistemas listos para producción.",
  cta1: "Agenda una llamada",
  cta2: "Ver proyectos",
  tiny: "Sin compromiso · Respuesta en 24 h",
  botName: "Sam",
  botStat: "En línea",
  bm1: "Hola 👋 ¿En qué te ayudo?",
  bm2: "Quiero automatizar mi atención al cliente",
  bm3: "Listo, lo dejo activo en 48 h.",
  trustLab: "CONSTRUIMOS CON TECNOLOGÍA DE PRIMER NIVEL",
  servEy: "Servicios",
  servTitle: "Todo lo que tu negocio necesita para crecer",
  servSub: "Un solo equipo para tu web, tus bots, tus apps y tu software a medida.",
  svc1t: "Páginas y sitios web",
  svc1d: "Sitios rápidos, modernos y optimizados para convertir visitantes en clientes.",
  svc2t: "Bots y automatización",
  svc2d: "Bots de atención por WhatsApp y automatización de tareas con IA.",
  svc3t: "Apps móviles",
  svc3d: "Apps nativas multiplataforma con React Native, listas para las tiendas.",
  svc4t: "Software a medida & SaaS",
  svc4d: "Plataformas multi-tenant, integraciones y pasarelas de pago como Stripe.",
  svc5t: "Consultoría tecnológica",
  svc5d: "Arquitectura de software, selección de stack y roadmap técnico.",
  svc6t: "Cloud & DevOps",
  svc6d: "Azure y Google Cloud: infraestructura escalable, CI/CD y monitoreo.",
  procEy: "Proceso",
  procTitle: "De la idea a producción, sin fricción",
  projEy: "Proyectos",
  projTitle: "Trabajo que habla por nosotros",
  projSub: "Algunos de los productos que hemos construido y estamos construyendo.",
  featBadge: "En producción",
  featName: "Handy Sales CRM",
  featTag: "CRM de ventas en campo",
  featDesc:
    "Plataforma completa para equipos de ventas: pedidos, rutas, clientes, facturación (CFDI) y un bot de atención. App móvil + panel web + API.",
  proj2Badge: "En desarrollo",
  proj2Name: "Productos Caseros Jeyma",
  proj2Desc: "Sitio web y catálogo en línea para una marca de productos caseros.",
  proj3Name: "Tu proyecto aquí",
  proj3Desc: "El siguiente caso de éxito puede ser el tuyo. Cuéntanos tu idea.",
  proj3Cta: "Hablemos",
  tmEy: "Testimonios",
  tmTitle: "Lo que dicen nuestros clientes",
  priceEy: "Precios",
  priceTitle: "Planes claros, sin sorpresas",
  priceSub: "Precios de referencia. Cada proyecto se cotiza a la medida de tus necesidades.",
  popular: "Más popular",
  priceNote: "Todos los planes incluyen reuniones de seguimiento y soporte post-lanzamiento.",
  faqEy: "Preguntas frecuentes",
  faqTitle: "Resolvemos tus dudas",
  ctaTitle: "¿Listo para construir tu próximo producto?",
  ctaSub: "Agenda una llamada sin compromiso. Te respondemos en menos de 24 horas.",
  ctaBtn: "Agenda una llamada",
  ctaWa: "Escríbenos por WhatsApp",
  contEy: "Contacto",
  contTitle: "Hablemos de tu proyecto",
  contSub: "Cuéntanos qué necesitas y te contactamos con una propuesta.",
  fName: "Nombre",
  fEmail: "Correo",
  fCompany: "Empresa (opcional)",
  fMsg: "¿Qué necesitas?",
  fSend: "Enviar mensaje",
  fSent: "¡Gracias! Recibimos tu mensaje y te contactaremos muy pronto.",
  methodEmail: "Escríbenos",
  methodWa: "WhatsApp directo",
  methodCal: "Agenda una llamada",
  footTag: "Consultoría y desarrollo de software a medida. Web, bots, apps y más.",
  footComp: "Empresa",
  footLegal: "Legal",
  footPriv: "Privacidad",
  footTerms: "Términos",
  footRights: "© 2026 Jeshua Software. Todos los derechos reservados.",
  steps: [
    {
      t: "Descubrimiento",
      d: "Entendemos tu negocio, objetivos y usuarios antes de escribir una línea de código.",
    },
    {
      t: "Diseño & arquitectura",
      d: "Definimos la experiencia, el stack y el plan técnico del proyecto.",
    },
    {
      t: "Desarrollo",
      d: "Construimos con código limpio y entregas continuas que puedes revisar.",
    },
    {
      t: "Lanzamiento & soporte",
      d: "Desplegamos en producción y damos mantenimiento y mejoras.",
    },
  ],
  tms: [
    {
      q: "Entregaron nuestro CRM a tiempo y superó lo que esperábamos. El equipo de ventas por fin trabaja sin fricción.",
      n: "Carlos M.",
      r: "Director Comercial · Distribuidora",
      ini: "CM",
    },
    {
      q: "El bot de WhatsApp redujo a la mitad el tiempo de respuesta a nuestros clientes. Excelente ejecución y trato cercano.",
      n: "Ana R.",
      r: "Gerente de Operaciones",
      ini: "AR",
    },
  ],
  plans: [
    {
      name: "Sitio web",
      price: "$8,900",
      per: "MXN · proyecto",
      features: [
        "Diseño a medida",
        "100% responsive",
        "SEO básico incluido",
        "Hasta 5 secciones",
        "Entrega en 2–3 semanas",
      ],
      cta: "Cotizar",
      popular: false,
    },
    {
      name: "Bots & Automatización",
      price: "$4,500",
      per: "MXN · mensual",
      features: [
        "Bot de WhatsApp",
        "Flujos de atención con IA",
        "Integraciones a la medida",
        "Panel de control",
        "Soporte incluido",
      ],
      cta: "Cotizar",
      popular: true,
    },
    {
      name: "Software a medida",
      price: "Cotización",
      per: "según el alcance",
      features: [
        "Consultoría & arquitectura",
        "Desarrollo full-stack",
        "Cloud & DevOps",
        "App móvil opcional",
        "Soporte y mejoras continuas",
      ],
      cta: "Agenda una llamada",
      popular: false,
    },
  ],
  faqs: [
    {
      q: "¿Cuánto tarda un proyecto?",
      a: "Un sitio web toma de 2 a 3 semanas; un software a medida, de 1 a 3 meses según el alcance. Te damos un cronograma claro desde el inicio.",
    },
    {
      q: "¿Trabajan con clientes fuera de México?",
      a: "Sí. Trabajamos de forma remota con clientes en toda Latinoamérica y Estados Unidos, en español e inglés.",
    },
    {
      q: "¿Ofrecen mantenimiento y soporte?",
      a: "Sí. Todos nuestros proyectos incluyen soporte post-lanzamiento y ofrecemos planes de mantenimiento continuo.",
    },
    {
      q: "¿Qué tecnologías usan?",
      a: "React, Next.js, React Native, .NET, PostgreSQL, Azure y Google Cloud, entre otras. Elegimos el stack según tu proyecto.",
    },
    {
      q: "¿Cómo funcionan los pagos?",
      a: "Normalmente 50% para iniciar y 50% a la entrega. Aceptamos transferencia y pagos con tarjeta vía Stripe.",
    },
  ],
};

const EN: Dict = {
  navServ: "Services",
  navProc: "Process",
  navProy: "Projects",
  navPre: "Pricing",
  navCont: "Contact",
  navCta: "Book a call",
  h1: "We build the software your business needs.",
  sub: "Consulting and custom development: websites, support bots, mobile apps and systems ready for production.",
  cta1: "Book a call",
  cta2: "See projects",
  tiny: "No commitment · Reply within 24h",
  botName: "Sam",
  botStat: "Online",
  bm1: "Hi 👋 How can I help?",
  bm2: "I want to automate my customer support",
  bm3: "Done — I can ship it in 48h.",
  trustLab: "BUILT WITH WORLD-CLASS TECHNOLOGY",
  servEy: "Services",
  servTitle: "Everything your business needs to grow",
  servSub: "One team for your website, your bots, your apps and your custom software.",
  svc1t: "Websites & landing pages",
  svc1d: "Fast, modern sites optimized to turn visitors into customers.",
  svc2t: "Bots & automation",
  svc2d: "WhatsApp support bots and AI-powered task automation.",
  svc3t: "Mobile apps",
  svc3d: "Cross-platform native apps with React Native, store-ready.",
  svc4t: "Custom software & SaaS",
  svc4d: "Multi-tenant platforms, integrations and payment gateways like Stripe.",
  svc5t: "Tech consulting",
  svc5d: "Software architecture, stack selection and technical roadmap.",
  svc6t: "Cloud & DevOps",
  svc6d: "Azure and Google Cloud: scalable infrastructure, CI/CD and monitoring.",
  procEy: "Process",
  procTitle: "From idea to production, without friction",
  projEy: "Projects",
  projTitle: "Work that speaks for itself",
  projSub: "Some of the products we have built and are building.",
  featBadge: "In production",
  featName: "Handy Sales CRM",
  featTag: "Field sales CRM",
  featDesc:
    "Complete platform for sales teams: orders, routes, customers, invoicing (CFDI) and a support bot. Mobile app + web panel + API.",
  proj2Badge: "In progress",
  proj2Name: "Productos Caseros Jeyma",
  proj2Desc: "Website and online catalog for a homemade-goods brand.",
  proj3Name: "Your project here",
  proj3Desc: "The next success story could be yours. Tell us your idea.",
  proj3Cta: "Let's talk",
  tmEy: "Testimonials",
  tmTitle: "What our clients say",
  priceEy: "Pricing",
  priceTitle: "Clear plans, no surprises",
  priceSub: "Reference prices. Every project is quoted to fit your needs.",
  popular: "Most popular",
  priceNote: "All plans include follow-up meetings and post-launch support.",
  faqEy: "FAQ",
  faqTitle: "Answering your questions",
  ctaTitle: "Ready to build your next product?",
  ctaSub: "Book a no-commitment call. We reply in under 24 hours.",
  ctaBtn: "Book a call",
  ctaWa: "Message us on WhatsApp",
  contEy: "Contact",
  contTitle: "Let's talk about your project",
  contSub: "Tell us what you need and we'll get back to you with a proposal.",
  fName: "Name",
  fEmail: "Email",
  fCompany: "Company (optional)",
  fMsg: "What do you need?",
  fSend: "Send message",
  fSent: "Thanks! We got your message and will be in touch very soon.",
  methodEmail: "Email us",
  methodWa: "Direct WhatsApp",
  methodCal: "Book a call",
  footTag: "Consulting and custom software development. Web, bots, apps and more.",
  footComp: "Company",
  footLegal: "Legal",
  footPriv: "Privacy",
  footTerms: "Terms",
  footRights: "© 2026 Jeshua Software. All rights reserved.",
  steps: [
    {
      t: "Discovery",
      d: "We understand your business, goals and users before writing a single line of code.",
    },
    {
      t: "Design & architecture",
      d: "We define the experience, the stack and the technical plan.",
    },
    {
      t: "Development",
      d: "We build with clean code and continuous deliveries you can review.",
    },
    {
      t: "Launch & support",
      d: "We deploy to production and provide maintenance and improvements.",
    },
  ],
  tms: [
    {
      q: "They delivered our CRM on time and it exceeded what we expected. The sales team finally works without friction.",
      n: "Carlos M.",
      r: "Commercial Director · Distributor",
      ini: "CM",
    },
    {
      q: "The WhatsApp bot cut our customer response time in half. Great execution and a close working relationship.",
      n: "Ana R.",
      r: "Operations Manager",
      ini: "AR",
    },
  ],
  plans: [
    {
      name: "Website",
      price: "$8,900",
      per: "MXN · project",
      features: [
        "Custom design",
        "100% responsive",
        "Basic SEO included",
        "Up to 5 sections",
        "Delivery in 2–3 weeks",
      ],
      cta: "Get a quote",
      popular: false,
    },
    {
      name: "Bots & Automation",
      price: "$4,500",
      per: "MXN · monthly",
      features: [
        "WhatsApp bot",
        "AI support flows",
        "Custom integrations",
        "Control panel",
        "Support included",
      ],
      cta: "Get a quote",
      popular: true,
    },
    {
      name: "Custom software",
      price: "Custom",
      per: "based on scope",
      features: [
        "Consulting & architecture",
        "Full-stack development",
        "Cloud & DevOps",
        "Optional mobile app",
        "Ongoing support & improvements",
      ],
      cta: "Book a call",
      popular: false,
    },
  ],
  faqs: [
    {
      q: "How long does a project take?",
      a: "A website takes 2 to 3 weeks; custom software, 1 to 3 months depending on scope. We give you a clear timeline from the start.",
    },
    {
      q: "Do you work with clients outside Mexico?",
      a: "Yes. We work remotely with clients across Latin America and the United States, in Spanish and English.",
    },
    {
      q: "Do you offer maintenance and support?",
      a: "Yes. All our projects include post-launch support and we offer ongoing maintenance plans.",
    },
    {
      q: "What technologies do you use?",
      a: "React, Next.js, React Native, .NET, PostgreSQL, Azure and Google Cloud, among others. We choose the stack for your project.",
    },
    {
      q: "How do payments work?",
      a: "Usually 50% to start and 50% on delivery. We accept bank transfer and card payments via Stripe.",
    },
  ],
};

export const dictionaries: Record<Lang, Dict> = { es: ES, en: EN };

export const WHATSAPP_URL = "https://wa.me/5210000000000";
export const CALENDLY_URL = "https://calendly.com/jeshuacode";
export const CONTACT_EMAIL = "contacto@jeshuacode.com";
