import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Scale, Save, X, FileText } from "lucide-react";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import {
  getLandasanHukum,
  createLandasanHukum,
  updateLandasanHukum,
  deleteLandasanHukum,
} from "../../../api/tentang/landasanHukum";

const LandasanHukum = () => {
  const [hukumData, setHukumData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    nama_peraturan: "",
    judul: "",
    deskripsi: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchHukum = async () => {
    setIsLoading(true);
    try {
      const response = await getLandasanHukum();
      setHukumData(response.data.data);
    } catch (error) {
      console.error("Error fetching landasan hukum:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHukum();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateLandasanHukum(editingItem.id, formData);
      } else {
        await createLandasanHukum(formData);
      }
      setIsModalOpen(false);
      fetchHukum();
    } catch (error) {
      console.error("Error saving landasan hukum:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteLandasanHukum(itemToDelete);
      setIsConfirmOpen(false);
      fetchHukum();
    } catch (error) {
      console.error("Error deleting landasan hukum:", error);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama_peraturan: item.nama_peraturan || "",
        judul: item.judul || "",
        deskripsi: item.deskripsi || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        nama_peraturan: "",
        judul: "",
        deskripsi: "",
      });
    }
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
              {isLoading ? (
                // Skeleton Loader (Non-Circular)
                [...Array(3)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-8 py-6 align-top">
                      <div className="h-8 bg-slate-100 rounded-xl w-32"></div>
                    </td>
                    <td className="px-8 py-6 align-top">
                      <div className="h-5 bg-slate-100 rounded-full w-48"></div>
                    </td>
                    <td className="px-8 py-6 align-top">
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-50 rounded-full w-full"></div>
                        <div className="h-4 bg-slate-50 rounded-full w-full"></div>
                        <div className="h-4 bg-slate-50 rounded-full w-2/3"></div>
                      </div>
                    </td>
                    <td className="px-8 py-6 align-top text-right">
                      <div className="flex justify-end gap-2">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
                        <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                hukumData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6 align-top">
                      <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-sm leading-snug">
                        {item.nama_peraturan}
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {hukumData.length === 0 && !isLoading && (
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
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col font-sans"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 font-sans">
              <div className="flex gap-4 font-sans">
                <div className="w-12 h-12 rounded-2xl bg-primary-blue/10 text-primary-blue flex items-center justify-center shrink-0 shadow-inner font-sans">
                  <Scale size={24} />
                </div>
                <div className="font-sans">
                  <h2 className="text-xl font-bold text-slate-900 leading-tight font-sans">
                    {editingItem
                      ? "Edit Landasan Hukum"
                      : "Tambah Landasan Hukum"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1 font-sans">
                    Lengkapi dasar aturan untuk RSUD.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors font-sans"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto font-sans">
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Nama Peraturan / Undang-Undang
                </label>
                <input
                  type="text"
                  name="nama_peraturan"
                  value={formData.nama_peraturan}
                  onChange={handleChange}
                  placeholder="Contoh: Peraturan Daerah No. 8 Tahun 2014"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
                  required
                />
              </div>

              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Judul Singkat Aturan
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  placeholder="Contoh: Dokumen Pembentukan RSUD"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-semibold text-slate-700"
                  required
                />
              </div>

              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Penjelasan / Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Jelaskan isi atau konteks dari peraturan ini..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-medium text-slate-700 leading-relaxed font-sans"
                  required
                ></textarea>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 font-sans">
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
                className="flex-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:bg-slate-400 font-sans"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Save size={16} />
                )}
                {isSubmitting ? "Menyimpan..." : "Simpan Aturan"}
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
        title="Hapus Landasan Hukum"
        message="Apakah Anda yakin ingin menghapus data landasan hukum ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default LandasanHukum;
