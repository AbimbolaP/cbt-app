// "use client";

// import { motion, Variants } from "framer-motion";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export const Dashboard = () => {
//   const router = useRouter();
//   const {data: session, status} = useSession();
//   const userRole = session?.user?.role;

//   const handleStart = () => router.push("/quiz");

//   const handleAdmin = () => router.push("/admin");

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.25,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const fadeScale: Variants = {
//     hidden: { opacity: 0, y: 40, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { type: "spring", stiffness: 80, damping: 15 },
//     },
//   };

//   const flipButton: Variants = {
//     hidden: { opacity: 0, rotateX: -90 },
//     visible: {
//       opacity: 1,
//       rotateX: 0,
//       transition: { type: "spring", stiffness: 100, damping: 12 },
//     },
//     hover: { scale: 1.05, transition: { duration: 0.2 } },
//   };

//   if (status === "loading") {
//     return <div className="text-center mt-10 text-gray-500">Loading dashboard...</div>;
//   }

//   return (
//     <motion.div
//       className="flex flex-col items-center justify-center gap-8 md:gap-15 min-h-[calc(100dvh-7rem)] text-center"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Headline */}
//       <motion.div
//         className="text-4xl md:text-5xl font-bold text-center"
//         variants={fadeScale}
//       >
//         Are You Ready??
//       </motion.div>

//       {/* Info text */}
//       <motion.div
//         className="w-[70vw] md:w-[50vw] text-center text-red-400 font-bold leading-relaxed"
//         variants={fadeScale}
//       >
//         You have 2 minutes to answer all questions. Take your time to carefully answer as you cannot go back after answering them.
//       </motion.div>

//       {/* Buttons */}
//       <motion.button
//         className="w-[80vw] md:w-[40vw] text-white font-bold bg-blue-500 rounded-full p-4 cursor-pointer"
//         variants={flipButton}
//         whileHover="hover"
//         onClick={handleStart}
//       >
//         Start Examination
//       </motion.button>

//        {userRole === "ADMIN" && (
//         <motion.button
//           className="w-[80vw] md:w-[40vw] text-white font-bold bg-blue-500 rounded-full p-4 cursor-pointer"
//           variants={flipButton}
//           whileHover="hover"
//           onClick={handleAdmin}
//         >
//           Go to Admin <span className="opacity-80">(Admin Only)</span>
//         </motion.button>
//       )}
//     </motion.div>
//   );
// };



"use client";

import { motion, Variants } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaPlay, FaUserShield, FaExclamationCircle, FaClock } from "react-icons/fa";

export const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const userName = session?.user?.name || "Candidate";
  const userRole = session?.user?.role || "USER";
  const isUserAdmin = userRole === "ADMIN";

  const examName = "General Aptitude Test";
  const timeLimitMinutes = 60;
  const totalQuestions = 50;
  
  const handleStart = () => router.push("/quiz");
  const handleAdmin = () => router.push("/admin");

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

  const cardFadeIn: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const flipButton: Variants = {
    hidden: { opacity: 0, rotateX: -90 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[calc(100dvh-7rem)]">
        <FaClock className="animate-spin text-blue-500 text-3xl mr-2" />
        <div className="text-xl text-gray-500">Preparing your dashboard...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100dvh-7rem)] bg-gray-50 p-4 sm:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Content Card */}
      <motion.div
        className="bg-white shadow-2xl rounded-xl p-8 max-w-4xl w-full border-t-4 border-blue-500"
        variants={cardFadeIn}
      >
        {/* Header/Welcome Section */}
        <motion.div variants={cardFadeIn}>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
            Welcome, {userName}!
          </h1>
          <p className="text-xl text-gray-600 mb-6 border-b pb-4">
            You are about to start the **{examName}**.
          </p>
        </motion.div>

        {/* Exam Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Time Limit */}
          <motion.div 
            className="flex flex-col items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            variants={cardFadeIn}
          >
            <FaClock className="text-2xl text-yellow-600 mb-2" />
            <span className="text-sm font-semibold text-gray-600">Time Limit</span>
            <span className="text-2xl font-bold text-yellow-700">{timeLimitMinutes} Mins</span>
          </motion.div>
          
          {/* Total Questions */}
          <motion.div 
            className="flex flex-col items-center p-4 bg-green-50 border border-green-200 rounded-lg"
            variants={cardFadeIn}
          >
            <FaPlay className="text-2xl text-green-600 mb-2" />
            <span className="text-sm font-semibold text-gray-600">Total Questions</span>
            <span className="text-2xl font-bold text-green-700">{totalQuestions}</span>
          </motion.div>

          {/* Important Notice */}
          <motion.div 
            className="flex flex-col items-center p-4 bg-red-50 border border-red-200 rounded-lg"
            variants={cardFadeIn}
          >
            <FaExclamationCircle className="text-2xl text-red-600 mb-2" />
            <span className="text-sm font-semibold text-gray-600">Exam Rule</span>
            <span className="text-base font-bold text-red-700">No Review Possible</span>
          </motion.div>
        </div>

        {/* Instructions/Rules */}
        <motion.div 
          className="p-6 bg-gray-100 rounded-lg mb-8 shadow-inner"
          variants={cardFadeIn}
        >
          <h3 className="text-xl font-bold text-gray-700 mb-3 flex items-center">
            <FaExclamationCircle className="mr-2 text-red-500" />
            Important Examination Rules
          </h3>
          <ul className="list-disc list-inside text-left text-gray-600 space-y-2">
            <li>The total time allowed for this examination is **{timeLimitMinutes} minutes**.</li>
            <li>You must answer **all {totalQuestions} questions**.</li>
            <li className="font-bold text-red-600">Once an answer is submitted for a question, **you cannot go back** to change it.</li>
            <li>Ensure you have a stable internet connection throughout the test.</li>
            <li>Click the &apos;Start&apos; button when you are ready to begin.</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <motion.button
            className="flex items-center justify-center w-full text-white font-bold bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg p-3 text-xl shadow-lg animate-pulse"
            variants={flipButton}
            whileHover="hover"
            onClick={handleStart}
          >
            <FaPlay className="mr-3" />
            Start NOW
          </motion.button>

          {isUserAdmin && (
            <motion.button
              className="flex items-center justify-center w-full text-white font-semibold bg-red-500 hover:bg-red-600 transition-colors rounded-lg p-3 text-xl shadwo-lg"
              variants={flipButton}
              whileHover="hover"
              onClick={handleAdmin}
            >
              <FaUserShield className="mr-3" />
              Go to Admin Panel
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
