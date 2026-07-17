"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/lib/language-context";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Trust from "@/components/trust";
import ServiceFeatures from "@/components/service-features";
import Services from "@/components/services";
import Process from "@/components/process";
import Projects from "@/components/projects";
import Pricing from "@/components/pricing";
import SocialProof from "@/components/social-proof";
import Faq from "@/components/faq";
import Cta from "@/components/cta";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

// Sin SSR: el widget lee localStorage para saber si hay un hilo abierto, y el server no puede
// saberlo. Va dentro del LanguageProvider porque su texto tambien es bilingue.
const ChatWidget = dynamic(() => import("@/components/chat/chat-widget"), { ssr: false });

export default function Home() {
  return (
    <LanguageProvider>
      <Nav />
      <main>
        <Hero />
        <Trust />
        <ServiceFeatures />
        <Services />
        <Process />
        <Projects />
        <Pricing />
        <SocialProof />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </LanguageProvider>
  );
}
