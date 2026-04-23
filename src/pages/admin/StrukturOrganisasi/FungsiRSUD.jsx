import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
  Save,
  X,
  Target,
} from "lucide-react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import useTitle from "../../../hooks/useTitle";
import {
  getFungsiRSUD,
  createFungsiRSUD,
  updateFungsiRSUD,
  deleteFungsiRSUD,
} from "../../../api/struktur/fungsiRSUD";

const FungsiRSUD = () => {
  useTitle("Fungsi RSUD");
  const [fungsiPoints, setFungsiPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fungsi_rsud: "",
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
      const response = await getFungsiRSUD();
      setFungsiPoints(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data fungsi RSUD");
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
      await deleteFungsiRSUD(itemToDelete);
      toast.success("Poin fungsi berhasil dihapus");
      setIsConfirmOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus poin fungsi");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        fungsi_rsud: item.fungsi_rsud || item.deskripsi || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        fungsi_rsud: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.fungsi_rsud) return toast.warning("Deskripsi fungsi harus diisi");

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateFungsiRSUD(editingItem.id, formData);
        toast.success("Poin fungsi berhasil diperbarui");
      } else {
        await createFungsiRSUD(formData);
        toast.success("Poin fungsi baru berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan data fungsi");
    } finally {
      setIsSubmitting(false);
    }
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
            <p className="text-slate-400 mt-1 italic text-sm font-bold">
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
        {isLoading ? (
          // Skeleton Loader (Non-Circular)
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm animate-pulse flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 bg-slate-100 rounded-full w-full"></div>
                <div className="h-6 bg-slate-100 rounded-full w-3/4"></div>
                <div className="flex gap-2 pt-4 border-t border-slate-50">
                  <div className="h-10 bg-slate-50 rounded-xl w-24"></div>
                  <div className="h-10 bg-slate-50 rounded-xl w-24"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          fungsiPoints.map((item, index) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-slate-50 text-indigo-500 font-black flex items-center justify-center shrink-0 border border-slate-100 text-lg">
                {index + 1}
              </div>

              <div className="flex-1 flex flex-col justify-between pt-1">
                <p className="text-lg font-semibold text-slate-700 leading-relaxed">
                  {item.fungsi_rsud || item.deskripsi}
                </p>

                {/* Actions Bar */}
                <div className="flex items-center gap-2 pt-5 mt-4 border-t border-slate-50">
                  <button
                    onClick={() => openModal(item)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all border border-slate-100 uppercase tracking-widest"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all border border-slate-100"
                    title="Hapus Fungsi"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {!isLoading && fungsiPoints.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 shadow-sm mb-4">
              <Target size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada poin fungsi yang ditambahkan.
            </p>
            <button
              onClick={() => openModal()}
              className="text-indigo-600 font-black text-xs uppercase tracking-widest mt-2 hover:underline"
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
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
                    <ShieldCheck size={24} />
                  </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {editingItem ? "Edit Poin Fungsi" : "Tambah Poin Fungsi"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Jabarkan fungsi operasional RSUD.
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
              {/* Description Input */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Deskripsi Fungsi
                </label>
                <textarea
                  name="fungsi_rsud"
                  value={formData.fungsi_rsud}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tuliskan deskripsi fungsi rumah sakit..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[32px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-700 leading-relaxed font-sans"
                ></textarea>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs disabled:bg-slate-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Menyimpan...
                  </>
                ) : (
                  <>
                     <Save size={16} /> Simpan Fungsi
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
        title="Hapus Fungsi RSUD"
        message="Apakah Anda yakin ingin menghapus poin fungsi ini? Data yang terhapus tidak dapat dikembalikan."
      />
    </div>
  );
};

export default FungsiRSUD;
