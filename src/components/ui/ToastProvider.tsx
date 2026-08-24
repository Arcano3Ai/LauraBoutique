'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  submessage?: string;
}

interface ToastContextType {
  toast: (message: string, options?: { type?: 'success' | 'error' | 'info'; submessage?: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, options?: { type?: 'success' | 'error' | 'info'; submessage?: string }) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = {
      id,
      type: options?.type || 'success',
      message,
      submessage: options?.submessage
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-[#292725] text-[#FDFBF7] shadow-xl border border-[#B99663]/40 rounded-none animate-fade-in"
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#B99663] shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-[#C48B71] shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-[#DCCFBD] shrink-0 mt-0.5" />}
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#FDFBF7]">{t.message}</p>
              {t.submessage && <p className="text-xs text-[#DCCFBD] mt-0.5">{t.submessage}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-[#A99B8B] hover:text-[#FDFBF7] transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
