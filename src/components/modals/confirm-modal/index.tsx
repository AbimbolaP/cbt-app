"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  show: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  highlight?: string; // e.g. username or action keyword
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  title = "Confirm Action",
  message,
  confirmText = "Yes",
  cancelText = "Cancel",
  highlight,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.6 }}
            className="bg-white p-8 flex flex-col gap-4 rounded-lg shadow-lg text-center w-[22rem]"
          >
            <p className="text-lg font-semibold mb-2">{title}</p>
            {message && (
              <p className="text-gray-700 mb-2">
                {message}{" "}
                {highlight && (
                  <span className="text-red-500 font-semibold">{highlight}</span>
                )}
                ?
              </p>
            )}
            <div className="flex justify-around mt-2">
              <button
                onClick={onConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {confirmText}
              </button>
              <button
                onClick={onCancel}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
