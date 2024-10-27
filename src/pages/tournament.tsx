import Navbar from "~/components/navbar";
import Hero from "~/components/sections/Hero";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function TournamentPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <Hero />
      <div className="container mx-auto flex flex-col p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Tournament Sign-Ups
        </h1>

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
              <li>Adhere to the team's code of conduct.</li>
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
            <div className="mt-4">
              <Button className="w-full">View Tournament Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
