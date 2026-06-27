import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Services } from "@/components/site/services";
import { WhyChooseUs } from "@/components/site/why-choose-us";
import { About } from "@/components/site/about";
import { Process } from "@/components/site/process";
import { Products } from "@/components/site/products";
import { Team } from "@/components/site/team";
import { Testimonials } from "@/components/site/testimonials";
import { Booking } from "@/components/site/booking";
import { FAQ } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { Chatbot } from "@/components/site/chatbot";
import { FloatingButtons } from "@/components/site/floating-buttons";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Services />
        <WhyChooseUs />
        <About />
        <Process />
        <Products />
        <Team />
        <Testimonials />
        <Booking />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <FloatingButtons />
    </div>
  );
}
