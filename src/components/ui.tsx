import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Modal, Parallax, Reveal, ScrollProgress } from "./client-ui";

export { Modal, Parallax, Reveal, ScrollProgress };

// Espacio reservado para las fotos reales del producto. Reemplazar por <Image /> cuando lleguen.
export const PhotoSlot = ({
  label,
  src,
  aspect = "aspect-square",
  className = "",
  tone = "light",
  priority = false,
  imgClassName = "object-cover",
}: {
  label: string;
  src?: string;
  aspect?: string;
  className?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  imgClassName?: string;
}) => {
  if (src) {
    return (
      <div className={`group/photo relative ${aspect} w-full overflow-hidden rounded-3xl bg-white ${className}`}>
        <Image
          src={src}
          alt={label.replace(/^Foto:\s*/, "")}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className={`${imgClassName} transition-transform duration-700 ease-out group-hover/photo:scale-105`}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex ${aspect} w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed ${
        tone === "dark" ? "border-white/40 bg-white/10 text-white/80" : "border-grape-300 bg-grape-50/70 text-grape-500"
      } ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon className="h-8 w-8 opacity-70" />
        <span className="font-display text-sm font-medium sm:text-base">{label}</span>
      </div>
    </div>
  );
};

export const SectionHeading = ({
  eyebrow,
  title,
  children,
  center = true,
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  center?: boolean;
  light?: boolean;
}) => (
  <Reveal variant="zoom" className={`mx-auto mb-10 max-w-2xl sm:mb-14 ${center ? "text-center" : ""}`}>
    {eyebrow && (
      <span
        className={`mb-3 inline-block rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase ${
          light ? "bg-white/15 text-banana-300" : "bg-grape-100 text-grape-700"
        }`}
      >
        {eyebrow}
      </span>
    )}
    <h2
      className={`font-display text-3xl leading-tight font-semibold sm:text-5xl ${light ? "text-white" : "text-grape-900"}`}
    >
      {title}
    </h2>
    {children && (
      <p className={`mt-4 text-base sm:text-lg ${light ? "text-grape-100" : "text-ink/70"}`}>{children}</p>
    )}
  </Reveal>
);

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50";

export const btn = {
  primary: `${base} bg-grape-600 text-white shadow-lg shadow-grape-600/25 hover:-translate-y-0.5 hover:bg-grape-700 hover:shadow-xl hover:shadow-grape-600/30 focus-visible:ring-grape-300 active:translate-y-0`,
  secondary: `${base} border-2 border-grape-600 text-grape-700 hover:-translate-y-0.5 hover:bg-grape-600 hover:text-white focus-visible:ring-grape-200 active:translate-y-0`,
  light: `${base} bg-white text-grape-700 shadow-lg hover:-translate-y-0.5 hover:bg-banana-300 focus-visible:ring-white/60`,
};

export const inputClass =
  "w-full rounded-2xl border-2 border-grape-100 bg-white px-4 py-3 text-ink placeholder:text-ink/40 transition focus:border-grape-400 focus:outline-none focus:ring-4 focus:ring-grape-100";

export const Stars = ({ value, className = "h-4 w-4" }: { value: number; className?: string }) => (
  <div className="flex gap-0.5" aria-label={`${value} de 5 estrellas`}>
    {[1, 2, 3, 4, 5].map((i) => {
      const fill = Math.max(0, Math.min(1, value - (i - 1)));
      return (
        <span key={i} className="relative inline-block">
          <svg viewBox="0 0 24 24" className={`${className} text-banana-200`} fill="currentColor" aria-hidden>
            <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
          </svg>
          <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
            <svg viewBox="0 0 24 24" className={`${className} text-banana-500`} fill="currentColor" aria-hidden>
              <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
            </svg>
          </span>
        </span>
      );
    })}
  </div>
);

// Formas de fruta decorativas (sin fotos)
export const Blueberry = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
    <circle cx="32" cy="34" r="26" fill="#5b2d91" />
    <circle cx="24" cy="26" r="7" fill="#8c5cc7" opacity="0.6" />
    <path d="M32 8l3 6 6-1-4 5 4 5-6-1-3 6-3-6-6 1 4-5-4-5 6 1z" fill="#2e1649" transform="translate(0 -2) scale(1)" />
  </svg>
);

export const Banana = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
    <path
      d="M10 18c4 22 22 36 44 32 3-1 4-4 1-5-18 3-31-8-37-28-1-4-9-3-8 1z"
      fill="#ffd43b"
      stroke="#e0a800"
      strokeWidth="2"
    />
    <path d="M10 18l-3-6 6 2z" fill="#6b4f1d" />
  </svg>
);

export const Leaf = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
    <path d="M8 56C8 26 28 8 58 6c-2 30-20 50-50 50z" fill="#2fa35a" />
    <path d="M10 54C24 40 36 28 52 12" stroke="#d5f5df" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

// Sello verde propio: "Libre de sellos" (un octágono tachado, guiño a los sellos de advertencia)
export const FreeSeal = ({ className = "h-24 w-24" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Sello Libre de sellos">
    <defs>
      <linearGradient id="free-seal-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2fa35a" />
        <stop offset="1" stopColor="#1d6b3c" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="57" fill="url(#free-seal-bg)" />
    <circle cx="60" cy="60" r="50" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.2" />
    <path
      d="M54 22h12l8.5 8.5v12L66 51H54l-8.5-8.5v-12z"
      fill="none"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M48 48l24-24" stroke="#ffd43b" strokeWidth="4.5" strokeLinecap="round" />
    <g fill="#ffffff" textAnchor="middle" style={{ fontFamily: "var(--font-fredoka), ui-rounded, sans-serif" }}>
      <text x="60" y="73" fontSize="10.5" fontWeight="500" letterSpacing="2" fillOpacity="0.85">
        LIBRE DE
      </text>
      <text x="60" y="92" fontSize="20" fontWeight="700" letterSpacing="0.5">
        SELLOS
      </text>
    </g>
  </svg>
);

// Campo oculto para frenar bots; las personas nunca lo ven ni lo llenan
export const Honeypot = () => (
  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
);

export const FormError = ({ message, light = false }: { message: string | null; light?: boolean }) =>
  message ? (
    <p role="alert" className={`text-sm font-semibold ${light ? "text-red-300" : "text-red-600"}`}>
      {message}
    </p>
  ) : null;
