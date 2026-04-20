import Modal from "./Modal";
import { Upload, ImageIcon, Video, X, Play } from "lucide-react";

const GaleriModal = ({
  isOpen,
  onClose,
  editingItem,
  formData,
  setFormData,
  handleChange,
  handleImageChange,
  handleSubmit,
  fileInputRef,
}) => {
  const mediaType = formData.url_video ? "video" : "image";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingItem ? "Edit Media" : "Unggah Media Baru"}
      subtitle="Lengkapi detail konten visual Anda untuk galeri RSUD."
      footer={
        <div className="flex gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all font-sans"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="flex-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all font-sans"
          >
            Simpan Media
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Type Toggle */}
        <div className="flex p-1.5 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, url_video: "" })}
            className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              !formData.url_video
                ? "bg-white shadow-sm text-primary-blue font-sans"
                : "text-slate-500 font-sans"
            }`}
          >
            <ImageIcon size={18} /> Gambar
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, url_video: "https://" })}
            className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              formData.url_video
                ? "bg-white shadow-sm text-primary-blue font-sans"
                : "text-slate-500 font-sans"
            }`}
          >
            <Video size={18} /> Video
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">
            Judul Media
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Contoh: Peresmian Gedung..."
            className="w-full px-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-medium"
          />
        </div>

        {/* Conditional Source Input */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 ml-1">
            {mediaType === "image" ? "Unggah Gambar" : "Link Video"}
          </label>

          {mediaType === "image" ? (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />

              <div
                onClick={() => fileInputRef.current.click()}
                className={`border-3 border-dashed rounded-[32px] p-10 text-center transition-all cursor-pointer group flex flex-col items-center justify-center ${
                  formData.gambar
                    ? "border-emerald-500 bg-emerald-50/20"
                    : "border-slate-200 bg-slate-50/50 hover:border-primary-blue/40"
                }`}
              >
                {formData.gambar ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-200 shadow-sm">
                    <img
                      src={
                        formData.gambar instanceof File
                          ? URL.createObjectURL(formData.gambar)
                          : `${import.meta.env.VITE_STORAGE_URL}/${formData.gambar}`
                      }

                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload size={32} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all shadow-sm ${
                      formData.gambar
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-primary-blue shadow-slate-200"
                    }`}
                  >
                    <Upload size={24} />
                  </div>
                )}

                <p
                  className={`text-sm font-bold ${formData.gambar ? "text-emerald-700" : "text-slate-900"}`}
                >
                  {formData.gambar instanceof File
                    ? `Terpilih: ${formData.gambar.name}`
                    : formData.gambar
                      ? "Gambar sudah tersedia (Klik untuk ganti)"
                      : "Klik untuk pilih foto"}
                </p>

                <p className="text-xs text-slate-500 mt-2 font-medium">
                  Maksimal 10MB (JPG, PNG, WEBP)
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Play size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  name="url_video"
                  value={formData.url_video}
                  onChange={handleChange}
                  placeholder="Tempel URL Video (YouTube/Vimeo)..."
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none text-sm font-medium"
                />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                Tips: Pastikan link video dapat diakses secara publik (misal:
                Youtube).
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default GaleriModal;
