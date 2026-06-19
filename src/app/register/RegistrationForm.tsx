'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  fullName: string;
  gender: string;
  ageRange: string;
  phone: string;
  email: string;
  address: string;
  occupation: string;
  church: string;
  churchPosition: string;
  updatePreference: string[];
  countdownReminders: string;
  whatsappCommunity: string;
  photoConsent: string;
  declaration: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm text-[#2e3328] focus:outline-none focus:border-[#4a5240] transition-colors placeholder:text-[#9a9a8a]';

const labelClass = 'block font-lato text-xs tracking-widest uppercase text-[#6a6a5a] mb-2';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className={labelClass}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mt-10 mb-6">
      <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-1">{label}</p>
      <h2 className="font-playfair text-2xl text-[#2e3328]">{title}</h2>
      <div className="w-8 h-[1px] bg-[#d4af37] mt-3" />
    </div>
  );
}

// ─── Success / Confirmation Screen ───────────────────────────────────────────

function SuccessScreen({ accessCode, fullName, qrPayload }: { accessCode: string; fullName: string; qrPayload: string }) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(qrPayload, {
      width: 240,
      margin: 2,
      color: { dark: '#2e3328', light: '#faf8f4' },
    }).then(setQrDataUrl).catch(console.error);
  }, [qrPayload]);

  const handlePrint = () => window.print();

  return (
    <div className="flex flex-col items-center text-center gap-8">

      {/* Top message */}
      <div>
        <div className="w-16 h-16 rounded-full bg-[#4a5240]/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[#4a5240]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-2">Registration Complete</p>
        <h2 className="font-cormorant italic text-4xl text-[#2e3328] mb-3">
          Welcome, {fullName.split(' ')[0]}.
        </h2>
        <p className="font-lato text-sm text-[#4a5240] max-w-md leading-relaxed">
          Your registration has been received. A confirmation email with your access code has been
          sent to your inbox. Please check your spam folder if you don&apos;t see it.
        </p>
      </div>

      {/* Access code card */}
      <div
        id="access-card"
        className="w-full max-w-sm bg-[#2e3328] rounded-2xl px-8 py-8 flex flex-col items-center gap-5 shadow-xl"
      >
        <p className="font-lato text-[10px] tracking-[0.4em] uppercase text-[#d4af37]">
          The Beloved Love Initiative
        </p>
        <p className="font-lato text-[10px] tracking-[0.2em] uppercase text-[#9a9a8a] text-center leading-relaxed">
          Longest Holy Bible Reading · Guinness World Record
        </p>

        {/* QR Code */}
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt={`QR code for access code ${accessCode}`}
            className="w-44 h-44 rounded-lg"
          />
        ) : (
          <div className="w-44 h-44 rounded-lg bg-[#1a1f14] animate-pulse" />
        )}

        {/* Code */}
        <div className="flex flex-col items-center gap-1">
          <p className="font-lato text-[10px] tracking-[0.3em] uppercase text-white">Access Code</p>
          <p className="font-mono text-2xl font-bold text-[#f5f0e8] tracking-[0.3em]">{accessCode}</p>
        </div>

        <p className="font-lato text-[10px] text-[#6a6a7a] leading-relaxed max-w-xs">
          Present this code at the event entrance. It can be scanned or entered manually.
        </p>
      </div>

      {/* Save reminder */}
      <div className="bg-[#fff8e8] border border-[#d4af37]/40 rounded-xl px-6 py-5 max-w-sm text-left">
        <p className="font-lato text-xs tracking-widest uppercase text-[#b8960c] mb-3">Important</p>
        <ul className="font-lato text-sm text-[#4a5240] leading-relaxed list-disc list-inside flex flex-col gap-1">
          <li>Screenshot or write down your access code.</li>
          <li>Save this page or print it for your records.</li>
          <li>Show the QR code or enter the code at the event entrance.</li>
          <li>A copy has also been emailed to you.</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={handlePrint}
          className="flex-1 px-6 py-3 border border-[#2e3328] text-[#2e3328] font-lato text-xs tracking-widest uppercase rounded-full hover:bg-[#2e3328] hover:text-[#f5f0e8] transition-colors"
        >
          Print / Save as PDF
        </button>
        <a
          href="/"
          className="flex-1 px-6 py-3 bg-[#2e3328] text-[#f5f0e8] font-lato text-xs tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors text-center"
        >
          Back to Home
        </a>
      </div>

    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

const defaultForm: FormData = {
  fullName: '',
  gender: '',
  ageRange: '',
  phone: '',
  email: '',
  address: '',
  occupation: '',
  church: '',
  churchPosition: '',
  updatePreference: [],
  countdownReminders: '',
  whatsappCommunity: '',
  photoConsent: '',
  declaration: '',
};

export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [qrPayload, setQrPayload] = useState('');

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleUpdatePref(val: string) {
    setForm((prev) => ({
      ...prev,
      updatePreference: prev.updatePreference.includes(val)
        ? prev.updatePreference.filter((v) => v !== val)
        : [...prev.updatePreference, val],
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          updatePreference: form.updatePreference.join(', '),
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setAccessCode(json.accessCode);
        setQrPayload(json.qrPayload ?? json.accessCode);
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <SuccessScreen accessCode={accessCode} fullName={form.fullName} qrPayload={qrPayload} />;
  }

  const radioBase =
    'flex items-center gap-3 px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] cursor-pointer hover:border-[#4a5240] transition-colors font-lato text-sm text-[#2e3328] has-[:checked]:border-[#4a5240] has-[:checked]:bg-[#4a5240]/5';

  const checkBase =
    'flex items-center gap-3 px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] cursor-pointer hover:border-[#4a5240] transition-colors font-lato text-sm text-[#2e3328] has-[:checked]:border-[#4a5240] has-[:checked]:bg-[#4a5240]/5';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

      {/* ── SECTION A ── */}
      <SectionHeading label="Section A" title="Personal Information" />

      <Field label="Full Name" required>
        <input
          name="fullName"
          type="text"
          placeholder="As it should appear on your invitation / certificate"
          required
          value={form.fullName}
          onChange={(e) => setField('fullName', e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Gender" required>
        <div className="flex gap-3">
          {['Male', 'Female'].map((g) => (
            <label key={g} className={`${radioBase} flex-1`}>
              <input
                type="radio"
                name="gender"
                value={g}
                required
                checked={form.gender === g}
                onChange={() => setField('gender', g)}
                className="accent-[#4a5240]"
              />
              {g}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Age Range" required>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['Below 18', '18–24', '25–34', '35–44', '45–54', '55 and above'].map((r) => (
            <label key={r} className={radioBase}>
              <input
                type="radio"
                name="ageRange"
                value={r}
                required
                checked={form.ageRange === r}
                onChange={() => setField('ageRange', r)}
                className="accent-[#4a5240]"
              />
              {r}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Phone Number (WhatsApp Preferred)" required>
        <input
          name="phone"
          type="tel"
          placeholder="+234 000 0000 000"
          required
          value={form.phone}
          onChange={(e) => setField('phone', e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Email Address" required>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={(e) => setField('email', e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Residential Address / City" required>
        <input
          name="address"
          type="text"
          placeholder="City or full address"
          required
          value={form.address}
          onChange={(e) => setField('address', e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Occupation">
        <input
          name="occupation"
          type="text"
          placeholder="Optional"
          value={form.occupation}
          onChange={(e) => setField('occupation', e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Church / Ministry / Organization">
        <input
          name="church"
          type="text"
          placeholder="Optional"
          value={form.church}
          onChange={(e) => setField('church', e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Position in Church / Ministry / Organization">
        <input
          name="churchPosition"
          type="text"
          placeholder="Optional"
          value={form.churchPosition}
          onChange={(e) => setField('churchPosition', e.target.value)}
          className={inputClass}
        />
      </Field>

      {/* ── SECTION B (no questions listed in form, spacer) ── */}
      <SectionHeading label="Section B" title="Participation Details" />
      <p className="font-lato text-sm text-[#6a6a5a] -mt-4 leading-relaxed">
        Thank you for committing to participate in the World&apos;s Longest Bible Reading Marathon.
        Your scheduling details will be communicated closer to the event date.
      </p>

      {/* ── SECTION C ── */}
      <SectionHeading label="Section C" title="Event Communication" />

      <Field label="How would you like to receive event updates and reminders?" required>
        <div className="flex flex-col gap-3">
          {['WhatsApp', 'Email'].map((opt) => (
            <label key={opt} className={checkBase}>
              <input
                type="checkbox"
                value={opt}
                checked={form.updatePreference.includes(opt)}
                onChange={() => toggleUpdatePref(opt)}
                className="accent-[#4a5240]"
              />
              {opt}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Would you like to receive daily countdown reminders before and during the event?" required>
        <div className="flex gap-3">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className={`${radioBase} flex-1`}>
              <input
                type="radio"
                name="countdownReminders"
                value={opt}
                required
                checked={form.countdownReminders === opt}
                onChange={() => setField('countdownReminders', opt)}
                className="accent-[#4a5240]"
              />
              {opt}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Would you like to join the official event WhatsApp community?" required>
        <div className="flex gap-3">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className={`${radioBase} flex-1`}>
              <input
                type="radio"
                name="whatsappCommunity"
                value={opt}
                required
                checked={form.whatsappCommunity === opt}
                onChange={() => setField('whatsappCommunity', opt)}
                className="accent-[#4a5240]"
              />
              {opt}
            </label>
          ))}
        </div>
      </Field>

      {/* ── SECTION D ── */}
      <SectionHeading label="Section D" title="Media &amp; Consent" />

      <Field label="Consent for Photography and Video Recording" required>
        <p className="font-lato text-xs text-[#6a6a5a] leading-relaxed mb-3">
          During the event, photographs and video recordings may be taken for documentation, media
          coverage, publicity, and Guinness World Record verification purposes.
        </p>
        <div className="flex gap-3">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className={`${radioBase} flex-1`}>
              <input
                type="radio"
                name="photoConsent"
                value={opt}
                required
                checked={form.photoConsent === opt}
                onChange={() => setField('photoConsent', opt)}
                className="accent-[#4a5240]"
              />
              {opt}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Declaration" required>
        <p className="font-lato text-xs text-[#6a6a5a] leading-relaxed mb-3">
          I confirm that the information provided is accurate and that I am willing to participate in
          and support the Guinness World Record attempt for the World&apos;s Longest Bible Reading Marathon.
        </p>
        <label className={checkBase}>
          <input
            type="checkbox"
            name="declaration"
            value="agree"
            required
            checked={form.declaration === 'agree'}
            onChange={(e) => setField('declaration', e.target.checked ? 'agree' : '')}
            className="accent-[#4a5240]"
          />
          <span>Yes, I Agree</span>
        </label>
      </Field>

      {/* Error */}
      {status === 'error' && (
        <p className="font-lato text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 px-8 py-4 bg-[#2e3328] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Registering…
          </>
        ) : (
          'Complete Registration'
        )}
      </button>

      <p className="font-lato text-xs text-[#9a9a8a] text-center leading-relaxed">
        By submitting this form you confirm the accuracy of the information provided.
        Your access code will be emailed to you immediately.
      </p>
    </form>
  );
}
