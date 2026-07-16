"use client";

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
    </LanguageProvider>
  );
}
