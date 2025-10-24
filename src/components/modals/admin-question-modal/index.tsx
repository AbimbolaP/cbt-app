// components/QuestionFormModal.tsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";

interface Question {
  id: number;
  primary: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

interface QuestionFormModalProps {
  show: boolean;
  onClose: () => void;
  form: Question;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: () => Promise<void>;
  message: string;
  isEdit: boolean;
}

export const QuestionFormModal: React.FC<QuestionFormModalProps> = ({
  show,
  onClose,
  form,
  handleChange,
  handleSubmit,
  message,
  isEdit,
}) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            aria-label="Close modal"
          >
            <RiCloseLine size={24} />
          </button>

          <h3 className="text-xl font-bold mb-5 text-gray-800">
            {isEdit ? "Edit Question" : "Add New Question"}
          </h3>

          <div className="flex flex-col gap-3">
            <input
              name="primary"
              value={form.primary}
              onChange={handleChange}
              placeholder="Question"
              className="border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
            {/* Options */}
            {["option1", "option2", "option3", "option4"].map((optionKey) => (
              <input
                key={optionKey}
                name={optionKey}
                value={form[optionKey as keyof Question] || ""}
                onChange={handleChange}
                placeholder={`Option ${optionKey.slice(-1)}`}
                className="border p-3 rounded-lg"
                required
              />
            ))}

            <select
              name="answer"
              value={form.answer}
              onChange={handleChange}
              className="border p-3 rounded-lg appearance-none cursor-pointer bg-white"
              required
            >
              <option value="">Select Correct Answer</option>
              <option value="option1">Option 1: {form.option1}</option>
              <option value="option2">Option 2: {form.option2}</option>
              <option value="option3">Option 3: {form.option3}</option>
              <option value="option4">Option 4: {form.option4}</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className={`p-3 rounded-lg font-semibold transition-all ${
                isEdit
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isEdit ? "Update Question" : "Add Question"}
            </motion.button>
            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm mt-2 text-green-600 font-medium"
              >
                {message}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Default state for a new question
export const initialQuestionState: Question = {
  id: 0,
  primary: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  answer: "",
};