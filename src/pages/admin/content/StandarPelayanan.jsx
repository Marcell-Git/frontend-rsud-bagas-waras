import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  FileText,
  Search,
  Download,
  Eye,
  File,
} from "lucide-react";
import { toast } from "react-toastify";

import Pagination from "../../../components/admin/Pagination";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import {
  getStandarPelayanan,
  createStandarPelayanan,
  updateStandarPelayanan,
  deleteStandarPelayanan,
} from "../../../api/content/standarPelayanan";

const StandarPelayanan = () => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    nama_pelayanan: "",
    file: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getStandarPelayanan({ 
        page, 
        per_page: pagination.itemsPerPage,
        search: searchTerm 
      });
      setItems(response.data?.data || response.data || []);
      
      if (response.data && response.data.current_page) {
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      toast.error("Gagal mengambil data standar pelayanan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchItems(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteStandarPelayanan(itemToDelete);
      toast.success("Data berhasil dihapus");
      setIsConfirmOpen(false);
      fetchItems(pagination.currentPage);
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama_pelayanan: item.nama_pelayanan || "",
        file: null,
      });
      setFileName(item.url_file?.split('/').pop() || "");
    } else {
      setEditingItem(null);
      setFormData({
        nama_pelayanan: "",
        file: null,
      });
      setFileName("");
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama_pelayanan) {
      return toast.warning("Nama pelayanan harus diisi");
    }

    const data = new FormData();
    data.append("nama_pelayanan", formData.nama_pelayanan);
    if (formData.file) {
      data.append("file", formData.file);
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        data.append("_method", "PUT");
        await updateStandarPelayanan(editingItem.id, data);
        toast.success("Data berhasil diperbarui");
      } else {
        if (!formData.file) {
          setIsSubmitting(false);
          return toast.warning("File harus diunggah untuk data baru");
        }
        await createStandarPelayanan(data);
        toast.success("Data baru berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
            <FileText size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Standar Pelayanan
            </h1>
            <p className="text-slate-500 mt-1 font-bold text-sm italic opacity-80">
              Kelola dokumen standar pelayanan RSUD Bagas Waras.
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:shadow-slate-900/20 transition-all active:scale-95 text-xs uppercase tracking-widest"
        >
          <Plus size={18} />
          Tambah Data
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Cari nama pelayanan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-600"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden transition-all duration-500">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nama Pelayanan</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">File Dokumen</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                [...Array(5)].map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 bg-slate-100 rounded-full w-8"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-slate-100 rounded-full w-48"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-slate-100 rounded-full w-32"></div></td>
                    <td className="px-8 py-6 flex justify-center gap-2"><div className="h-10 bg-slate-50 rounded-xl w-24"></div></td>
                  </tr>
                ))
              ) : items.length > 0 ? (
                items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-400">
                        {(pagination.currentPage - 1) * pagination.itemsPerPage + idx + 1}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {item.nama_pelayanan}
                      </h3>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition-all shadow-inner">
                          <File size={18} />
                        </div>
                        <a 
                          href={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-slate-500 hover:text-blue-600 truncate max-w-[200px]"
                        >
                          {item.url_file?.split('/').pop()}
                        </a>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <a 
                          href={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-500 hover:text-white transition-all border border-slate-100 shadow-sm"
                          title="Lihat Dokumen"
                        >
                          <Eye size={16} />
                        </a>
                        <button
                          onClick={() => openModal(item)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-amber-500 hover:text-white transition-all border border-slate-100 shadow-sm"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all border border-slate-100 shadow-sm"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-slate-200 shadow-inner">
                        <FileText size={40} />
                      </div>
                      <p className="text-slate-400 font-bold">Belum ada data standar pelayanan.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-slate-50 bg-slate-50/20">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm shadow-inner"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-white"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {editingItem ? "Edit Data" : "Tambah Data Baru"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Lengkapi informasi standar pelayanan.
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

            <div className="p-8 space-y-6 overflow-y-auto">
              {/* Title Input */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Nama Pelayanan
                </label>
                <input
                  type="text"
                  name="nama_pelayanan"
                  value={formData.nama_pelayanan}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Standar Pelayanan Rawat Inap"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-700 shadow-inner"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Dokumen (PDF/DOC/Image)
                </label>
                <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="min-h-[160px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-8 text-center group hover:border-blue-500/30 hover:bg-blue-50 transition-all cursor-pointer relative shadow-inner"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,image/*"
                  />
                  {fileName ? (
                    <div className="flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-blue-500 mb-4 shadow-sm border border-slate-100">
                        <File size={32} />
                      </div>
                      <p className="text-xs font-black text-slate-700 max-w-[200px] truncate">
                        {fileName}
                      </p>
                      <span className="mt-2 bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-blue-600 shadow-sm border border-slate-100">
                        Ganti File
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-300 mb-4 shadow-sm border border-slate-100 group-hover:scale-110 transition-all">
                        <Upload size={24} />
                      </div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                        Klik untuk unggah dokumen
                      </p>
                      <p className="text-[9px] text-slate-300 mt-2 italic">PDF, DOC, DOCX, atau Gambar (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-4 bg-white border border-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all text-[10px] uppercase tracking-[0.2em]"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-95 text-[10px] uppercase tracking-[0.2em] disabled:bg-slate-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                   <div className="flex items-center gap-2 justify-center">
                      <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Menyimpan...
                   </div>
                ) : "Simpan Data"}
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
        title="Hapus Standar Pelayanan"
        message="Apakah Anda yakin ingin menghapus data standar pelayanan ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default StandarPelayanan;