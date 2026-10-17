"use client";

import { useState } from "react";
import type { FormType } from "./emails";

// Envía un formulario a /api/contact y expone el estado para la UI
export const useSubmitForm = (type: FormType) => {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (form: HTMLFormElement, extra: Record<string, string> = {}) => {
    const entries = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const { website = "", ...data } = { ...entries, ...extra };
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data, website }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "No pudimos enviar tu mensaje. Intenta de nuevo.");
      }
      setStatus("idle");
      return true;
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "No pudimos enviar tu mensaje. Intenta de nuevo.");
      return false;
    }
  };

  return { submit, sending: status === "sending", error };
};
