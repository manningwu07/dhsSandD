import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <motion.h1
        className="text-blue my-3 text-center text-8xl font-extrabold"
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
        className="mt-2 text-center text-7xl font-semibold"
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
        <motion.div
          animate={{ x: [0, 35, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowRight className="text-6xl" />
        </motion.div>

        <Link
          href="/"
          className="text-center text-4xl font-semibold hover:underline transition-all duration-200"
        >
          <h1>2024-2025 Membership Form</h1>
        </Link>

        <motion.div
          animate={{ x: [0, 35, 0] }}
          transition={{
            duration: 1,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowLeft className="-ml-8 text-6xl" />
        </motion.div>
      </div>
    </>
  );
}
