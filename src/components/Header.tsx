"use client";

import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { useStore } from "./StoreProvider";
import { ScrollProgress, btn } from "./ui";

export const Logo = ({ light = false }: { light?: boolean }) => (
  <a href="#inicio" className="flex min-w-0 items-center gap-1.5 sm:gap-2" aria-label="Arándino, ir al inicio">
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-grape-600 shadow-md sm:h-9 sm:w-9">
      <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-banana-400" />
      <span className="font-display text-lg font-bold text-white">A</span>
    </span>
    <span className={`font-display text-lg font-bold tracking-tight min-[360px]:text-xl sm:text-2xl ${light ? "text-white" : "text-grape-800"}`}>
      Arándino
    </span>
  </a>
);

export const Header = () => {
  const { activeSeason, cartCount } = useStore();
  const [bannerOpen, setBannerOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pequeño rebote del carrito cuando cambia el contador
  useEffect(() => {
    if (cartCount === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [cartCount]);

  return (
    <header className="sticky top-0 z-50">
      {activeSeason && bannerOpen && (
        <div className="relative bg-ink px-10 py-2 text-center text-sm text-white">
          <a href="#temporadas" className="font-semibold underline-offset-4 hover:underline">
            Llegó la edición {activeSeason.name} {activeSeason.emoji}
            <span className="text-banana-300"> · Edición limitada</span>
          </a>
          <button
            onClick={() => setBannerOpen(false)}
            aria-label="Cerrar aviso de temporada"
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <nav
        className={`relative border-b transition-all duration-300 ${
          scrolled ? "border-grape-100 bg-cream/90 shadow-sm backdrop-blur-md" : "border-transparent bg-cream"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:h-20 sm:px-6">
          <Logo />

          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-semibold text-ink/75 transition hover:text-grape-600"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <a
              href="#comprar"
              aria-label={`Carrito, ${cartCount} productos`}
              className={`relative rounded-full p-2 text-grape-700 transition hover:bg-grape-100 sm:p-2.5 ${bump ? "scale-125" : "scale-100"}`}
            >
              <ShoppingBag className="h-6 w-6" />
              <span
                className={`absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${
                  cartCount > 0 ? "bg-banana-400 text-ink" : "bg-grape-100 text-grape-600"
                }`}
              >
                {cartCount}
              </span>
            </a>
            <a href="#comprar" className={`${btn.primary} hidden !px-5 !py-2.5 sm:inline-flex`}>
              Comprar
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              className="rounded-full p-2 text-grape-700 transition hover:bg-grape-100 sm:p-2.5 lg:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-grape-100 bg-cream px-4 pb-6 lg:hidden">
            <ul className="flex flex-col py-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 font-display text-lg font-medium text-grape-900 hover:bg-grape-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#comprar" onClick={() => setMenuOpen(false)} className={`${btn.primary} w-full`}>
              Comprar
            </a>
          </div>
        )}
        <ScrollProgress />
      </nav>
    </header>
  );
};
