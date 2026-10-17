"use client";

import { useState } from "react";
import { Candy, Check, Cpu, HandHeart, Recycle, RotateCw, X } from "lucide-react";
import { COMPARISON } from "@/lib/content";
import { useStore } from "./StoreProvider";
import { useSubmitForm } from "@/lib/submit-form";
import { FormError, Honeypot, Modal, Reveal, SectionHeading, btn, inputClass } from "./ui";

const PILLARS = [
  { icon: Cpu, title: "Innovación", text: "Liofilización y crunch: la fruta de siempre, con una textura que no conocías." },
  { icon: Recycle, title: "Sostenibilidad", text: "Un empaque compostable que no se bota: se reutiliza como billetera." },
  { icon: HandHeart, title: "Impacto social", text: "Compramos directo en el campo y el 5% vuelve a las comunidades." },
];

type Mode = "tradicional" | "arandino";

const Comparator = () => {
  const [mode, setMode] = useState<Mode>("tradicional");
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const isArandino = (i: number) => (mode === "arandino") !== flipped.has(i);

  const switchMode = (m: Mode) => {
    setMode(m);
    setFlipped(new Set());
  };

  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <div role="tablist" aria-label="Comparar" className="relative grid grid-cols-2 rounded-full bg-white p-1.5 shadow-inner ring-1 ring-grape-100">
          <span
            className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full transition-transform duration-300 ${
              mode === "arandino" ? "translate-x-full bg-grape-600" : "translate-x-0 bg-neutral-500"
            }`}
          />
          {(["tradicional", "arandino"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => switchMode(m)}
              className={`relative z-10 rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-colors sm:px-7 sm:text-base ${
                mode === m ? "text-white" : "text-ink/60"
              }`}
            >
              {m === "tradicional" ? "Dulce tradicional" : "Arándino"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMPARISON.map((row, i) => {
          const showBack = mode === "arandino" ? !flipped.has(i) : flipped.has(i);
          return (
            <button
              key={row.topic}
              onClick={() => toggle(i)}
              aria-label={`${row.topic}: ${isArandino(i) ? row.arandino : row.traditional}. Toca para voltear.`}
              className={`flip h-48 text-left ${showBack ? "is-flipped" : ""}`}
            >
              <div className="flip-inner relative h-full w-full">
                <div className="flip-face absolute inset-0 flex flex-col rounded-3xl border-2 border-neutral-200 bg-neutral-100 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-neutral-500 uppercase">{row.topic}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 text-neutral-600">
                      <X className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-3 flex-1 font-display text-lg leading-snug text-neutral-600">{row.traditional}</p>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
                    <Candy className="h-4 w-4" /> Dulce tradicional · <RotateCw className="h-3.5 w-3.5" /> voltear
                  </span>
                </div>
                <div className="flip-face flip-back absolute inset-0 flex flex-col rounded-3xl border-2 border-grape-500 bg-grape-600 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-banana-300 uppercase">{row.topic}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-leaf-500 text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-3 flex-1 font-display text-lg leading-snug font-medium">{row.arandino}</p>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-grape-100">
                    🫐 Arándino · <RotateCw className="h-3.5 w-3.5" /> voltear
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const DistributorForm = ({ onDone }: { onDone: () => void }) => {
  const { notify } = useStore();
  const [sent, setSent] = useState(false);
  const { submit, sending, error } = useSubmitForm("distribuidor");

  if (sent) {
    return (
      <div className="text-center">
        <p className="text-5xl">🤝</p>
        <p className="mt-3 font-display text-xl font-semibold text-grape-900">¡Gracias! Ya tenemos tus datos.</p>
        <p className="mt-2 text-ink/70">Nuestro equipo comercial te escribe en menos de 48 horas.</p>
        <button onClick={onDone} className={`${btn.primary} mt-6 w-full`}>
          Listo
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (await submit(e.currentTarget)) {
          setSent(true);
          notify("Recibimos tu solicitud de distribución");
        }
      }}
    >
      <p className="mb-2 text-sm text-ink/70">
        ¿Tienes una tienda, cafetería, gimnasio o eres distribuidor? Déjanos tus datos y hablamos.
      </p>
      <input required name="nombre" placeholder="Tu nombre" className={inputClass} autoComplete="name" />
      <input required name="empresa" placeholder="Empresa o tienda" className={inputClass} autoComplete="organization" />
      <input required name="ciudad" placeholder="Ciudad" className={inputClass} autoComplete="address-level2" />
      <input required type="email" name="correo" placeholder="Correo" className={inputClass} autoComplete="email" />
      <input required type="tel" name="telefono" placeholder="Teléfono" className={inputClass} autoComplete="tel" />
      <Honeypot />
      <FormError message={error} />
      <button type="submit" disabled={sending} className={`${btn.primary} mt-2 w-full`}>
        {sending ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
};

export const WhyArandino = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="por-que" className="bg-kraft/50 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Propuesta de valor" title="¿Por qué Arándino?" />

        <Reveal>
          <p className="mx-auto -mt-4 max-w-3xl text-center font-display text-3xl leading-tight font-semibold text-grape-700 sm:text-5xl">
            Te comes las gomitas y te quedas con la billetera.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-ink/70">
            Comerte un dulce puede ser algo consciente, divertido y saludable. Así lo hacemos posible:
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="h-full rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl font-semibold text-grape-900">{title}</h3>
                <p className="mt-2 text-ink/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <h3 className="mb-2 text-center font-display text-2xl font-semibold text-grape-900 sm:text-3xl">
            Arándino vs. el dulce tradicional
          </h3>
          <p className="mb-8 text-center text-ink/60">Cambia el interruptor o toca cada tarjeta para voltearla.</p>
          <Comparator />
        </Reveal>

        <Reveal className="mt-14 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#comprar" className={btn.primary}>
            Comprar ahora
          </a>
          <button onClick={() => setFormOpen(true)} className={btn.secondary}>
            Quiero distribuir Arándino
          </button>
        </Reveal>
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Distribuye Arándino">
        <DistributorForm onDone={() => setFormOpen(false)} />
      </Modal>
    </section>
  );
};
