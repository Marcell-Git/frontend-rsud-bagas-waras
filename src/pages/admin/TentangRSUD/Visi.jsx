import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Compass,
  X,
  Save,
  AlertCircle,
} from "lucide-react";

import {
  getVisi,
  createVisi,
  updateVisi,
  deleteVisi,
} from "../../../api/tentang/visi";

const Visi = () => {
  const [visiPoints, setVisiPoints] = useState([]);
  const [formData, setFormData] = useState({
    visi: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Hapus poin visi ini?")) {
      setVisiPoints(visiPoints.filter((v) => v.id !== id));
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-primary-blue/10 text-primary-blue flex items-center justify-center shadow-inner">
            <Compass size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Visi RSUD
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Mendefinisikan tujuan masa depan institusi kita."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:shadow-primary-blue/30 transition-all active:scale-95 shadow-lg shadow-primary-blue/10"
        >
          <Plus size={20} />
          Tambah Poin Visi
        </button>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {visiPoints.map((item, index) => (
          <div
            key={item.id}
            className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-blue/20 transition-all duration-300 flex gap-6 items-start"
          >
            <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 font-black flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-primary-blue group-hover:text-white transition-colors">
              {index + 1}
            </div>
            <div className="flex-1 flex flex-col justify-between pt-1">
              <p className="text-lg font-semibold text-slate-700 leading-relaxed">
                {item.text}
              </p>

              {/* Actions Bar */}
              <div className="flex items-center gap-2 pt-5 mt-4 border-t border-slate-50">
                <button
                  onClick={() => openModal(item)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs hover:bg-primary-blue hover:text-white transition-all border border-slate-100"
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

        {visiPoints.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 shadow-sm mb-4">
              <Compass size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada poin visi yang ditambahkan.
            </p>
            <button
              onClick={() => openModal()}
              className="text-primary-blue font-bold mt-2 hover:underline"
            >
              Tambah sekarang
            </button>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-primary-blue/5 rounded-[32px] p-6 flex gap-4 border border-primary-blue/10">
        <AlertCircle className="text-primary-blue shrink-0 mt-1" size={20} />
        <div className="space-y-1">
          <h4 className="font-bold text-primary-blue text-sm uppercase tracking-widest">
            Informasi Tampilan
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            Data visi ini akan ditampilkan di halaman utama dan halaman"Tentang
            Kami". Pastikan poin visi singkat, padat, dan mencerminkan cita-cita
            RSUD Bagas Waras.
          </p>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                  {editingItem ? "Edit Poin Visi" : "Tambah Poin Visi"}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  Gunakan kalimat yang inspiratif.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                  Narasi Visi
                </label>
                <textarea
                  defaultValue={editingItem?.text}
                  rows={5}
                  placeholder="Tuliskan poin visi di sini..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[32px] focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-semibold text-slate-700 leading-relaxed"
                ></textarea>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex gap-4 animate-in fade-in slide-in-from-bottom-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visi;
