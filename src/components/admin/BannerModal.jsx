import React from "react";
import Modal from "./Modal";
import { Upload, ImageIcon, X } from "lucide-react";

const BannerModal = ({
  isOpen,
  onClose,
  editingBanner,
  formData,
  handleChange,
  handleImageChange,
  handleSubmit,
  fileInputRef,
  setFormData,
  isLoading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingBanner ? "Edit Banner" : "Tambah Banner Baru"}
      subtitle="Lengkapi informasi banner di bawah ini."
      footer={
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-2 px-8 py-3 bg-linear-to-r from-primary-blue to-secondary-blue text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">
            Link URL (Optional)
          </label>
          <input
            type="text"
            name="link_url"
            value={formData.link_url}
            onChange={handleChange}
            placeholder="https://example.com"
            disabled={isLoading}
            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Urutan Tampil
            </label>
            <input
              type="number"
              name="urutan"
              value={formData.urutan}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 ml-1">
            Upload Gambar
          </label>

          <input
            type="file"
            name="gambar"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            disabled={isLoading}
            className="hidden"
          />

          <div
            onClick={() => !isLoading && fileInputRef.current.click()}
            className={`border-3 border-dashed rounded-[32px] p-6 text-center transition-all flex flex-col items-center justify-center relative overflow-hidden group ${
              isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            } ${
              formData.gambar
                ? "border-emerald-500 bg-emerald-50/30"
                : "border-slate-200 bg-slate-50/50 hover:border-primary-blue/50"
            }`}
          >
            {formData.gambar ? (
              <div className="py-4 space-y-3">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center mx-auto text-white transform group-hover:scale-110 transition-transform">
                  <ImageIcon size={28} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-emerald-600 uppercase tracking-widest">
                    File Berhasil Dipilih
                  </p>
                  <p className="text-base font-bold text-slate-900 line-clamp-1 px-4">
                    {formData.gambar.name}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData({ ...formData, gambar: "" });
                  }}
                  className="text-xs font-bold text-rose-500 hover:text-rose-600 underline underline-offset-4"
                >
                  Hapus & Pilih Ulang
                </button>
              </div>
            ) : (
              <div className="py-6">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-4 text-primary-blue group-hover:scale-110 transition-transform border border-slate-100">
                  <Upload size={32} />
                </div>
                <p className="text-base font-bold text-slate-900">
                  Klik untuk pilih gambar
                </p>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  JPG, PNG, atau WEBP (Maks. 2MB)
                </p>
              </div>
            )}
          </div>

          {editingBanner && !formData.gambar && (
            <p className="text-[10px] text-slate-400 italic text-center">
              * Kosongkan jika tidak ingin mengubah gambar lama
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BannerModal;
