"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export const SignUp = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("select");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email,
        password,
        role,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const { error } = await res.json();
      setError(error || "Failed to sign up");
      return;
    }

    router.push("/auth/sign-in");
  };

  const buttonDisabled =
    !firstName || !lastName || !email || !password || role === "select";

  // === Animation Variants ===
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
      className="flex items-center justify-center min-h-[calc(100dvh-8rem)] bg-cover bg-center bg-no-repeat bg-[url('/images/newsignin.jpg')]"
    >

      <div className=" hidden md:block absolute bg-white opacity-60 h-[calc(100dvh-11rem)] md:h-[calc(100dvh-10rem)]  rounded-3xl w-[90vw] md:w-[60vw] left-auto right-auto top-auto bottom-auto"></div> 

      <motion.div className="flex flex-col justify-center items-center gap-10 z-1 ">
      {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-semibold text-center"
        >
          Sign up to take your examination
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
              placeholder="First Name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border p-4 rounded-full border-dashed border-blue-500 focus:outline-none"
            />

            <motion.input
              variants={itemVariants}
              type="text"
              placeholder="Last Name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border p-4 rounded-full border-dashed border-blue-500 focus:outline-none"
            />

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

            <motion.select
              variants={itemVariants}
              className="w-full border p-4 rounded-full border-dashed border-blue-500 focus:outline-none appearance-none cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option className="opacity-50" value="select">
                Select Role...
              </option>
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </motion.select>

            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignUp}
              disabled={buttonDisabled}
              className="w-full text-white bg-blue-500 rounded-full p-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Up
            </motion.button>
          </motion.div>

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

          <motion.div variants={itemVariants}>
            Already have an account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => router.push("/auth/sign-in")}
            >
              Sign In
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
