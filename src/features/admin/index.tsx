"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
  const [openTab, setOpenTab] =  useState(true)
  const [activeTab, setActiveTab] = useState<"questions" | "users">("questions");

  // Question form state
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

  // Load existing questions
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.primary || !form.option1 || !form.option2 || !form.option3 || !form.option4 || !form.answer) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/admin/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Question added successfully!");
        setForm({ id: 0, primary: "", option1: "", option2: "", option3: "", option4: "", answer: "" });
        setQuestions((prev) => [...prev, data]);
      } else {
        setMessage(data.error || "Failed to add question.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  const toggleMenu = () => {
    setOpenTab(!openTab)
  }

  return (
    <div className="flex h-screen bg-blue-100">
      {/* Sidebar */}
      {openTab &&
      <div className="w-64 bg-gray-500 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <button className="outline-1 w-[25px]" onClick={toggleMenu}>tog</button>
        <button
          className={`text-left mb-2 p-2 rounded ${activeTab === "questions" ? "bg-gray-600" : ""}`}
          onClick={() => setActiveTab("questions")}
        >
          Manage Questions
        </button>
        <button
          className={`text-left mb-2 p-2 rounded ${activeTab === "users" ? "bg-gray-600" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          View Users & Scores
        </button>
        <button
          onClick={() => router.push("/quiz")}
          className="mt-auto bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Go to Quiz
        </button>
      </div>
      }
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "questions" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Add Question</h2>
            <div className="flex flex-col gap-2 max-w-lg">
              <input name="primary" value={form.primary} onChange={handleChange} placeholder="Question" className="border p-2 rounded"/>
              <input name="option1" value={form.option1} onChange={handleChange} placeholder="Option 1" className="border p-2 rounded"/>
              <input name="option2" value={form.option2} onChange={handleChange} placeholder="Option 2" className="border p-2 rounded"/>
              <input name="option3" value={form.option3} onChange={handleChange} placeholder="Option 3" className="border p-2 rounded"/>
              <input name="option4" value={form.option4} onChange={handleChange} placeholder="Option 4" className="border p-2 rounded"/>
              <select name="answer" value={form.answer} onChange={handleChange} className="border p-2 rounded">
                <option value="">Select Correct Answer</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
              <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Add Question
              </button>
              {message && <div className="text-green-600">{message}</div>}
            </div>

            {/* Existing Questions */}
            <h2 className="text-2xl font-bold mt-6 mb-2">Existing Questions</h2>
            <ul className="list-disc ml-6">
              {questions.map((q) => (
                <li key={q.id}>
                  <span className="font-semibold">{q.primary}</span> (Answer: {q[q.answer as keyof Question]})
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Users & Scores</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{u.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{u.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{u.role}</td>
                    <td className="border border-gray-300 px-4 py-2">{u.score ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
