import { Leaf as LeafIcon, Package, ShieldCheck, Truck } from "lucide-react";
import { Banana, Blueberry, FreeSeal, Parallax, PhotoSlot, Reveal, btn } from "./ui";

const TRUST = [
  { icon: Package, label: "Sin azúcar añadida" },
  { icon: ShieldCheck, label: "Libre de sellos" },
  { icon: LeafIcon, label: "Empaque compostable" },
  { icon: Truck, label: "Envíos a toda Colombia" },
];

// Fruta decorativa que flota de fondo
const PARTICLES = [
  { kind: "berry", className: "top-[12%] left-[6%] h-8 w-8", delay: "0s" },
  { kind: "banana", className: "top-[30%] left-[44%] h-10 w-10", delay: "2s" },
  { kind: "berry", className: "bottom-[18%] left-[38%] h-6 w-6", delay: "4s" },
  { kind: "berry", className: "top-[8%] right-[38%] h-5 w-5", delay: "1s" },
  { kind: "banana", className: "bottom-[10%] left-[4%] h-9 w-9", delay: "3s" },
  { kind: "berry", className: "bottom-[30%] right-[4%] h-7 w-7", delay: "5s" },
] as const;

const TITLE = "Arándino";

export const Hero = () => (
  <section id="inicio" className="relative overflow-hidden">
    <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-grape-200/60 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-banana-200/70 blur-3xl" />
    {PARTICLES.map((p, i) => {
      const Shape = p.kind === "berry" ? Blueberry : Banana;
      return (
        <Shape
          key={i}
          className={`animate-drift pointer-events-none absolute opacity-25 ${p.className}`}
          style={{ animationDelay: p.delay }}
        />
      );
    })}

    <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-2 md:pt-16 md:pb-20">
      <Reveal variant="left" className="order-2 text-center md:order-1 md:text-left">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-leaf-100 px-4 py-1.5 text-sm font-bold text-leaf-700">
          <span className="h-2 w-2 rounded-full bg-leaf-500" /> 100% fruta real liofilizada
        </span>
        <h1 className="font-display text-6xl leading-none font-bold text-grape-700 sm:text-7xl lg:text-8xl">
          <span className="sr-only">{TITLE}</span>
          <span aria-hidden className="inline-flex">
            {TITLE.split("").map((char, i) => (
              <span
                key={i}
                className="animate-pop-in inline-block transition-transform duration-200 hover:-translate-y-2 hover:text-grape-500"
                style={{ animationDelay: `${150 + i * 70}ms` }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>
        <p className="mt-4 font-display text-2xl font-medium text-grape-900 sm:text-3xl">
          La billetera de gomitas crocantes
        </p>
        <p className="mt-3 text-base font-semibold text-ink/65 sm:text-lg">
          Arándano + banano · sin azúcar añadida · libre de sellos
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
          <a href="#comprar" className={btn.primary}>
            Comprar ahora
          </a>
          <a href="#producto" className={btn.secondary}>
            Conoce la billetera
          </a>
        </div>
      </Reveal>

      <Reveal variant="right" className="relative order-1 md:order-2" delay={150}>
        <Parallax speed={-0.08}>
        <Blueberry className="animate-float absolute -top-4 -left-2 z-10 h-14 w-14 sm:h-20 sm:w-20" />
        <Banana className="animate-float absolute -right-2 -bottom-6 z-10 h-16 w-16 [animation-delay:1.5s] sm:h-24 sm:w-24" />
        <div className="animate-wiggle absolute -top-5 -right-3 z-10 rotate-12 sm:-right-6">
          <FreeSeal className="h-20 w-20 drop-shadow-lg sm:h-28 sm:w-28" />
        </div>
        <PhotoSlot
          label="Foto: billetera Arándino cerrada y sus 3 porciones"
          src="/images/billetera-porciones.jpg"
          aspect="aspect-[4/3]"
          priority
          className="shadow-xl shadow-grape-200"
        />
        </Parallax>
      </Reveal>
    </div>

    <div className="overflow-hidden border-y border-grape-100 bg-white/70 py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      {/* Se duplica la lista para que el desplazamiento sea continuo */}
      <ul className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {[...TRUST, ...TRUST].map(({ icon: Icon, label }, i) => (
          <li
            key={i}
            aria-hidden={i >= TRUST.length}
            className="flex shrink-0 items-center gap-2 px-6 text-sm font-bold text-grape-800 sm:px-10"
          >
            <Icon className="h-5 w-5 text-leaf-600" />
            {label}
            <span className="ml-6 h-1.5 w-1.5 rounded-full bg-banana-400 sm:ml-10" />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
