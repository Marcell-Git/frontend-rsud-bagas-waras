import React, { useState, useRef, useEffect } from "react";
import {
  Users2,
  Upload,
  Trash2,
  Image as ImageIcon,
  X,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import useTitle from "../../../hooks/useTitle";
import {
  getStrukturOrganisasi,
  createStrukturOrganisasi,
  deleteStrukturOrganisasi,
} from "../../../api/struktur/gambarSo";

const GambarStruktur = () => {
  useTitle("Gambar Struktur Organisasi");
  const [strukturImages, setStrukturImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getStrukturOrganisasi();
      setStrukturImages(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data struktur organisasi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteStrukturOrganisasi(itemToDelete);
      toast.success("Gambar struktur berhasil dihapus");
      setIsConfirmOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus gambar struktur");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
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
      await createStrukturOrganisasi(data);
      toast.success("Gambar struktur organisasi berhasil diunggah");
      closeModal();
      fetchData();
    } catch (error) {
      toast.error("Gagal mengunggah gambar struktur");
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Gambar Struktur Organisasi
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola bagan susunan personel dan direksi RSUD Bagas Waras.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Unggah Struktur
        </button>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 gap-8">
        {isLoading ? (
          // Skeleton Loader (Non-Circular)
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm animate-pulse space-y-4">
            <div className="w-full h-[400px] bg-slate-100 rounded-2xl flex items-center justify-center">
              <ImageIcon className="text-slate-200" size={48} />
            </div>
            <div className="space-y-2 px-2">
              <div className="h-4 bg-slate-50 rounded-full w-24"></div>
              <div className="h-3 bg-slate-50 rounded-full w-32"></div>
            </div>
          </div>
        ) : (
          strukturImages.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative group overflow-hidden"
            >
              <div className="absolute top-8 right-8 z-10 flex gap-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-white/90 backdrop-blur-sm shadow-md text-rose-500 hover:text-white hover:bg-rose-500 rounded-2xl transition-all"
                  title="Hapus Gambar"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="w-full h-auto min-h-[300px] bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 italic font-bold text-slate-400">
                <img
                  src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                  alt="Struktur Organisasi"
                  className="w-full object-contain object-top"
                />
              </div>
              <div className="mt-4 px-2">
                <p className="text-[10px] text-slate-400 font-medium">
                  Ditambahkan:{" "}
                  {new Date(item.created_at).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>
          ))
        )}

        {!isLoading && strukturImages.length === 0 && (
          <div className="py-24 text-center bg-white rounded-[32px] border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4 border border-slate-100 font-sans">
              <ImageIcon size={40} />
            </div>
            <p className="text-slate-500 font-bold font-sans">
              Belum ada gambar struktur organisasi yang diunggah.
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
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Users2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                    Unggah Gambar Struktur
                  </h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Pastikan resolusi gambar cukup besar agar mudah dibaca.
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
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 bg-slate-50"
                } ${previewUrl ? "border-none p-0 bg-transparent" : "cursor-pointer hover:bg-slate-100"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() =>
                  !previewUrl && !isSubmitting && fileInputRef.current?.click()
                }
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
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-500 mb-4 shadow-sm border border-slate-100 font-sans">
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
                  <div className="relative w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 group p-4 border-dashed font-sans">
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10 backdrop-blur-sm rounded-3xl mx-4 my-4 font-sans">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
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
                        className="px-4 py-2 bg-rose-500 text-white rounded-lg font-bold text-sm hover:scale-105 transition-transform font-sans"
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
                      alt="Preview"
                      className="w-full h-auto max-h-[400px] object-contain rounded-xl font-sans"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all uppercase text-xs tracking-widest font-sans"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!previewUrl || isSubmitting}
                className={`flex-2 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest ${
                  previewUrl && !isSubmitting
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>{" "}
                    Memproses...
                  </>
                ) : (
                  <>Upload Gambar</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Gambar Struktur"
        message="Apakah Anda yakin ingin menghapus bagan struktur organisasi ini?"
      />
    </div>
  );
};

export default GambarStruktur;
