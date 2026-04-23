import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  FileCheck,
  Save,
  X,
  FileText,
  Upload,
  CalendarDays,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getLaporanTindakLanjut,
  createLaporanTindakLanjut,
  updateLaporanTindakLanjut,
  deleteLaporanTindakLanjut,
} from "../../../api/pengaduan/laporanTindakLanjut";
import Pagination from "../../../components/admin/Pagination";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import useTitle from "../../../hooks/useTitle";

const LaporanTindakLanjut = () => {
  useTitle("Laporan Tindak Lanjut");
  const [laporanData, setLaporanData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const [formData, setFormData] = useState({
    judul: "",
    nama_petugas: "",
    waktu: "",
    file: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getLaporanTindakLanjut({
        page,
        per_page: pagination.itemsPerPage,
      });
      if (response.data && response.data.data) {
        setLaporanData(response.data.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      console.error("Error fetching tindak lanjut:", error);
      toast.error("Gagal mengambil data laporan tindak lanjut");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  // States for File Upload Drag n Drop
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteLaporanTindakLanjut(itemToDelete);
      toast.success("Laporan tindak lanjut berhasil dihapus");
      setIsConfirmOpen(false);
      fetchData(pagination.currentPage);
    } catch (error) {
      toast.error("Gagal menghapus laporan");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        judul: item.judul || "",
        nama_petugas: item.nama_petugas || "",
        waktu: item.waktu || "",
        file: null,
      });
    } else {
      setEditingItem(null);
      setFormData({
        judul: "",
        nama_petugas: "",
        waktu: "",
        file: null,
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.judul || !formData.nama_petugas || !formData.waktu) {
      return toast.warning("Judul, Nama Petugas, dan Waktu harus diisi");
    }

    if (!editingItem && !formData.file) {
      return toast.warning("Silakan unggah file laporan (PDF)");
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("judul", formData.judul);
      data.append("nama_petugas", formData.nama_petugas);
      data.append("waktu", formData.waktu);
      if (formData.file) {
        data.append("file", formData.file);
      }

      if (editingItem) {
        data.append("_method", "PUT");
        await updateLaporanTindakLanjut(editingItem.id, data);
        toast.success("Laporan berhasil diperbarui");
      } else {
        await createLaporanTindakLanjut(data);
        toast.success("Laporan berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData(pagination.currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan laporan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <FileCheck size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Laporan Tindak Lanjut
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Arsip penyelesaian pengaduan masyarakat oleh petugas."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          Unggah Laporan
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-2/5">
                  Informasi Laporan
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Petugas
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Berkas PDF
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-32">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading
                ? // Skeleton Rows
                  [...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-8 py-6">
                        <div className="space-y-3">
                          <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                          <div className="h-8 bg-slate-50 rounded-lg w-32"></div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-50"></div>
                          <div className="h-4 bg-slate-50 rounded-full w-24"></div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="h-10 bg-slate-50 rounded-xl w-32"></div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
                          <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                : laporanData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Judul & Waktu Laporan */}
                      <td className="px-8 py-6 align-middle">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                            {item.judul}
                          </h3>
                          <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 font-bold text-[10px] uppercase rounded-lg border border-slate-200 tracking-wider">
                            <CalendarDays size={12} />
                            {new Date(item.waktu).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Petugas */}
                      <td className="px-8 py-6 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500">
                            <UserRound size={14} />
                          </div>
                          <span className="font-bold text-slate-700 text-sm">
                            {item.nama_petugas}
                          </span>
                        </div>
                      </td>

                      {/* Attachment */}
                      <td className="px-8 py-6 align-middle">
                        {item.url_file && (
                          <a
                            href={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 font-bold rounded-xl text-xs transition-colors group border border-slate-200 hover:border-indigo-200"
                          >
                            <FileText
                              size={16}
                              className="text-slate-400 group-hover:text-indigo-500"
                            />
                            Unduh Berkas
                          </a>
                        )}
                      </td>

                      {/* Aksi */}
                      <td className="px-8 py-6 align-middle text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openModal(item)}
                            className="p-3 bg-white text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-slate-200"
                            title="Edit Laporan"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-3 bg-white text-slate-400 hover:text-white hover:bg-rose-500 rounded-xl transition-all border border-slate-200"
                            title="Hapus Laporan"
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
      </div>

      {laporanData.length === 0 && !isLoading && (
        <div className="py-24 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4">
            <FileCheck size={40} />
          </div>
          <p className="text-slate-500 font-bold">
            Data laporan tindak lanjut masih kosong.
          </p>
        </div>
      )}

      {!isLoading && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
        />
      )}

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                  {editingItem
                    ? "Edit Dokumen Laporan"
                    : "Unggah Laporan Tindak Lanjut"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Publikasi hasil penyelesaian pengaduan masyarakat.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col overflow-hidden"
            >
              <div className="p-8 space-y-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Judul Laporan */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      Judul Laporan
                    </label>
                    <input
                      type="text"
                      name="judul"
                      value={formData.judul}
                      onChange={handleInputChange}
                      placeholder="Contoh: Laporan Tindak Lanjut Pengaduan Pelayanan IGD"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-700"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama Petugas */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        Nama Petugas Penindak
                      </label>
                      <div className="relative">
                        <UserRound
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <input
                          type="text"
                          name="nama_petugas"
                          value={formData.nama_petugas}
                          onChange={handleInputChange}
                          placeholder="Contoh: Dr. Handoko Surya"
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-700"
                          required
                        />
                      </div>
                    </div>

                    {/* Waktu Upload */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        Waktu Pelaporan (Upload)
                      </label>
                      <div className="relative">
                        <CalendarDays
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <input
                          type="date"
                          name="waktu"
                          value={formData.waktu}
                          onChange={handleInputChange}
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-3 pt-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                      <span>File Lampiran (PDF)</span>
                      <span className="text-indigo-500 italic lowercase font-medium">
                        Maksimal 10MB
                      </span>
                    </label>
                    <div
                      className={`relative border-2 border-dashed rounded-[32px] p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                        dragActive
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleChange}
                        className="hidden"
                      />

                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
                            <FileText size={32} />
                          </div>
                          <p className="font-bold text-slate-800 text-sm max-w-xs truncate">
                            {selectedFile.name}
                          </p>
                          <p className="text-sm font-medium text-indigo-600 mt-2">
                            Klik untuk mengganti dokumen
                          </p>
                        </div>
                      ) : editingItem?.file_path ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                            <FileText size={32} />
                          </div>
                          <p className="font-bold text-slate-800 text-sm max-w-xs truncate">
                            Berkas Terunggah
                          </p>
                          <p className="text-sm font-medium text-indigo-600 mt-2">
                            Klik untuk mengganti dokumen
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-500 mb-4 shadow-sm border border-slate-100">
                            <Upload size={28} />
                          </div>
                          <p className="font-bold text-slate-700 mb-1">
                            Tarik & lepaskan file laporan di sini
                          </p>
                          <p className="text-slate-400 text-sm mb-4">
                            Hanya mendukung format .pdf
                          </p>
                          <button
                            type="button"
                            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                          >
                            Eksplor Komputer
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 shrink-0">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Save size={16} />
                  )}
                  {editingItem ? "Update Laporan" : "Simpan Dokumen Laporan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Laporan Tindak Lanjut"
        message="Apakah Anda yakin ingin menghapus arsip laporan tindak lanjut ini secara permanen?"
      />
    </div>
  );
};

export default LaporanTindakLanjut;
