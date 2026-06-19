'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Registration {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  ageRange: string;
  address: string;
  occupation?: string;
  church?: string;
  churchPosition?: string;
  photoConsent: string;
  whatsappCommunity?: string;
  accessCode: string;
  status: 'registered' | 'checked_in' | 'cancelled';
  registeredAt: string;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Registration['status'] }) {
  const map = {
    registered: { label: 'Registered', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    checked_in: { label: 'Checked In ✓', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
  };
  const s = map[status] ?? map.registered;
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-lato tracking-widest uppercase border ${s.color}`}>
      {s.label}
    </span>
  );
}

// ─── Detail row ───────────────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-[#ffffff08]">
      <span className="font-lato text-[10px] tracking-[0.25em] uppercase text-[#6a6a7a]">{label}</span>
      <span className="font-lato text-sm text-[#e8e4dc]">{value}</span>
    </div>
  );
}

// ─── Inner component (uses useSearchParams) ───────────────────────────────────

function CheckInInner() {
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get('code') ?? '';

  const [code, setCode] = useState(codeFromUrl.toUpperCase());
  const [pin, setPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);
  const [lookupStatus, setLookupStatus] = useState<'idle' | 'loading' | 'found' | 'not_found' | 'error'>('idle');
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [checkInError, setCheckInError] = useState('');

  const lookup = useCallback(async (lookupCode: string) => {
    if (!lookupCode.trim()) return;
    setLookupStatus('loading');
    setRegistration(null);
    setCheckInStatus('idle');
    setCheckInError('');

    try {
      const res = await fetch(`/api/lookup?code=${encodeURIComponent(lookupCode.trim().toUpperCase())}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setRegistration(json.registration);
        setLookupStatus('found');
      } else if (res.status === 404) {
        setLookupStatus('not_found');
        setErrorMsg('No registration found for this code.');
      } else {
        setLookupStatus('error');
        setErrorMsg(json.error ?? 'Lookup failed.');
      }
    } catch {
      setLookupStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }, []);

  // Auto-lookup if code came from URL (QR scan)
  useEffect(() => {
    if (codeFromUrl) lookup(codeFromUrl);
  }, [codeFromUrl, lookup]);

  async function handleCheckIn() {
    if (!registration || !pin) return;
    setCheckInStatus('loading');
    setCheckInError('');

    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: registration._id, pin }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setRegistration((prev) => prev ? { ...prev, status: 'checked_in' } : prev);
        setCheckInStatus('done');
      } else {
        setCheckInError(json.error ?? 'Check-in failed.');
        setCheckInStatus('error');
      }
    } catch {
      setCheckInError('Network error. Please try again.');
      setCheckInStatus('error');
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-[#1a1f14] border border-[#ffffff15] text-[#f5f0e8] font-lato text-sm placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#d4af37]/50 transition-colors tracking-widest';

  return (
    <div className="flex flex-col gap-6">

      {/* Code input */}
      <div className="flex flex-col gap-3">
        <label className="font-lato text-[10px] tracking-[0.3em] uppercase text-[#9a9a8a]">
          Access Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && lookup(code)}
            placeholder="e.g. AO001LHBR"
            className={inputClass}
            autoComplete="off"
            autoCapitalize="characters"
          />
          <button
            onClick={() => lookup(code)}
            disabled={lookupStatus === 'loading' || !code.trim()}
            className="px-5 py-3 bg-[#d4af37] text-[#2e3328] font-lato text-xs tracking-widest uppercase rounded-lg hover:bg-[#f5e060] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold shrink-0"
          >
            {lookupStatus === 'loading' ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : 'Search'}
          </button>
        </div>
      </div>

      {/* Not found / error */}
      {(lookupStatus === 'not_found' || lookupStatus === 'error') && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          <p className="font-lato text-sm text-red-400">{errorMsg}</p>
        </div>
      )}

      {/* Registration card */}
      {registration && lookupStatus === 'found' && (
        <div className="bg-[#1a1f14] rounded-2xl overflow-hidden border border-[#ffffff10]">

          {/* Card header */}
          <div className="px-6 pt-6 pb-4 border-b border-[#ffffff08]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-cormorant italic text-2xl text-[#f5f0e8] leading-tight">
                  {registration.fullName}
                </p>
                <p className="font-mono text-xs text-[#d4af37] mt-1 tracking-widest">
                  {registration.accessCode}
                </p>
              </div>
              <StatusBadge status={registration.status} />
            </div>
          </div>

          {/* Details */}
          <div className="px-6 pb-2">
            <Row label="Email" value={registration.email} />
            <Row label="Phone" value={registration.phone} />
            <Row label="Gender" value={registration.gender} />
            <Row label="Age Range" value={registration.ageRange} />
            <Row label="Address" value={registration.address} />
            <Row label="Occupation" value={registration.occupation} />
            <Row label="Church / Ministry" value={registration.church} />
            <Row label="Photo Consent" value={registration.photoConsent} />
            <Row
              label="Registered At"
              value={new Date(registration.registeredAt).toLocaleString('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            />
          </div>

          {/* Check-in action */}
          {registration.status === 'registered' && (
            <div className="px-6 py-5 border-t border-[#ffffff08] flex flex-col gap-3">
              {!pinSaved ? (
                <>
                  <label className="font-lato text-[10px] tracking-[0.3em] uppercase text-[#9a9a8a]">
                    Staff PIN to confirm
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Enter staff PIN"
                      className={inputClass}
                      onKeyDown={(e) => e.key === 'Enter' && handleCheckIn()}
                    />
                    <button
                      onClick={() => { if (pin) setPinSaved(true); }}
                      disabled={!pin}
                      className="px-4 py-3 bg-[#ffffff10] text-[#9a9a8a] font-lato text-xs tracking-widest uppercase rounded-lg hover:bg-[#ffffff18] transition-colors disabled:opacity-50 shrink-0"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <p className="font-lato text-xs text-[#6a6a7a]">PIN saved for this session</p>
              )}

              {checkInError && (
                <p className="font-lato text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                  {checkInError}
                </p>
              )}

              <button
                onClick={handleCheckIn}
                disabled={checkInStatus === 'loading' || !pin}
                className="w-full py-3 bg-green-600 text-white font-lato text-sm tracking-widest uppercase rounded-xl hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {checkInStatus === 'loading' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Checking in…
                  </>
                ) : '✓ Mark as Checked In'}
              </button>
            </div>
          )}

          {/* Already checked in */}
          {registration.status === 'checked_in' && (
            <div className="px-6 py-5 border-t border-[#ffffff08]">
              <p className="font-lato text-sm text-green-400 text-center tracking-wide">
                ✓ This participant has already been checked in.
              </p>
            </div>
          )}

          {/* Cancelled */}
          {registration.status === 'cancelled' && (
            <div className="px-6 py-5 border-t border-[#ffffff08]">
              <p className="font-lato text-sm text-red-400 text-center tracking-wide">
                ✕ This registration has been cancelled.
              </p>
            </div>
          )}
        </div>
      )}

      {/* New search after check-in */}
      {checkInStatus === 'done' && (
        <button
          onClick={() => {
            setCode('');
            setLookupStatus('idle');
            setRegistration(null);
            setCheckInStatus('idle');
          }}
          className="w-full py-3 border border-[#d4af37]/30 text-[#d4af37] font-lato text-xs tracking-widest uppercase rounded-xl hover:bg-[#d4af37]/10 transition-colors"
        >
          Check In Next Person
        </button>
      )}
    </div>
  );
}

// ─── Export wrapped in Suspense (required for useSearchParams) ────────────────

export default function CheckInClient() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <svg className="w-6 h-6 animate-spin text-[#d4af37]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    }>
      <CheckInInner />
    </Suspense>
  );
}
