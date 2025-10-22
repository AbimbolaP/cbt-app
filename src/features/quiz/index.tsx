"use client";

import { QuestionCard } from "@/components/cards/question-card";
import { formatTime } from "@/helpers/formatTime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Question {
  id: number;
  primary: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

export const Quiz = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  const handleSelect = (option: string) => setSelected(option);

  const handleNext = () => {
    if (selected === questions[currentIndex].answer) setScore(score + 1);
    setSelected(null);
    setCurrentIndex(currentIndex + 1);
  };

  const isFinished = currentIndex >= questions.length || timeLeft === 0;

  useEffect(() => {
    fetch("/api/questions")
      .then(async (res) => {
        const text = await res.text();
        console.log("Raw response:", text);
        return JSON.parse(text);
      })
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to fetch questions:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (currentIndex < questions.length && selected !== null) {
            if (selected === questions[currentIndex].answer) {
              setScore((prevScore) => prevScore + 1);
            }
          }
          setCurrentIndex(questions.length);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, selected, questions]);

  useEffect(() => {
    if (isFinished) {
      fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Score updated:", data))
        .catch((err) => console.error("Failed to update score:", err));
    }
  }, [isFinished, score]);

  if (questions.length === 0) return <div>Loading...</div>;

  // ✨ Flip / Unfold Variants
  const flipVariants: Variants = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.9 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.45, 0, 0.55, 1], // smooth “ease in-out” feel
      },
    },
    exit: {
      opacity: 0,
      rotateY: -90,
      scale: 0.9,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="text-xl font-bold mb-4">
        Time left: {formatTime(timeLeft)}
      </div>

      <AnimatePresence mode="wait">
        {isFinished ? (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center h-[80vh] gap-6"
          >
            <div className="text-2xl font-bold">Quiz Completed!</div>
            <div className="text-lg mt-2">
              Your score: {score} / {questions.length}
            </div>
            <button
              className="w-[50vw] text-white font-bold bg-blue-500 rounded-full p-4 cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              Go back to Dashboard
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={questions[currentIndex].id}
            variants={flipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col items-center"
          >
            <QuestionCard
              primary={questions[currentIndex].primary}
              option1={questions[currentIndex].option1}
              option2={questions[currentIndex].option2}
              option3={questions[currentIndex].option3}
              option4={questions[currentIndex].option4}
              answer={questions[currentIndex].answer}
              selected={selected}
              onSelect={handleSelect}
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!selected}
              className="w-[70vw] md:w-[40vw] mt-6 px-6 py-4 bg-blue-500 text-white text-xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-all duration-300"
            >
              Next
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
