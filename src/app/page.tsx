"use client";

import { LanguageProvider } from "@/lib/language-context";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Trust from "@/components/trust";
import Services from "@/components/services";
import Process from "@/components/process";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
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
        <Services />
        <Process />
        <Projects />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
