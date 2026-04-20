import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  User,
  Briefcase,
  GraduationCap,
  Users,
} from "lucide-react";

import {
  getPegawai,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../../../api/struktur/profilPegawai";

const ProfilPegawai = () => {
  const [pegawai, setPegawai] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    pendidikan: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPegawai = pegawai.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pendidikan.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id) => {
    if (window.confirm("Hapus pegawai ini dari daftar?")) {
      setPegawai(pegawai.filter((p) => p.id !== id));
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Profil Pegawai
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Kelola data nama, jabatan, dan pendidikan pegawai RSUD.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:shadow-primary-blue/30 transition-all active:scale-95"
        >
          <Plus size={20} />
          Tambah Pegawai
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex bg-white p-4 rounded-[32px] shadow-sm border border-slate-100">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, jabatan, atau pendidikan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-medium text-slate-700"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                <th className="py-4 px-6 font-bold uppercase tracking-wider">
                  No
                </th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider">
                  Nama Pegawai
                </th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider">
                  Jabatan
                </th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider">
                  Pendidikan
                </th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPegawai.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-primary-blue flex items-center justify-center flex-shrink-0">
                        <User size={18} />
                      </div>
                      <span className="font-bold text-slate-900">
                        {item.nama}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">
                      <Briefcase size={12} />
                      {item.jabatan}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <GraduationCap size={16} className="text-slate-400" />
                      <span className="font-semibold text-sm">
                        {item.pendidikan}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2 transition-opacity">
                      <button
                        onClick={() => openModal(item)}
                        className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-primary-blue hover:text-white transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPegawai.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center px-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <Users size={32} />
              </div>
              <p className="text-lg font-bold text-slate-900 mb-1">
                Tidak ada pegawai ditemukan
              </p>
              <p className="text-slate-500 text-sm">
                Mungkin keyword yang Anda masukkan tidak sesuai.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingItem ? "Edit Profil Pegawai" : "Tambah Pegawai Baru"}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  Lengkapi informasi profil pegawai secara detail.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Nama Pegawai
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    defaultValue={editingItem?.nama}
                    placeholder="Masukkan nama lengkap & gelar..."
                    className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Jabatan
                </label>
                <div className="relative">
                  <Briefcase
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    defaultValue={editingItem?.jabatan}
                    placeholder="Contoh: Kepala Ruang, Dokter Umum..."
                    className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Pendidikan
                </label>
                <div className="relative">
                  <GraduationCap
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    defaultValue={editingItem?.pendidikan}
                    placeholder="Contoh: S1 Keperawatan, S2 Spesialis..."
                    className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm"
              >
                Batal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-[2] px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all"
              >
                {editingItem ? "Simpan Perubahan" : "Simpan Pegawai"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilPegawai;
