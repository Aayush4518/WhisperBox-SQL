import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormTemplate() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "" }]);
  };

  const updateQuestion = (index, value) => {
    const q = [...questions];
    q[index].text = value;
    setQuestions(q);
  };

  const publishForm = () => {
    if (questions.length === 0) {
      alert("Add at least one question!");
      return;
    }

    // Generate random 6-digit ID
    const id = Math.floor(100000 + Math.random() * 900000).toString();

    // Load existing forms
    const stored = JSON.parse(localStorage.getItem("formsData")) || {};

    // Save new form
    stored[id] = {
      title: "Untitled Form",
      questions: questions,
      createdAt: new Date().toLocaleString()
    };

    localStorage.setItem("formsData", JSON.stringify(stored));

    alert(`Form Published! Your Form ID: ${id}`);

    navigate(`/form/${id}`);
  };

  return (
    <div className="text-white max-w-2xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">Create Your Form</h1>

      {/* Questions List */}
      {questions.map((q, idx) => (
        <div key={idx} className="p-4 bg-white/10 rounded-xl mb-4">
          <label className="text-lg">Question {idx + 1}</label>
          <input
            type="text"
            className="w-full p-2 mt-2 rounded bg-white/20"
            value={q.text}
            onChange={(e) => updateQuestion(idx, e.target.value)}
            placeholder="Enter your question"
          />
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="px-6 py-3 bg-purple-600 rounded-xl mr-4"
      >
        + Add Question
      </button>

      <button
        onClick={publishForm}
        className="px-6 py-3 bg-green-600 rounded-xl"
      >
        Publish Form
      </button>
    </div>
  );
}
