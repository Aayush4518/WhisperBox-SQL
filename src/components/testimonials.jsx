import React, { useEffect, useRef, useState } from "react";

const SAMPLE_TESTIMONIALS = [
  {
    id: 1,
    name: "Aisha Khan",
    role: "HR Manager",
    avatar: "🧑🏽‍💼",
    quote:
      "WhisperBox made collecting anonymous feedback effortless — we improved employee satisfaction in weeks.",
  },
  {
    id: 2,
    name: "Diego Martinez",
    role: "Product Lead",
    avatar: "🧑🏻‍💻",
    quote:
      "Beautiful UI, quick setup, and the analytics helped guide our product roadmap decisions.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Event Coordinator",
    avatar: "👩🏽‍🎤",
    quote:
      "Creating an RSVP and feedback form took minutes — responses poured in from every channel.",
  },
  {
    id: 4,
    name: "Liam O'Connor",
    role: "Operations",
    avatar: "👨🏼‍🔧",
    quote:
      "Encrypted responses and GDPR features gave us the confidence to collect sensitive feedback.",
  },
  {
    id: 5,
    name: "Sara Lee",
    role: "Marketing",
    avatar: "👩🏽‍💼",
    quote:
      "Customizable forms helped us run targeted campaigns and doubled our response rate.",
  },
  {
    id: 6,
    name: "Tom Becker",
    role: "Founder",
    avatar: "👨🏻‍💼",
    quote: "The integrations saved us hours every week by automating follow-ups.",
  },
  {
    id: 7,
    name: "Nora Ali",
    role: "Researcher",
    avatar: "👩🏿‍🔬",
    quote: "Anonymous responses improved the honesty and depth of our surveys.",
  },
  {
    id: 8,
    name: "Carlos Ruiz",
    role: "Event Host",
    avatar: "🧑🏽‍🎤",
    quote: "Easy-to-build feedback forms helped us collect real-time attendee insights.",
  },
  {
    id: 9,
    name: "Mina Park",
    role: "Product Designer",
    avatar: "👩🏻‍🎨",
    quote: "I love the clean UI — it made forms look professional instantly.",
  },
  {
    id: 10,
    name: "Jon Wells",
    role: "Analyst",
    avatar: "👨🏼‍💻",
    quote: "Real-time analytics gave us fast, actionable insights.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const autoplayRef = useRef(null);

  const len = SAMPLE_TESTIMONIALS.length;

  const next = () => setIndex((i) => (i + 1) % len);
  const prev = () => setIndex((i) => (i - 1 + len) % len);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    autoplayRef.current = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(autoplayRef.current);
  }, [paused]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    setPaused(true);
  };

  const onTouchEnd = (e) => {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = (touchStartX.current || 0) - endX;
    const threshold = 50;
    if (delta > threshold) next();
    else if (delta < -threshold) prev();
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <section className="relative mx-auto max-w-4xl px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">What people say</h2>
        <p className="text-white/70 mt-2 max-w-2xl mx-auto">Real feedback from teams and organizers who switched to WhisperBox.</p>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Slider track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SAMPLE_TESTIMONIALS.map((t) => (
            <div key={t.id} className="flex-none w-full px-4">
              <div className="bg-white/6 backdrop-blur-lg border border-white/10 rounded-3xl p-8 min-h-[150px] flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-linear-to-br from-indigo-500 to-purple-500">
                    <span className="text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-white/60 text-sm">{t.role}</p>
                  </div>
                </div>

                <p className="text-white/80 text-lg md:text-xl leading-relaxed">“{t.quote}”</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        {/* <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/6 hover:bg-white/10 p-2 rounded-full text-white"
        >
          ‹
        </button>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/6 hover:bg-white/10 p-2 rounded-full text-white"
        >
          ›
        </button> */}
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {SAMPLE_TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${i === index ? "bg-purple-400" : "bg-white/20"}`}
            aria-label={`Show testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
