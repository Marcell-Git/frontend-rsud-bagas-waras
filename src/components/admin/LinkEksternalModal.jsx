import React from "react";
import Modal from "./Modal";
import { Upload, Link as LinkIcon, Globe, X } from "lucide-react";

const LinkEksternalModal = ({
  isOpen,
  onClose,
  editingItem,
  formData,
  handleChange,
  handleImageChange,
  handleSubmit,
  fileInputRef,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingItem ? "Edit Link Eksternal" : "Tambah Link Baru"}
      subtitle="Kelola tautan mitra dan layanan eksternal RSUD."
      footer={
        <div className="flex gap-4 w-full justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-12 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-95"
          >
            Simpan Tautan
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
            Nama Link / Mitra
          </label>
          <input
            type="text"
            name="nama_link"
            value={formData.nama_link}
            onChange={handleChange}
            placeholder="Contoh: BPJS Kesehatan"
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
            URL / Tautan
          </label>
          <div className="relative">
            <LinkIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={16}
            />
            <input
              type="text"
              name="url_link"
              value={formData.url_link}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-medium text-slate-600 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
            Logo / Gambar Mitra
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
            className={`aspect-2/1 bg-slate-50 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center p-6 text-center group transition-all cursor-pointer overflow-hidden relative ${
                formData.gambar ? "border-emerald-500 bg-emerald-50/20" : "border-slate-200 hover:border-primary-blue/30"
            }`}
          >
            {formData.gambar ? (
              <>
                <img
                  src={formData.gambar instanceof File ? URL.createObjectURL(formData.gambar) : `${import.meta.env.VITE_STORAGE_URL}/${formData.gambar}`}
                  className="absolute inset-0 w-full h-full object-contain p-8 transition-transform group-hover:scale-105"
                  alt="Preview"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[2px]">
                  <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-900 shadow-xl">
                    Ganti Logo
                  </span>
                </div>
              </>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-blue mb-3 shadow-sm group-hover:scale-110 transition-all z-10">
                      <Upload size={20} />
                    </div>
                    <p className="text-[10px] font-black uppercase text-slate-400 z-10">
                        Klik untuk unggah logo
                    </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LinkEksternalModal;
