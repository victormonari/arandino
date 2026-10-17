import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arándino · La billetera de gomitas crocantes",
  description:
    "Gomitas crocantes 100% de fruta real: arándano + banano, sin azúcar añadida, libres de sellos y en un empaque que se queda contigo como billetera.",
  openGraph: {
    title: "Arándino · La billetera de gomitas crocantes",
    description: "Te comes las gomitas y te quedas con la billetera.",
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#66339e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO">
      <body className={`${fredoka.variable} ${nunito.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
