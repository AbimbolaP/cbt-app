"use client";

import { useRouter } from "next/navigation";

export const Dashboard = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/quiz")
  }

  const handleAdmin = () => {
    router.push("/admin")
  }

  return ( 
    <div className="flex flex-col items-center justify-center gap-8 md:gap-15 h-[80vh] text-center]">
      <div 
      className="text-4xl md:text-5xl font-bold text-center">Are You Ready??</div>
      <div className="w-[70vw] md:w-[50vw] text-center text-red-400 font-bold">You have 2 minutes to answer all questions. Take your time to carefully answer as you cannot go back after answering them</div>

      <button  className="w-[80vw] md:w-[40vw] text-white font-bold bg-blue-500 rounded-full p-4 cursor-pointer" onClick={handleStart}>Start Examination</button>
      <button 
      className="w-[80vw] md:w-[40vw] text-white font-bold bg-blue-500 rounded-full p-4 cursor-pointer"
      onClick={handleAdmin}
      >Go to Admin <span> (Admin Only)</span></button>
    </div>
  );
}