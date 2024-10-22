import Image from "next/image";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Image */}
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="School building at sunset"
        layout="fill"
        objectFit="cover"
        className="opacity-50 -z-50"
      />

      <Navbar />

      {/* Content Container */}
      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 py-12">
        {/* Logo */}
        <div className="mb-6 h-16 w-16 rounded-full bg-white shadow-lg"></div>

        {/* Title */}
        <h1
          className="mb-2 text-center text-4xl font-extrabold md:text-6xl"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          <span className="font-serif text-blue-500">Dublin High School</span>
        </h1>

        <h2
          className="mb-2 text-center text-5xl font-extrabold md:text-7xl"
          style={{
            textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          SPEECH <span className="text-pink-400">&</span> DEBATE
        </h2>

        {/* Email */}
        <p className="mb-8 text-gray-300">
          dublinhighspeechanddebate@gmail.com
        </p>

        {/* Main Content */}
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          {/* Image */}
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
