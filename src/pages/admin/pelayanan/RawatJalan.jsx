import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Activity,
  Save,
  X,
  Stethoscope,
} from "lucide-react";

import {
  getPoli,
  createPoli,
  updatePoli,
  deletePoli,
} from "../../../api/pelayanan/rawatJalan";

const RawatJalan = () => {
  const [poliData, setPoliData] = useState([]);
  const [formData, setFormData] = useState({
    nama_poli: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Hapus poliklinik dari daftar rawat jalan?")) {
      setPoliData(poliData.filter((p) => p.id !== id));
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
          <div className="w-14 h-14 rounded-[22px] bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
            <Activity size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Layanan Rawat Jalan
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Manajemen daftar poliklinik rumah sakit."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-600/20"
        >
          <Plus size={20} />
          Tambah Poliklinik
        </button>
      </div>

      {/* Grid Section for Polyclinics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {poliData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between group hover:border-teal-200 transition-colors"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                <Stethoscope size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-snug pt-1">
                {item.namaPoli}
              </h3>
            </div>

            {/* Actions (Statis) */}
            <div className="flex gap-2 justify-end border-t border-slate-50 pt-4">
              <button
                onClick={() => openModal(item)}
                className="px-4 py-2 bg-slate-50 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors uppercase tracking-wider"
              >
                <Edit2 size={14} /> Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 bg-slate-50 text-rose-500 hover:text-white hover:bg-rose-500 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors uppercase tracking-wider"
              >
                <Trash2 size={14} /> Hapus
              </button>
            </div>
          </div>
        ))}

        {poliData.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 mb-4 shadow-sm">
              <Activity size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Daftar poliklinik masih kosong.
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
                  {editingItem ? "Edit Poliklinik" : "Tambah Poliklinik"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Masukkan nama poli untuk rawat jalan.
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
              {/* Nama Poliklinik */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Nama Klinik/Poli
                </label>
                <div className="relative">
                  <Stethoscope
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    defaultValue={editingItem?.namaPoli}
                    placeholder="Contoh: Poliklinik Jantung"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold text-slate-700"
                  />
                </div>
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
                className="flex-2 px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
              >
                <Save size={16} />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawatJalan;
