import Navbar from './components/navbar.jsx'
import Body from './components/body.jsx'
import About from "./components/about";
import Contact from "./components/contact";
import FormBuilder from "./components/formBuilder";
import FormSubmit from "./components/formSubmit";
import FormResponses from "./components/formResponses";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-fixed">
      {/* Base gradient layer */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-black/85 via-[#0b1226]/70 to-[#1f0e2b]/60"></div>

      {/* Subtle color spots for depth (radial gradients via Tailwind arbitrary) */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(600px_400px_at_10%_20%,rgba(99,102,241,0.12),transparent),radial-gradient(500px_320px_at_90%_80%,rgba(236,72,153,0.06),transparent)]"></div>

      {/* Soft reflective sheen across the whole app */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.02))] mix-blend-overlay pointer-events-none"></div>

      {/* Large translucent glass layer to create frosted glass background effect */}
      <div className="absolute inset-0 -z-5 bg-white/5 backdrop-blur-sm"></div>

      <Navbar />

      <main className="relative z-10 flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Body />} />     {/* Home Page */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/form/create" element={<FormBuilder />} />
          <Route path="/form/edit/:id" element={<FormBuilder />} />
          <Route path="/form/submit/:formId" element={<FormSubmit />} />
          <Route path="/form/responses/:formId" element={<FormResponses />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
