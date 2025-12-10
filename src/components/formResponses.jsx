import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FormResponses() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const forms = JSON.parse(localStorage.getItem("forms")) || [];
    const id = parseInt(formId);
    let foundForm = null;

    for (let i = 0; i < forms.length; i++) {
      if (forms[i].id === id || i === id) {
        foundForm = forms[i];
        break;
      }
    }

    if (foundForm) {
      setForm(foundForm);
      setResponses(foundForm.responses || []);
    } else {
      alert("Form not found");
      navigate("/");
    }
  }, [formId, navigate]);

  const getAnswerText = (question, response) => {
    const answer = response.answers[question.id];
    if (!answer) return "No response";
    if (Array.isArray(answer)) return answer.join(", ");
    return answer;
  };

  if (!form) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center mt-10 mb-10 px-4">
      <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.3)] mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{form.title}</h1>
          <p className="text-white/70 mb-4">{form.description}</p>
          <p className="text-white/60 text-sm">Total Responses: {responses.length}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
          >
            Back to Home
          </button>
        </div>

        {/* Responses */}
        {responses.length === 0 ? (
          <div className="p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 text-center">
            <p className="text-white/70 text-xl">No responses yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {responses.map((response, index) => (
              <div
                key={response.id}
                className="p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Response #{index + 1} - {response.timestamp}
                </h3>
                <div className="space-y-4">
                  {form.questions.map((question) => (
                    <div key={question.id} className="border-l-4 border-purple-500 pl-4 py-2">
                      <p className="text-white font-semibold mb-2">{question.text}</p>
                      <p className="text-white/80 bg-white/5 p-3 rounded">{getAnswerText(question, response)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
