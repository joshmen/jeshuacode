import { Linkedin, Github, Twitter, Mail } from "lucide-react";

const footerLinks = {
  servicios: [
    "Desarrollo de Apps",
    "Consultoría Tech",
    "Soluciones SaaS",
    "Cloud & DevOps",
  ],
  empresa: ["Nosotros", "Proyectos", "Contacto", "Blog"],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:contacto@jeshuacode.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-20">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" className="flex items-center">
              <img
                src="/images/logo-transparente.png"
                alt="Jeshua Software"
                className="h-10 w-auto"
              />
            </a>
            <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
              Consultoría tecnológica y desarrollo de software a medida.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-[13px] font-semibold text-text-primary">
                Servicios
              </h4>
              <ul className="mt-3 space-y-2.5">
                {footerLinks.servicios.map((link) => (
                  <li key={link}>
                    <a
                      href="#servicios"
                      className="text-[13px] text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-text-primary">
                Empresa
              </h4>
              <ul className="mt-3 space-y-2.5">
                {footerLinks.empresa.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-[13px] text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-[13px] text-text-secondary">
            &copy; 2026 Jeshua Software. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-text-secondary transition-colors hover:text-text-primary"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
