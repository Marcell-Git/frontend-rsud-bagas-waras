import React from "react";
import Modal from "./Modal";
import { Upload, ImageIcon, X } from "lucide-react";

const BuletinModal = ({
  isOpen,
  onClose,
  editingItem,
  formData,
  handleImageChange,
  handleSubmit,
  fileInputRef,
  isSubmitting = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingItem ? "Edit Buletin" : "Publikasi Baru"}
      subtitle="Unggah kover buletin atau majalah digital RSUD."
      footer={
        <div className="flex gap-4 w-full justify-end">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-8 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-12 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : null}
            {isSubmitting ? "Menyimpan..." : "Simpan & Terbitkan"}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Kover Buletin (Portrait)
          </label>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          
          <div
            onClick={() => fileInputRef.current.click()}
            className={`aspect-3/4 bg-slate-50 border-2 border-dashed rounded-[40px] flex flex-col items-center justify-center p-6 text-center group transition-all cursor-pointer overflow-hidden relative ${
                formData.gambar ? "border-emerald-500 bg-emerald-50/20" : "border-slate-200 hover:border-primary-blue/30"
            }`}
          >
            {formData.gambar ? (
              <>
                <img
                  src={formData.gambar instanceof File ? URL.createObjectURL(formData.gambar) : `${import.meta.env.VITE_STORAGE_URL}/${formData.gambar}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                  alt="Preview"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-sm">
                  <span className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-slate-900 shadow-xl">
                    Ganti Kover
                  </span>
                </div>
              </>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary-blue mb-4 shadow-sm group-hover:scale-110 transition-all">
                      <ImageIcon size={40} />
                    </div>
                    <p className="text-[12px] font-black uppercase text-slate-400">
                        Klik untuk pilih kover
                    </p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold">
                        Format: JPG, PNG, WEBP (Maks 5MB)
                    </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BuletinModal;
