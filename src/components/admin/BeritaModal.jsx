import React from "react";
import Modal from "./Modal";
import { Upload, Newspaper, Calendar, User, Clock, X } from "lucide-react";

const BeritaModal = ({
  isOpen,
  onClose,
  editingBerita,
  formData,
  handleChange,
  handleImageChange,
  handleSubmit,
  fileInputRef,
  isSubmitting = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingBerita ? "Edit Berita" : "Tulis Berita Baru"}
      subtitle="Bagikan informasi terbaru kepada pengunjung website RSUD."
      footer={
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
            <div className="flex items-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      name="status"
                      checked={formData.status === "published"}
                      onChange={(e) => handleChange({
                          target: {
                              name: 'status',
                              value: e.target.checked ? 'published' : 'draft'
                          }
                      })}
                    />
                    <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-emerald-500 transition-all"></div>
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition-all"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                    Terbitkan Langsung
                  </span>
                </label>
              </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-8 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={() => handleSubmit(null, formData.status)}
              disabled={isSubmitting}
              className={`flex-1 sm:flex-none px-12 py-3 rounded-2xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                formData.status === "published"
                  ? "bg-linear-to-r from-primary-blue to-secondary-blue text-white hover:shadow-primary-blue/30"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : null}
              {isSubmitting ? "Menyimpan..." : formData.status === "published" ? "Simpan & Terbitkan" : "Simpan Draft"}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Judul Area */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Judul Berita
          </label>
          <textarea
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Masukkan judul berita yang menarik..."
            rows={2}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-[24px] text-lg font-bold focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none resize-none leading-tight"
          />
        </div>

        {/* Content Area */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Isi Berita
          </label>
          <div className="bg-slate-50 border border-slate-200 rounded-[32px] overflow-hidden focus-within:ring-4 focus-within:ring-primary-blue/10 focus-within:border-primary-blue transition-all group">
            <div className="flex items-center gap-1 p-2 bg-white border-b border-slate-100 px-4">
              {["Bold", "Italic", "List", "Link"].map((tool) => (
                <button
                  key={tool}
                  type="button"
                  className="p-2 text-slate-400 hover:text-primary-blue hover:bg-slate-50 rounded-lg transition-all text-xs font-bold"
                >
                  {tool}
                </button>
              ))}
            </div>
            <textarea
              name="isi"
              value={formData.isi}
              onChange={handleChange}
              placeholder="Tuliskan berita lengkap di sini..."
              rows={12}
              className="w-full p-8 bg-transparent focus:ring-0 border-none transition-all outline-none resize-none leading-relaxed text-slate-600 custom-scrollbar"
            />
          </div>
        </div>

        {/* Metadata & Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <User size={12} /> Penulis
              </label>
              <input
                type="text"
                name="penulis"
                value={formData.penulis}
                onChange={handleChange}
                placeholder="Nama Penulis..."
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none text-sm font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Calendar size={12} /> Tanggal Publikasi
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none text-sm font-bold"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Upload size={12} /> Cover Image
            </h3>
            <div
              onClick={() => fileInputRef.current.click()}
              className={`aspect-video bg-white border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center p-4 text-center group transition-all cursor-pointer ${
                formData.gambar
                  ? "border-emerald-500 bg-emerald-50/30"
                  : "border-slate-200 hover:border-primary-blue/40"
              }`}
            >
              <Upload
                size={24}
                className={
                  formData.gambar
                    ? "text-emerald-500 mb-2"
                    : "text-slate-300 group-hover:text-primary-blue transition-colors mb-2"
                }
              />
              <p
                className={`text-[10px] font-bold ${
                  formData.gambar ? "text-emerald-600" : "text-slate-400 group-hover:text-primary-blue"
                } transition-colors max-w-full truncate px-4`}
              >
                {formData.gambar
                  ? `Terpilih: ${formData.gambar.name}`
                  : editingBerita?.url_gambar
                  ? "Gambar sudah ada (Klik untuk ganti)"
                  : "Pilih gambar utama"}
              </p>
              <input
                type="file"
                name="gambar"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BeritaModal;
