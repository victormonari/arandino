"use client";

import { useState } from "react";
import { PenLine, Quote } from "lucide-react";
import { RATING, REVIEWS } from "@/lib/content";
import { useStore } from "./StoreProvider";
import { useSubmitForm } from "@/lib/submit-form";
import { FormError, Honeypot, Modal, Reveal, SectionHeading, Stars, btn, inputClass } from "./ui";

const ReviewForm = ({ onDone }: { onDone: () => void }) => {
  const { notify } = useStore();
  const [stars, setStars] = useState(5);
  const { submit, sending, error } = useSubmitForm("resena");
  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (await submit(e.currentTarget, { estrellas: String(stars) })) {
          notify("¡Gracias por tu reseña! La publicamos después de revisarla");
          onDone();
        }
      }}
    >
      <div className="flex justify-center gap-1 py-2" role="radiogroup" aria-label="Tu calificación">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={stars === n}
            aria-label={`${n} estrellas`}
            onClick={() => setStars(n)}
            className={`text-4xl transition hover:scale-110 ${n <= stars ? "text-banana-500" : "text-banana-200"}`}
          >
            ★
          </button>
        ))}
      </div>
      <input required name="nombre" placeholder="Tu nombre" className={inputClass} autoComplete="name" />
      <input required name="ciudad" placeholder="Tu ciudad" className={inputClass} autoComplete="address-level2" />
      <textarea required name="comentario" rows={4} maxLength={1500} placeholder="¿Qué tal te pareció?" className={inputClass} />
      <Honeypot />
      <FormError message={error} />
      <button type="submit" disabled={sending} className={`${btn.primary} w-full`}>
        {sending ? "Enviando…" : "Publicar reseña"}
      </button>
    </form>
  );
};

export const Reviews = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="resenas" className="bg-grape-800 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Reseñas" title="Lo que dicen quienes ya crujen" light />

        <Reveal className="mb-12 flex flex-col items-center gap-2 text-center">
          <p className="font-display text-7xl font-bold text-white">
            {RATING.average.toLocaleString("es-CO")}
            <span className="text-3xl text-grape-200"> de 5</span>
          </p>
          <Stars value={RATING.average} className="h-7 w-7" />
          <p className="text-sm text-grape-200">{RATING.count.toLocaleString("es-CO")} reseñas verificadas</p>
        </Reveal>

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 100} className="w-[82%] shrink-0 snap-center sm:w-[60%] md:w-auto">
              <figure className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <Stars value={r.stars} />
                  <Quote className="h-6 w-6 text-grape-200" />
                </div>
                <blockquote className="mt-4 flex-1 text-ink/80">“{r.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-banana-300 font-display font-bold text-grape-800">
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-display font-semibold text-grape-900">{r.name}</span>
                    <span className="text-sm text-ink/55">{r.city}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <button onClick={() => setFormOpen(true)} className={btn.light}>
            <PenLine className="h-5 w-5" /> Escribe tu reseña
          </button>
        </Reveal>
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Escribe tu reseña">
        <ReviewForm onDone={() => setFormOpen(false)} />
      </Modal>
    </section>
  );
};
