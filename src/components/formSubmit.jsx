import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FormSubmit() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const forms = JSON.parse(localStorage.getItem("forms")) || [];
    
    // Try parsing as number first
    const id = parseInt(formId);
    let foundForm = null;

    // Search by id or index
    if (id || id === 0) {
      for (let i = 0; i < forms.length; i++) {
        if (forms[i].id === id || i === id) {
          foundForm = { ...forms[i], index: i };
          break;
        }
      }
    }

    if (foundForm) {
      setForm(foundForm);
      // Initialize responses object
      const initialResponses = {};
      foundForm.questions.forEach((q) => {
        initialResponses[q.id] = q.type === "checkbox" ? [] : "";
      });
      setResponses(initialResponses);
    } else {
      alert("Form not found");
      navigate("/");
    }
  }, [formId, navigate]);

  const handleInputChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const handleCheckboxChange = (questionId, option) => {
    const current = responses[questionId] || [];
    const updated = current.includes(option)
      ? current.filter((opt) => opt !== option)
      : [...current, option];
    setResponses({
      ...responses,
      [questionId]: updated,
    });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (form) {
      for (const question of form.questions) {
        if (question.required) {
          const answer = responses[question.id];
          if (!answer || (Array.isArray(answer) && answer.length === 0)) {
            alert(`"${question.text}" is required`);
            return;
          }
        }
      }
    }

    // Save response
    const forms = JSON.parse(localStorage.getItem("forms")) || [];
    const response = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      answers: responses,
    };

    if (form && form.index !== undefined) {
      if (!forms[form.index].responses) {
        forms[form.index].responses = [];
      }
      forms[form.index].responses.push(response);
      localStorage.setItem("forms", JSON.stringify(forms));
    }

    setSubmitted(true);
    setTimeout(() => navigate("/"), 2000);
  };

  if (!form) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <div className="max-w-2xl w-full p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-white/80">Your response has been recorded. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center mt-10 mb-10 px-4">
      <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="max-w-3xl w-full p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
        <div className="absolute inset-0 rounded-3xl border-[3px] pointer-events-none border-transparent animate-neonGlow"></div>

        <h1 className="text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">
          {form.title}
        </h1>
        {form.description && (
          <p className="text-white/70 text-center mb-8">{form.description}</p>
        )}

        <div className="space-y-6">
          {form.questions.map((question, index) => (
            <div key={question.id} className="mb-8">
              <label className="block text-lg font-semibold text-white mb-3">
                {index + 1}. {question.text}
                {question.required && <span className="text-red-400 ml-1">*</span>}
              </label>

              {question.type === "shortAnswer" && (
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  className="w-full p-3 rounded-xl text-white bg-white/20 border border-white/30 focus:border-purple-400 focus:ring-purple-300 focus:ring-2 transition-all outline-none"
                  value={responses[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                />
              )}

              {question.type === "paragraph" && (
                <textarea
                  placeholder="Enter your answer..."
                  rows="5"
                  className="w-full p-3 rounded-xl text-white bg-white/20 border border-white/30 focus:border-purple-400 focus:ring-purple-300 focus:ring-2 transition-all outline-none"
                  value={responses[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                ></textarea>
              )}

              {question.type === "multipleChoice" && (
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label key={option} className="flex items-center text-white cursor-pointer gap-3">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={responses[question.id] === option}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === "checkbox" && (
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label key={option} className="flex items-center text-white cursor-pointer gap-3">
                      <input
                        type="checkbox"
                        checked={(responses[question.id] || []).includes(option)}
                        onChange={() => handleCheckboxChange(question.id, option)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === "dropdown" && (
                <select
                  className="w-full p-3 rounded-xl text-black bg-white border border-white/30 focus:border-purple-400 focus:ring-purple-300 focus:ring-2 transition-all outline-none"
                  value={responses[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all font-semibold"
          >
            Submit Response
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl shadow-lg transition-all font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
