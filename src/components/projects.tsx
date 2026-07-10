"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const techTags = [
  "React Native",
  "Expo",
  ".NET 9",
  "PostgreSQL",
  "Stripe Connect",
  "Azure",
];

export function Projects() {
  return (
    <section id="proyectos" className="px-6 py-24 lg:px-20">
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
            Proyectos
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Lo que hemos construido
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-16"
        >
          {/* DeliveryGo Project Card */}
          <motion.div
            variants={fadeInUp}
            className="overflow-hidden rounded-2xl border border-border"
          >
            <div className="flex flex-col items-center gap-8 p-8 lg:flex-row lg:p-10">
              {/* Logo solo en móvil (arriba del video) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/deliverygo-logo-pin.png"
                alt="DeliveryGo Logo"
                className="order-1 h-48 w-auto object-contain lg:hidden"
              />
              {/* DeliveryGo Video */}
              <div className="order-2 w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-gray-50 to-white lg:order-1 lg:w-1/2">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-auto w-full object-cover"
                >
                  <source src="/images/deliverygo-video.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Logo + Info (desktop: logo visible, móvil: solo info) */}
              <div className="order-3 flex w-full flex-col gap-4 lg:order-2 lg:w-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/deliverygo-logo-pin.png"
                  alt="DeliveryGo Logo"
                  className="hidden h-48 w-auto object-contain lg:block"
                />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">
                      Plataforma de delivery multi-tenant
                    </p>
                  </div>
                  <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
                    En desarrollo
                  </span>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
                  App completa de delivery con tres roles: clientes, repartidores y
                  dueños de tienda. Incluye pagos con Stripe Connect, backoffice
                  administrativo, y gestión de órdenes en tiempo real.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {techTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-bg-surface px-3 py-1 text-xs font-medium text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Placeholder row for future projects */}
          <motion.div
            variants={fadeInUp}
            className="mt-5 grid gap-5 sm:grid-cols-2"
          >
            {[
              {
                title: "Próximo proyecto",
                desc: "E-commerce con IA generativa",
              },
              { title: "Próximo proyecto", desc: "Dashboard analytics SaaS" },
            ].map((p, i) => (
              <div
                key={i}
                className="group flex items-center justify-between rounded-xl border border-dashed border-border p-6 transition-colors hover:border-accent/40"
              >
                <div>
                  <p className="text-sm font-medium text-text-secondary">
                    {p.title}
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary/60">
                    {p.desc}
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-text-secondary/40 transition-colors group-hover:text-accent"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
