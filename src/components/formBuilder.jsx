import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FormBuilder() {
  const { id } = useParams();
  const [formData, setFormData] = useState(() => {
    if (id) {
      const forms = JSON.parse(localStorage.getItem("forms")) || [];
      const form = forms[id];
      return form || {
        title: "",
        description: "",
        questions: [],
        createdAt: new Date().toLocaleString(),
      };
    }
    return {
      title: "",
      description: "",
      questions: [],
      createdAt: new Date().toLocaleString(),
    };
  });

  const [currentQuestionText, setCurrentQuestionText] = useState("");
  const [currentQuestionType, setCurrentQuestionType] = useState("shortAnswer");
  const [currentQuestionRequired, setCurrentQuestionRequired] = useState(false);
  const [currentOptions, setCurrentOptions] = useState("");

  const navigate = useNavigate();

  const addQuestion = () => {
    if (!currentQuestionText.trim()) {
      alert("Please enter a question");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      text: currentQuestionText,
      type: currentQuestionType,
      required: currentQuestionRequired,
      options: currentQuestionType === "multipleChoice" 
        ? currentOptions.split("\n").filter(opt => opt.trim()) 
        : [],
    };

    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });

    // Reset form
    setCurrentQuestionText("");
    setCurrentQuestionType("shortAnswer");
    setCurrentQuestionRequired(false);
    setCurrentOptions("");
  };

  const removeQuestion = (questionId) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== questionId),
    });
  };

  const handleSaveForm = () => {
    if (!formData.title.trim()) {
      alert("Please enter a form title");
      return;
    }

    if (formData.questions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    const formsData = JSON.parse(localStorage.getItem("forms")) || [];
    const formWithResponses = {
      ...formData,
      responses: [],
      id: id || Date.now(),
    };

    if (id) {
      formsData[id] = formWithResponses;
    } else {
      formsData.push(formWithResponses);
    }

    localStorage.setItem("forms", JSON.stringify(formsData));
    alert("Form saved successfully!");
    navigate("/");
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center mt-10 mb-10 px-4">
      <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="max-w-4xl w-full p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
        <div className="absolute inset-0 rounded-3xl border-[3px] pointer-events-none border-transparent animate-neonGlow"></div>

        <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
          {id ? "Edit Form" : "Create a New Form"}
        </h1>

        {/* Form Title & Description */}
        <div className="mb-6">
          <label className="block text-lg text-white mb-2">Form Title *</label>
          <input
            type="text"
            placeholder="Enter form title..."
            className="w-full p-3 rounded-xl text-white bg-white/20 border border-white/30 focus:border-purple-400 focus:ring-purple-300 focus:ring-2 transition-all outline-none"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="mb-8">
          <label className="block text-lg text-white mb-2">Description</label>
          <textarea
            placeholder="Enter form description..."
            rows="3"
            className="w-full p-3 rounded-xl text-white bg-white/20 border border-white/30 focus:border-purple-400 focus:ring-purple-300 focus:ring-2 transition-all outline-none"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>

        {/* Questions List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Questions</h2>
          {formData.questions.length === 0 ? (
            <p className="text-white/60 text-center py-4">No questions added yet. Add one below!</p>
          ) : (
            <div className="space-y-4">
              {formData.questions.map((question, index) => (
                <div key={question.id} className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-white font-semibold">Q{index + 1}: {question.text}</p>
                      <p className="text-white/60 text-sm">Type: {question.type} {question.required && "• Required"}</p>
                      {question.options.length > 0 && (
                        <p className="text-white/60 text-sm">Options: {question.options.join(", ")}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Question Section */}
        <div className="bg-white/10 p-6 rounded-xl border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Add Question</h3>

          <div className="mb-4">
            <label className="block text-white mb-2">Question *</label>
            <input
              type="text"
              placeholder="Enter your question..."
              className="w-full p-3 rounded-xl text-white bg-white/20 border border-white/30 focus:border-purple-400 focus:ring-purple-300 focus:ring-2 transition-all outline-none"
              value={currentQuestionText}
              onChange={(e) => setCurrentQuestionText(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Question Type</label>
            <select
              className="w-full p-3 rounded-xl text-black bg-white border border-white/30 focus:border-purple-400 focus:ring-purple-300 focus:ring-2 transition-all outline-none"
              value={currentQuestionType}
              onChange={(e) => setCurrentQuestionType(e.target.value)}
            >
              <option value="shortAnswer">Short Answer</option>
              <option value="paragraph">Paragraph</option>
              <option value="multipleChoice">Multiple Choice</option>
              <option value="checkbox">Checkbox</option>
              <option value="dropdown">Dropdown</option>
            </select>
          </div>

          {(currentQuestionType === "multipleChoice" || currentQuestionType === "checkbox" || currentQuestionType === "dropdown") && (
            <div className="mb-4">
              <label className="block text-white mb-2">Options (one per line) *</label>
              <textarea
                placeholder="Option 1&#10;Option 2&#10;Option 3"
                rows="4"
                className="w-full p-3 rounded-xl text-white bg-white/20 border border-white/30 focus:border-purple-400 focus:ring-purple-300 focus:ring-2 transition-all outline-none"
                value={currentOptions}
                onChange={(e) => setCurrentOptions(e.target.value)}
              ></textarea>
            </div>
          )}

          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="required"
              checked={currentQuestionRequired}
              onChange={(e) => setCurrentQuestionRequired(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="required" className="text-white cursor-pointer">
              Make this question required
            </label>
          </div>

          <button
            onClick={addQuestion}
            className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all font-semibold"
          >
            Add Question
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSaveForm}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all font-semibold"
          >
            Save Form
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
