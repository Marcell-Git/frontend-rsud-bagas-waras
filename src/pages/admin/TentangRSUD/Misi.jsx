import React, { useState } from "react";
import { Plus, Edit2, Trash2, Target, X, Save } from "lucide-react";

import {
  getMisi,
  createMisi,
  updateMisi,
  deleteMisi,
} from "../../../api/tentang/misi";

const Misi = () => {
  const [misiPoints, setMisiPoints] = useState([]);
  const [formData, setFormData] = useState({
    misi: "",
  });

  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Hapus poin misi ini?")) {
      setMisiPoints(misiPoints.filter((m) => m.id !== id));
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
          <div className="w-14 h-14 rounded-[22px] bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
            <Target size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Misi RSUD
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Langkah nyata untuk mewujudkan visi institusi."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:shadow-emerald-500/30 transition-all active:scale-95 shadow-lg"
        >
          <Plus size={20} />
          Tambah Poin Misi
        </button>
      </div>

      {/* Grid of Mission Points */}
      <div className="grid grid-cols-1 gap-6">
        {misiPoints.map((item, index) => (
          <div
            key={item.id}
            className="group bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 flex flex-col md:flex-row gap-6 items-start relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>

            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-emerald-500 font-black flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 text-lg">
              {index + 1}
            </div>

            <div className="flex-1 flex flex-col justify-between pt-1">
              <p className="text-lg font-bold text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                {item.text}
              </p>

              {/* Actions Bar */}
              <div className="flex items-center gap-2 pt-5 mt-4 border-t border-slate-50">
                <button
                  onClick={() => openModal(item)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs hover:bg-emerald-500 hover:text-white transition-all border border-slate-100"
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

        {misiPoints.length === 0 && (
          <div className="py-24 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 shadow-sm mb-4">
              <Target size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Daftar misi masih kosong.
            </p>
            <button
              onClick={() => openModal()}
              className="text-emerald-600 font-bold mt-2 hover:underline"
            >
              Tambah Misi Pertama
            </button>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col scale-in-center">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Plus size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {editingItem ? "Edit Misi" : "Tambah Misi"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Lengkapi langkah strategis RSUD.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Deskripsi Misi
                </label>
                <textarea
                  defaultValue={editingItem?.text}
                  rows={4}
                  placeholder="Tuliskan misi secara spesifik dan terukur..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[32px] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-semibold text-slate-700 leading-relaxed"
                ></textarea>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Simpan Poin Misi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Misi;
