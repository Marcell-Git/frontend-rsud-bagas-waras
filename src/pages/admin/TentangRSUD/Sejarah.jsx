import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, History, Save, X, Clock } from "lucide-react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import useTitle from "../../../hooks/useTitle";
import {
  getSejarah,
  createSejarah,
  updateSejarah,
  deleteSejarah,
} from "../../../api/tentang/sejarah";

const Sejarah = () => {
  useTitle("Manajemen Sejarah");
  const [sejarahPoints, setSejarahPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    sejarah: "",
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
      const response = await getSejarah();
      setSejarahPoints(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data sejarah");
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
      await deleteSejarah(itemToDelete);
      toast.success("Momen sejarah berhasil dihapus");
      setIsConfirmOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus momen sejarah");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        sejarah: item.sejarah || item.description || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        sejarah: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.sejarah) return toast.warning("Deskripsi sejarah harus diisi");

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateSejarah(editingItem.id, formData);
        toast.success("Momen sejarah berhasil diperbarui");
      } else {
        await createSejarah(formData);
        toast.success("Momen sejarah baru berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan data sejarah");
    } finally {
      setIsSubmitting(false);
    }
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
            <p className="text-slate-400 mt-1 italic text-sm font-bold">
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
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          // Skeleton Loader (Non-Circular)
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-xs tracking-widest uppercase">
                  <th className="px-8 py-5 font-black">Deskripsi Sejarah</th>
                  <th className="px-8 py-5 font-black text-right w-40">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {[...Array(3)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-8 py-8 align-top">
                      <div className="space-y-3">
                        <div className="h-5 bg-slate-100 rounded-full w-full"></div>
                        <div className="h-5 bg-slate-100 rounded-full w-5/6"></div>
                        <div className="h-5 bg-slate-100 rounded-full w-4/6"></div>
                      </div>
                    </td>
                    <td className="px-8 py-8 align-top text-right">
                      <div className="flex justify-end gap-2 mt-1">
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
                  <th className="px-8 py-5 font-black">
                    Deskripsi Sejarah
                  </th>
                  <th className="px-8 py-5 font-black text-right w-40">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {sejarahPoints.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors font-sans"
                  >
                    <td className="px-8 py-6 align-top max-w-4xl font-sans">
                      <p className="text-slate-800 text-base font-bold leading-relaxed font-sans">
                        {item.sejarah || item.description}
                      </p>
                    </td>
                    <td className="px-8 py-6 align-top text-right font-sans">
                      <div className="flex justify-end gap-2 mt-1 font-sans">
                        <button
                          onClick={() => openModal(item)}
                          className="p-3 bg-white text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all border border-slate-200 shadow-sm font-sans"
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

        {!isLoading && sejarahPoints.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[32px] border border-dashed border-slate-200 flex items-center justify-center mx-auto text-slate-300 mb-6 font-sans">
              <Clock size={40} />
            </div>
            <p className="text-xl font-bold text-slate-900 mb-2">
              Data sejarah masih kosong.
            </p>
            <p className="text-slate-500 font-medium max-w-xs text-sm">
                Belum ada catatan awal mula berdirinya rumah sakit.
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
                 <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-inner font-sans">
                    <History size={24} />
                  </div>
                <div className="font-sans">
                  <h2 className="text-xl font-bold text-slate-900 leading-tight font-sans">
                    {editingItem
                      ? "Edit Momen Sejarah"
                      : "Tambah Momen Bersejarah"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1 font-sans">
                    Lengkapi titik waktu perjalanan institusi.
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
              {/* Description Input */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Penjelasan Singkat
                </label>
                <textarea
                  name="sejarah"
                  value={formData.sejarah}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Ceritakan detail singkat mengenai peristiwa ini..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none font-bold text-slate-700 leading-relaxed font-sans"
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
                className="flex-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-sans disabled:bg-slate-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                   <>
                     <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Menyimpan...
                   </>
                ) : (
                  <>
                    <Save size={16} /> Simpan Sejarah
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
        title="Hapus Momen Sejarah"
        message="Apakah Anda yakin ingin menghapus momen bersejarah ini? Tindakan ini bersifat permanen."
      />
    </div>
  );
};

export default Sejarah;
