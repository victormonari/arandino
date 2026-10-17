import { Check, Microscope, Sprout } from "lucide-react";
import { CountUp } from "./CountUp";
import { FreeSeal, Leaf, PhotoSlot, Reveal, SectionHeading } from "./ui";

const VALUES = [
  {
    icon: Microscope,
    title: "Ciencia y transparencia",
    tone: "bg-grape-50 border-grape-100",
    iconTone: "bg-grape-600 text-white",
    items: [
      "Innovación continua con procesos como la liofilización.",
      "Honestidad nutricional: sin engaños ni edulcorantes artificiales escondidos.",
      "Lo respaldamos con nuestro sello propio «Libre de sellos».",
    ],
  },
  {
    icon: Sprout,
    title: "Sostenibilidad e impacto",
    tone: "bg-leaf-50 border-leaf-100",
    iconTone: "bg-leaf-600 text-white",
    items: [
      "Empaque compostable que se convierte en algo útil: tu billetera.",
      "Compra ética y directa a pequeños agricultores.",
      "Aprovechamos los residuos del proceso.",
    ],
  },
];

const STATS = [
  { value: 5, suffix: "%", label: "de las ventas", sub: "va a infraestructura comunitaria y mujeres rurales" },
  { value: 0, suffix: "", label: "intermediarios", sub: "compramos directo en el campo" },
  { value: 100, suffix: "%", label: "compostable", sub: "empaque kraft + PLA que se reutiliza" },
];

export const Values = () => (
  <section id="valores" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
    <div className="mx-auto max-w-6xl">
      <SectionHeading eyebrow="Nuestros valores" title="Lo que dice la etiqueta es todo lo que hay">
        Somos Clean Label de corazón. Y creemos que un dulce también puede hacerle bien al campo y al planeta.
      </SectionHeading>

      <div className="grid gap-6 md:grid-cols-2">
        {VALUES.map(({ icon: Icon, title, tone, iconTone, items }, i) => (
          <Reveal key={title} delay={i * 120} variant={i === 0 ? "left" : "right"}>
            <article className={`relative h-full overflow-hidden rounded-[2rem] border p-7 sm:p-9 ${tone}`}>
              {i === 0 ? (
                <FreeSeal className="absolute -right-4 -bottom-4 h-28 w-28 rotate-12 opacity-90" />
              ) : (
                <Leaf className="absolute -right-3 -bottom-3 h-28 w-28 opacity-80" />
              )}
              <span className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${iconTone}`}>
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="font-display text-2xl font-semibold text-grape-900 sm:text-3xl">{title}</h3>
              <ul className="relative mt-5 space-y-3 pr-16">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-ink/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal variant="flip" delay={100}>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-grape-600/30 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="group bg-grape-700 px-6 py-8 text-center text-white transition-colors hover:bg-grape-600">
              <p className="font-display text-5xl font-bold text-banana-400 sm:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 font-display text-xl font-semibold">{s.label}</p>
              <p className="mt-2 text-sm text-grape-100">{s.sub}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid items-center gap-8 md:grid-cols-2">
        <Reveal variant="left">
          {/* Foto: Gilmer Diaz Estela en Pexels (licencia Pexels, uso libre) */}
          <PhotoSlot
            label="Foto: agricultora revisando su cultivo de banano"
            src="https://images.pexels.com/photos/27229407/pexels-photo-27229407.jpeg?auto=compress&cs=tinysrgb&w=1200"
            aspect="aspect-[4/5]"
            className="mx-auto max-w-md"
          />
        </Reveal>
        <Reveal variant="right" delay={120}>
          <span className="text-sm font-bold tracking-wider text-leaf-700 uppercase">Del campo a tu billetera</span>
          <h3 className="mt-2 font-display text-3xl font-semibold text-grape-900">Detrás de cada gomita hay una familia</h3>
          <p className="mt-4 text-ink/75">
            Compramos el arándano y el banano directamente a pequeños productores rurales, sin intermediarios. Así el
            precio justo llega a quien siembra y nosotros sabemos de dónde viene cada fruta.
          </p>
          <p className="mt-3 text-ink/75">
            Además, el 5% de lo que vendemos vuelve al campo: caminos, centros de acopio y programas para mujeres
            rurales que están liderando sus fincas y sus comunidades.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);
