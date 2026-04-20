import React from "react";
import Modal from "./Modal";
import { Upload, Megaphone, FileText, X } from "lucide-react";

const PengumumanModal = ({
  isOpen,
  onClose,
  editingItem,
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
  fileInputRef,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingItem ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
      subtitle="Informasikan pesan penting kepada publik melalui lampiran PDF."
      footer={
        <div className="flex gap-3 w-full justify-end">
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
            Simpan Pengumuman
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">
            Judul Pengumuman
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Contoh: Jadwal Pelayanan Terbaru..."
            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 ml-1">
            Lampiran File (PDF)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf"
          />
          <div
            onClick={() => fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-[32px] p-10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center ${
              formData.file 
                ? "border-emerald-500 bg-emerald-50/30" 
                : "border-slate-200 bg-slate-50/50 hover:border-primary-blue/40"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all shadow-sm ${
              formData.file ? "bg-emerald-500 text-white" : "bg-white text-primary-blue shadow-slate-200"
            }`}>
              <Upload size={24} />
            </div>
            {formData.file ? (
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-bold text-emerald-700">
                  {formData.file instanceof File ? `Terpilih: ${formData.file.name}` : "File sudah tersimpan"}
                </p>
                <p className="text-xs text-emerald-600/70 font-medium">Klik untuk mengganti file</p>
              </div>
            ) : (
              <>
                <p className="text-sm font-bold text-slate-900">
                  Pilih file PDF pengumuman
                </p>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  Maksimal ukuran file: 5MB
                </p>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Status Publikasi
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none appearance-none font-bold text-slate-700"
          >
            <option value="published">Segera Terbitkan</option>
            <option value="draft">Simpan sebagai Draft</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default PengumumanModal;
