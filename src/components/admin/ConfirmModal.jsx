import React from "react";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-rose-500 scale-110">
            <AlertTriangle size={40} />
          </div>

          {/* Text */}
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {title || "Konfirmasi Hapus"}
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            {message || "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."}
          </p>
        </div>

        {/* Actions */}
        <div className="p-8 pt-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all outline-none"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-200 transition-all outline-none flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Ya, Hapus"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
