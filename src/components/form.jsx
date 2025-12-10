import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [questionsToAsk, setQuestionsToAsk] = useState(5);

  const navigate = useNavigate();

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a form title");
      return;
    }

    if (questionsToAsk > totalQuestions) {
      alert("Questions to ask cannot be more than total questions");
      return;
    }

    if (totalQuestions < 1 || questionsToAsk < 1) {
      alert("Questions must be at least 1");
      return;
    }

    const newForm = {
      title,
      description,
      totalQuestions,
      questionsToAsk,
      createdAt: new Date().toLocaleString(),
    };

    // Save to localStorage
    const existingForms = JSON.parse(localStorage.getItem("forms")) || [];
    existingForms.push(newForm);
    localStorage.setItem("forms", JSON.stringify(existingForms));

    // Redirect to Homepage
    navigate("/");
    console.log("Form saved:", newForm);
  };

  return (
    
    <div className="relative w-full h-auto flex items-center justify-center mt-20 mb-40 px-4">
            <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>


      {/* Glass Card */}
      <div className="
        max-w-2xl w-full p-10 
        bg-white/10 backdrop-blur-xl rounded-3xl 
        border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.3)]
        animate-floating
      ">
        
        {/* Neon Border */}
        <div className="
          absolute inset-0 rounded-3xl border-[3px] pointer-events-none
          border-transparent animate-neonGlow
        "></div>

        <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Create a New Form
        </h1>

        {/* Title */}
        <div className="mb-6 text-left">
          <label className="block text-lg text-white mb-2">Form Title</label>
          <input
            type="text"
            placeholder="Enter form title..."
            className="
              w-full p-3 rounded-xl text-white 
              bg-white/20 border border-white/30 
              focus:border-purple-400 focus:ring-purple-300 focus:ring-2
              transition-all outline-none
            "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-8 text-left">
          <label className="block text-lg text-white mb-2">Description</label>
          <textarea
            placeholder="Enter Feedback/Message..."
            rows={4}
            className="
              w-full p-3 rounded-xl text-white 
              bg-white/20 border border-white/30 
              focus:border-purple-400 focus:ring-purple-300 focus:ring-2 
              transition-all outline-none
            "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Total Questions */}
        <div className="mb-6 text-left">
          <label className="block text-lg text-white mb-2">Total Number of Questions</label>
          <input
            type="number"
            min="1"
            max="100"
            placeholder="Enter total number of questions..."
            className="
              w-full p-3 rounded-xl text-white 
              bg-white/20 border border-white/30 
              focus:border-purple-400 focus:ring-purple-300 focus:ring-2
              transition-all outline-none
            "
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>

        {/* Questions to Ask */}
        <div className="mb-8 text-left">
          <label className="block text-lg text-white mb-2">Number of Questions to Ask</label>
          <input
            type="number"
            min="1"
            max={totalQuestions}
            placeholder="Enter number of questions to ask..."
            className="
              w-full p-3 rounded-xl text-white 
              bg-white/20 border border-white/30 
              focus:border-purple-400 focus:ring-purple-300 focus:ring-2
              transition-all outline-none
            "
            value={questionsToAsk}
            onChange={(e) => setQuestionsToAsk(Math.max(1, parseInt(e.target.value) || 1))}
          />
          <p className="text-sm text-white/70 mt-2">
            The form will ask a random selection of {questionsToAsk} out of {totalQuestions} questions.
          </p>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="
              px-6 py-3 bg-purple-600 hover:bg-purple-700 
              text-white rounded-xl shadow-lg transition-all
            "
          >
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
}
