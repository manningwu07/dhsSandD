"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "~/components/navbar";
import Hero from "~/components/sections/Hero";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function TournamentPage() {
  const [showSpreadsheetInfo, setShowSpreadsheetInfo] = useState(true);

  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <Hero />
      <div className="container mx-auto flex flex-col p-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-bold">
            How to SIGN UP for a Tournament
          </h1>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="rounded-xl bg-zinc-800 bg-opacity-80 p-2">
              <CardHeader>
                <CardTitle>Most Fool-Proof Method</CardTitle>
                <CardDescription>
                  Approach a Board Member in person
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Who to approach?</AccordionTrigger>
                    <AccordionContent>
                      Preferably Ishaan, Harveer, or a Captain during a meeting.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      What information to provide?
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc space-y-2 pl-5">
                        <li>
                          If you can provide a judge + their Tabroom account
                          email
                        </li>
                        <li>Event and division you wish to enter in</li>
                        <li>Your Tabroom account email</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-zinc-800 bg-opacity-80 p-2">
              <CardHeader>
                <CardTitle>Alternate Method</CardTitle>
                <CardDescription>Online sign-up process</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Step 1: Google Form</AccordionTrigger>
                    <AccordionContent>
                      Complete a sign-up Google form.
                      <Button variant="link" className="h-auto p-0 font-normal">
                        Access the form here
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Step 2: Message a Board Member
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Directly message a Board Member (preferably Ishaan,
                        Harveer, or a Captain) on Discord with the following
                        info:
                      </p>
                      <ul className="mt-2 list-disc space-y-2 pl-5">
                        <li>
                          If you can provide a judge + their Tabroom account
                          email
                        </li>
                        <li>Event and division you wish to enter in</li>
                        <li>Your Tabroom account email</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
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
              {showSpreadsheetInfo
                ? "Hide Spreadsheet Info"
                : "Show Spreadsheet Info"}
            </Button>
            {showSpreadsheetInfo && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <div className="relative h-[600px] w-full">
                    <iframe
                      src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=America%2FNew_York"
                      style={{ border: 0 }}
                      className="h-full w-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="bg-zinc-800 bg-opacity-80">
            <CardHeader>
              <CardTitle>Forms to Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                <li>Tournament Registration Form</li>
                <li>Parental Consent Form</li>
                <li>Medical Information Form</li>
                <li>Code of Conduct Agreement</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 bg-opacity-80">
            <CardHeader>
              <CardTitle>Tournament Week Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                <li>Travel Itinerary Confirmation</li>
                <li>Final Event Selection Form</li>
                <li>Team Roster Submission</li>
                <li>Judge Volunteer Form</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-zinc-800 bg-opacity-80">
          <CardHeader>
            <CardTitle>Submission Eligibility Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Must be an active member of Dublin High Speech and Debate.
              </li>
              <li>Maintain a GPA of 2.5 or higher.</li>
              <li>Attend at least 80% of team practices.</li>
              <li>Complete all required forms by the specified deadlines.</li>
              <li>Adhere to the team&apos;s code of conduct.</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-zinc-800 bg-opacity-80">
          <CardHeader>
            <CardTitle>Submission Location</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Please submit all completed forms to:</p>
            <div className="space-y-2">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                type="email"
                placeholder="dublinhighspeechanddebate@gmail.com"
                readOnly
              />
            </div>
            <p className="mt-4">
              Or deliver physical copies to Room 306 during lunch hours.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 bg-opacity-80">
          <CardHeader>
            <CardTitle>Tournament Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[600px] w-full">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=America%2FNew_York"
                style={{ border: 0 }}
                className="h-full w-full"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Alert className="mx-0 mt-8 w-fit rounded-xl bg-zinc-800 bg-opacity-80 p-2">
            <AlertDescription className="p-2 text-center text-lg font-semibold">
              <p className="mb-2">When in doubt, ASK!</p>
              <Link
                href="mailto:dublinhighspeechanddebate@gmail.com"
                className="text-red/75 hover:underline"
              >
                dublinhighspeechanddebate@gmail.com
              </Link>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
