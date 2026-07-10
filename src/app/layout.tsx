import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "JeShua Code | Construimos el software que tu negocio necesita",
  description:
    "Consultoría y desarrollo a medida: páginas web, bots de atención, apps móviles y sistemas listos para producción.",
  keywords: [
    "desarrollo de software",
    "consultoría tecnológica",
    "páginas web",
    "bots de WhatsApp",
    "apps móviles",
    "React Native",
    ".NET",
    "Azure",
    "SaaS",
  ],
  openGraph: {
    title: "JeShua Code | Construimos el software que tu negocio necesita",
    description:
      "Consultoría y desarrollo a medida: páginas web, bots de atención, apps móviles y sistemas listos para producción.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={archivo.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
