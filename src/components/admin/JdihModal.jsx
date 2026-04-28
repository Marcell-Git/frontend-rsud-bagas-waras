import React from "react";
import { X, Upload, CheckCircle2, Calendar, FileText } from "lucide-react";

const JdihModal = ({
  isOpen,
  onClose,
  editingItem,
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
  fileInputRef,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-blue/10 flex items-center justify-center text-primary-blue">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                {editingItem ? "Edit Data JDIH" : "Tambah Data JDIH"}
              </h2>
              <p className="text-sm text-slate-500 font-medium tracking-tight">
                Lengkapi informasi dokumen hukum di bawah ini.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 custom-scrollbar">
          {/* Judul */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Judul Dokumen
            </label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              placeholder="Masukkan judul dokumen JDIH..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 font-bold outline-none focus:bg-white focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 transition-all"
              required
            />
          </div>

          {/* Tanggal */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Tanggal Dokumen
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 text-slate-700 font-bold outline-none focus:bg-white focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 transition-all"
                required
              />
            </div>
          </div>

          {/* Upload File */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
              File Dokumen (PDF/Doc)
            </label>
            <label className="block border-2 border-dashed border-slate-200 rounded-[32px] p-10 text-center bg-slate-50/50 hover:border-primary-blue/40 transition-all cursor-pointer group relative">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-blue group-hover:scale-110 transition-all shadow-sm">
                <Upload size={24} />
              </div>
              {formData.file ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 size={18} />
                    File Terpilih: {formData.file.name}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Klik untuk mengganti file
                  </p>
                </div>
              ) : editingItem?.url_file ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 size={18} />
                    Dokumen Sudah Ada
                  </div>
                  <p className="text-[10px] text-slate-400 text-center px-4">
                    {editingItem.url_file.split("/").pop()}
                    <br />
                    Klik untuk mengganti dengan file baru
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-black text-slate-700 mb-1">
                    Pilih File
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    PDF, DOC, JPG
                  </p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 rounded-xl transition-all"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-linear-to-r from-primary-blue to-secondary-blue text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-primary-blue/30 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            {isLoading
              ? "Menyimpan..."
              : editingItem
                ? "Simpan Perubahan"
                : "Tambah Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JdihModal;
