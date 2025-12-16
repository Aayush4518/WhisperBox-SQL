import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GiveFeedback = () => {
  const [formId, setFormId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formId.trim()) {
      navigate(`/form/submit/${formId}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Give Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="formId" className="block text-white mb-2">Form ID</label>
          <input
            type="text"
            id="formId"
            value={formId}
            onChange={(e) => setFormId(e.target.value)}
            className="w-full px-3 py-2 bg-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter the form ID"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default GiveFeedback;