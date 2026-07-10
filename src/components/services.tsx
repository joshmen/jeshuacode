"use client";

import { motion } from "framer-motion";
import { Smartphone, Brain, Layers, Cloud } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    icon: Smartphone,
    title: "Desarrollo de Apps",
    description:
      "Apps móviles y web con React Native, Next.js y .NET. Experiencias nativas multiplataforma.",
  },
  {
    icon: Brain,
    title: "Consultoría Tech",
    description:
      "Arquitectura de software, selección de stack, roadmap técnico y auditorías de código.",
  },
  {
    icon: Layers,
    title: "Soluciones SaaS",
    description:
      "Plataformas multi-tenant, integraciones con APIs de terceros, pasarelas de pago.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Azure, CI/CD, infraestructura escalable, monitoreo y despliegue automatizado.",
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      className="bg-bg-surface px-6 py-24 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-[13px] font-semibold uppercase tracking-wider text-accent"
          >
            Servicios
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Todo lo que necesitas para lanzar tu producto
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-3 text-base text-text-secondary"
          >
            Desde la consultoría inicial hasta el despliegue en producción.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={fadeInUp}
              className="group rounded-xl border border-border bg-bg-primary p-7 transition-all hover:border-accent/30 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <svc.icon size={20} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-text-primary">
                {svc.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {svc.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
