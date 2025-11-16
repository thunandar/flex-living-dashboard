import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function FormInput({ label, error, className = '', ...props }: FormInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <input
        className={`bg-white/10 border border-white/20 text-white placeholder:text-gray-400 px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-white/30 transition-colors w-full ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-300">{error}</p>
      )}
    </div>
  );
}

