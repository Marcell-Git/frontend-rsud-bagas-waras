import React, { useState, useRef, useEffect } from "react";
import {
  FileCheck,
  Upload,
  Trash2,
  Image as ImageIcon,
  X,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getSyaratPelayanan,
  createSyaratPelayanan,
  deleteSyaratPelayanan,
} from "../../../api/pelayanan/syaratPelayanan";

const SyaratPelayanan = () => {
  const [syaratImages, setSyaratImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getSyaratPelayanan();
      setSyaratImages(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data syarat pelayanan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus gambar syarat pelayanan ini?")) {
      try {
        await deleteSyaratPelayanan(id);
        toast.success("Syarat pelayanan berhasil dihapus");
        fetchData();
      } catch (error) {
        toast.error("Gagal menghapus syarat pelayanan");
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file) => {
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.warning("Mohon unggah file format gambar (JPG, PNG, atau WEBP).");
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("gambar", selectedFile);
      await createSyaratPelayanan(data);
      toast.success("Syarat pelayanan baru berhasil diunggah");
      closeModal();
      fetchData();
    } catch (error) {
      toast.error("Gagal mengunggah syarat pelayanan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
            <FileCheck size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Syarat Pelayanan
            </h1>
            <p className="text-slate-400 mt-1 italic text-sm font-bold">
              "Poster panduan syarat & kelengkapan dokumen pasien."
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-600/20"
        >
          <Plus size={20} />
          Unggah Gambar Baru
        </button>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full py-20 text-center">
             <div className="w-10 h-10 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
             Memuat data...
          </div>
        ) : (
          syaratImages.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative group overflow-hidden"
            >
              {/* Delete Button top right */}
              <div className="absolute top-8 right-8 z-10 flex gap-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-white/90 backdrop-blur-sm shadow-md text-rose-500 hover:text-white hover:bg-rose-500 rounded-2xl transition-all"
                  title="Hapus Gambar"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Image Preview Container */}
              <div className="w-full h-auto min-h-[300px] bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 p-4">
                <img
                  src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                  alt="Persyaratan Pelayanan"
                  className="w-full object-contain object-top rounded-xl shadow-sm"
                />
              </div>
              <div className="mt-4 px-2">
                 <p className="text-[10px] text-slate-400 font-medium">Ditambahkan: {new Date(item.created_at).toLocaleDateString("id-ID")}</p>
              </div>
            </div>
          ))
        )}

        {!isLoading && syaratImages.length === 0 && (
          <div className="col-span-full py-24 text-center bg-white rounded-[32px] border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4 border border-slate-100">
              <ImageIcon size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada gambar persyaratan yang diunggah.
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && closeModal()}
          ></div>

          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 shadow-inner">
                    <FileCheck size={24} />
                  </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                    Unggah Syarat Pelayanan
                  </h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Gunakan gambar jelas untuk petunjuk dokumen pasien.
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              <div
                className={`relative border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center text-center transition-all ${
                  dragActive
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 bg-slate-50"
                } ${previewUrl ? "border-none p-0 bg-transparent" : "cursor-pointer hover:bg-slate-100"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !previewUrl && !isSubmitting && fileInputRef.current?.click()}
              >
                {!previewUrl ? (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 mb-4 shadow-sm border border-slate-100">
                      <Upload size={28} />
                    </div>
                    <p className="font-bold text-slate-700 text-lg mb-2">
                      Tarik & Letakkan Gambar di Sini
                    </p>
                    <p className="text-slate-400 text-sm mb-6">
                      Mendukung format JPG, PNG, WEBP
                    </p>
                    <button
                      type="button"
                      className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm"
                    >
                      Pilih dari Komputer
                    </button>
                  </>
                ) : (
                  <div className="relative w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 group p-4 border-dashed">
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10 backdrop-blur-sm rounded-3xl mx-4 my-4">
                      <button
                        onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click()
                        }}
                        className="px-4 py-2 bg-white rounded-lg text-slate-700 font-bold text-sm hover:scale-105 transition-transform"
                      >
                        Ganti File
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewUrl(null);
                          setSelectedFile(null);
                        }}
                        className="px-4 py-2 bg-rose-500 text-white rounded-lg font-bold text-sm hover:scale-105 transition-transform"
                      >
                        Hapus
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <img
                      src={previewUrl}
                      alt="Preview Syarat Pelayanan"
                      className="w-full h-auto max-h-[400px] object-contain rounded-xl shadow-sm font-sans"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all uppercase text-xs tracking-widest"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!previewUrl || isSubmitting}
                className={`flex-2 px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 ${
                  previewUrl && !isSubmitting
                    ? "bg-teal-600 text-white shadow-xl shadow-teal-600/20 hover:bg-teal-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                     <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Memproses...
                  </>
                ) : (
                  <>Upload Gambar</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyaratPelayanan;
