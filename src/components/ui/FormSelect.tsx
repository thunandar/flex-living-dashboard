import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormSelect({ label, error, className = '', children, ...props }: FormSelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <select
        className={`bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-white/30 transition-colors ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-300">{error}</p>
      )}
    </div>
  );
}

