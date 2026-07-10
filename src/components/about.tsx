"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const stats = [
  { value: "5+", label: "Años de experiencia" },
  { value: "20+", label: "Proyectos entregados" },
  { value: "100%", label: "Compromiso" },
];

export function About() {
  return (
    <section
      id="nosotros"
      className="bg-bg-surface px-6 py-24 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid items-center gap-16 lg:grid-cols-2"
        >
          {/* Image */}
          <motion.div
            variants={fadeInUp}
            className="overflow-hidden rounded-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
              alt="Equipo JeShua Code trabajando"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeInUp}
              className="text-[13px] font-semibold uppercase tracking-wider text-accent"
            >
              Nosotros
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-3xl font-bold tracking-tight text-text-primary"
              style={{ letterSpacing: "-0.02em" }}
            >
              Tecnología con propósito
            </motion.h2>
            <motion.div variants={fadeInUp} className="mt-5 space-y-4">
              <p className="text-[15px] leading-[1.7] text-text-secondary">
                JeShua Code nace de la convicción de que la tecnología debe
                servir a las personas. Nuestro nombre viene del hebreo{" "}
                <em>Yehoshua</em> &mdash; &laquo;Dios salva&raquo; &mdash;
                porque creemos que cada línea de código puede generar impacto
                real.
              </p>
              <p className="text-[15px] leading-[1.7] text-text-secondary">
                Nos especializamos en transformar ideas en productos digitales
                robustos, con valores de excelencia, integridad y servicio.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex gap-10"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
