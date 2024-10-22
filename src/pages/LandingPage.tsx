import Image from "next/image";
import LandingCard from "~/components/card/LandingCard";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import Hero from "~/components/sections/Hero";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background Image */}
      <Image
        src="/Background.webp"
        alt="School building at sunset"
        layout="fill"
        objectFit="cover"
        className="h-full w-full inset-0 -z-50 bg-center"
      />
      <div className="absolute inset-0 -z-40 bg-black opacity-40" />

      <Navbar />

      <div className="relative z-10 mx-2 flex flex-col items-center px-4 py-12 sm:mx-4 md:mx-6 lg:mx-8 2xl:mx-10">
        <Hero />

        <div className="my-20 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8 2xl:gap-12">
          <LandingCard
            src={"/Landing/test1.png"}
            alt={"Test alt"}
            header={"test"}
            description={"test"}
            link={"/"}
          />
          <LandingCard
            src={""}
            alt={""}
            header={""}
            description={""}
            link={""}
          />
          <LandingCard
            src={""}
            alt={""}
            header={""}
            description={""}
            link={""}
          />
        </div>

        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Speech and Debate team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-4 md:w-1/2">
            <p>
              At Dublin High Speech and Debate, we develop our public speaking,
              teamwork, research, and critical thinking skills with the
              opportunity to represent Dublin High at competitive national
              tournaments every 2-6 weeks. Speech and Debate not only foster
              skills that are applicable to every career path, but also open up
              avenues for growth and achievement for anyone up to the challenge.
            </p>
            <p>
              Our community of 100+ members includes a wide range of skill
              levels - from new novices to nationally-ranked veterans; all are
              welcome.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
