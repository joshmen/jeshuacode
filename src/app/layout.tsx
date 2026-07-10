import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JeShua Code | Consultoría Tecnológica & Desarrollo de Software",
  description:
    "Creamos software que transforma negocios. Consultoría tecnológica y desarrollo a medida con React Native, .NET, Azure y más.",
  keywords: [
    "desarrollo de software",
    "consultoría tecnológica",
    "React Native",
    ".NET",
    "Azure",
    "SaaS",
    "apps móviles",
  ],
  openGraph: {
    title: "JeShua Code | Consultoría Tecnológica & Desarrollo de Software",
    description:
      "Creamos software que transforma negocios. Desde la idea hasta producción.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
