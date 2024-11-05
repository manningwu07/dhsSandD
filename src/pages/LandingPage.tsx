import React from "react";
import LandingCard from "~/components/card/LandingCard";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import type {
  CarouselImage,
  DescriptionParagraph,
} from "~/components/sections/Description";
import Description from "~/components/sections/Description";
import Hero from "~/components/sections/Hero";
import { type PageProps, usePullContent } from "~/utils/pageUtils";

export default function LandingPage({ content: providedContent }: PageProps) {
  const { content, error } = usePullContent("landing", providedContent);

  if (error) {
    // Display a fallback error message if Firestore fetch fails
    return (
      <div className="error-container">
        <h1>Service Unavailable</h1>
        <p>
          We&apos;re experiencing issues retrieving content. Please try again later.
        </p>
      </div>
    );
  }

  if (!content) {
    // Loading indicator while content is being fetched
    return <div>Loading...</div>;
  }

  // Destructure the necessary parts from the content
  const landingContent = content.landing;
  const componentContent = content.components;
  const cards = landingContent.card || [];
  const images: CarouselImage[] = landingContent.description?.card || [];
  const paragraphs: DescriptionParagraph[] =
    landingContent.description?.paragraphs || [];

  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <div className="absolute inset-0 -z-40 bg-black opacity-40" />
      <Navbar />
      <div className="relative z-10 mx-2 flex flex-col items-center px-4 py-12 sm:mx-4 md:mx-6 lg:mx-8 2xl:mx-10">
        {componentContent?.hero && (
          <Hero
            title={componentContent.hero.title}
            description={componentContent.hero.description}
            buttonLink={componentContent.hero.buttonLink}
          />
        )}
        <div className="my-20 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8 2xl:gap-12">
          {cards.map((card: any, index: number) => (
            <LandingCard key={index} {...card} />
          ))}
        </div>
        <div className="container mx-auto p-8">
          <Description images={images} description={paragraphs} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
