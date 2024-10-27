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
import Footer from "~/components/footer";
import Navbar, { SocialIcon } from "~/components/navbar";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function ClubEvents() {
  const events = [
    { date: new Date(2024, 10, 5), title: "Mock Tournament" },
    { date: new Date(2024, 10, 12), title: "Workshop: Impromptu Speaking" },
    { date: new Date(2024, 10, 19), title: "Regional Qualifier" },
    { date: new Date(2024, 10, 26), title: "Team Social Event" },
  ];

  const [showSpreadsheetInfo, setShowSpreadsheetInfo] = useState(true);

  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <div className="px-4 py-12 md:px-8">
        <h1 className="mb-4 text-center text-3xl font-bold">Club Events</h1>
        <p className="mb-8 text-center text-lg">
          Dates to put on your calendar:
        </p>

        <Card className="mx-auto max-w-5xl">
          <CardHeader>
            <CardTitle>DHS S&D Club Calendar</CardTitle>
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

        <div className="mx-auto mt-8 max-w-5xl rounded-xl bg-zinc-800 bg-opacity-80 p-2">
          <h2 className="mb-4 text-2xl font-semibold">Upcoming Events</h2>
          <ul className="space-y-2">
            {events.map((event, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <span>{event.title}</span>
                <span>{event.date.toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-bold">
            How to SIGN UP for a Tournament
          </h1>

          <Alert className="mb-8 rounded-xl bg-zinc-800 bg-opacity-80 p-2">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Important Note</AlertTitle>
            <AlertDescription>
              MOST UPDATED SIGN-UPS FOR EACH TOURNAMENT + FEE STATUS IS LISTED
              ON THE SIGN-UPS TAB OF THE SPREADSHEET ABOVE!
            </AlertDescription>
          </Alert>

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
          <div className="flex justify-center">
            <Alert className="mx-0 mt-8 w-fit rounded-xl bg-zinc-800 bg-opacity-80 p-2">
              <AlertDescription className="p-2 text-center text-lg font-semibold">
                <p className="mb-2">When in doubt, ASK!</p>
                <Link
                  href="mailto:dublinhighspeechanddebate@gmail.com"
                  className="hover:underline text-red/75"
                >dublinhighspeechanddebate@gmail.com</Link>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
