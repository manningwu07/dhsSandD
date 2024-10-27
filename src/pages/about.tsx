import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import Hero from "~/components/sections/Hero";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";

function ActionButton({ link, text }: { link: string; text: string }) {
  return (
    <div className="my-4 w-fit rounded-full bg-red/80 px-8 py-4 text-center text-lg font-semibold transition-all duration-200 hover:scale-105 hover:underline hover:bg-red sm:text-xl md:text-2xl">
      <Link href={link}>{text}</Link>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <div className="absolute inset-0 -z-40 bg-black opacity-40" />
      <Navbar />
      <Hero />

      <div className="container mx-auto flex p-8">
        <div className="relative aspect-[3/2] h-fit w-[240px] sm:w-[320px] md:w-[500px] lg:w-[750px]">
          <Image
            src="/about.png"
            alt="about"
            fill={true}
            objectFit="cover"
            className="rounded-lg shadow-lg shadow-red"
          />
        </div>
        <div className="flex flex-col justify-center p-4 text-white md:p-5 lg:p-6 2xl:p-7">
          <h1 className="pb-2 text-center text-4xl font-bold">Who we are</h1>
          <p className="text-left text-lg">
            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
            Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap Yap
            Yap Yap
          </p>
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
            <div className="rounded-lg bg-gray-800 p-6">
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
            <div className="rounded-lg bg-gray-800 p-6">
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

          <Card className="bg-primary text-primary-foreground mx-auto max-w-2xl bg-zinc-900 shadow-lg shadow-zinc-800">
            <CardContent className="p-6">
              <h3 className="mb-4 text-center text-2xl font-bold">
                Parents, We Need You!
              </h3>
              <p className="mb-4 text-center">
                Your expertise and perspective are invaluable. Volunteer as a
                judge and help shape the future of our young debaters.
              </p>
              <div className="flex justify-center">
                <Link href="/" className="bg-red/80 px-3 py-2 w-fit rounded-lg hover:bg-red transition-all duration-200">
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
