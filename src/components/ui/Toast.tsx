'use client';

import { useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-700',
      icon: CheckCircle,
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-700',
      icon: AlertCircle,
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-700',
      icon: Info,
    },
  };

  const { container, icon: Icon } = styles[type];

  return (
    <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-2">
      <div className={`flex items-center gap-2 border px-4 py-3 rounded-lg shadow-lg ${container}`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-0.5 rounded hover:bg-black/5 transition-colors"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
