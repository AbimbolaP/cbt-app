"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMenuUnfold2Line,
  RiMenuUnfoldLine,
  RiCloseLine,
} from "react-icons/ri";

interface Question {
  id: number;
  primary: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
  score: number | null;
}

export const AdminDashboard = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"questions" | "users">("questions");
  const [form, setForm] = useState<Question>({
    id: 0,
    primary: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (activeTab === "questions") {
      fetch("/api/admin/questions")
        .then((res) => res.json())
        .then((data) => setQuestions(data));
    }

    if (activeTab === "users") {
      fetch("/api/admin/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
  }, [activeTab]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.primary ||
      !form.option1 ||
      !form.option2 ||
      !form.option3 ||
      !form.option4 ||
      !form.answer
    ) {
      setMessage("All fields are required.");
      return;
    }

    const res = await fetch("/api/admin/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Question added successfully!");
      setForm({
        id: 0,
        primary: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      });
      setQuestions((prev) => [...prev, data]);
    } else {
      setMessage(data.error || "Failed to add question.");
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="flex min-h-[calc(100dvh-7rem)] bg-blue-100 overflow-hidden relative">
      {/* ===== Desktop Sidebar ===== */}
      <AnimatePresence>
        {sidebarOpen ? (
          <motion.div
            key="sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0}}
            exit={{ x: "-100%"}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="hidden md:flex w-[25%] bg-gray-600 text-white flex-col p-4 shadow-lg"
          >
            <div className="flex justify-between mb-6 items-center">
              <h1 className="text-xl font-bold truncate">Admin</h1>
              <button onClick={toggleSidebar}>
                <RiMenuUnfold2Line size="24" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`text-left mb-2 p-2 rounded hover:bg-blue-500 cursor-pointer ${
                activeTab === "questions" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("questions")}
            >
              Manage Questions
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`text-left mb-2 p-2 rounded hover:bg-blue-500 cursor-pointer ${
                activeTab === "users" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/quiz")}
              className="mt-auto mb-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer"
            >
              Go to Quiz
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="collapsedSidebar"
            initial={{ x: "-50%" }}
            animate={{ x: 0}}
            exit={{ x: "-50%"}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="hidden md:flex bg-gray-600 text-white flex-col p-4 w-[60px] items-center justify-between shadow-lg"
          >
            <button onClick={toggleSidebar}>
              <RiMenuUnfoldLine size="24" />
            </button>
            {/* <div className="flex flex-col gap-6 items-center">
              <button
                onClick={() => setActiveTab("questions")}
                className={`hover:text-blue-400 ${
                  activeTab === "questions" ? "text-blue-300" : ""
                }`}
              >
                Q
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`hover:text-blue-400 ${
                  activeTab === "users" ? "text-blue-300" : ""
                }`}
              >
                U
              </button>
            </div>
            <button onClick={() => router.push("/quiz")} className="text-blue-300">
              Quiz
            </button> */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Mobile Menu Button ===== */}
      <div className="absolute top-4 left-4 z-20 md:hidden cursor-pointer">
        <button onClick={toggleMobileMenu}>
          <RiMenuUnfoldLine size="28" className="text-gray-800" />
        </button>
      </div>

      {/* ===== Mobile Full-Screen Menu ===== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-gray-800 bg-opacity-95 text-white z-30 flex flex-col items-center justify-center space-y-8"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="absolute top-5 right-5 text-white cursor-pointer"
            >
              <RiCloseLine size="30" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab("questions");
                toggleMobileMenu();
              }}
              className={`text-2xl font-semibold cursor-pointer ${
                activeTab === "questions"
                ? "text-blue-400 underline underline-offset-4"
                : "text-white"
              }`}

            >
              Manage Questions
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab("users");
                toggleMobileMenu();
              }}
              className={`text-2xl font-semibold cursor-pointer ${
                activeTab === "users"
                ? "text-blue-400 underline underline-offset-4"
                : "text-white"
               }`}
            >
              Users
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toggleMobileMenu();
                router.push("/quiz");
              }}
              className="text-2xl font-semibold text-blue-400"
            >
              Go to Quiz
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Main Content ===== */}
      <motion.div
        layout
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex-1 p-6 mt-8 md:mt-0 overflow-y-auto w-full"
      >
        <AnimatePresence mode="wait">
          {activeTab === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">Add Question</h2>
              <div className="flex flex-col gap-2 max-w-lg">
                <input
                  name="primary"
                  value={form.primary}
                  onChange={handleChange}
                  placeholder="Question"
                  className="border p-2 rounded"
                />
                <input
                  name="option1"
                  value={form.option1}
                  onChange={handleChange}
                  placeholder="Option 1"
                  className="border p-2 rounded"
                />
                <input
                  name="option2"
                  value={form.option2}
                  onChange={handleChange}
                  placeholder="Option 2"
                  className="border p-2 rounded"
                />
                <input
                  name="option3"
                  value={form.option3}
                  onChange={handleChange}
                  placeholder="Option 3"
                  className="border p-2 rounded"
                />
                <input
                  name="option4"
                  value={form.option4}
                  onChange={handleChange}
                  placeholder="Option 4"
                  className="border p-2 rounded"
                />
                <select
                  name="answer"
                  value={form.answer}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Correct Answer</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                  Add Question
                </motion.button>
                {message && <div className="text-green-600">{message}</div>}
              </div>

              <h2 className="text-2xl font-bold mt-6 mb-2">
                Existing Questions
              </h2>
              <ul className="list-disc ml-6 space-y-1">
                {questions.map((q, i) => (
                  <motion.li
                    key={q.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="font-semibold">{q.primary}</span> (Answer:{" "}
                    {q[q.answer as keyof Question]})
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">Users & Scores</h2>
              <div className="overflow-x-auto max-w-full">
                <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base shadow">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-2 md:px-4 py-2">
                        Name
                      </th>
                      <th className="border border-gray-300 px-2 md:px-4 py-2">
                        Email
                      </th>
                      <th className="border border-gray-300 px-2 md:px-4 py-2">
                        Role
                      </th>
                      <th className="border border-gray-300 px-2 md:px-4 py-2">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-center"
                      >
                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                          {u.name}
                        </td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 break-words">
                          {u.email}
                        </td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                          {u.role}
                        </td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                          {u.score ?? "—"}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
