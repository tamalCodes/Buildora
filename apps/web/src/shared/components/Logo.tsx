
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  hideText = false,
}) => {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', gap: 'gap-2' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', gap: 'gap-3' },
    lg: { icon: 'w-14 h-14', text: 'text-4xl', gap: 'gap-4' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center ${currentSize.gap} ${className}`}>
      <div
        className={`${currentSize.icon} bg-indigo-600 shadow-[var(--neon-glow-shadow)] rounded-xl flex items-center justify-center border border-indigo-400/20`}
      >
        <div className="w-[45%] h-[45%] border-2 border-white rounded-md"></div>
      </div>
      {!hideText && (
        <span
          className={`text-[var(--text-heading)] font-geist font-black tracking-tighter ${currentSize.text}`}
        >
          Buildora
        </span>
      )}
    </div>
  );
};

export default Logo;
