import { motion, Variants } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  delay: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.5,
    },
  },
};

export const FeatureCard = ({ title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      className="flex flex-col justify-start gap-2 rounded-xl border border-gray-100 shadow-xl 
                 p-6 sm:p-8 bg-white/95 hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: delay }}
    >
      <motion.h1 className="text-2xl font-semibold text-blue-500 mb-2">
        {title}
      </motion.h1>
      
      <motion.p className="text-gray-700 leading-relaxed">
        {description}
      </motion.p>
    </motion.div>
  );
};
