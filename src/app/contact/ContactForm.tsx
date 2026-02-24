"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const subjects = [
  { value: "", label: "Select a topic..." },
  { value: "Job Opportunity", label: "Job Opportunity" },
  { value: "Coffee Chat", label: "Coffee Chat" },
  { value: "Collaboration", label: "Collaboration" },
  { value: "General Inquiry", label: "General Inquiry" },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/xzdarqlg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-8">
        <p className="text-neutral-900 font-medium">Message sent!</p>
        <p className="mt-1 text-[15px] text-neutral-500">I&apos;ll get back to you within 24–48 hours.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 text-[14px] text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 transition-colors">
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = "w-full rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-neutral-900 mb-5">Send a Message</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-[13px] font-medium text-neutral-500 mb-1.5">Name *</label>
            <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block text-[13px] font-medium text-neutral-500 mb-1.5">Email *</label>
            <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-[13px] font-medium text-neutral-500 mb-1.5">Subject *</label>
          <select id="subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={`${inputClass} appearance-none`}>
            {subjects.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-[13px] font-medium text-neutral-500 mb-1.5">Message *</label>
          <textarea id="message" required minLength={50} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about the opportunity..." className={`${inputClass} resize-none`} />
        </div>

        {status === "error" && (
          <p className="text-[14px] text-red-600">Something went wrong. Please try again or email me directly.</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md bg-neutral-900 px-5 py-2.5 text-[14px] font-medium text-white hover:bg-neutral-800 disabled:opacity-50 transition-colors"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
