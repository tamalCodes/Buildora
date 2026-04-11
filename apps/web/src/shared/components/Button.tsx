
import { ArrowRight } from 'lucide-react';
import React from 'react';

/**
 * Supported visual treatments for the shared button component.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'cta';

/**
 * Props accepted by the shared button component.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Predefined style variant applied to the button.
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * Shows a loading spinner and disables the button while preserving layout.
   */
  isLoading?: boolean;
  /**
   * Optional icon rendered before the button label.
   */
  icon?: React.ReactNode;
  /**
   * Renders an animated trailing arrow capsule for CTA-style actions.
   * @default false
   */
  withArrow?: boolean;
}

/**
 * Reusable button used across feature modules with consistent styling and
 * optional loading/icon/arrow affordances.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  icon,
  withArrow = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none overflow-hidden group font-geist tracking-tight';
  const layoutStyles = withArrow ? 'justify-between gap-3' : 'justify-center';
  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-(--neon-glow-shadow) border border-indigo-400/20',
    secondary:
      'bg-(--bg-input) text-(--text-primary) hover:bg-(--bg-surface-hover) border border-(--border-default) hover:border-(--border-hover)',
    outline:
      'bg-transparent border border-(--border-default) text-(--text-secondary) hover:text-(--text-heading) hover:border-indigo-500/40 hover:bg-indigo-500/5',
    cta: 'bg-indigo-600 text-white border border-indigo-400/20 shadow-[0_18px_45px_rgba(79,70,229,0.22)] hover:bg-indigo-500 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(79,70,229,0.3)] active:translate-y-0.25 active:shadow-[0_12px_28px_rgba(79,70,229,0.18)]'
  };
  const usesLightArrow = variant === 'primary' || variant === 'cta';

  return (
    <button
      className={`${baseStyles} ${layoutStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span
        className={`flex items-center gap-2.5 transition-all duration-300 ${isLoading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
      >
        {icon && <span className="shrink-0 group-hover:scale-110 transition-transform">{icon}</span>}
        {withArrow ? (
          <span className="relative overflow-hidden rounded-full">
            <span className="relative z-10">{children}</span>
            <span
              className={`pointer-events-none absolute inset-0 -z-0 rounded-full opacity-0 blur-md transition duration-300 group-hover:opacity-100 ${
                usesLightArrow ? 'bg-white/12' : 'bg-(--accent-bg-soft)'
              }`}
            ></span>
          </span>
        ) : (
          children
        )}
      </span>

      {withArrow && (
        <span
          aria-hidden="true"
          className={`relative flex h-9 w-9 items-center justify-center rounded-full transition duration-300 ${
            usesLightArrow
              ? 'border border-white/20 bg-white/14 text-white group-hover:translate-x-1 group-hover:scale-110 group-hover:bg-white/22 group-active:translate-x-0.5 group-active:scale-95'
              : 'border border-(--border-default) bg-(--bg-input) text-(--text-secondary) group-hover:translate-x-1 group-hover:border-(--accent-border) group-hover:text-(--text-heading)'
          }`}
        >
          <span
            className={`pointer-events-none absolute inset-0 rounded-full opacity-0 transition duration-300 ${
              usesLightArrow
                ? 'border border-white/30 group-hover:scale-[1.35] group-hover:opacity-100 group-active:scale-110'
                : 'border border-(--accent-border)/70 group-hover:scale-[1.25] group-hover:opacity-100'
            }`}
          ></span>
          {usesLightArrow && (
            <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 blur-[10px] transition duration-300 group-hover:opacity-100"></span>
          )}
          <ArrowRight
            className="relative z-10 h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-active:translate-x-0"
            strokeWidth={2.4}
          />
        </span>
      )}

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
