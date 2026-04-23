import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  UserCheck,
  Save,
  X,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import useTitle from "../../../hooks/useTitle";
import {
  getTugasDivisi,
  createTugasDivisi,
  updateTugasDivisi,
  deleteTugasDivisi,
} from "../../../api/struktur/tugasPerDivisi";

const TugasDivisi = () => {
  useTitle("Tugas Divisi");
  const [divisiData, setDivisiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama_bidang: "",
    deskripsi_tugas: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getTugasDivisi();
      setDivisiData(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data tugas divisi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTugasDivisi(itemToDelete);
      toast.success("Tugas divisi berhasil dihapus");
      setIsConfirmOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus tugas divisi");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama_bidang: item.nama_bidang || item.bidang || "",
        deskripsi_tugas: item.deskripsi_tugas || item.deskripsi || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        nama_bidang: "",
        deskripsi_tugas: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.nama_bidang || !formData.deskripsi_tugas) {
      return toast.warning("Nama bidang dan deskripsi tugas harus diisi");
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateTugasDivisi(editingItem.id, formData);
        toast.success("Tugas divisi berhasil diperbarui");
      } else {
        await createTugasDivisi(formData);
        toast.success("Tugas divisi baru berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan data tugas divisi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <UserCheck size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Tugas Per Divisi
            </h1>
            <p className="text-slate-400 mt-1 italic text-sm font-bold">
              "Detail tanggung jawab setiap bidang atau instalasi."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          Tambah Tugas Divisi
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          // Skeleton Loader (Non-Circular)
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs tracking-widest uppercase font-sans">
                  <th className="px-8 py-5 font-black w-1/4">Nama Bidang / Divisi</th>
                  <th className="px-8 py-5 font-black">Deskripsi Tugas & Tanggung Jawab</th>
                  <th className="px-8 py-5 font-black text-right w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...Array(3)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-8 py-6">
                      <div className="h-10 bg-slate-100 rounded-xl w-32"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-50 rounded-full w-full"></div>
                        <div className="h-4 bg-slate-50 rounded-full w-2/3"></div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
                        <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-xs tracking-widest uppercase">
                  <th className="px-8 py-5 font-black w-1/4">
                    Nama Bidang / Divisi
                  </th>
                  <th className="px-8 py-5 font-black">
                    Deskripsi Tugas & Tanggung Jawab
                  </th>
                  <th className="px-8 py-5 font-black text-right w-32">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {divisiData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors font-sans"
                  >
                    <td className="px-8 py-6 align-top font-sans">
                      <span className="inline-block px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-sm leading-snug font-sans">
                        {item.nama_bidang || item.bidang}
                      </span>
                    </td>
                    <td className="px-8 py-6 align-top font-sans">
                      <p className="text-slate-600 text-sm font-bold leading-relaxed font-sans">
                        {item.deskripsi_tugas || item.deskripsi}
                      </p>
                    </td>
                    <td className="px-8 py-6 align-top text-right font-sans">
                      <div className="flex justify-end gap-2 mt-1 font-sans">
                        <button
                          onClick={() => openModal(item)}
                          className="p-3 bg-white text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-slate-200 shadow-sm font-sans"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-3 bg-white text-slate-400 hover:text-white hover:bg-rose-500 rounded-xl transition-all border border-slate-200 shadow-sm font-sans"
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
        )}

        {!isLoading && divisiData.length === 0 && (
          <div className="py-32 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] border border-dashed border-slate-200 flex items-center justify-center text-slate-300 mb-6 font-sans">
              <FileText size={40} />
            </div>
            <p className="text-xl font-bold text-slate-900 mb-2">
              Data tugas divisi masih kosong.
            </p>
            <p className="text-slate-500 font-medium max-w-xs text-sm">
                Bidang operasional belum dipetakan tugasnya di database.
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
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
                    <UserCheck size={24} />
                  </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {editingItem ? "Edit Tugas Divisi" : "Tambah Tugas Divisi"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Lengkapi data pembagian tugas sub-bagian RSUD.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto font-sans">
              {/* Bidang Input */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Nama Bidang / Divisi
                </label>
                <input
                  type="text"
                  name="nama_bidang"
                  value={formData.nama_bidang}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Bidang Pelayanan Medis"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-700 font-sans"
                />
              </div>

              {/* Description Input */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Deskripsi Tugas Pokok
                </label>
                <textarea
                  name="deskripsi_tugas"
                  value={formData.deskripsi_tugas}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Jelaskan peran, tanggung jawab, dan tugas bagian tersebut..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-700 leading-relaxed font-sans"
                ></textarea>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest font-sans"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-sans disabled:bg-slate-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={16} /> Simpan Data
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Tugas Divisi"
        message="Apakah Anda yakin ingin menghapus data tugas divisi ini?"
      />
    </div>
  );
};

export default TugasDivisi;
