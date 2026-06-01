import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import About from "@/components/About";
import Services from "@/components/Services";
import FinishingSystems from "@/components/FinishingSystems";
import WhyCedar from "@/components/WhyCedar";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <StatsCounter />
        <Services />
        <FinishingSystems />
        <WhyCedar />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
