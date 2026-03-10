
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = "relative flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none overflow-hidden group font-geist tracking-tight";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[var(--neon-glow-shadow)] border border-indigo-400/20",
    secondary: "bg-[var(--bg-input)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-default)] hover:border-[var(--border-hover)]",
    outline: "bg-transparent border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-heading)] hover:border-indigo-500/40 hover:bg-indigo-500/5"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <div className={`flex items-center gap-2.5 transition-all duration-300 ${isLoading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        {icon && <span className="shrink-0 group-hover:scale-110 transition-transform">{icon}</span>}
        {children}
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in-90">
          <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </button>
  );
};

export default Button;
