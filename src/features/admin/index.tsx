"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMenuUnfold2Line,
  RiMenuUnfoldLine,
  RiCloseLine,
} from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { QuestionCard } from "@/components/cards/admin-question-card";
import { QuestionFormModal, initialQuestionState } from "@/components/modals/admin-question-modal";
import { FaSpinner } from "react-icons/fa";

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
  const [isLoading, setIsLoading] = useState(false);

  const [showQuestionModal, setShowQuestionModal] =useState(false);
  const [form, setForm] = useState<Question>(initialQuestionState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [message, setMessage] = useState("");
  const [showConfirmDeleteQuestion, setShowConfirmDeleteQuestion] = useState(false);
  const [questionToDelete, setQuestionToDelete]= useState<{id:number, question: string} | null>(null);


  const [showConfirmDeleteUser, setShowConfirmDeleteUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id:number; name: string } | null>(null);
  const [userToMakeAdmin, setUserToMakeAdmin] = useState<{ id:number; name: string } | null>(null);
  const [showConfirmAdmin, setShowConfirmAdmin] = useState(false);
  const [userToRemoveAdmin, setUserToRemoveAdmin] = useState<{ id:number; name: string } | null>(null);
  const [showConfirmRemoveAdmin, setShowConfirmRemoveAdmin] = useState(false);

   const [activeRoleTab, setActiveRoleTab] = useState<"students" | "admins">("students");
  const [users, setUsers] = useState<User[]>([]);

  const filteredUsers = Array.isArray(users)? 
  activeRoleTab === "students"
    ? users.filter((u) => u.role === "STUDENT")
    : users.filter((u) => u.role === "ADMIN") : [];


  useEffect(() => {
    if (activeTab === "questions") {
      setIsLoading(true);

      fetch("/api/admin/questions")
        .then((res) => res.json())
        .then((data) => setQuestions(data));
        setIsLoading(false);
    }

     if (activeTab === "users") {
      setIsLoading(true);

    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users); // if your API wraps in { users: [...] }
        } else {
          console.log("Unexpected user data format:", data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
      setIsLoading(false)
  }
  }, [activeTab]);


  // Questions Handlers
  const openAddQuestionModal = () => {
    setForm(initialQuestionState);
    setIsEditMode(false);
    setMessage("");
    setShowQuestionModal(true);
  }

  const handleEditQuestion = (question: Question) => {
    setForm(question);
    setIsEditMode(true);
    setMessage("");
    setShowQuestionModal(true);
  }

  const confirmDeleteQuestion =(id:number, question:string) => {
    setQuestionToDelete({id, question });
    setShowConfirmDeleteQuestion(true);
  }

  const deleteQuestion = async (id: number) => {
  try {
    const res = await fetch(`/api/admin/questions/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      setMessage("Question deleted successfully!");
    } else {
      const data = await res.json();
      setMessage(data.error || "Failed to delete question.");
    }
  } catch (error) {
    console.error(error);
    setMessage("Error deleting question.");
  } finally {
    setShowConfirmDeleteQuestion(false);
  }
  };


 const editQuestion = async (updatedQuestion: Question) => {
   try {
  const res = await fetch(`/api/admin/questions/${updatedQuestion.id}`, {
     method: "PUT",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
    primary: updatedQuestion.primary,
    answer: updatedQuestion.answer,
    option1: updatedQuestion.option1,
    option2: updatedQuestion.option2,
    option3: updatedQuestion.option3,
    option4: updatedQuestion.option4,
     }),
  });

  if (res.ok) {
     const result = await res.json();
     const updatedData = result.updatedQuestion;
     
     setQuestions((prev) =>
    prev.map((q) => (q.id === updatedData.id ? updatedData : q))
     );
     setMessage("Question updated successfully!");
    setTimeout(() => {
      setMessage("");
      setShowQuestionModal(false);
    }, 1500);
  } else {
     const data = await res.json();
     setMessage(data.error || "Failed to update question.");
  }
   } catch (error) {
  console.error(error);
  setMessage ("Error updating question.");
   }
};


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
  setMessage ("All fields are required.");
  return;
   }

   if (isEditMode) {
  await editQuestion(form);
   } else {
  const res = await fetch("/api/admin/questions", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(form),
  });
  const data = await res.json();
  if (res.ok) {
     setQuestions((prev) => [...prev, data]);
    setMessage("Question added successfully!");
      setTimeout(() => {
        setMessage("");
        setShowQuestionModal(false);
      }, 1500);
  } else {
     setMessage(data.error || "Failed to add question.");
  }
   }
};



  // Users Handlers
  const confirmDeleteUser = (userId: number, userName: string) => {
    setUserToDelete({ id: userId, name: userName});
    setShowConfirmDeleteUser(true)
  };

  const deleteUser = async (userId: number, userName: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setMessage(`${userName} deleted successfully.`)
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to delete user.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while deleting the user.");
    } finally {
    setShowConfirmDeleteUser(false);
  }
  };


  // Role Change Handlers
  const confirmAdmin = (userId:number, userName:string) => {
   if (activeRoleTab ==="students") {
    setUserToMakeAdmin({id: userId, name: userName});
    setShowConfirmAdmin(true)
  } else {
    setUserToRemoveAdmin({id: userId, name: userName});
    setShowConfirmRemoveAdmin(true)
  }
  };

  const makeAdmin = async () => {
    if (!userToMakeAdmin) return;
    try {
      const res = await fetch(`/api/admin/users/${userToMakeAdmin.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRole: "ADMIN" }),
      });

    let data = {};
    try {
      data = await res.json();
    } catch {
      data = {};
    }

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userToMakeAdmin.id ? { ...u, role: "ADMIN" } : u
          )
        );
        setMessage(`${userToMakeAdmin.name} is now an admin.`);
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to update role.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating role.");
    } finally {
      setShowConfirmAdmin(false);
    }
  };

  const removeAdmin = async() => {
    if (!userToRemoveAdmin) return;
    try {
      const res = await fetch(`/api/admin/users/${userToRemoveAdmin.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRole: "STUDENT" }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userToRemoveAdmin.id ? { ...u, role: "STUDENT" } : u
          )
        );
        setMessage(`${userToRemoveAdmin.name} is no longer an admin.`);
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to update role.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating role.");
    } finally {
      setShowConfirmRemoveAdmin(false);
    }
  }


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-7rem)] text-blue-600 p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner className="text-6xl mb-4" />
        </motion.div>
        <h2 className="text-2xl font-semibold mt-4">Loading Exam Questions...</h2>
        <p className="text-gray-500 mt-2">Please wait while we prepare your test environment.</p>
      </div>
    );
  }
  return (
    <div className="flex min-h-[calc(100dvh-7rem)] bg-blue-100 overflow-hidden relative">
      {/* DESKTOP SIDE MENU */}
      <AnimatePresence>
        {sidebarOpen ? (
          <motion.div
            key="sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0}}
            exit={{ x: "-100%"}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="hidden md:flex w-[25%] bg-blue-100 border-r-1 text-white flex-col p-4 shadow-xl"
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
                activeTab === "questions" ? "bg-gray-500" : ""
              }`}
              onClick={() => setActiveTab("questions")}
            >
              Manage Questions
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`text-left mb-2 p-2 rounded hover:bg-blue-500 cursor-pointer ${
                activeTab === "users" ? "bg-gray-500" : ""
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
            initial={{ x: "50%" }}
            animate={{ x: 0}}
            exit={{ x: "-50%"}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="hidden md:flex border-r-1 bg-blue-100 text-white flex-col p-4 w-[60px] items-center justify-between shadow-xl"
          >
            <button onClick={toggleSidebar}>
              <RiMenuUnfoldLine size="24" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <div className="absolute top-4 left-4 z-20 md:hidden cursor-pointer">
        <button onClick={toggleMobileMenu}>
          <RiMenuUnfoldLine size="28" className="text-gray-800" />
        </button>
      </div>

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

      {/* MAIN CONTENT */}
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
              <h2 className="text-2xl font-bold mb-4">Manage Questions</h2>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={openAddQuestionModal}
                className="bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all mb-8"
              >
                + Add New Question
              </motion.button>

              <h3 className="text-xl font-bold mt-6 mb-4">Existing Questions ({questions.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {questions.length > 0 ? (
                  questions.map((q, i) => (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      index={i}
                      onEdit={handleEditQuestion}
                      onDelete={(id, question) => confirmDeleteQuestion(id, question)}
                    />
                  ))
                ):(
                  <div className="text-gray-500 italic p-4 border rounded-lg bg-white">No questions added yet.</div>
                )}
              </div>
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
              <h2 className="text-2xl font-bold mb-4">User Profiles</h2>

              {/* Role Tabs */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setActiveRoleTab("students")}
                     className={`px-4 py-2 rounded-md font-semibold transition-all ${
                      activeRoleTab === "students"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  STUDENTS
                </button>

                  <button
                  onClick={() => setActiveRoleTab("admins")}
                     className={`px-4 py-2 rounded-md font-semibold transition-all ${
                      activeRoleTab === "admins"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  ADMINS
                </button>
              </div>


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
                        Score
                      </th>
                      <th className="border border-gray-300 px-2 md:px-4 py-2">
                        Action(s)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u, i) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-center"
                      >
                        <td className="border border-gray-300 px-2 md:px-4 py-2 ">
                          {u.name}
                        </td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 break-words">
                          {u.email}
                        </td>
                      
                        <td className="border border-gray-300 px-2 md:px-4 py-2">
                          {u.score ?? "—"}
                        </td>
                       


                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-center flex items-center justify-between gap-2">

                          
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-all"
                              onClick={() => confirmAdmin(u.id, u.name ?? "User")} // TODO: hook to API
                            >
                             {activeRoleTab === "students" ?  "Make Admin" : "Remove Admin" }
                            </motion.button>
                          
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => confirmDeleteUser(u.id, u.name ?? "User")}
                              className=" text-white px-3 py-1 rounded text-xs hover:bg-red-600 cursor-pointer transition-all"
                            >
                              <MdOutlineDelete color="red" size={20}/>
                            </motion.button>
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
      
      {/* MODALS */}

      {/* QUESTION FORM MODAL */}
      <AnimatePresence>
      {showQuestionModal &&<QuestionFormModal
        show={showQuestionModal}
        onClose={() => setShowQuestionModal(false)}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        message={ message }
        isEdit={isEditMode}
      />}
      </AnimatePresence>

      {/* CONFIRMATION MODALS */}

      {/* CONFIRM DELETE QUESTION */}
      <AnimatePresence>
        {showConfirmDeleteQuestion && questionToDelete && (
          <ConfirmModal
            show={showConfirmDeleteQuestion}
            title="Delete Question"
            message="Are you sure you want to delete the question:"
            highlight={questionToDelete.question}
            confirmText="Yes, Delete"
            cancelText="Cancel"
            onConfirm={() => deleteQuestion(questionToDelete.id)}
            onCancel={() => setShowConfirmDeleteQuestion(false)}
          />
        )}
      </AnimatePresence>

      {/* CONFIRM DELETE USER */}
      <AnimatePresence>
    {showConfirmDeleteUser && userToDelete && (
      <ConfirmModal
      show={showConfirmDeleteUser}
      title="Delete User"
      message="Are you sure you want to delete"
      highlight={userToDelete?.name}
      confirmText="Yes, Delete"
      cancelText="Cancel"
      onConfirm={() => 
        deleteUser(userToDelete.id, userToDelete.name)
        }
      onCancel={() => setShowConfirmDeleteUser(false)}
    />
    )}
      </AnimatePresence>

      {/* CONFIRM MAKE AN ADMIN */}
      <AnimatePresence>
        {showConfirmAdmin && userToMakeAdmin && (
        <ConfirmModal
      show={showConfirmAdmin}
      title="Make Admin"
      message="Are you sure you want to give admin priviledges to"
      highlight={userToMakeAdmin?.name}
      confirmText="Yes, Make Admin"
      cancelText="Cancel"
      onConfirm={() => makeAdmin()}
      onCancel={() => setShowConfirmAdmin(false)}
    />
      )}

      {/* CONFIRM DELETE ADMIN */}
      </AnimatePresence>

      {/* CONFIRM REMOVE AN ADMIN */}
      <AnimatePresence>
        {showConfirmRemoveAdmin && userToRemoveAdmin && (
        <ConfirmModal
      show={showConfirmRemoveAdmin}
      title="Remove as Admin"
      message="Are you sure you want take admin priviledges from"
      highlight={userToRemoveAdmin?.name}
      confirmText="Yes, Remove"
      cancelText="Cancel"
      onConfirm={() => removeAdmin()}
      onCancel={() => setShowConfirmRemoveAdmin(false)}
    />
        )}
      </AnimatePresence>
        
    </div>
  );
};
