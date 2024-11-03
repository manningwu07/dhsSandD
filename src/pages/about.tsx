import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import Hero from "~/components/sections/Hero";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { PageProps, pullContent } from "~/utils/pageUtils";

function ActionButton({ link, text }: { link: string; text: string }) {
  return (
    <div className="my-4 w-fit rounded-full bg-red/80 px-8 py-4 text-center text-lg font-semibold transition-all duration-200 hover:scale-105 hover:bg-red hover:underline sm:text-xl md:text-2xl">
      <Link href={link}>{text}</Link>
    </div>
  );
}

export default function AboutPage({ content: providedContent }: PageProps) {
  const { content, error } = pullContent("about", providedContent);

  if (error) {
    // Display a fallback error message if Firestore fetch fails
    return (
      <div className="error-container">
        <h1>Service Unavailable</h1>
        <p>We're experiencing issues retrieving content. Please try again later.</p>
      </div>
    );
  }

  if (!content) {
    // Loading indicator while content is being fetched
    return <div>Loading...</div>;
  }
  
  const aboutContent = content.about;
  console.log("aboutContent", aboutContent);

  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      {content.components?.hero && (
        <Hero title={content.components.hero.title} description={content.components.hero.description} buttonLink={content.components.hero.buttonLink} />
      )}

      <div className="container mx-auto flex flex-col-reverse items-center space-y-6 p-6 md:flex-row md:space-x-8 md:space-y-0">
        {/* Text Content */}
        <div className="flex flex-col items-center justify-center p-2 text-center text-white md:p-3 md:text-left lg:p-4 2xl:p-5">
          <h1 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
            {aboutContent.introduction.title}
          </h1>
          <p className="leading-relaxed md:text-xl">
            {aboutContent.introduction.description}
          </p>
        </div>

        {/* Image */}
        <div className="relative aspect-[3/2] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Image
            src={aboutContent.introduction.imageSrc || "/placeholder.svg"}
            alt="about"
            fill
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-center text-4xl font-bold md:text-5xl">
            {aboutContent.whySpeechAndDebate.title}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-lg md:mb-12">
            {aboutContent.whySpeechAndDebate.description}
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 bg-opacity-80 p-6">
              <h3 className="mb-4 text-2xl font-bold">{aboutContent.whySpeechAndDebate.whySpeech.title}</h3>
              <p>
                {aboutContent.whySpeechAndDebate.whySpeech.description}
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 bg-opacity-80 p-6">
              <h3 className="mb-4 text-2xl font-bold">{aboutContent.whySpeechAndDebate.whyDebate.title}</h3>
              <p>
                {aboutContent.whySpeechAndDebate.whyDebate.description}
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
                {aboutContent.parentWeNeedYou.title}
              </h3>
              <p className="mb-4 text-center">
                {aboutContent.parentWeNeedYou.description}
              </p>
              <div className="flex justify-center">
                <Link
                  href={aboutContent.parentWeNeedYou.link}
                  className="w-fit rounded-lg bg-red/80 px-3 py-2 transition-all duration-200 hover:bg-red"
                >
                  {aboutContent.parentWeNeedYou.callToAction}
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
