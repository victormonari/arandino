import { FlaskConical, Lightbulb, Rocket, Telescope } from "lucide-react";
import { Reveal } from "./ui";

const PILLARS = [
  { icon: Rocket, title: "Pioneros", text: "Abrimos una categoría que no existía: dulce de fruta real que cruje." },
  { icon: FlaskConical, title: "Investigamos", text: "Probamos, medimos y volvemos a probar hasta que la fruta hable sola." },
  { icon: Lightbulb, title: "Innovamos", text: "De la liofilización al empaque billetera: cada detalle tiene una idea." },
];

export const Mission = () => (
  <section id="mision" className="px-4 py-20 sm:px-6 sm:py-28">
    <div className="mx-auto max-w-5xl">
      <Reveal className="text-center">
        <span className="mb-3 inline-block rounded-full bg-grape-100 px-4 py-1 text-xs font-bold tracking-wider text-grape-700 uppercase">
          Nuestra misión
        </span>
        <h2 className="font-display text-4xl leading-tight font-bold text-grape-900 sm:text-6xl">
          Revolucionamos el dulce
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
          Juntamos ciencia, nutrición limpia y mucho respeto por la fruta real.
        </p>
      </Reveal>

      <Reveal variant="zoom" delay={100}>
        <blockquote className="relative mx-auto mt-10 max-w-3xl rounded-[2rem] bg-grape-700 px-6 py-10 text-center text-white shadow-2xl shadow-grape-300 sm:px-12 sm:py-14">
          <span className="absolute top-2 left-5 font-display text-7xl leading-none text-banana-400 sm:text-8xl" aria-hidden>
            “
          </span>
          <p className="relative font-display text-xl leading-relaxed sm:text-2xl">
            Transformar el consumo de confitería mediante la investigación alimentaria y el desarrollo tecnológico,
            ofreciendo gomitas crocantes 100% de fruta real sin azúcares añadidos, garantizando la salud del consumidor
            y la sostenibilidad del empaque.
          </p>
        </blockquote>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 120}>
            <div className="group h-full rounded-3xl border border-grape-100 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-banana-200 text-grape-700 transition group-hover:rotate-6 group-hover:bg-banana-300">
                <Icon className="h-8 w-8" />
              </span>
              <h3 className="font-display text-xl font-semibold text-grape-900">{title}</h3>
              <p className="mt-2 text-sm text-ink/70">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150}>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-3xl bg-kraft/70 p-6 text-center sm:flex-row sm:text-left">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-grape-600">
            <Telescope className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-sm font-semibold tracking-wider text-grape-700 uppercase">Visión 2030</p>
            <p className="mt-1 text-sm text-ink/80 sm:text-base">
              Ser reconocidos para el 2030 como la marca líder en confitería saludable premium e innovadora en América
              Latina, el referente de snacks Clean Label y empaques circulares reutilizables.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
