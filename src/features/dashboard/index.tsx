'use client'

import { QuestionCard } from "@/components/question-card";
import { questions } from "@/data/questions";
import { useState } from "react";

export const Dashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleSelect = (option: string) =>{
    setSelected(option);
  };

  const handleNext = () =>{
    if(selected === questions[currentIndex].answer){
      setScore(score + 1)
    }
    setSelected(null);
    setCurrentIndex(currentIndex + 1);
  }


  return ( 
    <div className="flex flex-col items-center justify-center md:w-[50vw] gap-10">
      {currentIndex < questions.length ? (

        <>
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

         <button
            onClick={handleNext}
            disabled={!selected}
            className=" w-[70vw] md:w-[50vw] mt-4 px-6 py-4 bg-blue-500 text-white text-xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-blue-600"
          >
          Next
        </button>
        </>

      ) : (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="text-lg mt-2">Your score: {score} / {questions.length}</p>
        </div>
      )}
    </div>
  );
}