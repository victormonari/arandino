"use client";

import { SEASONAL_EDITIONS } from "@/lib/content";
import { useStore } from "./StoreProvider";
import { PhotoSlot, Reveal, SectionHeading, btn } from "./ui";

export const Seasons = () => {
  const { activeSeason, selectEdition } = useStore();

  return (
    <section id="temporadas" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Ediciones de temporada" title="Una billetera para cada temporada">
          La misma gomita crocante de arándano y banano, con una billetera diseñada para cada fecha. Ediciones limitadas
          para regalar y coleccionar.
        </SectionHeading>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SEASONAL_EDITIONS.map((ed, i) => {
            const inSeason = ed.id === activeSeason?.id;
            return (
              <Reveal key={ed.id} delay={i * 150} variant="flip" className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <article
                  className={`relative mx-auto flex h-full max-w-md flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:max-w-none ${
                    inSeason ? `ring-4 ${ed.ring}` : "ring-1 ring-grape-100"
                  }`}
                >
                  <div className={`h-2 ${ed.accent}`} />
                  <div className={`p-4 ${ed.accentSoft}`}>
                    <PhotoSlot label={ed.photo} src={ed.image} aspect="aspect-[4/3]" className="bg-white/60" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-leaf-600 px-3 py-1 text-xs font-bold text-white">
                        {inSeason ? "Temporada actual" : "Disponible ahora"}
                      </span>
                      <span className="rounded-full bg-grape-100 px-3 py-1 text-xs font-bold text-grape-700">
                        Edición limitada
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-grape-900">
                      {ed.name} {ed.emoji}
                    </h3>
                    <p className="text-xs font-bold tracking-wider text-ink/50 uppercase">{ed.monthLabel}</p>
                    <p className="mt-3 flex-1 text-ink/75">{ed.line}</p>
                    <a
                      href="#comprar"
                      onClick={() => selectEdition(ed.id)}
                      className={`${inSeason ? btn.primary : btn.secondary} mt-6 w-full`}
                    >
                      Comprar esta edición
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
