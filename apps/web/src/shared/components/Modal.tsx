import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <button
        className="absolute inset-0 bg-(--overlay-bg) backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div className="glass-card relative z-10 w-full max-w-md rounded-4xl border border-(--border-default) p-6">
        {(title || description) && (
          <div className="mb-4">
            {title ? (
              <p className="text-lg font-semibold text-(--text-heading)">{title}</p>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm text-(--text-secondary)">{description}</p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
