"use client";

import { useState } from "react";
import { Camera, ChevronDown, Music2, Play, ThumbsUp } from "lucide-react";
import { FAQS, NAV_LINKS } from "@/lib/content";
import { Logo } from "./Header";
import { useStore } from "./StoreProvider";
import { useSubmitForm } from "@/lib/submit-form";
import { Banana, Blueberry, FormError, Honeypot, Leaf, Parallax, Reveal, SectionHeading, btn } from "./ui";

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Lo que todo el mundo nos pregunta" />
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`rounded-3xl border-2 transition ${isOpen ? "border-grape-300 bg-grape-50" : "border-grape-100"}`}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg font-semibold text-grape-900 sm:px-6"
                    >
                      {f.q}
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-grape-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-ink/75 sm:px-6">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Closing = () => (
  <section className="relative overflow-hidden bg-grape-700 px-4 py-24 text-center sm:px-6 sm:py-32">
    <Parallax speed={0.35} className="absolute top-10 left-[8%]">
      <Blueberry className="animate-float h-16 w-16 opacity-80" />
    </Parallax>
    <Parallax speed={-0.3} className="absolute right-[8%] bottom-10">
      <Banana className="animate-float h-20 w-20 opacity-80 [animation-delay:2s]" />
    </Parallax>
    <Parallax speed={0.2} className="absolute top-16 right-[15%] hidden sm:block">
      <Leaf className="animate-float h-12 w-12 opacity-70 [animation-delay:1s]" />
    </Parallax>
    <Reveal variant="zoom" className="relative mx-auto max-w-3xl">
      <h2 className="font-display text-4xl leading-tight font-bold text-white sm:text-6xl">Arándino no se bota.</h2>
      <p className="mt-4 font-display text-2xl text-banana-300 sm:text-3xl">
        Te comes las gomitas y te quedas con la billetera.
      </p>
      <a href="#comprar" className={`${btn.light} mt-10 !px-10 !py-4 text-lg`}>
        Comprar ahora
      </a>
    </Reveal>
  </section>
);

const SOCIAL = [
  { icon: Camera, label: "Instagram", href: "https://instagram.com" },
  { icon: Music2, label: "TikTok", href: "https://tiktok.com" },
  { icon: ThumbsUp, label: "Facebook", href: "https://facebook.com" },
  { icon: Play, label: "YouTube", href: "https://youtube.com" },
];

export const Footer = () => {
  const { notify } = useStore();
  const [email, setEmail] = useState("");
  const { submit, sending, error } = useSubmitForm("boletin");

  return (
    <footer className="bg-ink px-4 pt-16 pb-28 text-white sm:px-6 sm:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_1.4fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Gomitas crocantes 100% de fruta real. Sin azúcar añadida, libres de sellos y con un empaque que se queda
            contigo.
          </p>
          <ul className="mt-6 flex gap-2">
            {SOCIAL.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-grape-500"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Pie de página">
          <p className="font-display font-semibold text-banana-300">Explora</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
            {[...NAV_LINKS, { href: "#comprar", label: "Comprar" }, { href: "#faq", label: "Preguntas frecuentes" }].map(
              (l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/70 transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div>
          <p className="font-display font-semibold text-banana-300">Únete al combo crocante</p>
          <p className="mt-2 text-sm text-white/60">Lanzamientos, ediciones de temporada y descuentos. Nada de spam.</p>
          <form
            className="mt-4 flex flex-col gap-2 sm:flex-row"
            onSubmit={async (e) => {
              e.preventDefault();
              if (await submit(e.currentTarget)) {
                notify("¡Listo! Ya estás suscrito al boletín 💜");
                setEmail("");
              }
            }}
          >
            <label htmlFor="newsletter" className="sr-only">
              Correo
            </label>
            <input
              id="newsletter"
              name="correo"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              autoComplete="email"
              className="min-w-0 flex-1 rounded-full border-2 border-white/15 bg-white/5 px-5 py-3 text-white placeholder:text-white/40 focus:border-grape-400 focus:outline-none"
            />
            <Honeypot />
            <button type="submit" disabled={sending} className={`${btn.primary} !bg-grape-500 hover:!bg-grape-400`}>
              {sending ? "Enviando…" : "Suscribirme"}
            </button>
          </form>
          <div className="mt-2">
            <FormError message={error} light />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
        <p>© {new Date().getFullYear()} Arándino. Todos los derechos reservados.</p>
        <p className="font-semibold text-white/70">Hecho en Colombia 🇨🇴</p>
      </div>
    </footer>
  );
};
