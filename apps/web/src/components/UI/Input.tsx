
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  rightElement, 
  leftElement, 
  containerClassName = '', 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {label && (
        <div className="flex justify-between items-center px-0.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {label}
          </label>
          {rightElement}
        </div>
      )}
      <div className="relative group flex items-center">
        {leftElement && (
          <div className="absolute left-4 z-10 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            {leftElement}
          </div>
        )}
        <input
          {...props}
          className={`
            w-full py-3 rounded-xl border outline-none transition-all duration-300
            bg-white/5 text-slate-100 placeholder:text-slate-600 backdrop-blur-md
            ${leftElement ? 'pl-11 pr-4' : 'px-4'}
            ${error 
              ? 'border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' 
              : 'border-white/10 hover:border-white/20 focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/5'
            }
            ${className}
          `}
        />
      </div>
      {error && (
        <span className="text-[11px] text-red-400 mt-1 font-medium animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
