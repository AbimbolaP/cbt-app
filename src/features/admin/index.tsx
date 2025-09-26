'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

interface QuestionForm {
  primary: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

export const AdminDashboard = () => {
  const router = useRouter();
  const [form, setForm] = useState<QuestionForm>({
    primary: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const [message, setMessage] = useState("");

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
        setForm({ primary: "", option1: "", option2: "", option3: "", option4: "", answer: "" });
      } else {
        setMessage(data.error || "Failed to add question.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 max-w-xl ">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <h2 className="text-2xl font-medium mb-1">Add Questions</h2>
      
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

       <button onClick={() =>router.push("/quiz") } className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Go to Quiz
      </button>

      {message && <div className="text-green-600">{message}</div>}
    </div>
  )
}
