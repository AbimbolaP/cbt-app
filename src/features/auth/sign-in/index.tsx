'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignIn = () => {
 
 const router = useRouter();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");

 const handleSignIn = async() => {
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    // Login successful
    router.push("/dashboard");
 }

  const buttonDisabled = email ==="" || password ==="";

  return ( 
    <div className='flex flex-col justify-center items-center gap-20 h-[80vh]'>
      <div className="text-4xl font-medium text-center">
        Sign in to take your examination.
      </div>
    <div className='flex flex-col justify-center items-center gap-5'>
      <div className="w-[70vw] md:w-[30vw] flex flex-col justify-center items-center gap-10">
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
          onClick={handleSignIn}
          disabled = {buttonDisabled}
          > 
          Sign In
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <div className="text-blue-500 text-left cursor-pointer">Forgot Password?</div>
      <div>
        Don&apos;t have an account? <span className="text-blue-500 underline" onClick={() =>router.push('/auth/sign-up')}>Sign up</span>
      </div>
     </div> 
    </div>
  );
}