import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Link from "next/link";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { PageProps, pullContent } from "~/utils/pageUtils";
import { DataStructure } from "~/utils/dataStructure";

function VideoCard({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        <div className="aspect-w-16 aspect-h-9 h-[350px] w-full md:h-[600px]">
          <iframe
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ParentsPage({ content: providedContent }: PageProps) {
  const {content, error} = pullContent("parents", providedContent);

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

  const parentContent = content.parents as DataStructure["pages"]["parents"];
  
  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <div className="container mx-auto flex flex-col p-8">
        <h1 className="mb-8 text-center text-4xl font-bold">
          {parentContent.title}
        </h1>

        <div className="space-y-8">
          <VideoCard
            src={parentContent.videoOne.src}
            title={parentContent.videoOne.title}
            description={parentContent.videoOne.description}
          />
          <Card className="bg-zinc-800 bg-opacity-80">
            <CardHeader>
              <CardTitle className="md:text-xl lg:text-2xl">
                {parentContent.mentorGuide.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {parentContent.mentorGuide.accordionItems.map((section, sectionIndex) => (
                  <AccordionItem key={sectionIndex} value={`item-${sectionIndex}`}>
                    <AccordionTrigger className="md:text-lg lg:text-xl font-semibold">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="lg:text-lg">
                      {section.description.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          <VideoCard
            src={parentContent.videoTwo.src}
            title={parentContent.videoTwo.title}
            description={parentContent.videoTwo.description}
          />
          <Card className="bg-zinc-800 bg-opacity-80">
            <CardHeader>
              <CardTitle className="md:text-lg lg:text-xl font-semibold">
                Additional Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              {parentContent.additionalResourcesLinks.map((link, index) => (
                <li key={index} className="mb-2 lg:text-lg">
                  <Link href={link.link} className="text-blue-600 hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))} 
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
