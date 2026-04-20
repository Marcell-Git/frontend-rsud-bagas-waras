import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify";

import {
  getPegawai,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../../../api/struktur/profilPegawai";

const ProfilPegawai = () => {
  const [pegawai, setPegawai] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    pendidikan: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getPegawai();
      setPegawai(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data pegawai");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pegawai ini?")) {
      try {
        await deletePegawai(id);
        toast.success("Data pegawai berhasil dihapus");
        fetchData();
      } catch (error) {
        toast.error("Gagal menghapus data pegawai");
      }
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama: item.nama || "",
        jabatan: item.jabatan || "",
        pendidikan: item.pendidikan || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        nama: "",
        jabatan: "",
        pendidikan: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.nama || !formData.jabatan) {
      return toast.warning("Nama dan Jabatan harus diisi");
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updatePegawai(editingItem.id, formData);
        toast.success("Profil pegawai berhasil diperbarui");
      } else {
        await createPegawai(formData);
        toast.success("Pegawai baru berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan data pegawai");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPegawai = pegawai.filter(
    (item) =>
      (item.nama || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.jabatan || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.pendidikan || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Profil Pegawai
          </h1>
          <p className="text-slate-400 mt-1 italic text-sm font-bold">
            Kelola data nama, jabatan, dan pendidikan pegawai RSUD.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:shadow-primary-blue/30 transition-all active:scale-95 shadow-lg shadow-primary-blue/20"
        >
          <Plus size={20} />
          Tambah Pegawai
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex bg-white p-4 rounded-[32px] shadow-sm border border-slate-100">
        <div className="relative flex-1 w-full text-slate-900">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, jabatan, atau pendidikan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-blue rounded-full animate-spin mb-4"></div>
            Memuat data...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs tracking-widest uppercase">
                  <th className="py-5 px-8 font-black w-24">No</th>
                  <th className="py-5 px-8 font-black">Nama Pegawai</th>
                  <th className="py-5 px-8 font-black">Jabatan</th>
                  <th className="py-5 px-8 font-black">Pendidikan</th>
                  <th className="py-5 px-8 font-black text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPegawai.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-6 px-8 text-slate-400 font-bold">
                      #{index + 1}
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-primary-blue flex items-center justify-center flex-shrink-0 border border-indigo-100/50">
                          <User size={18} />
                        </div>
                        <span className="font-bold text-slate-900">
                          {item.nama}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-200">
                        <Briefcase size={12} />
                        {item.jabatan}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-2 text-slate-600">
                        <GraduationCap size={16} className="text-slate-400" />
                        <span className="font-bold text-sm tracking-tight text-slate-500">
                          {item.pendidikan}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(item)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-primary-blue hover:bg-primary-blue/10 transition-all border border-slate-100"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-slate-100"
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
        )}

        {!isLoading && filteredPegawai.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] border border-dashed border-slate-200 flex items-center justify-center text-slate-200 mb-6 font-sans">
              <Users size={32} />
            </div>
            <p className="text-xl font-bold text-slate-900 mb-2">
              Tidak ada pegawai ditemukan
            </p>
            <p className="text-slate-500 font-medium max-w-xs text-sm">
              Keyword pencarian tidak cocok dengan data apapun di sistem.
            </p>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>

          <form
            onSubmit={handleSubmit} 
            className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 shadow-inner border border-primary-blue/20">
                    <Users size={24} />
                  </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {editingItem ? "Edit Profil Pegawai" : "Tambah Pegawai Baru"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Lengkapi informasi profil pegawai secara detail.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-slate-200 rounded-2xl text-slate-400 transition-colors bg-white shadow-sm border border-slate-200"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Nama Lengkap & Gelar
                </label>
                <div className="relative text-slate-900">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama lengkap & gelar..."
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2 text-slate-900">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Jabatan Struktural
                </label>
                <div className="relative">
                  <Briefcase
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="jabatan"
                    value={formData.jabatan}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Kepala Ruang, Dokter Umum..."
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2 text-slate-900">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Riwayat Pendidikan
                </label>
                <div className="relative">
                  <GraduationCap
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="pendidikan"
                    value={formData.pendidikan}
                    onChange={handleChange}
                    placeholder="Contoh: S1 Keperawatan, S2 Spesialis..."
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all text-xs uppercase tracking-widest"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-95 text-[10px] uppercase tracking-[0.2em] font-sans disabled:bg-slate-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    {editingItem ? "Update Data" : "Simpan Pegawai"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilPegawai;
