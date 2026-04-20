import React, { useState, useRef } from "react";
import {
  Users2,
  Upload,
  Trash2,
  Image as ImageIcon,
  X,
  Plus,
} from "lucide-react";

import {
  getStrukturOrganisasi,
  createStrukturOrganisasi,
  updateStrukturOrganisasi,
  deleteStrukturOrganisasi,
} from "../../../api/struktur/gambarSo";

const GambarStruktur = () => {
  const [strukturImages, setStrukturImages] = useState([]);
  const [formData, setFormData] = useState({
    gambar: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);

  const handleDelete = (id) => {
    if (window.confirm("Hapus gambar struktur organisasi ini?")) {
      setStrukturImages(strukturImages.filter((s) => s.id !== id));
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
      alert("Mohon unggah file format gambar (JPG, PNG, dll).");
    }
  };

  const handleSave = () => {
    if (previewUrl) {
      setStrukturImages([
        ...strukturImages,
        { id: Date.now(), image: previewUrl },
      ]);
      closeModal();
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
          <div className="w-14 h-14 rounded-[22px] bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <Users2 size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Gambar Struktur Organisasi
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Bagan susunan personel dan direksi RSUD."
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          Unggah Struktur
        </button>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 gap-8">
        {strukturImages.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative group overflow-hidden"
          >
            {/* Delete/Action Button top right */}
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
            <div className="w-full h-auto min-h-[300px] bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100">
              <img
                src={item.image}
                alt="Struktur Organisasi"
                className="w-full object-contain object-top"
              />
            </div>
          </div>
        ))}

        {strukturImages.length === 0 && (
          <div className="py-24 text-center bg-white rounded-[32px] border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4 border border-slate-100">
              <ImageIcon size={40} />
            </div>
            <p className="text-slate-500 font-bold">
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
            onClick={closeModal}
          ></div>

          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  Unggah Gambar Struktur
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Pastikan resolusi gambar cukup besar agar mudah dibaca.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {/* Drag n Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center text-center transition-all ${
                  dragActive
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 bg-slate-50"
                } ${previewUrl ? "border-none p-0 bg-transparent" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
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
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-500 mb-4 shadow-sm border border-slate-100">
                      <Upload size={28} />
                    </div>
                    <p className="font-bold text-slate-700 text-lg mb-2">
                      Tarik & Letakkan Gambar di Sini
                    </p>
                    <p className="text-slate-400 text-sm mb-6">
                      Mendukung format JPG, PNG
                    </p>
                    <button
                      onClick={() =>
                        fileInputRef.current && fileInputRef.current.click()
                      }
                      className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      Pilih dari Komputer
                    </button>
                  </>
                ) : (
                  <div className="relative w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 group">
                    {/* Preview Overlay Actions */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10 backdrop-blur-sm">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-white rounded-lg text-slate-700 font-bold text-sm hover:scale-105 transition-transform"
                      >
                        Ganti File
                      </button>
                      <button
                        onClick={() => {
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
                      alt="Preview"
                      className="w-full h-auto max-h-[400px] object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                onClick={closeModal}
                className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={!previewUrl}
                className={`flex-2 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  previewUrl
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Upload Gambar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GambarStruktur;
