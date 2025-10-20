'use client';

import { FeatureCard } from "@/components/feature-card";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const clientLogos = [
  { src: "/images/oxford.png", alt: "Oxford University" },
  { src: "/images/kentucky.png", alt: "Kentucky University" },
  { src: "/images/oxford.png", alt: "Oxford University" },
  { src: "/images/kentucky.png", alt: "Kentucky University" },
  { src: "/images/oxford.png", alt: "Oxford University" },
  { src: "/images/kentucky.png", alt: "Kentucky University" },
];

export const Landing = () => {
  const router = useRouter();

  // Parent variant to control staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUp : Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const buttonVariants : Variants = {
    hidden: { opacity: 0, rotateX: -90, scale: 0.8 },
    visible: {
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
      },
    },
    hover: { scale: 1.05, transition: { duration: 0.1 } },
  };

 const slideVariants: Variants = {
  hidden: { x: 0 },
  animate: {
    x: ["0%", "-50%"],
    transition: {
      duration: 30,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

  return (
    <motion.div className="min-h-screen" >
      {/* HERO */}
      <motion.div
        className="flex flex-col justify-center items-center h-[75vh] gap-18w-full bg-cover bg-center bg-no-repeat bg-[url('/images/hero.jpg')]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        >
        <div className="absolute bg-white opacity-40 h-[calc(100dvh-25rem)] rounded-3xl w-[90vw] left-auto right-auto top-auto bottom-auto"></div> 
      
        {/* Header Section */}
        <motion.div
          className="relative z-10 flex flex-col gap-6 text-center w-[85vw] md:w-auto px-2"
          variants={fadeUp}
        >
      
          <motion.div
            className="text-4xl md:text-5xl font-bold"
            variants={fadeUp}
          >
            Welcome to Ariel Computer Based Examination
          </motion.div>
          <motion.div
            className="text-md font-medium text-center"
            variants={fadeUp}
          >
            Examination made easy, No sweats, No frets.
          </motion.div>
        </motion.div>

        {/* Buttons Section */}
        <motion.div
          className=" relative z-10 flex flex-col md:flex-row items-center p-4 gap-6"
          variants={fadeUp}
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="w-[80vw] md:w-[30vw] font-bold bg-blue-500 text-white p-4 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out"
            onClick={() => router.push('/auth/sign-in')}
          >
            Sign In
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="w-[80vw] md:w-[30vw] font-bold bg-white border border-blue-500 text-blue-500 p-4 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out"
            onClick={() => router.push('/auth/sign-up')}
          >
            Sign Up For Free
          </motion.button>
        </motion.div>
      </motion.div>

      {/* FEATURES */}
      <motion.div className="flex flex-col gap-5 p-4">

        <motion.h1 className=" flex text-3xl font-bold text-blue-500 underline underline-offset-8 decoration-1">
          Features
        </motion.h1>
        {/* Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          <FeatureCard 
            title="Administration Panel"
            description="Full control over user accounts, quiz creation, and results tracking. Iste suscipit, possimus totam minus nobis omnis reprehenderit dicta cumque cum autem."
            delay={0.1}
          />
          <FeatureCard 
            title="Real-time Scoring"
            description="Students see their scores instantly upon submission. Perferendis distinctio necessitatibus nemo non! Lorem ipsum dolor sit amet consectetur, adipisicing elit."
            delay={0.2}
            />
          <FeatureCard 
            title="Secure Login"
            description="Utilize secure, custom token authentication for maximum security and ease of access. Cumque cum autem quis repudiandae ex voluptatum magni."
            delay={0.3}
          />
          <FeatureCard 
            title="User Profile Management"
            description="Utilize secure, custom token authentication for maximum security and ease of access. Cumque cum autem quis repudiandae ex voluptatum magni."
            delay={0.4}
          />
        </motion.div>
      </motion.div>

      {/* OUR CLIENTS*/}
      <motion.div className="flex flex-col gap-5 p-4 bg-gray-100 mb-8">
        <motion.h1 className="flex text-3xl font-bold text-blue-500 underline underline-offset-8 decoration-1 ">
          Our Clients
        </motion.h1>
        <div className="relative w-full overflow-x-scroll scrollbar-hide lg:overflow-x-hidden p-4">

          <motion.div 
            className="flex space-x-8 min-w-max lg:w-[200%] "
            variants={slideVariants}
            initial="hidden"
            animate="animate"
          >
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div 
                key={index}
                className="
                  flex-shrink-0
                  w-24 h-24   
                  md:w-32 md:h-32     
                  lg:w-40 lg:h-40     
                  relative 
                  flex items-center justify-center
                "
              >
                <Image 
                  src={client.src} 
                  alt={client.alt} 
                  fill 
                  sizes="(max-width: 768px) 100px, 150px"
                  style={{ objectFit: 'contain' }}
                  priority={index < 6}
                />
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>

      {/* CONTACT US */}
      <motion.div className="p-4 bg-blue-100 flex flex-col gap-6">
        <motion.h1 className="flex text-3xl font-bold text-blue-500 underline underline-offset-8 decoration-1">
          Contact Us
        </motion.h1>

        <motion.div className="flex flex-col-reverse md:flex-row gap-6 p-4">
          <motion.div 
            className="md:w-1/2 flex flex-col justify-between"
            variants={fadeUp} 
        >
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
                <p className="text-gray-600">
                    We&#39;re here to answer any questions you may have about our Computer Based Examination system. Reach out and we&#39;ll respond as soon as we can.
                </p>

                <div className="space-y-4 pt-4">
                    <div className="flex items-center space-x-3">
                        <FiPhone className="h-6 w-6 text-blue-500" /> 
                        <span className="text-gray-700 font-medium">+234 800 123 4567</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <FiMail className="h-6 w-6 text-blue-500" />
                        <span className="text-gray-700 font-medium">support@arielcbe.com</span>
                    </div>

                    <div className="flex items-start space-x-3">
                        <FiMapPin className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                        <p className="text-gray-700">Ariel Tower, 123 Education Drive, Lekki Phase 1, Lagos, Nigeria.</p>
                    </div>
                </div>
            </div>
            
            <div className="pt-8">
                <p className="text-sm text-gray-500">Find us on the map.</p>
            </div>
        </motion.div>
          <motion.div 
            className="bg-white p-8 md:w-1/2 rounded-lg shadow-lg"
            variants={fadeUp} 
        >
            <form className="space-y-6">
                <h2 className="text-2xl font-semibold text-blue-800">Send Us a Message</h2>
              
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-800">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        placeholder="John Doe"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-800">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        placeholder="john.doe@example.com"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-blue-800">Message</label>
                    <textarea 
                        id="message" 
                        rows={4} 
                        className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                        placeholder="How can we help you today?"
                        required
                    ></textarea>
                </div>
                
                <button
                    type="submit"
                    className="w-full font-bold bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors duration-200 ease-in-out shadow-md"
                >
                    Send Message
                </button>
            </form>
        </motion.div>
        </motion.div>
      </motion.div>
  </motion.div>
  );
};
