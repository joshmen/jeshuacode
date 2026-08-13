import type { Metadata } from "next";
import PrivacyContent from "./privacy-content";

export const metadata: Metadata = {
  title: "Política de privacidad | Jeshua Software",
  description:
    "Cómo Jeshua Software recopila, usa y protege tus datos personales en este sitio y en la plataforma de bots de atención.",
};

export default function PrivacidadPage() {
  return <PrivacyContent />;
}
