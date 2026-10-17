import { Closing, FAQ, Footer } from "@/components/Closing";
import { Features } from "@/components/Features";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Purchase } from "@/components/Purchase";
import { Reviews } from "@/components/Reviews";
import { Seasons } from "@/components/Seasons";
import { StoreProvider } from "@/components/StoreProvider";
import { Values } from "@/components/Values";
import { WhatsAppFloat } from "@/components/WhatsApp";
import { WhyArandino } from "@/components/WhyArandino";
import { getActiveSeason } from "@/lib/content";

// La temporada activa se recalcula cada hora para que cambie sola de mes a mes
export const revalidate = 3600;

export default function Home() {
  const activeSeason = getActiveSeason();

  return (
    <StoreProvider activeSeasonId={activeSeason?.id ?? null}>
      <Header />
      <main>
        <Hero />
        <Mission />
        <Values />
        <Features />
        <WhyArandino />
        <Seasons />
        <Reviews />
        <Purchase />
        <FAQ />
        <Closing />
      </main>
      <Footer />
      <WhatsAppFloat />
    </StoreProvider>
  );
}
