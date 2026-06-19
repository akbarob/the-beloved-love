'use client';

import { useState } from 'react';

export default function ExportButton() {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleExport() {
    if (!pin.trim()) return;
    setStatus('loading');
    setError('');

    try {
      const res = await fetch(`/api/export?pin=${encodeURIComponent(pin)}`);

      if (res.status === 401) {
        setError('Incorrect PIN.');
        setStatus('error');
        return;
      }

      if (!res.ok) {
        setError('Export failed. Please try again.');
        setStatus('error');
        return;
      }

      // Trigger browser download
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const date = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `144hours-registrations-${date}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setStatus('idle');
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-[#1a1f14] border border-[#ffffff15] text-[#f5f0e8] font-lato text-sm placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#d4af37]/50 transition-colors tracking-widest';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleExport()}
          placeholder="Staff PIN"
          className={inputClass}
        />
        <button
          onClick={handleExport}
          disabled={status === 'loading' || !pin.trim()}
          className="px-5 py-3 bg-[#d4af37] text-[#2e3328] font-lato text-xs tracking-widest uppercase rounded-lg hover:bg-[#f5e060] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold shrink-0 flex items-center gap-2"
        >
          {status === 'loading' ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
              </svg>
              CSV
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="font-lato text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <p className="font-lato text-[10px] text-[#4a4a4a] text-center leading-relaxed">
        Downloads all registrations as a CSV file.<br />
        Open in Excel, Numbers, or Google Sheets.
      </p>
    </div>
  );
}
