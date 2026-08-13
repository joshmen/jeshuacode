import type { Metadata } from "next";
import TermsContent from "./terms-content";

export const metadata: Metadata = {
  title: "Términos de servicio | Jeshua Software",
  description: "Condiciones de uso del sitio y de los servicios de desarrollo de software y bots de Jeshua Software.",
};

export default function TerminosPage() {
  return <TermsContent />;
}
