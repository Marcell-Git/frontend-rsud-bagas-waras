import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Megaphone,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  Calendar,
  MoreVertical,
  AlertCircle,
  FileText,
  Upload,
  ExternalLink,
} from "lucide-react";

import {
  getPengumuman,
  createPengumuman,
  updatePengumuman,
  deletePengumuman,
} from "../../../api/content/pengumuman";

const Pengumuman = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    judul: "",
    file: "",
    status: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Hapus pengumuman ini?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  const handleTogglePin = (id) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, isPinned: !a.isPinned } : a,
      ),
    );
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = announcements.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Pengumuman
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Buat dan kelola informasi penting untuk pasien dan staf.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Buat Pengumuman
        </button>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari kata kunci pengumuman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none font-medium"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Judul Pengumuman
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Tanggal Update
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 max-w-md">
                    <div className="flex flex-col">
                      <p className="font-bold text-slate-900 leading-tight flex items-center gap-2">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-primary-blue font-bold group/file cursor-pointer">
                        <FileText size={14} />
                        <span className="group-hover/file:underline">
                          {item.fileName}
                        </span>
                        <ExternalLink
                          size={12}
                          className="opacity-0 group-hover/file:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                      <Calendar size={14} className="text-slate-300" />
                      {item.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === "published"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {item.status === "published" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {item.status === "published" ? "Terbit" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openModal(item)}
                        className="p-2 text-slate-400 hover:text-primary-blue hover:bg-primary-blue/10 rounded-lg transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-blue/10 text-primary-blue flex items-center justify-center">
                  <Megaphone size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingItem ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
                  </h2>
                  <p className="text-sm text-slate-500 font-medium tracking-tight">
                    Informasikan pesan penting kepada publik.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                title="Tutup"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Judul Pengumuman
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.title}
                  placeholder="Contoh: Jadwal Pelayanan Terbaru..."
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Lampiran File (PDF)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-[32px] p-10 text-center bg-slate-50/50 hover:border-primary-blue/40 transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-blue group-hover:scale-110 transition-all shadow-sm">
                    <Upload size={24} />
                  </div>
                  {editingItem?.fileName ? (
                    <div className="flex items-center justify-center gap-2 text-primary-blue font-bold text-sm">
                      <FileText size={18} />
                      {editingItem.fileName}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-slate-900">
                        Klik atau seret file PDF ke sini
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        Maksimal ukuran file: 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Status
                  </label>
                  <select
                    defaultValue={editingItem?.status || "published"}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none appearance-none font-bold text-slate-700"
                  >
                    <option value="published">Segera Terbit</option>
                    <option value="draft">Simpan sebagai Draft</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-95"
              >
                Simpan & Terbit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pengumuman;
