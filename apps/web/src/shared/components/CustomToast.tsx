import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type ToastVariant = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  title?: string;
}

interface ToastInput {
  message: string;
  variant?: ToastVariant;
  title?: string;
  duration?: number;
}

interface ToastContextValue {
  pushToast: (toast: ToastInput) => void;
  removeToast: (id: string) => void;
}

const CustomToastContext = createContext<ToastContextValue | null>(null);

const getVariantStyles = (variant: ToastVariant) => {
  switch (variant) {
    case 'success':
      return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200';
    case 'error':
      return 'border-red-500/40 bg-red-500/10 text-red-200';
    default:
      return 'border-sky-500/40 bg-sky-500/10 text-sky-200';
  }
};

export const CustomToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeouts = useRef<Map<string, number>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timeout = timeouts.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeouts.current.delete(id);
    }
  }, []);

  const pushToast = useCallback(
    ({ message, variant = 'info', title, duration = 4000 }: ToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => [...prev, { id, message, variant, title }]);
      const timeout = window.setTimeout(() => removeToast(id), duration);
      timeouts.current.set(id, timeout);
    },
    [removeToast]
  );

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeout) => clearTimeout(timeout));
      timeouts.current.clear();
    };
  }, []);

  const value = useMemo(() => ({ pushToast, removeToast }), [pushToast, removeToast]);

  return (
    <CustomToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-5 z-50 flex max-w-[90vw] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex w-[320px] max-w-full items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${getVariantStyles(
              toast.variant
            )} animate-in slide-in-from-top-2 fade-in duration-300`}
          >
            <div className="flex-1">
              {toast.title && (
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  {toast.title}
                </p>
              )}
              <p className="text-sm font-medium text-[var(--text-primary)]">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-heading)]"
              aria-label="Dismiss notification"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </CustomToastContext.Provider>
  );
};

export const useCustomToast = () => {
  const context = useContext(CustomToastContext);
  if (!context) {
    throw new Error('useCustomToast must be used within CustomToastProvider.');
  }
  return context;
};
