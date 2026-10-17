"use client";

import { useState } from "react";
import { CreditCard, Landmark, Minus, Plus, ShoppingBag, Smartphone, Truck, Wallet } from "lucide-react";
import {
  BASE_PRICE,
  EDITIONS,
  PACKS,
  formatCOP,
  whatsappLink,
  type PackId,
} from "@/lib/content";
import { useStore } from "./StoreProvider";
import { FreeSeal, PhotoSlot, Reveal, SectionHeading, btn } from "./ui";
import { WhatsAppIcon } from "./WhatsApp";

const PAYMENTS = [
  { icon: CreditCard, label: "Tarjeta" },
  { icon: Landmark, label: "PSE" },
  { icon: Smartphone, label: "Nequi" },
  { icon: Wallet, label: "Daviplata" },
];

export const Purchase = () => {
  const { activeSeason, addToCart, selectedEdition, selectEdition } = useStore();
  const [packId, setPackId] = useState<PackId>("1");
  const [qty, setQty] = useState(1);

  const pack = PACKS.find((p) => p.id === packId)!;
  const edition = EDITIONS.find((e) => e.id === selectedEdition)!;
  const packPrice = Math.round((BASE_PRICE * pack.units * (1 - pack.discount)) / 100) * 100;
  const total = packPrice * qty;
  const units = pack.units * qty;
  const label = `${units} ${units === 1 ? "billetera" : "billeteras"} ${edition.name}`;

  const orderMessage = [
    "¡Hola Arándino! 🫐🍌 Quiero hacer este pedido:",
    `• Producto: Billetera Arándino (3 porciones de 10 g)`,
    `• Edición: ${edition.name}`,
    `• Pack: ${pack.label} × ${qty} (${units} ${units === 1 ? "billetera" : "billeteras"})`,
    `• Total: ${formatCOP(total)}`,
    "¿Me confirmas el envío y el medio de pago?",
  ].join("\n");

  return (
    <section id="comprar" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Compra" title="Llévate tu billetera">
          Elige tu pack y tu edición. Te la enviamos a cualquier rincón de Colombia.
        </SectionHeading>

        <Reveal variant="zoom">
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-grape-100 md:grid-cols-2">
            <div className={`relative p-5 sm:p-8 ${edition.accentSoft}`}>
              <FreeSeal className="absolute top-8 right-8 z-10 h-16 w-16 rotate-12 sm:h-20 sm:w-20" />
              <PhotoSlot
                key={edition.id}
                label={edition.photo}
                src={edition.image}
                aspect="aspect-square" className="animate-toast-in bg-white/70" />
            </div>

            <div className="flex flex-col p-6 sm:p-10">
              <h3 className="font-display text-2xl leading-tight font-semibold text-grape-900 sm:text-3xl">
                Billetera Arándino <span className="text-ink/60">(3 porciones de 10 g)</span>
              </h3>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-grape-700">{formatCOP(total)}</span>
                {pack.discount > 0 && (
                  <span className="text-lg text-ink/40 line-through">{formatCOP(BASE_PRICE * pack.units * qty)}</span>
                )}
              </div>
              <p className="text-sm text-ink/55">{formatCOP(BASE_PRICE)} por billetera · IVA incluido</p>

              <fieldset className="mt-7">
                <legend className="mb-3 text-sm font-bold text-ink/70">Pack</legend>
                <div className="grid grid-cols-3 gap-2">
                  {PACKS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPackId(p.id)}
                      aria-pressed={packId === p.id}
                      className={`relative rounded-2xl border-2 px-2 py-3 text-center transition ${
                        packId === p.id
                          ? "border-grape-600 bg-grape-50"
                          : "border-grape-100 hover:border-grape-300"
                      }`}
                    >
                      {p.discount > 0 && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-banana-400 px-2 py-0.5 text-[11px] font-bold whitespace-nowrap text-ink">
                          -{p.discount * 100}%
                        </span>
                      )}
                      <span className="block font-display text-xl font-semibold text-grape-900">{p.units}</span>
                      <span className="text-xs text-ink/60">{p.units === 1 ? "billetera" : "billeteras"}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="mb-3 text-sm font-bold text-ink/70">Edición</legend>
                <div className="grid grid-cols-2 gap-2">
                  {EDITIONS.map((ed) => {
                    const active = selectedEdition === ed.id;
                    const inSeason = ed.id === activeSeason?.id;
                    return (
                      <button
                        key={ed.id}
                        onClick={() => selectEdition(ed.id)}
                        aria-pressed={active}
                        className={`flex items-center justify-between gap-2 rounded-2xl border-2 px-3 py-2.5 text-left text-sm font-semibold transition ${
                          active
                            ? "border-grape-600 bg-grape-50 text-grape-900"
                            : "border-grape-100 text-ink/80 hover:border-grape-300"
                        }`}
                      >
                        <span>
                          {ed.emoji} {ed.name}
                        </span>
                        {inSeason && (
                          <span className="shrink-0 rounded-full bg-leaf-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            Temporada
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-bold text-ink/70">Cantidad</span>
                <div className="flex items-center rounded-full border-2 border-grape-100">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Quitar uno"
                    className="rounded-full p-2.5 text-grape-700 transition hover:bg-grape-50 disabled:opacity-30"
                    disabled={qty === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-display text-lg font-semibold" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    aria-label="Agregar uno"
                    className="rounded-full p-2.5 text-grape-700 transition hover:bg-grape-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button onClick={() => addToCart(units, label)} className={`${btn.primary} !py-4 text-lg`}>
                  <ShoppingBag className="h-5 w-5" /> Agregar al carrito
                </button>
                <a
                  href={whatsappLink(orderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn.secondary} !py-4 text-lg`}
                >
                  Comprar ahora
                </a>
              </div>

              <div className="mt-8 space-y-4 border-t border-grape-100 pt-6">
                <ul className="flex flex-wrap gap-2">
                  {PAYMENTS.map(({ icon: Icon, label: l }) => (
                    <li
                      key={l}
                      className="flex items-center gap-1.5 rounded-full bg-grape-50 px-3 py-1.5 text-xs font-bold text-grape-800"
                    >
                      <Icon className="h-4 w-4" /> {l}
                    </li>
                  ))}
                </ul>
                <p className="flex items-center gap-2 text-sm font-semibold text-ink/70">
                  <Truck className="h-5 w-5 text-leaf-600" /> Envíos a toda Colombia
                </p>
                <a
                  href={whatsappLink(orderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-display font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1ebe5b] hover:shadow-lg"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Pedir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
