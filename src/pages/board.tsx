import { motion } from "framer-motion";
import LeadershipCard from "~/components/card/BoardCard"
import { type LeadershipCardProps } from "~/components/card/BoardCard";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { usePullContent, type PageProps } from "~/utils/pageUtils";

export default function BoardPage({ content: providedContent }: PageProps) {
  const { content, error } = usePullContent("board", providedContent);

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

  const boardContent = content.board;
  const officers = boardContent.students;
  const advisors = boardContent.parents;
  const cols = advisors.length < 5 ? advisors.length : 4;
  const layoutClass = `grid grid-cols-1 justify-items-center gap-6 md:grid-cols-${cols} lg:grid-cols-${cols} 2xl:grid-cols-${cols}`;

  return (
    <div className="min-h-screen overflow-hidden bg-[url('/Background.webp')] bg-cover bg-fixed bg-center text-white">
      <Navbar />
      <div className="px-4 py-12 md:px-8">
        <div className="max-w-8xl mx-auto">
          <h1 className="mb-10 text-center text-4xl font-bold md:text-5xl">
            2024-2025 OFFICER BOARD
          </h1>
          <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {officers.map((officer: LeadershipCardProps, index: number) => (
              <motion.div
                key={index}
                initial={{ x: 75, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative flex h-full w-full justify-center"
              >
                <LeadershipCard key={index} {...officer} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Parent Advisor{advisors.length > 1 && "s"}
          </h2>
          <div className={layoutClass}>
            {advisors.map((advisor: LeadershipCardProps, index: number) => (
              <motion.div
                key={index}
                initial={{ x: 75, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative flex h-full w-full max-w-md justify-center"
              >
                <LeadershipCard key={index} {...advisor} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
