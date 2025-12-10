import React from 'react'

export default function About() {
  return (
    <>
        <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

    <section className="max-w-3xl mx-auto prose prose-invert relative">
      {/* glassy card container, only change in this file */}
      <div className="relative px-6 py-10 sm:px-10 sm:py-12 rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-white/5 backdrop-blur-md">
      {/* subtle diagonal sheen */}
      <div className="pointer-events-none absolute -left-20 -top-8 w-[140%] h-48 bg-linear-to-r from-white/5 via-white/10 to-transparent transform -skew-x-6 blur-sm opacity-40"></div>
        {/* inner content area keeps text readable */}
        <div className="relative z-10 text-gray-100">
      <h1 className="text-4xl font-bold mb-4">About — Anonymous Feedback System</h1>

      <p className="text-lg leading-relaxed">
        This project is a lightweight, privacy-first anonymous feedback system built with React and Vite.
        It lets organizations and communities collect honest, unfiltered feedback from users while protecting
        submitters' identities. Designed for clarity and ease-of-use, the interface focuses on fast submissions
        and clear insights — not on tracking people.
      </p>

      <h2 className="mt-6 text-2xl font-semibold">Why this matters</h2>
      <ul>
        <li>Encourages candid, honest feedback by removing identity barriers.</li>
        <li>Respects privacy — no unnecessary user-tracking or profiling.</li>
        <li>Simple and fast — for teams that want measurable improvements, not friction.</li>
      </ul>

      <h2 className="mt-6 text-2xl font-semibold">Key features</h2>
      <ol>
        <li>Submit anonymous feedback quickly from any device.</li>
        <li>Clean, accessible UI with a premium visual design.</li>
        <li>Future-ready: easy to integrate storage, analytics, and moderation layers.
        </li>
      </ol>

      <p className="mt-6 text-lg">
        Want to make the system yours? Check the source, customize the form, or add integrations for metrics and moderation.
        We welcome contributions and improvements — build a safer feedback culture.
      </p>
        </div>
      </div>
    </section>
    </>
  );
}

