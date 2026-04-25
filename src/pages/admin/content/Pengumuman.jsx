import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Megaphone,
  CheckCircle2,
  Clock,
  X,
  Calendar,
  FileText,
  Upload,
  ExternalLink,
} from "lucide-react";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import {
  getPengumuman,
  createPengumuman,
  updatePengumuman,
  deletePengumuman,
} from "../../../api/content/pengumuman";
import useTitle from "../../../hooks/useTitle";

const Pengumuman = () => {
  useTitle("Manajemen Pengumuman");
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    judul: "",
    file: null,
    status: "published",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getPengumuman();
      setAnnouncements(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data pengumuman");
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
      await deletePengumuman(itemToDelete);
      toast.success("Pengumuman berhasil dihapus");
      setIsConfirmOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus pengumuman");
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
        file: null,
        status: item.status || "published",
      });
    } else {
      setEditingItem(null);
      setFormData({
        judul: "",
        file: null,
        status: "published",
      });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.judul) {
      return toast.warning("Judul pengumuman harus diisi");
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("judul", formData.judul);
      data.append("status", formData.status);
      if (formData.file) {
        data.append("file", formData.file);
      }

      if (editingItem) {
        // Many Laravel APIs use POST with _method=PUT for file uploads
        data.append("_method", "PUT");
        await updatePengumuman(editingItem.id, data);
        toast.success("Pengumuman berhasil diperbarui");
      } else {
        await createPengumuman(data);
        toast.success("Pengumuman berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal menyimpan pengumuman",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = announcements.filter((a) =>
    (a.judul || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Pengumuman
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Buat dan kelola informasi penting untuk pasien dan staf.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah Pengumuman
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
        {isLoading ? (
          // Skeleton Loader (Non-Circular)
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center w-16">
                    No
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Judul Pengumuman
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Update Terakhir
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...Array(3)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-6 text-center">
                      <div className="w-6 h-6 bg-slate-100 rounded mx-auto"></div>
                    </td>
                    <td className="px-6 py-6 max-w-md">
                      <div className="flex flex-col gap-2">
                        <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                        <div className="h-3 bg-slate-50 rounded-full w-1/3 mt-2"></div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="h-4 bg-slate-50 rounded-full w-24"></div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="mx-auto w-20 h-6 rounded-full bg-slate-50"></div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex justify-end gap-2">
                        <div className="w-9 h-9 rounded-lg bg-slate-50"></div>
                        <div className="w-9 h-9 rounded-lg bg-slate-50"></div>
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center w-16">
                    No
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Judul Pengumuman
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Update Terakhir
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center font-bold text-slate-400 text-sm">
                      #{index + 1}
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex flex-col">
                        <p className="font-bold text-slate-900 leading-tight">
                          {item.judul}
                        </p>
                        {item.file_path && (
                          <a
                            href={`${import.meta.env.VITE_STORAGE_URL}/${item.file_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 mt-2 text-xs text-primary-blue font-bold group/file cursor-pointer w-fit"
                          >
                            <FileText size={14} />
                            <span className="group-hover/file:underline">
                              Lihat Dokumen PDF
                            </span>
                            <ExternalLink
                              size={12}
                              className="opacity-0 group-hover/file:opacity-100 transition-opacity"
                            />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                        <Calendar size={14} className="text-slate-300" />
                        {new Date(item.updated_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "published"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {item.status === "published" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        {item.status === "published" ? "Terbit" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {item.url_file && (
                          <a
                            href={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Lihat Berkas"
                          >
                            <FileText size={18} />
                          </a>
                        )}
                        <button
                          onClick={() => openModal(item)}
                          className="p-2 text-slate-400 hover:text-primary-blue hover:bg-primary-blue/10 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-20 text-center text-slate-400 font-medium"
                    >
                      Tidak ada data pengumuman yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-blue/10 text-primary-blue flex items-center justify-center">
                  <Megaphone size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingItem ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
                  </h2>
                  <p className="text-sm text-slate-500 font-medium tracking-tight">
                    Informasikan pesan penting kepada publik melalui portal
                    resmi.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                title="Tutup"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Judul Pengumuman
                </label>
                <input
                  name="judul"
                  type="text"
                  value={formData.judul}
                  onChange={handleInputChange}
                  placeholder="Contoh: Jadwal Pelayanan Terbaru..."
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Lampiran File (PDF)
                </label>
                <label className="block border-2 border-dashed border-slate-200 rounded-[32px] p-10 text-center bg-slate-50/50 hover:border-primary-blue/40 transition-all cursor-pointer group relative">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-blue group-hover:scale-110 transition-all shadow-sm">
                    <Upload size={24} />
                  </div>
                  {formData.file ? (
                    <div className="flex items-center justify-center gap-2 text-primary-blue font-bold text-sm">
                      <FileText size={18} />
                      {formData.file.name}
                    </div>
                  ) : editingItem?.file_path ? (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                        <CheckCircle2 size={18} />
                        File Tersimpan
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Klik untuk mengganti dengan file baru
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-slate-900">
                        Klik atau seret file PDF ke sini
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        Maksimal ukuran file: 5MB (Format PDF)
                      </p>
                    </>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Status Publikasi
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none appearance-none font-bold text-slate-700"
                  >
                    <option value="published">Segera Terbitkan</option>
                    <option value="draft">Simpan sebagai Draft</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-95 disabled:bg-slate-400 flex items-center justify-center gap-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    {editingItem ? "Update Pengumuman" : "Simpan & Terbit"}
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
        title="Hapus Pengumuman"
        message="Apakah Anda yakin ingin menghapus pengumuman ini?"
      />
    </div>
  );
};

export default Pengumuman;
