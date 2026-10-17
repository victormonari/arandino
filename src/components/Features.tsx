"use client";

import { useState } from "react";
import {
  Apple,
  ChevronDown,
  Droplets,
  Palette,
  PieChart,
  QrCode,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";
import { CountUp } from "./CountUp";
import { Banana, Blueberry, FreeSeal, PhotoSlot, Reveal, SectionHeading, btn } from "./ui";

const FEATURES = [
  {
    icon: Apple,
    title: "Cero azúcar añadida",
    short: "El dulce lo pone la fruta.",
    detail: "Sin azúcar y sin edulcorantes. Todo el dulzor viene del arándano y el banano, y de nada más.",
  },
  {
    icon: ShieldCheck,
    title: "Libre de sellos",
    short: "Cero octágonos. Cero.",
    detail:
      "Ningún sello de advertencia. En su lugar, nuestro sello verde de garantía, que ves apenas tomas la billetera.",
    highlight: "green",
  },
  {
    icon: Zap,
    title: "Crocante de verdad",
    short: "Cruje en cada mordisco.",
    detail:
      "La liofilización conserva la estructura de la fruta y la deja crujiente, con su pectina y su fibra natural. Sin gomas ni azúcares añadidos.",
  },
  {
    icon: Palette,
    title: "Fruta real, sin colorantes",
    short: "Morado y amarillo de verdad.",
    detail: "El morado sale del arándano y el amarillo del banano. Colores vivos que vienen de la propia fruta.",
  },
  {
    icon: PieChart,
    title: "Porciones controladas",
    short: "3 bolsillos de 10 g.",
    detail: "Tres porciones de 10 g, perfectas para tu día a día, la dieta o la lonchera de los niños.",
  },
  {
    icon: Droplets,
    title: "Indicador de frescura",
    short: "Te avisa si entra humedad.",
    detail:
      "Cada bolsillo va sellado aparte con barrera contra la humedad. Y el empaque tiene un indicador que cambia de color si la humedad se cuela.",
    highlight: "purple",
  },
  {
    icon: Wallet,
    title: "Billetera reutilizable",
    short: "Te la quedas para siempre.",
    detail:
      "Por fuera es compostable (papel kraft + PLA). Cuando se acaban las gomitas, queda una billetera con broche de presión y ranura para tarjetas: monedas, tarjetas o el pase del bus.",
    highlight: "yellow",
  },
];

const HIGHLIGHT: Record<string, { card: string; badge: string; label: string }> = {
  green: { card: "border-leaf-500 bg-leaf-50", badge: "bg-leaf-600 text-white", label: "Sello verde" },
  purple: { card: "border-grape-400 bg-grape-50", badge: "bg-grape-600 text-white", label: "Exclusivo" },
  yellow: { card: "border-banana-500 bg-banana-100", badge: "bg-banana-400 text-ink", label: "La estrella" },
};

const STEPS = [
  { title: "Abre la solapa", text: "Cierra con broche de presión, como una billetera de verdad." },
  { title: "Rasga un bolsillo", text: "Cada porción de 10 g va sellada aparte." },
  { title: "El resto sigue crocante", text: "Los demás bolsillos quedan protegidos de la humedad." },
];

// Simulación del indicador: morado = fresco, rosado = entró humedad
const MoistureDemo = () => {
  const [humid, setHumid] = useState(false);
  return (
    <div className="relative z-10 mt-4 flex items-center gap-3 rounded-2xl bg-white p-3">
      <span
        className={`h-8 w-8 shrink-0 rounded-full border-4 border-white shadow-inner ring-2 transition-colors duration-700 ${
          humid ? "bg-pink-400 ring-pink-200" : "bg-grape-600 ring-grape-200"
        }`}
      />
      <span className="flex-1 text-sm font-semibold text-ink/80">{humid ? "¡Ojo! Entró humedad" : "Fresquita y crocante"}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setHumid((h) => !h);
        }}
        className="rounded-full bg-grape-100 px-3 py-1.5 text-xs font-bold text-grape-700 transition hover:bg-grape-200"
      >
        {humid ? "Reiniciar" : "Probar"}
      </button>
    </div>
  );
};

export const Features = () => {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section id="producto" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <Blueberry className="pointer-events-none absolute top-24 -left-8 h-24 w-24 opacity-20" />
      <Banana className="pointer-events-none absolute right-0 bottom-40 h-28 w-28 opacity-20" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="El producto" title="7 razones dentro de una billetera">
          Gomitas crocantes de arándano y banano, liofilizadas, en un empaque que no se bota. Toca cada una para
          conocerla.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const isOpen = open === i;
            const hl = f.highlight ? HIGHLIGHT[f.highlight] : null;
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={(i % 3) * 90} variant="flip" className={i === 6 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <div
                  className={`group relative flex h-full w-full flex-col rounded-3xl border-2 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 ${
                    hl ? hl.card : "border-grape-100 bg-white"
                  } ${isOpen ? "shadow-lg" : ""}`}
                >
                  {hl && (
                    <span className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold ${hl.badge}`}>
                      {hl.label}
                    </span>
                  )}
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="text-left after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                  >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-grape-600 text-white transition group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="pr-16">
                      <span className="text-xs font-bold text-grape-500">0{i + 1}</span>
                      <h3 className="font-display text-lg leading-tight font-semibold text-grape-900">{f.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 flex items-center justify-between gap-2 font-semibold text-ink/70">
                    {f.short}
                    <ChevronDown className={`h-5 w-5 shrink-0 text-grape-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </p>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-ink/75">{f.detail}</p>
                      {f.highlight === "green" && (
                        <div className="mt-4 flex items-center gap-3">
                          <FreeSeal className="h-16 w-16" />
                          <span className="text-sm font-bold text-leaf-700">Lo ves apenas tomas el producto.</span>
                        </div>
                      )}
                      {f.highlight === "purple" && <MoistureDemo />}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Reveal variant="zoom" className="md:col-span-2">
            <div className="flex h-full flex-col items-center gap-5 rounded-[2rem] bg-grape-700 p-7 text-white sm:flex-row sm:p-9">
              <p className="font-display text-7xl leading-none font-bold text-banana-400 sm:text-8xl">
                <CountUp to={97} suffix="%" />
              </p>
              <p className="text-center text-lg sm:text-left">
                de las vitaminas y flavonoides del arándano se quedan en la gomita gracias a la liofilización.{" "}
                <span className="text-grape-200">La fruta se seca en frío, no se cocina.</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex h-full items-center gap-4 rounded-[2rem] border-2 border-dashed border-grape-300 bg-white p-7">
              <QrCode className="h-14 w-14 shrink-0 text-grape-600" />
              <p className="text-ink/80">
                <span className="font-display text-lg font-semibold text-grape-900">Hay un QR adentro.</span> Escanéalo y
                juega la trivia del panel interior.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid items-center gap-10 md:grid-cols-2">
          <Reveal variant="left">
            <PhotoSlot
              label="Foto: billetera abierta con sus 3 porciones"
              src="/images/billetera-abierta.jpg"
              aspect="aspect-[3/4]"
              imgClassName="object-cover object-left"
              className="mx-auto max-w-md"
            />
          </Reveal>
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-grape-600 uppercase">
                <Sparkles className="h-4 w-4" /> Cómo funciona
              </span>
              <h3 className="mt-2 font-display text-3xl font-semibold text-grape-900 sm:text-4xl">
                Tan fácil como abrir tu billetera
              </h3>
            </Reveal>
            <ol className="mt-8 space-y-5">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 120} variant="right">
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-banana-400 font-display text-xl font-bold text-ink">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display text-xl font-semibold text-grape-900">{s.title}</p>
                      <p className="text-ink/70">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={400}>
              <a href="#comprar" className={`${btn.primary} mt-9`}>
                Quiero la mía
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
