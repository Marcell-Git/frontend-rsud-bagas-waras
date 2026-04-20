import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Save,
  X,
  Stethoscope,
  Clock,
} from "lucide-react";

import {
  getJadwalDokter,
  createJadwalDokter,
  updateJadwalDokter,
  deleteJadwalDokter,
} from "../../../api/pelayanan/jadwalDokter";

const JadwalDokter = () => {
  const [jadwalData, setJadwalData] = useState([]);
  const [formData, setFormData] = useState({
    nama_dokter: "",
    spesialisasi: "",
    hari: "",
    jam: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Hapus jadwal dokter ini?")) {
      setJadwalData(jadwalData.filter((j) => j.id !== id));
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
            <Calendar size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Jadwal Dokter
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Manajemen jadwal jam praktek tenaga medis."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-600/20"
        >
          <Plus size={20} />
          Tambah Jadwal
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">
                  Nama Dokter
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/4">
                  Poli / Spesialis
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Hari Praktek
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Jam Praktek
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-32">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jadwalData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Nama Dokter */}
                  <td className="px-8 py-6 align-middle">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                        <Stethoscope size={18} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {item.namaDokter}
                      </h3>
                    </div>
                  </td>

                  {/* Spesialis */}
                  <td className="px-8 py-6 align-middle">
                    <span className="inline-block px-3 py-1.5 bg-teal-50 text-teal-700 font-bold rounded-lg border border-teal-100/50 text-sm">
                      {item.spesialis}
                    </span>
                  </td>

                  {/* Hari Praktek */}
                  <td className="px-8 py-6 align-middle">
                    <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                      <Calendar size={16} className="text-slate-400" />
                      {item.hari}
                    </div>
                  </td>

                  {/* Jam Praktek */}
                  <td className="px-8 py-6 align-middle">
                    <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                      <Clock size={16} className="text-slate-400" />
                      {item.jam}
                    </div>
                  </td>

                  {/* Aksi */}
                  <td className="px-8 py-6 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openModal(item)}
                        className="p-3 bg-white text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all border border-slate-200"
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

        {jadwalData.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4">
              <Calendar size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Data jadwal dokter masih kosong.
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
                  {editingItem ? "Edit Jadwal Dokter" : "Tambah Jadwal Dokter"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Masukkan informasi praktek dokter medis.
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
              {/* Nama Dokter */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Nama Dokter
                </label>
                <div className="relative">
                  <Stethoscope
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    defaultValue={editingItem?.namaDokter}
                    placeholder="Contoh: dr. John Doe, Sp.PD"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Spesialis */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Spesialis / Poli
                </label>
                <input
                  type="text"
                  defaultValue={editingItem?.spesialis}
                  placeholder="Contoh: Spesialis Anak"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-semibold text-slate-700"
                />
              </div>

              {/* Hari Praktek */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Hari Praktek
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    defaultValue={editingItem?.hari}
                    placeholder="Contoh: Senin - Kamis"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-semibold text-slate-700"
                  />
                </div>
              </div>

              {/* Jam Praktek */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Jam Praktek
                </label>
                <div className="relative">
                  <Clock
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    defaultValue={editingItem?.jam}
                    placeholder="Contoh: 08:00 - 14:00"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-semibold text-slate-700"
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
                className="flex-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
              >
                <Save size={16} />
                Simpan Jadwal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalDokter;
