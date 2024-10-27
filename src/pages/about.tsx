import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import Hero from "~/components/sections/Hero";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";

function ActionButton({ link, text }: { link: string; text: string }) {
  return (
    <div className="my-4 w-fit rounded-full bg-red/80 px-8 py-4 text-center text-lg font-semibold transition-all duration-200 hover:scale-105 hover:bg-red hover:underline sm:text-xl md:text-2xl">
      <Link href={link}>{text}</Link>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <Hero />

      <div className="container mx-auto flex flex-col-reverse items-center space-y-6 p-6 md:flex-row md:space-x-8 md:space-y-0">
        {/* Text Content */}
        <div className="flex flex-col items-center justify-center p-2 text-center text-white md:p-3 md:text-left lg:p-4 2xl:p-5">
          <h1 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
            Who we are
          </h1>
          <p className="leading-relaxed md:text-xl">
            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
            Yap Yap.
          </p>
        </div>

        {/* Image */}
        <div className="relative aspect-[3/2] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Image
            src="/about.png"
            alt="about"
            fill
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-center text-4xl font-bold md:text-5xl">
            WHY SPEECH AND DEBATE?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-lg md:mb-12">
            Speech and Debate aren't restricted to students who aspire to be
            politicians or lawyers. Many of our members aspire to work in STEM,
            business, and the arts -- yet, we value Speech and Debate for
            developing our lifelong skills in critical thinking, teamwork,
            writing, and communication. Here, we set aside our personal bias and
            previous knowledge to objectively debate both sides of an issue, a
            skill that will inevitably prove useful in our futures. Competing in
            Speech and Debate is a challenge anyone can embrace!
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 bg-opacity-80 p-6">
              <h3 className="mb-4 text-2xl font-bold">SPEECH</h3>
              <p>
                Speech involves a presentation by one, two, or sometimes a group
                of students that is judged against a similar type of
                presentation in a round of competition. Speech events can
                involve extensive preparation, or next to none at all. There are
                more serious events that require speakers to be aware of current
                events and more interpretive events that allow speakers to
                recreate powerful moments in history and literature with a
                personalized touch.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 bg-opacity-80 p-6">
              <h3 className="mb-4 text-2xl font-bold">DEBATE</h3>
              <p>
                Debate involves an individual or a team of debaters working to
                convince an unbiased judge of his or her side. Students
                participating in debate generally have to understand and prepare
                for both sides of a topic, and eventually have to argue both as
                well, developing unparalleled persuasion skills that this
                activity helps hone and refine for later on in life.
              </p>
            </div>
          </div>
          <div className="my-8 flex justify-evenly">
            <ActionButton link="/" text="Join us" />
            <ActionButton link="/" text="Support us" />
          </div>

          <Card className="bg-primary text-primary-foreground mx-auto max-w-2xl bg-zinc-900 bg-opacity-80 shadow-lg shadow-zinc-400">
            <CardContent className="p-6">
              <h3 className="mb-4 text-center text-2xl font-bold">
                Parents, We Need You!
              </h3>
              <p className="mb-4 text-center">
                Your expertise and perspective are invaluable. Volunteer as a
                judge and help shape the future of our young debaters.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="w-fit rounded-lg bg-red/80 px-3 py-2 transition-all duration-200 hover:bg-red"
                >
                  Register as Judge
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
