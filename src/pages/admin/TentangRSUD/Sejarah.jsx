import React, { useState } from "react";
import { Plus, Edit2, Trash2, History, Save, X, Clock } from "lucide-react";

import {
  getSejarah,
  createSejarah,
  updateSejarah,
  deleteSejarah,
} from "../../../api/tentang/sejarah";

const Sejarah = () => {
  const [sejarahPoints, setSejarahPoints] = useState([]);

  const [formData, setFormData] = useState({
    sejarah: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Hapus momen sejarah ini?")) {
      setSejarahPoints(sejarahPoints.filter((s) => s.id !== id));
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
            <History size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Sejarah RSUD
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Jejak perjalanan terbangunnya RSUD Bagas Waras."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
        >
          <Plus size={20} />
          Tambah Momen Sejarah
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Deskripsi Sejarah
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-40">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sejarahPoints.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6 align-top max-w-4xl">
                    <p className="text-slate-800 text-base leading-relaxed">
                      {item.description}
                    </p>
                  </td>
                  <td className="px-8 py-6 align-top text-right">
                    <div className="flex justify-end gap-2 mt-1">
                      <button
                        onClick={() => openModal(item)}
                        className="p-3 bg-white text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all border border-slate-200"
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

        {sejarahPoints.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4">
              <Clock size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Data sejarah masih kosong.
            </p>
          </div>
        )}
      </div>

      {/* Simple CRUD Modal */}
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
                    ? "Edit Momen Sejarah"
                    : "Tambah Momen Bersejarah"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Lengkapi titik waktu perjalanan institusi.
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
              {/* Description Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Penjelasan Singkat
                </label>
                <textarea
                  defaultValue={editingItem?.description}
                  rows={4}
                  placeholder="Ceritakan detail singkat mengenai peristiwa ini..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none font-medium text-slate-700 leading-relaxed"
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
                Simpan Sejarah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sejarah;
