import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
  Save,
  X,
  Target,
} from "lucide-react";

import {
  getFungsiRSUD,
  createFungsiRSUD,
  updateFungsiRSUD,
  deleteFungsiRSUD,
} from "../../../api/struktur/fungsiRSUD";

const FungsiRSUD = () => {
  const [fungsiPoints, setFungsiPoints] = useState([]);
  const [formData, setFormData] = useState({
    fungsi_rsud: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Hapus poin fungsi ini?")) {
      setFungsiPoints(fungsiPoints.filter((f) => f.id !== id));
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
          <div className="w-14 h-14 rounded-[22px] bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <ShieldCheck size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Fungsi RSUD
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Penjabaran fungsional dari operasional rumah sakit."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          Tambah Fungsi
        </button>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {fungsiPoints.map((item, index) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-10 h-10 rounded-full bg-slate-50 text-indigo-500 font-black flex items-center justify-center shrink-0 border border-slate-100 text-lg">
              {index + 1}
            </div>

            <div className="flex-1 flex flex-col justify-between pt-1">
              <p className="text-lg font-semibold text-slate-700 leading-relaxed">
                {item.deskripsi}
              </p>

              {/* Actions Bar (Statis) */}
              <div className="flex items-center gap-2 pt-5 mt-4 border-t border-slate-50">
                <button
                  onClick={() => openModal(item)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all border border-slate-100 uppercase tracking-widest"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-slate-100"
                  title="Hapus Fungsi"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {fungsiPoints.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 shadow-sm mb-4">
              <Target size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada poin fungsi yang ditambahkan.
            </p>
            <button
              onClick={() => openModal()}
              className="text-indigo-600 font-bold mt-2 hover:underline"
            >
              Tambah sekarang
            </button>
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
                  {editingItem ? "Edit Poin Fungsi" : "Tambah Poin Fungsi"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Jabarkan fungsi operasional RSUD.
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
                  Deskripsi Fungsi
                </label>
                <textarea
                  defaultValue={editingItem?.deskripsi}
                  rows={5}
                  placeholder="Tuliskan deskripsi fungsi rumah sakit..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[32px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-semibold text-slate-700 leading-relaxed"
                ></textarea>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
              >
                Batal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
              >
                <Save size={16} />
                Simpan Fungsi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FungsiRSUD;
