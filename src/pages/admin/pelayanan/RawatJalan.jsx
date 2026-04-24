import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Activity,
  Save,
  X,
  Stethoscope,
} from "lucide-react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import useTitle from "../../../hooks/useTitle";
import {
  getPoli,
  createPoli,
  updatePoli,
  deletePoli,
} from "../../../api/pelayanan/rawatJalan";

const RawatJalan = () => {
  useTitle("Manajemen Rawat Jalan");
  const [poliData, setPoliData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama_poli: "",
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
      const response = await getPoli();
      setPoliData(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data poliklinik");
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
      await deletePoli(itemToDelete);
      toast.success("Poliklinik berhasil dihapus");
      setIsConfirmOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus poliklinik");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama_poli: item.nama_poli || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        nama_poli: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.nama_poli) return toast.warning("Nama poli harus diisi");

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updatePoli(editingItem.id, formData);
        toast.success("Poliklinik berhasil diperbarui");
      } else {
        await createPoli(formData);
        toast.success("Poliklinik berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan poliklinik");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Layanan Rawat Jalan
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola daftar poliklinik rumah sakit RSUD Bagas Waras.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah Poliklinik
        </button>
      </div>

      {/* Grid Section for Polyclinics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          // Skeleton Loader (Non-Circular)
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 animate-pulse"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                  <Stethoscope size={24} className="text-slate-100" />
                </div>
                <div className="h-6 bg-slate-50 rounded-full w-24 mt-2"></div>
              </div>
              <div className="flex gap-2 justify-end border-t border-slate-50 pt-4">
                <div className="h-8 bg-slate-50 rounded-xl w-16"></div>
                <div className="h-8 bg-slate-50 rounded-xl w-16"></div>
              </div>
            </div>
          ))
        ) : (
          poliData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between group hover:border-teal-200 transition-colors"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                  <Stethoscope size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-snug pt-1">
                  {item.nama_poli}
                </h3>
              </div>

              {/* Actions */}
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
          ))
        )}

        {!isLoading && poliData.length === 0 && (
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
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 shadow-inner">
                    <Activity size={24} />
                  </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {editingItem ? "Edit Poliklinik" : "Tambah Poliklinik"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Masukkan nama poli untuk rawat jalan.
                  </p>
                </div>
              </div>
              <button
                type="button"
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
                <div className="relative text-slate-900">
                  <Stethoscope
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="nama_poli"
                    value={formData.nama_poli}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Poliklinik Jantung"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
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
                className="flex-2 px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:bg-teal-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                     <Save size={16} /> Simpan
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
        title="Hapus Poliklinik"
        message="Apakah Anda yakin ingin menghapus poliklinik ini dari daftar layanan rawat jalan?"
      />
    </div>
  );
};

export default RawatJalan;
