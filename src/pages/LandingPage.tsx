import LandingCard from "~/components/card/LandingCard";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import Description from "~/components/sections/Description";
import Hero from "~/components/sections/Hero";
import content from "../content.json";

interface CarouselImage {
  src: string;
  alt: string;
  header: string;
  description: string;
}

const cards = content.pages.landing.card;
const descriptionCards: CarouselImage[] = content.components.description.card;

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <div className="absolute inset-0 -z-40 bg-black opacity-40" />

      <Navbar />

      <div className="relative z-10 mx-2 flex flex-col items-center px-4 py-12 sm:mx-4 md:mx-6 lg:mx-8 2xl:mx-10">
        <Hero />

        <div className="my-20 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8 2xl:gap-12">
          {cards.map((card, index) => (
            <LandingCard
              key={index}
              src={card.src || "/placeholder.svg"}
              alt={card.header}
              header={card.header}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
        <div className="container mx-auto p-8">
          <Description images={descriptionCards} />
        </div>
        <div>
          {/* Build some sort of welcome section that introduces speech and debate, etc.  */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
