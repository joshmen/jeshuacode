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
