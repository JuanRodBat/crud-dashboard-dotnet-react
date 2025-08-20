import { useEffect } from "react";

export default function Toast({ open, type="success", message="", onClose, duration=2200 }) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={`toast ${type}`} role="status" aria-live="polite">
      {message}
      <button className="toast-close" onClick={onClose} aria-label="Cerrar">×</button>
    </div>
  );
}
