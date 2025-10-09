'use client';

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

export const Landing = () => {
  const router = useRouter();

  // Parent variant to control staggered entrance
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

  const fadeUp : Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const buttonVariants : Variants = {
    hidden: { opacity: 0, rotateX: -90, scale: 0.8 },
    visible: {
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
      },
    },
    hover: { scale: 1.05, transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center gap-18 h-[80vh]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col gap-6 text-center"
        variants={fadeUp}
      >
        <motion.div
          className="text-5xl font-bold text-center"
          variants={fadeUp}
        >
          Welcome to Ariel Computer Based Examination
        </motion.div>
        <motion.div
          className="text-md text-center text-blue-700"
          variants={fadeUp}
        >
          Examination made easy, No sweats, No frets.
        </motion.div>
      </motion.div>

      {/* Buttons Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center p-4 gap-6"
        variants={fadeUp}
      >
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          className="w-[80vw] md:w-[30vw] bg-blue-500 text-white p-4 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out"
          onClick={() => router.push('/auth/sign-in')}
        >
          Sign In
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          className="w-[80vw] md:w-[30vw] bg-white border border-blue-500 text-blue-500 p-4 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out"
          onClick={() => router.push('/auth/sign-up')}
        >
          Sign Up For Free
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
