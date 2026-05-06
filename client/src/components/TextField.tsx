import React from 'react';


// ==========================================
// REUSABLE UI COMPONENTS
// ==========================================

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  id, 
  icon, 
  rightAction, 
  ...props 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label 
          className="text-sm font-medium tracking-widest uppercase text-gray-600" 
          htmlFor={id}
        >
          {label}
        </label>
        {rightAction && <div>{rightAction}</div>}
      </div>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-200 bg-white focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 outline-none text-base font-sans`}
          {...props}
        />
      </div>
    </div>
  );
};


