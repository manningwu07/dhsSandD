import { useState } from "react";
import Navbar from "~/components/navbar";
import Hero from "~/components/sections/Hero";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { InfoIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { PageProps, useContent } from "~/utils/pageUtils";

export default function TournamentPage({ content: providedContent }: PageProps) {
  const content = useContent(providedContent);
  const tournamentContent = content.pages.tournament;
  const [showSpreadsheetInfo, setShowSpreadsheetInfo] = useState(true);

  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <Hero />
      <div className="container mx-auto flex flex-col p-8">
        <h1 className="mb-8 text-center text-4xl font-bold">
          How to SIGN UP for a Tournament
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          {tournamentContent.signUpInstructions.map((method, index) => (
            <Card key={index} className="rounded-xl bg-zinc-800 bg-opacity-80 p-2">
              <CardHeader>
                <CardTitle>{method.title}</CardTitle>
                <p>{method.description}</p>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {method.accordionItems.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${itemIndex}`}>
                      <AccordionTrigger>{item.trigger}</AccordionTrigger>
                      <AccordionContent>
                        {Array.isArray(item.content) ? (
                          <ul className="list-disc space-y-2 pl-5">
                            {item.content.map((contentItem, idx) => (
                              <li key={idx}>{contentItem}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{item.content}</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="my-8 rounded-xl bg-zinc-800 bg-opacity-80 p-2">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            MOST UPDATED SIGN-UPS FOR EACH TOURNAMENT + FEE STATUS IS LISTED
            ON THE SIGN-UPS TAB OF THE SPREADSHEET BELOW!
          </AlertDescription>
        </Alert>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="rounded-xl bg-zinc-800 bg-opacity-80 p-2"
            onClick={() => setShowSpreadsheetInfo(!showSpreadsheetInfo)}
          >
            {showSpreadsheetInfo ? "Hide Spreadsheet Info" : "Show Spreadsheet Info"}
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

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="bg-zinc-800 bg-opacity-80">
            <CardHeader>
              <CardTitle>Forms to Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                {tournamentContent.formsToComplete.map((form, index) => (
                  <li key={index}>{form}</li>
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
                  <li key={index}>{rule}</li>
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
            <div className="space-y-2">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                type="email"
                placeholder={tournamentContent.submissionDetails.email}
                readOnly
              />
            </div>
            <p className="mt-4">
              Or deliver physical copies to {tournamentContent.submissionDetails.physicalSubmission}.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
