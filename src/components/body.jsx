import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import reviews from "../assets/reviews.svg";
import review2 from "../assets/review2.svg";
import Testimonials from "./testimonials";

export default function Body() {
  const formsRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // FORMS STORAGE
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch("http://localhost:5000/forms");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setForms(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError(err.message);
        setForms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);


  // SCROLL LISTENER FOR PARALLAX WINGS
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to form section
  const scrollToForms = () => {
    formsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  console.log(forms);

  return (
    <div className="relative w-full overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Fullscreen Hero Section */}
      <div className="w-full h-screen flex items-center justify-center">
        <div
          className="
            relative max-w-3xl w-full text-center p-10 
            rounded-3xl overflow-hidden 
            backdrop-blur-xl bg-white/5 
            shadow-[0_0_25px_rgba(168,85,247,0.4)]
            border border-purple-500/40 
            animate-floating mb-40
          "
        >
          {/* Neon Border */}
          <div
            className="
              absolute inset-0 rounded-3xl border-[3px]
              border-transparent animate-neonGlow pointer-events-none
            "
          ></div>

          <h1 className="relative text-5xl font-extrabold text-white drop-shadow-lg">
            Welcome to <span className="text-purple-400">WhisperBox</span>
          </h1>

          <p className="mt-4 text-xl text-white/90">
            <button
              onClick={scrollToForms}
              className="px-6 py-3 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-all"
            >
              Get Started Anonymously
            </button>
          </p>
        </div>
      </div>

      {/* Parallax Wing Images */}
      <div className="relative overflow-hidden">

        {/* Wing Right */}
        <div
          className="fixed top-50 right-10 h-80 w-80 pointer-events-none"
          style={{
            transform: `translateX(${scrollY * 1.0}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src={review2}
            alt="review2"
            className="h-full w-full animate-floating object-contain"
          />
        </div>

        {/* Wing Left */}
        <div
          className="fixed top-50 left-10 h-80 w-80 pointer-events-none"
          style={{
            transform: `translateX(${scrollY * -1.0}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src={reviews}
            alt="reviews"
            className="h-full w-full animate-floating object-contain"
          />
        </div>
      </div>

      <div>
        {/* BENEFITS SECTION */}
        <div className="relative mx-auto max-w-6xl p-8 mt-40 mb-40 px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose WhisperBox?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <div className="group p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-white/15">
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">⚡</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Create in Minutes</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Create anonymous survey forms in minutes. No coding required. Just drag, drop, and publish.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="group p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-white/15">
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🤝</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Anonymous Feedback</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Collect honest feedback anonymously. Encourage your audience to share their true thoughts without hesitation.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="group p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-white/15">
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🎨</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Highly Customizable</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Add multiple question types, customize branding, and engage your audience with beautiful surveys and polls.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="group p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-white/15">
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🔗</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100+ Integrations</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Connect with scheduling apps, payment processors, project management software, and more to automate workflows.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="group p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-white/15">
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🔒</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bank-Level Security</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                256-bit SSL encryption, GDPR compliant, CCPA compliant, and optional HIPAA features for complete data protection.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="group p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-white/15">
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">📊</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Analytics</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Track responses in real-time, get detailed insights, and make informed decisions with powerful analytics.
              </p>
            </div>

            {/* Benefit 7 */}
            <div className="group p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-white/15">
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">📱</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Platform</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Get feedback from multiple platforms and reach your audience wherever they are - web, mobile, social media.
              </p>
            </div>

            {/* Benefit 8 */}
            <div className="group p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-white/15">
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">✨</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Informed Decisions</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Use transparent feedback to make meaningful improvements across your organization and drive growth.
              </p>
            </div>
          </div>
        </div>
        <Testimonials />
      </div>


      {/* FORMS SECTION */}
      <div
        ref={formsRef}
        className="
          relative mx-auto max-w-5xl text-center mb-80 p-8 
          bg-white/10 backdrop-blur-lg rounded-2xl 
          shadow-lg border border-white/20 mt-40
        "
      >
        <h2 className="text-3xl font-semibold text-white mb-8">Available Forms</h2>

        {/* Loading state */}
        {loading && (
          <p className="text-white/80 mb-6">Loading forms...</p>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-300">Error loading forms: {error}</p>
            <p className="text-red-300/70 text-sm mt-2">Make sure the backend server is running on http://localhost:5000</p>
          </div>
        )}

        {/* If no forms created */}
        {!loading && forms.length === 0 && !error && (
          <p className="text-white/80 mb-6">No forms created yet. Create one to get started!</p>
        )}

        {/* Show saved forms as cards */}
        {!loading && forms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {forms.map((form) => (
            <div
              key={form.form_id}
              className="p-6 bg-white/10 rounded-xl text-white border border-white/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <h3 className="text-xl font-semibold mb-2">{form.title}</h3>
              <p className="text-white/70 mb-2 text-sm">{form.description}</p>
              <p className="text-white/60 text-xs mb-4">
                Questions: {form.questions?.length || 0}
              </p>
              <div className="flex gap-2 flex-wrap">
                <Link
                  to={`/form/submit/${form.form_id}`}
                  className="flex-1 py-5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm"
                >
                  Fill Form
                </Link>
                <Link
                  to={`/form/responses/${form.form_id}`}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all text-sm"
                >
                  View Responses
                </Link>
                <Link
                  to={`/form/edit/${form.form_id}`}
                  className="flex-1 py-5 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this form?")) {
                      fetch(`http://localhost:5000/forms/${form.form_id}`, {
                        method: "DELETE"
                      })
                        .then(res => res.json())
                        .then(result => {
                          if (result.error) {
                            alert("Error: " + result.error);
                          } else {
                            setForms(forms.filter(f => f.form_id !== form.form_id));
                          }
                        })
                        .catch(err => {
                          console.error(err);
                          alert("Error deleting form");
                        });
                    }
                  }}
                  className="flex-1 cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Create Form Button */}
        <Link
          to="/form/create"
          className="
            mt-8 inline-block px-8 py-3 
            bg-purple-600 hover:bg-purple-700 
            text-white rounded-xl shadow-lg transition-all font-semibold text-lg
          "
        >
          + Create New Form
        </Link>
      </div>

    </div>
  );
}
