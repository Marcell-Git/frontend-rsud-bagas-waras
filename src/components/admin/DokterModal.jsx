import React from "react";
import { X, Upload, ImageIcon, Stethoscope } from "lucide-react";

const DokterModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  onImageChange,
  previewImage,
  isSubmitting,
  editingItem,
  imageInputRef,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => !isSubmitting && onClose()}
      ></div>
      <form
        onSubmit={onSubmit}
        className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col"
      >
        <div className="p-8 border-b border-slate-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {editingItem ? "Edit Profil Dokter" : "Tambah Dokter Baru"}
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Kelola informasi dasar tenaga medis.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama_dokter"
              value={formData.nama_dokter}
              onChange={onChange}
              required
              placeholder="Contoh: dr. Ahmad, Sp.PD"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none font-bold text-slate-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Spesialisasi
            </label>
            <input
              type="text"
              name="spesialisasi"
              value={formData.spesialisasi}
              onChange={onChange}
              required
              placeholder="Contoh: Penyakit Dalam"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none font-bold text-slate-700"
            />
          </div>
          <div className="space-y-3 text-slate-900">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Foto Profil
            </label>
            <div
              onClick={() => imageInputRef.current?.click()}
              className="aspect-square w-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50 hover:border-teal-500/30 transition-all relative overflow-hidden group mx-auto"
            >
              <input
                type="file"
                ref={imageInputRef}
                onChange={onImageChange}
                className="hidden"
                accept="image/*"
              />
              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    alt="Preview"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Upload size={20} className="text-white" />
                  </div>
                </>
              ) : (
                <div className="text-slate-300 flex flex-col items-center gap-2">
                  <ImageIcon size={32} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">
                    Pilih Foto
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-8 border-t border-slate-100 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
          >
            {isSubmitting
              ? "Menyimpan..."
              : editingItem
              ? "Perbarui"
              : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DokterModal;
