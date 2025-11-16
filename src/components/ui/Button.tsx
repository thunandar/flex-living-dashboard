import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white';
  icon?: LucideIcon;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  icon: Icon, 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-flex text-white hover:bg-flex-dark',
    secondary: 'bg-flex-light text-white hover:bg-flex',
    white: 'bg-white text-gray-900 hover:bg-gray-100',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

