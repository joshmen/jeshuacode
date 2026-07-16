import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Pixel from "@/components/pixel";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
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
    <html lang="es" className={roboto.variable}>
      <body className="font-sans antialiased">
        <Pixel />
        {children}
      </body>
    </html>
  );
}
