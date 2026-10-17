"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { EDITIONS, type Edition, type EditionId } from "@/lib/content";

type StoreValue = {
  activeSeason: Edition | null;
  cartCount: number;
  addToCart: (units: number, label: string) => void;
  selectedEdition: EditionId;
  selectEdition: (id: EditionId) => void;
  notify: (message: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
};

export const StoreProvider = ({
  activeSeasonId,
  children,
}: {
  activeSeasonId: EditionId | null;
  children: React.ReactNode;
}) => {
  const activeSeason = EDITIONS.find((e) => e.id === activeSeasonId) ?? null;
  const [cartCount, setCartCount] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState<EditionId>(activeSeason?.id ?? "clasica");
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const notify = useCallback((message: string) => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message });
    timer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const addToCart = useCallback(
    (units: number, label: string) => {
      setCartCount((c) => c + units);
      notify(`¡Listo! Agregaste ${label} al carrito 🫐`);
    },
    [notify],
  );

  const value = useMemo(
    () => ({
      activeSeason,
      cartCount,
      addToCart,
      selectedEdition,
      selectEdition: setSelectedEdition,
      notify,
    }),
    [activeSeason, cartCount, addToCart, selectedEdition, notify],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 sm:bottom-8">
        {toast && (
          <div
            key={toast.id}
            className="animate-toast-in pointer-events-auto flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white shadow-xl"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-banana-400" />
            {toast.message}
          </div>
        )}
      </div>
    </StoreContext.Provider>
  );
};
