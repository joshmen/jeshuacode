"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function CTA() {
  return (
    <section id="contacto" className="px-6 py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center rounded-2xl bg-text-primary p-16 text-center lg:p-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="max-w-lg text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Transformemos tu idea en software
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-md text-base leading-relaxed text-[#B0B0B0]"
          >
            Agenda una llamada sin compromiso. Hablemos de tu proyecto y cómo
            hacerlo realidad.
          </motion.p>
          <motion.a
            variants={fadeInUp}
            href="mailto:contacto@jeshuacode.com"
            className="group mt-8 flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-accent/90"
          >
            Agenda tu consulta
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </motion.a>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-[13px] text-[#7A7A7A]"
          >
            Sin compromisos &middot; Respuesta en 24h &middot; 100%
            confidencial
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
