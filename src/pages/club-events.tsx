import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { PageProps } from "~/utils/pageUtils";
import { usePullContent } from "~/utils/pageUtils";

export default function ClubEventsPage({ content: providedContent }: PageProps) {
  const { content, error } = usePullContent("clubEvents", providedContent);

  if (error) {
    // Display a fallback error message if Firestore fetch fails
    return (
      <div className="error-container">
        <h1>Service Unavailable</h1>
        <p>We&apos;re experiencing issues retrieving content. Please try again later.</p>
      </div>
    );
  }

  if (!content) {
    // Loading indicator while content is being fetched
    return <div>Loading...</div>;
  }

  const clubEventsContent = content.clubEvents;
  const events = clubEventsContent.events;
  
  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <div className="px-4 py-12 md:px-8">
        <h1 className="mb-4 text-center text-3xl font-bold">{clubEventsContent.title}</h1>
        <p className="mb-8 text-center text-lg">
          {clubEventsContent.description}
        </p>

        <Card className="mx-auto max-w-5xl">
          <CardHeader>
            <CardTitle>DHS S&D Club Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[600px] w-full">
              <iframe
                src={clubEventsContent.calendarLink || "https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=America%2FNew_York"}
                style={{ border: 0 }}
                className="h-full w-full"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>
        {/* Find some way to seperate the 2 based on JSON date */}
        <div className="mx-auto mt-8 max-w-5xl rounded-xl bg-zinc-800 bg-opacity-80 p-2">
          <h2 className="mb-4 text-2xl font-semibold">Events</h2>
          <ul className="space-y-2">
            {events.map((event, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <span>{event.title}</span>
                <span>{event.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
