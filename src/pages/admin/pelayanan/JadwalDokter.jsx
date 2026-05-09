import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Save,
  X,
  Stethoscope,
  Clock,
  Upload,
  ImageIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import Pagination from "../../../components/admin/Pagination";

import useTitle from "../../../hooks/useTitle";
import {
  getJadwalDokter,
  createJadwalDokter,
  updateJadwalDokter,
  deleteJadwalDokter,
} from "../../../api/pelayanan/jadwalDokter";

const JadwalDokter = () => {
  useTitle("Manajemen Jadwal Dokter");
  const [jadwalData, setJadwalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama_dokter: "",
    spesialisasi: "",
    hari: "",
    jam: "",
    gambar: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const imageInputRef = useRef(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getJadwalDokter({
        page,
        per_page: pagination.itemsPerPage,
      });
      const data = response.data?.data || response.data || [];
      setJadwalData(data);

      if (response.data && response.data.current_page) {
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      toast.error("Gagal mengambil data jadwal dokter");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteJadwalDokter(itemToDelete);
      toast.success("Jadwal dokter berhasil dihapus");
      setIsConfirmOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus jadwal dokter");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama_dokter: item.nama_dokter || "",
        spesialisasi: item.spesialisasi || "",
        hari: item.hari || "",
        jam: item.jam || "",
        gambar: null,
      });
      if (item.gambar) {
        setPreviewImage(`${import.meta.env.VITE_STORAGE_URL}/${item.gambar}`);
      } else {
        setPreviewImage(null);
      }
    } else {
      setEditingItem(null);
      setFormData({
        nama_dokter: "",
        spesialisasi: "",
        hari: "",
        jam: "",
        gambar: null,
      });
      setPreviewImage(null);
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, gambar: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("nama_dokter", formData.nama_dokter);
    data.append("spesialisasi", formData.spesialisasi);
    data.append("hari", formData.hari);
    data.append("jam", formData.jam);
    if (formData.gambar) {
      data.append("gambar", formData.gambar);
    }

    try {
      if (editingItem) {
        data.append("_method", "PUT");
        await updateJadwalDokter(editingItem.id, data);
        toast.success("Jadwal dokter berhasil diperbarui");
      } else {
        await createJadwalDokter(data);
        toast.success("Jadwal dokter berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal menyimpan jadwal dokter",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jadwal Dokter</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola jadwal praktek tenaga medis di RSUD Bagas Waras.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah Jadwal
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          // Skeleton Loader (Non-Circular)
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center w-16">
                    No
                  </th>
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
                {[...Array(4)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-8 py-6 text-center">
                      <div className="w-6 h-6 bg-slate-100 rounded mx-auto"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                          <Stethoscope size={18} className="text-slate-200" />
                        </div>
                        <div className="h-5 bg-slate-100 rounded-full w-40"></div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-7 bg-slate-50 rounded-xl w-32"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-4 bg-slate-50 rounded-full w-24"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-4 bg-slate-50 rounded-full w-20"></div>
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
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center w-16">
                    No
                  </th>
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
                {jadwalData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6 align-middle text-center font-bold text-slate-400 text-sm">
                      #
                      {(pagination.currentPage - 1) * pagination.itemsPerPage +
                        (index + 1)}
                    </td>
                    <td className="px-8 py-6 align-middle">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 overflow-hidden border border-teal-100 shadow-sm">
                          {item.gambar ? (
                            <img
                              src={`${import.meta.env.VITE_STORAGE_URL}/${item.gambar}`}
                              alt={item.nama_dokter}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Stethoscope size={20} />
                          )}
                        </div>
                        <span className="font-bold text-slate-800">
                          {item.nama_dokter}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 align-middle">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl border border-slate-200">
                        {item.spesialisasi}
                      </span>
                    </td>
                    <td className="px-8 py-6 align-middle">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-wide">
                        <Calendar size={14} className="text-teal-500" />
                        {item.hari}
                      </div>
                    </td>
                    <td className="px-8 py-6 align-middle">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs font-mono">
                        <Clock size={14} className="text-teal-500" />
                        {item.jam}
                      </div>
                    </td>
                    <td className="px-8 py-6 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(item)}
                          className="p-2.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!isLoading && jadwalData.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center mx-auto text-slate-300 mb-4 border border-dashed border-slate-200">
              <Calendar size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada jadwal dokter yang terdata.
            </p>
          </div>
        )}

        {jadwalData.length > 0 && (
          <div className="border-t border-slate-100">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
            />
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
            className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Calendar size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {editingItem ? "Edit Jadwal Dokter" : "Tambah Jadwal Baru"}
                  </h2>
                  <p className="text-sm font-bold text-slate-500 mt-1">
                    Silakan isi detail jadwal praktek medis di bawah ini.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-slate-200 rounded-2xl text-slate-400 transition-colors bg-white shadow-sm border border-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Nama Lengkap Dokter
                </label>
                <div className="relative text-slate-900">
                  <Stethoscope
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="nama_dokter"
                    value={formData.nama_dokter}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: dr. Ahmad Subarjo, Sp.PD"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Poliklinik / Spesialisasi
                  </label>
                  <input
                    type="text"
                    name="spesialisasi"
                    value={formData.spesialisasi}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Penyakit Dalam"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold text-slate-700 text-sm"
                  />
                </div>
                <div className="space-y-2 text-slate-900">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Hari Praktek
                  </label>
                  <input
                    type="text"
                    name="hari"
                    value={formData.hari}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Senin"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold text-slate-700 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 text-slate-900">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Jam Operasional
                </label>
                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="jam"
                    value={formData.jam}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: 08:00 - 14:00"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Foto Dokter (JPG/PNG)
                </label>
                <div
                  onClick={() => imageInputRef.current?.click()}
                  className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-4 text-center group hover:border-teal-500/30 hover:bg-teal-50 transition-all cursor-pointer relative overflow-hidden"
                >
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <span className="bg-white px-6 py-2 rounded-xl text-[10px] font-black uppercase text-slate-900 shadow-xl">
                          Ganti Foto
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-3 shadow-sm group-hover:scale-110 transition-all">
                        <ImageIcon size={24} />
                      </div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Pilih Foto Dokter
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 h-12 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm flex items-center justify-center"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 h-12 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all active:scale-95 text-sm flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={18} />
                    <span>{editingItem ? "Update" : "Simpan"} Jadwal</span>
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
        title="Hapus Jadwal Dokter"
        message="Apakah Anda yakin ingin menghapus jadwal praktek dokter ini?"
      />
    </div>
  );
};

export default JadwalDokter;
