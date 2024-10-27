import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <motion.h1
        className="my-3 text-center text-5xl font-extrabold text-blue sm:text-6xl md:text-7xl lg:text-8xl"
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.75 }}
        style={{
          textShadow: "-2px -2px 2px #CC0033",
        }}
      >
        <span className="font-cursive italic">Dublin High School</span>
      </motion.h1>

      <motion.h2
        className="mt-2 text-center text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl"
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.5 }}
        style={{
          color: "white",
          textShadow: "-3px -3px 2px #6699CC, -5px -5px 2px #CC0033",
        }}
      >
        SPEECH <span style={{ color: "#CC0033" }}>&</span> DEBATE
      </motion.h2>

      <div className="mt-6 flex items-center justify-center space-x-16">
        <Link
          href="/"
          className="text-center text-2xl font-semibold transition-all duration-200 sm:text-3xl lg:text-4xl"
        >
          <h1 className="rounded-2xl bg-zinc-900 bg-opacity-80 p-2">
            <span className="text-red">Click:</span>{" "}
            <span className="hover:underline">2024-2025 Membership Form</span>
          </h1>
        </Link>
      </div>
    </>
  );
}
