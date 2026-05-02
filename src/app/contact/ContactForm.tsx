'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  const inputClass =
    'px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm focus:outline-none focus:border-[#4a5240] transition-colors';

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
        <div className="w-16 h-16 rounded-full bg-[#4a5240]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#4a5240]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 className="font-playfair text-2xl text-[#2e3328] mb-2">Message Sent</h3>
          <p className="font-cormorant italic text-lg text-[#4a5240] leading-relaxed max-w-sm">
            Thank you for reaching out. We will be in touch with you soon. You are seen and welcome here.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="font-lato text-xs tracking-widest uppercase text-[#4a5240] underline underline-offset-4 hover:text-[#2e3328] transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-playfair text-2xl text-[#2e3328] mb-8">Send a Message</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <input
            name="firstName"
            type="text"
            placeholder="First Name *"
            required
            className={inputClass}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className={inputClass}
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email Address *"
          required
          className={inputClass}
        />
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          className={inputClass}
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Your message... *"
          required
          className={`${inputClass} resize-none`}
        />

        {status === 'error' && (
          <p className="font-lato text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-3 bg-[#2e3328] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {status === 'loading' ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}
