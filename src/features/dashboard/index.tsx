"use client";

import { useRouter } from "next/navigation";

export const Dashboard = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/quiz")
  }

  return ( 
    <div className="flex flex-col items-center justify-center gap-15 h-[80vh] text-center]">
      <div className="text-5xl font-bold">Are You Ready??</div>
      <div className="w-[70vw] text-center text-red-400 font-bold">You have 30 minutes to answer all questions. Take your time to carefully answer as you cannot go back after answering them</div>
      <button  className="w-[50vw] text-white font-bold bg-blue-500 rounded-full p-4 cursor-pointer" onClick={handleStart}>Start Examination</button>
    </div>
  );
}