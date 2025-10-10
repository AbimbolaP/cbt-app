"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

export const Dashboard = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/quiz");
  };

  const handleAdmin = () => {
    router.push("/admin");
  };

  // Parent container animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  // For headline and text
  const fadeScale: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  // Button flip animation
  const flipButton: Variants = {
    hidden: { opacity: 0, rotateX: -90 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 md:gap-15 min-h-[calc(100dvh-7rem)] text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Headline */}
      <motion.div
        className="text-4xl md:text-5xl font-bold text-center"
        variants={fadeScale}
      >
        Are You Ready??
      </motion.div>

      {/* Info text */}
      <motion.div
        className="w-[70vw] md:w-[50vw] text-center text-red-400 font-bold leading-relaxed"
        variants={fadeScale}
      >
        You have 2 minutes to answer all questions. Take your time to carefully answer as you cannot go back after answering them.
      </motion.div>

      {/* Buttons */}
      <motion.button
        className="w-[80vw] md:w-[40vw] text-white font-bold bg-blue-500 rounded-full p-4 cursor-pointer"
        variants={flipButton}
        whileHover="hover"
        onClick={handleStart}
      >
        Start Examination
      </motion.button>

      <motion.button
        className="w-[80vw] md:w-[40vw] text-white font-bold bg-blue-500 rounded-full p-4 cursor-pointer"
        variants={flipButton}
        whileHover="hover"
        onClick={handleAdmin}
      >
        Go to Admin <span className="opacity-80">(Admin Only)</span>
      </motion.button>
    </motion.div>
  );
};
