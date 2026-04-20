import React, { useState } from "react";
import { Plus, Edit2, Trash2, Scale, Save, X, FileText } from "lucide-react";

import {
  getLandasanHukum,
  createLandasanHukum,
  updateLandasanHukum,
  deleteLandasanHukum,
} from "../../../api/tentang/landasanHukum";

const LandasanHukum = () => {
  const [hukumData, setHukumData] = useState([]);

  const [formData, setFormData] = useState({
    nama_peraturan: "",
    judul: "",
    deskripsi: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Hapus landasan hukum ini?")) {
      setHukumData(hukumData.filter((h) => h.id !== id));
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-primary-blue/10 text-primary-blue flex items-center justify-center shadow-inner">
            <Scale size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Landasan Hukum
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Dasar regulasi operasional RSUD Bagas Waras."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
        >
          <Plus size={20} />
          Tambah Landasan Hukum
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/4">
                  Undang-Undang / Peraturan
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/4">
                  Judul
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Deskripsi
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-32">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hukumData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6 align-top">
                    <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-sm leading-snug">
                      {item.undangUndang}
                    </span>
                  </td>
                  <td className="px-8 py-6 align-top">
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {item.judul}
                    </h3>
                  </td>
                  <td className="px-8 py-6 align-top">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </td>
                  <td className="px-8 py-6 align-top text-right">
                    <div className="flex justify-end gap-2 mt-1">
                      <button
                        onClick={() => openModal(item)}
                        className="p-3 bg-white text-slate-400 hover:text-primary-blue hover:bg-blue-50 rounded-xl transition-all border border-slate-200"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-white text-slate-400 hover:text-white hover:bg-rose-500 rounded-xl transition-all border border-slate-200"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {hukumData.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4">
              <FileText size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Data landasan hukum masih kosong.
            </p>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                  {editingItem
                    ? "Edit Landasan Hukum"
                    : "Tambah Landasan Hukum"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Lengkapi dasar aturan untuk RSUD.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto">
              {/* Undang-Undang Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Nama Peraturan / Undang-Undang
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.undangUndang}
                  placeholder="Contoh: Peraturan Daerah No. 8 Tahun 2014"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
                />
              </div>

              {/* Title Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Judul Singkat Aturan
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.judul}
                  placeholder="Contoh: Dokumen Pembentukan RSUD"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-semibold text-slate-700"
                />
              </div>

              {/* Description Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Penjelasan / Deskripsi
                </label>
                <textarea
                  defaultValue={editingItem?.deskripsi}
                  rows={4}
                  placeholder="Jelaskan isi atau konteks dari peraturan ini..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-medium text-slate-700 leading-relaxed"
                ></textarea>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
              >
                Batal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
              >
                <Save size={16} />
                Simpan Aturan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandasanHukum;
