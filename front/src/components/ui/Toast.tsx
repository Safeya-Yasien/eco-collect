import React, { createContext, useCallback, useContext, useState } from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  type?: ToastType;
};

const ToastContext = createContext<
  { showToast: (message: string, type?: ToastType) => void } | undefined
>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((s) => [...s, { id, message, type }]);
    setTimeout(() => {
      setToasts((s) => s.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed z-50 space-y-2 right-4 bottom-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-xs px-4 py-2 rounded shadow-md text-white transition-transform duration-200 transform hover:scale-[1.02] ${
              t.type === "success"
                ? "bg-green-600"
                : t.type === "error"
                  ? "bg-red-600"
                  : "bg-gray-700"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default ToastProvider;
