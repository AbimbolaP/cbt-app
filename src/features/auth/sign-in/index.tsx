"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  };

  const buttonDisabled = !email || !password;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 8,
        bounce: 0.6,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="flex items-center justify-center min-h-[calc(100dvh-8rem)] bg-gradient-to-br from-blue-100  to-blue-200 bg-cover bg-center bg-no-repeat bg-[url('/images/newsignin.jpg')]"
    >

       <div className="absolute bg-white opacity-60 h-[calc(100dvh-15rem)] rounded-3xl w-[90vw] md:w-[60vw] left-auto right-auto top-auto bottom-auto"></div> 

      <motion.div className="flex flex-col justify-center items-center gap-20 z-10">
        {/* Title */}
        
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-semibold text-center"
        >
          Sign in to take your examination
        </motion.h1>

        {/* Form Section */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col justify-center items-center gap-5"
        >
          <motion.div
            variants={containerVariants}
            className="w-[80vw] md:w-[30vw] flex flex-col justify-center items-center gap-8"
          >
            <motion.input
              variants={itemVariants}
              type="text"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-4 rounded-full border-dashed border-blue-500 focus:outline-none"
            />

            <motion.input
              variants={itemVariants}
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-4 rounded-full border-dashed border-blue-500 focus:outline-none"
            />

            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignIn}
              disabled={buttonDisabled}
              className="w-full text-white bg-blue-500 rounded-full p-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign In
            </motion.button>

            <AnimatePresence>
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="text-red-500"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-blue-500 text-left cursor-pointer"
          >
            Forgot Password?
          </motion.div>

          <motion.div variants={itemVariants}>
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => router.push("/auth/sign-up")}
            >
              Sign up
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
)}