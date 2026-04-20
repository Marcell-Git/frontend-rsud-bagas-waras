import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  X,
  Link as LinkIcon,
  Globe,
} from "lucide-react";

import {
  getLinkEksternal,
  createLinkEksternal,
  updateLinkEksternal,
  deleteLinkEksternal,
} from "../../../api/content/linkEksternal";

const LinkEksternal = () => {
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState({
    nama_link: "",
    url_link: "",
    gambar: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Hapus link eksternal ini?")) {
      setLinks(links.filter((l) => l.id !== id));
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Globe className="text-primary-blue" />
            Link Eksternal
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Kelola tautan mitra dan layanan eksternal RSUD.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-primary-blue/30 transition-all active:scale-95 text-sm"
        >
          <Plus size={18} />
          Tambah Link
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {links.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
          >
            {/* Logo Preview Area */}
            <div className="aspect-2/1 bg-slate-50 flex items-center justify-center p-8 relative overflow-hidden group/img">
              <img
                src={item.image}
                alt={item.title}
                className="max-w-full max-h-full object-contain group-hover/img:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-blue hover:bg-primary-blue hover:text-white transition-all transform hover:rotate-12"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 leading-tight line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-widest">
                  {item.url}
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-2 pt-5 mt-5 border-t border-slate-50">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-[10px] uppercase tracking-widest hover:bg-primary-blue hover:text-white transition-all border border-slate-100"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-slate-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {links.length === 0 && (
          <div className="col-span-full py-40 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-200">
              <LinkIcon size={40} />
            </div>
            <p className="text-slate-400 font-bold">
              Belum ada link eksternal.
            </p>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingItem ? "Edit Link Eksternal" : "Tambah Link Baru"}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  Lengkapi detail tautan mitra.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Nama Link / Mitra
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.title}
                  placeholder="Contoh: BPJS Kesehatan"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
                />
              </div>

              {/* URL Input */}
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
                    defaultValue={editingItem?.url}
                    placeholder="https://example.com"
                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-medium text-slate-600 text-sm"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Logo / Gambar Mitra
                </label>
                <div className="aspect-2/1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-6 text-center group hover:border-primary-blue/30 hover:bg-primary-blue/5 transition-all cursor-pointer overflow-hidden relative">
                  {editingItem?.image ? (
                    <img
                      src={editingItem.image}
                      className="absolute inset-0 w-full h-full object-contain p-8"
                      alt=""
                    />
                  ) : (
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-blue mb-3 shadow-sm group-hover:scale-110 transition-all z-10">
                      <Upload size={20} />
                    </div>
                  )}
                  {!editingItem?.image && (
                    <p className="text-[10px] font-black uppercase text-slate-400 z-10">
                      Klik untuk unggah logo
                    </p>
                  )}
                  {editingItem?.image && (
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[2px]">
                      <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-900 shadow-xl">
                        Ganti Logo
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
              >
                Batal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-95 text-xs uppercase tracking-widest"
              >
                Simpan Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkEksternal;
