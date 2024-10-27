import LeadershipCard from "~/components/card/BoardCard";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

const officers = [
  {
    name: "ISHAAN GUPTA",
    position: "Senior Co-President",
    department: "PARLI, SPEECH",
    imageSrc: "/about.png",
  },
  {
    name: "HARVEER SAINI",
    position: "Junior Co-President",
    department: "PARLI, PF",
    imageSrc: "/placeholder.svg",
  },
  {
    name: "DARIA SPIRINA",
    position: "Vice President",
    department: "PF",
    imageSrc: "/placeholder.svg",
  },
  {
    name: "HARSHA VAJRALA",
    position: "Secretary",
    department: "PARLI",
    imageSrc: "/placeholder.svg",
  },
  {
    name: "NIKHILESH SURAVARJJALA",
    position: "Treasurer",
    department: "PARLI & CONGRESS",
    imageSrc: "/placeholder.svg",
  },
  {
    name: "TARUN RAJESH",
    position: "Debate Captain",
    department: "PARLI",
    imageSrc: "/placeholder.svg",
  },
  {
    name: "SAHIRA RAJ",
    position: "Debate Captain",
    department: "PARLI & PF",
    imageSrc: "/placeholder.svg",
  },
  {
    name: "ANDREA YU",
    position: "Outreach officer",
    department: "PARLI",
    imageSrc: "/placeholder.svg",
  },
];

export default function BoardPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <div className="px-4 py-12 text-white md:px-8">
        <div className="mx-auto max-w-8xl">
          <h1 className="mb-10 text-center text-4xl font-bold md:text-5xl">
            2024-2025 OFFICER BOARD
          </h1>
          <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {officers.map((officer, index) => (
              <LeadershipCard key={index} {...officer} />
            ))}
          </div>
        </div>
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Parent Advisor
          </h2>
          <div className="max-w-md mx-auto">
            <LeadershipCard
              name="HIMALI GANDHI"
              position="Parent Advisor"
              department="Debate"
              imageSrc="/placeholder.svg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
