import { motion } from "framer-motion";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

interface Question {
  id: number;
  primary: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

interface QuestionCardProps {
  question: Question;
  index: number;
  onEdit: (question: Question) => void;
  onDelete: (id: number, question: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  onEdit,
  onDelete,
}) => {
  const correctAnswer = question[question.answer as keyof Question];
  const { id, primary } = question;

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-start gap-3"
    >
      <div className="flex-1 min-w-0 flex flex-col justify-end">
        <p className="font-semibold text-gray-800 break-words">
          {index + 1}. {primary}
        </p>
        <p className="text-sm text-green-600 mt-1 truncate">
          <span className="font-medium">Answer:</span> {correctAnswer}
        </p>
      </div>

      <div className="flex space-x-3 self-end">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(question)}
          className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors"
          aria-label="Edit question"
        >
          <FiEdit3 size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(id, primary)}
          className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors"
          aria-label="Delete question"
        >
          <FiTrash2 size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};