'use client'

import { QuestionCard } from "@/components/question-card";
import { useEffect, useState } from "react";

interface Question {
  id: number;
  primary: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

export const Dashboard = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/api/questions")
     .then(async res => {
    const text = await res.text(); 
    console.log("Raw response:", text); 
    return JSON.parse(text);
  })
  .then(data => setQuestions(data))
  .catch(err => console.error("Failed to fetch questions:", err));
  }, [])

  const handleSelect = (option: string) =>{
    setSelected(option);
  };

  const handleNext = () =>{
    if(selected === questions[currentIndex].answer){
      setScore(score + 1)
    }
    setSelected(null);
    setCurrentIndex(currentIndex + 1);
  };

  if (questions.length === 0) {
    return <div> Loading...</div>
  }


  return ( 
    <div className="flex flex-col items-center justify-center  gap-15">
      
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
            className=" w-[70vw] md:w-[40vw] mt-4 px-6 py-4 bg-blue-500 text-white text-xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-blue-600"
          >
          Next
        </button>
        </>

      ) : (
        <div className="text-center mt-20">
          <div className="text-2xl font-bold">Quiz Completed!</div>
          <p className="text-lg mt-2">Your score: {score} / {questions.length}</p>
          
        </div>
      )}
    </div>
  );
}