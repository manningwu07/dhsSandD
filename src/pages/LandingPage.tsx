import LandingCard from "~/components/card/LandingCard";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import Description from "~/components/sections/Description";
import Hero from "~/components/sections/Hero";

interface CarouselImage {
  src: string;
  alt: string;
  header: string;
  description: string;
}

const images: CarouselImage[] = [
  {
    src: "/Landing/Display/DefaultPhoto.png",
    alt: "Test alt",
    header: "header 1",
    description: "desc 1",
  },
  {
    src: "/Landing/Display/One.png",
    alt: "Test alt",
    header: "header 2",
    description: "desc 2",
  },
  {
    src: "/Landing/Display/Two.png",
    alt: "Test alt",
    header: "header 3",
    description: "desc 3",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <div className="absolute inset-0 -z-40 bg-black opacity-40" />

      <Navbar />

      <div className="relative z-10 mx-2 flex flex-col items-center px-4 py-12 sm:mx-4 md:mx-6 lg:mx-8 2xl:mx-10">
        <Hero />

        <div className="my-20 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8 2xl:gap-12">
          <LandingCard
            src={"/Landing/test1.png"}
            alt={"Test alt"}
            header={"Schedule"}
            description={"Check out the events we have coming up!"}
            link={"/"}
          />
          <LandingCard
            src={""}
            alt={""}
            header={"Tournument Sign Ups"}
            description={"Join our tournaments!"}
            link={"/"}
          />
          <LandingCard
            src={""}
            alt={""}
            header={"Parent information"}
            description={"Information for parents!"}
            link={"/"}
          />
        </div>
        <div className="container mx-auto p-8">
          <Description images={images} />
        </div>
        <div>
          {/* Build some sort of welcome section that introduces speech and debate, etc.  */}
        </div>

        <div>
          {/* They might not need this section, since it doesnt serve a purpose lmao */}
          {/* <InstagramFeed /> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
