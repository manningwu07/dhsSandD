import { useState } from "react";
import Navbar from "~/components/navbar";
import Hero from "~/components/sections/Hero";
import { InfoIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { usePullContent } from "~/utils/pageUtils";
import type { PageProps } from "~/utils/pageUtils";
import Footer from "~/components/footer";

export default function TournamentPage({
  content: providedContent,
}: PageProps) {
  const [showSpreadsheetInfo, setShowSpreadsheetInfo] = useState(true);

  const { content, error } = usePullContent("tournament", providedContent);

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

  const tournamentContent =
    content.tournament;
  console.log("tournamentContent", tournamentContent);

  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      {content.components?.hero && (
        <Hero
          title={content.components.hero.title}
          description={content.components.hero.description}
          buttonLink={content.components.hero.buttonLink}
        />
      )}
      <div className="container mx-auto flex flex-col p-8">
        <h1 className="mb-8 text-center text-4xl font-bold">
          How to SIGN UP for a Tournament
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          {tournamentContent.signUpInstructions.map((method, index) => (
            <Card
              key={index}
              className="rounded-xl bg-zinc-800 bg-opacity-80 p-2"
            >
              <CardHeader>
                <CardTitle>{method.title}</CardTitle>
                <p>{method.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="w-full list-none">
                  {method.accordionItems.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-4">
                      <h3 className="font-semibold">{item.trigger}</h3>
                      <div className="mt-2">
                        {Array.isArray(item.content) ? (
                          <ul className="list-disc space-y-2 pl-5">
                            {item.content.map((contentItem, idx) => (
                              <li key={idx}>{contentItem.paragraph}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{item.content}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="my-8 rounded-xl bg-zinc-800 bg-opacity-80 p-2">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle className="ml-2">Important Note</AlertTitle>
          <AlertDescription className="ml-2">
            MOST UPDATED SIGN-UPS FOR EACH TOURNAMENT + FEE STATUS IS LISTED ON
            THE SIGN-UPS TAB OF THE SPREADSHEET BELOW!
          </AlertDescription>
        </Alert>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="rounded-xl bg-zinc-800 bg-opacity-80 p-2"
            onClick={() => setShowSpreadsheetInfo(!showSpreadsheetInfo)}
          >
            {showSpreadsheetInfo
              ? "Hide Spreadsheet Info"
              : "Show Spreadsheet Info"}
          </Button>
          {showSpreadsheetInfo && (
            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="relative h-[600px] w-full">
                  <iframe
                    src={tournamentContent.calendarLink}
                    style={{ border: 0 }}
                    className="h-full w-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="bg-zinc-800 bg-opacity-80">
            <CardHeader>
              <CardTitle>Forms to Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                {tournamentContent.formsToComplete.map((form, index) => (
                  <li key={index}>{form.paragraph}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 bg-opacity-80">
            <CardHeader>
              <CardTitle>Submission Eligibility Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-2 pl-5">
                {tournamentContent.eligibilityRules.map((rule, index) => (
                  <li key={index}>{rule.paragraph}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-zinc-800 bg-opacity-80">
          <CardHeader>
            <CardTitle>Submission Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex"> 
              <p>Email: &nbsp;</p>
              <Link href="mailto:dublinhighspeechanddebate@gmail.com">
                {tournamentContent.submissionDetails.email}
              </Link>
            </div>
            <p className="mt-4">
              Or deliver physical copies to&nbsp; 
              {tournamentContent.submissionDetails.physicalSubmission}.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
