'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignUp = () => {
   const router = useRouter();
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   
  
  
    const buttonDisabled = email ==="" || password ==="";
  
  return ( 
     <div className='flex flex-col justify-center items-center gap-20 h-[80vh]'>
      <div className="text-4xl font-medium text-center">
        Sign up to take your examination.
      </div>
    <div className='flex flex-col justify-center items-center gap-5'>
      <div className="w-[70vw] md:w-[30vw] flex flex-col justify-center items-center gap-10">
         <input 
          className=" w-full border-b border p-4 rounded-full border-dashed border-blue-500 focus:outline-none" 
          type="text" 
          placeholder="First Name..." 
          value={firstName}
           onChange={(e) => setFirstName(e.target.value)}
        />
        <input 
          className=" w-full border-b border p-4 rounded-full border-dashed border-blue-500 focus:outline-none" 
          type="text" 
          placeholder="Last Name..." 
          value={lastName}
           onChange={(e) => setLastName(e.target.value)}
        />
         <input 
          className=" w-full border-b border p-4 rounded-full border-dashed border-blue-500 focus:outline-none" 
          type="text" 
          placeholder="Email..." 
          value={email}
           onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          className=" w-full border p-4 rounded-full border-dashed border-blue-500 focus:outline-none" 
          type="password" 
          placeholder="Password..." 
          value={password}
            onChange={(e) => setPassword(e.target.value)}

        />
        <button 
          className="w-full  text-white bg-blue-500 rounded-full p-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:" 
          onClick={() => {router.push('/dashboard')}}
          disabled = {buttonDisabled}
          > 
          Sign Up
        </button>
      </div>
      <div>
        Already have an account? <span className="text-blue-500 underline" onClick={() =>router.push('/auth/sign-in')}>Sign In</span>
      </div>
     </div> 
    </div>
  );
}