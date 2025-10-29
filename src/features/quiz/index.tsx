"use client";

import { QuestionCard } from "@/components/cards/question-card";
import { formatTime } from "@/helpers/formatTime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaHourglassHalf } from "react-icons/fa";

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
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  const handleSelect = (option: string) => setSelected(option);

const handleNext = () => {
  const currentQuestion = questions[currentIndex];
  const correctAnswerText = currentQuestion[currentQuestion.answer as keyof Question]; 
  console.log("🔍 Selected:", selected);
  console.log("✅ Correct answer text:", correctAnswerText);

  if (selected === correctAnswerText) {
    setScore((prev) => prev + 1);
  }

  setSelected(null);
  setCurrentIndex(currentIndex + 1);
};


   // ✨ Flip / Unfold Variants
  const flipVariants: Variants = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.9 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.45, 0, 0.55, 1], 
      },
    },
    exit: {
      opacity: 0,
      rotateY: -90,
      scale: 0.9,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const isFinished = currentIndex >= questions.length || timeLeft === 0;

 // inside your Quiz component function

useEffect(() => {
    const fetchQuestions = async () => {
        setIsLoading(true); 

        try {
            const response = await fetch("/api/questions");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            const data = JSON.parse(text);
            
            setQuestions(data);
        } catch (err) {
            console.error("Failed to fetch questions:", err);
        } finally {
            setIsLoading(false); 
        }
    };

    fetchQuestions()
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

  // useEffect(() => {
  //   if (isFinished) {
  //     fetch("/api/scores", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ score }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log("Score updated:", data))
  //       .catch((err) => console.error("Failed to update score:", err));
  //   }
  // }, [isFinished, score]);

useEffect(() => {
  if (isFinished) {
    const updateScore = async () => {
      try {
        const res = await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Failed to update score:", data.error);
          return;
        }

        console.log(" Score updated:", data.user.score);
        setScore(data.user.score);
      } catch (err) {
        console.error(" Error updating score:", err);
      }
    };

    updateScore();
  }
}, [isFinished]); 


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-7rem)] text-blue-600 p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FaHourglassHalf className="text-6xl mb-4" />
        </motion.div>
        <h2 className="text-2xl font-semibold mt-4">Loading Exam Questions...</h2>
        <p className="text-gray-500 mt-2">Please wait while we prepare your test environment.</p>
      </div>
    );
  }
  
  if (questions.length === 0) {
      return (
        <div className="text-center mt-10 text-red-600">
          <p className="text-xl font-bold">Error: No questions found.</p>
          <p className="text-gray-500">Please check the question source or try again later.</p>
        </div>
      );
  }

 

  return (
    <div className="flex flex-col items-center justify-center gap-6">

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
          <>
            <div className="text-xl font-bold mb-4">
              Time left: {formatTime(timeLeft)}
            </div>
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
        </>
        )}
      </AnimatePresence>
    </div>
  );
};
