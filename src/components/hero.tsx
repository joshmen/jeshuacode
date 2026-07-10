"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-72px)] items-center px-6 py-16 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left - Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5"
          >
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-[13px] font-medium text-accent">
              Consultoría + Desarrollo de Software
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-[56px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Creamos software
            <br />
            que transforma negocios
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            Arquitectura robusta, código limpio y soluciones que escalan.
            <br className="hidden sm:block" />
            Desde la idea hasta producción.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="mt-10 flex gap-3">
            <a
              href="#contacto"
              className="group flex items-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-accent/90"
            >
              Agenda una consulta
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#proyectos"
              className="flex items-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-surface"
            >
              Ver proyectos
              <ChevronRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right - Video */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full flex-1 items-center justify-center lg:justify-end"
        >
          <div className="w-full max-w-[500px] overflow-hidden rounded-2xl shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-auto w-full object-cover"
            >
              <source src="/images/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
