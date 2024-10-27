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

export default function ParentInfoJudgeTraining() {
  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <div className="container mx-auto flex flex-col p-8">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Parent Information Judge Training
        </h1>

        <div className="space-y-8">
          <VideoCard
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Introduction to Judging"
            description="This video provides an overview of what to expect as a judge in speech and debate tournaments."
          />
          <Card className="bg-zinc-800 bg-opacity-80">
            <CardHeader>
              <CardTitle>Mentor Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Preparing for Your First Tournament
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>Familiarize yourself with the event rules</li>
                      <li>Review judging criteria and scoring guidelines</li>
                      <li>Arrive early to the tournament for orientation</li>
                      <li>Bring necessary materials (pen, paper, timer)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>During the Round</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>Maintain a neutral expression</li>
                      <li>Take detailed notes</li>
                      <li>Time the speeches accurately</li>
                      <li>Focus on content, delivery, and organization</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>After the Round</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>Complete the ballot thoroughly</li>
                      <li>Provide constructive feedback</li>
                      <li>Submit your decision promptly</li>
                      <li>Maintain confidentiality about results</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <VideoCard
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Detailed Judging Process"
            description="This video goes into the specifics of how to judge different events and fill out ballots."
          />
          <Card className="bg-zinc-800 bg-opacity-80">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Judging Handbook (PDF)
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Event Rules and Descriptions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    FAQs for New Judges
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
