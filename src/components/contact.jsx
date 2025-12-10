import React, { useState } from 'react'

export default function Contact() {
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [hadEmail, setHadEmail] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!message || !message.trim()) {
            setError('Please enter a message.')
            return
        }

        setError('')

        // Emulate a successful submission and show a confirmation toast
        setHadEmail(!!(email && email.trim()))
        setShowToast(true)
        setMessage('')
        setEmail('')

        // Auto-hide after 3 seconds
        setTimeout(() => setShowToast(false), 3000)
    }
    return (
        <>
            <div className="fixed inset-0 -z-10 w-full h-full bg-fixed [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <section className="max-w-3xl mx-auto prose prose-invert relative py-12 px-4 sm:px-6 lg:px-8">
                {/* glassy card container, matches About page styles */}
                <div className="relative px-6 py-10 sm:px-10 sm:py-12 rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-white/5 backdrop-blur-md">
                    {/* subtle diagonal sheen */}
                    <div className="pointer-events-none absolute -left-20 -top-8 w-[140%] h-48 bg-linear-to-r from-white/5 via-white/10 to-transparent transform -skew-x-6 blur-sm opacity-40"></div>

                    <div className="relative z-10 text-gray-100">
                        <h1 className="text-4xl font-bold mb-4">Contact — Anonymous Feedback</h1>

                        <p className="text-lg leading-relaxed mb-6">
                            Have questions, suggestions, or want to integrate this system with your organization?
                            Use this form to send a message — we respect privacy and you can remain anonymous.
                        </p>

                        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                                    Message
                                </label>
                                <div className="mt-1">
                                    <textarea id="message" name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required className="block w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Share feedback, ideas, or questions — your identity won't be captured." />
                                </div>
                                {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                                    Email (optional)
                                </label>
                                <div className="mt-1">
                                        <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="your@email.example (optional)" />
                                </div>
                                <p className="mt-2 text-sm text-gray-400">Leave blank to remain fully anonymous.</p>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <button type="submit" className="inline-flex items-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-semibold text-black shadow-sm hover:opacity-90">Send Message</button>

                                <div className="text-sm text-gray-400">
                                    Or reach us at <a href="mailto:hello@example.com" className="text-cyan-300 underline">akashlovesabhishek@example.com</a>
                                </div>
                            </div>
                        </form>

                        <hr className="my-8 border-white/5" />

                        <div className="text-sm text-gray-400">
                            <p>We typically respond within a few business days. If your message is sensitive, do not include identifying information.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Toast / popup confirmation */}
            {showToast && (
                <div aria-live="polite" className="fixed right-6 bottom-6 z-50">
                    <div role="status" className="max-w-sm w-full bg-emerald-500 text-black rounded-2xl px-4 py-3 shadow-xl flex items-start gap-3 border border-white/10 backdrop-blur-md">
                        <div className="shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.88a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className="flex-1">
                            <p className="font-semibold">Message sent</p>
                            <p className="text-sm opacity-90">Thanks — we received your message{email ? ' and will reply to the provided email' : ''}.</p>
                        </div>

                        <div className="ml-2 grid place-items-start">
                            <button onClick={() => setShowToast(false)} className="text-white/80 hover:text-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-white/30">×</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

