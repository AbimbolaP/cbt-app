'use client'

import { useRouter } from "next/navigation";

export const Landing
 = () => {
 const router = useRouter();

  return ( 
    <div className="flex flex-col justify-center items-center gap-18  h-[80vh]">
      
      <div className="flex flex-col gap-6 text-center ">
        <div className="text-5xl font-bold text-center">
        Welcome to Ariel Computer Based Examination
      </div>
      <div className="text-md text-center text-blue-700">
        Examination made easy, No sweats, No Frets.
      </div>
      </div>
        
      <div className="flex flex-col md:flex-row items-center p-4 gap-5">
        <button 
         className="w-[80vw] md:w-[30vw] bg-blue-500 text-white p-4 rounded-2xl cursor-pointer hover:w-[85vw] md:hover:w-[35vw] transition-all   duration-500 ease-in-out"
         onClick={()=> {router.push('/auth/sign-in')}}
         >
          Sign In
        </button>
        <button 
          className="w-[80vw] md:w-[30vw] bg-white border-1 border-blue-500 text-blue-500 p-4 rounded-2xl cursor-pointer hover:w-[85vw] md:hover:w-[35vw] transition-all duration-500 ease-in-out"
          onClick={()=> {router.push('/auth/sign-up')}}
          >
            Sign Up For Free
        </button>
      </div>
      
    </div>
  );
}