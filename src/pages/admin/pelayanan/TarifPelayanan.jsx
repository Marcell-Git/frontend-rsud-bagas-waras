import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  ImageIcon,
  FileText,
  Search,
  Download,
  Eye,
  File,
} from "lucide-react";
import { FaMoneyBill } from "react-icons/fa6";
import { toast } from "react-toastify";

import Pagination from "../../../components/admin/Pagination";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import useTitle from "../../../hooks/useTitle";
import {
  getTarifPelayanan,
  createTarifPelayanan,
  updateTarifPelayanan,
  deleteTarifPelayanan,
} from "../../../api/pelayanan/tarifPelayanan";

const TarifPelayanan = () => {
  useTitle("Manajemen Tarif Pelayanan");
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 8,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama_tarif: "",
    gambar: null,
    file: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("");
  
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getTarifPelayanan({ 
        page, 
        per_page: pagination.itemsPerPage 
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
      toast.error("Gagal mengambil data tarif pelayanan");
    } finally {
      setIsLoading(false);
    }
  };

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
      await deleteTarifPelayanan(itemToDelete);
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
        nama_tarif: item.nama_tarif || "",
        gambar: null,
        file: null,
      });
      setPreviewImage(`${import.meta.env.VITE_STORAGE_URL}/${item.gambar_tarif}`);
      setFileName(item.url_file?.split('/').pop() || "");
    } else {
      setEditingItem(null);
      setFormData({
        nama_tarif: "",
        gambar: null,
        file: null,
      });
      setPreviewImage(null);
      setFileName("");
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, gambar: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
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
    
    const data = new FormData();
    data.append("nama_tarif", formData.nama_tarif);
    if (formData.gambar) {
      data.append("gambar", formData.gambar);
    }
    if (formData.file) {
      data.append("file", formData.file);
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        data.append("_method", "PUT");
        await updateTarifPelayanan(editingItem.id, data);
        toast.success("Data berhasil diperbarui");
      } else {
        if (!formData.nama_tarif || !formData.gambar || !formData.file) {
          setIsSubmitting(false);
          return toast.warning("Nama, Gambar dan File harus diisi untuk data baru");
        }
        await createTarifPelayanan(data);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Tarif Pelayanan
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola informasi tarif dan biaya pelayanan RSUD Bagas Waras.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah Tarif
        </button>
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-white rounded-[40px] border border-slate-100 shadow-sm animate-pulse h-[500px]">
              <div className="h-3/4 bg-slate-100 rounded-t-[40px]"></div>
              <div className="p-8 space-y-4">
                <div className="h-5 bg-slate-50 rounded-full w-2/3"></div>
                <div className="h-12 bg-slate-50 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Area */}
              <div className="aspect-4/5 relative overflow-hidden bg-slate-50/50 border-b border-slate-100 p-4">
                <img
                  src={`${import.meta.env.VITE_STORAGE_URL}/${item.gambar_tarif}`}
                  alt="Tarif Pelayanan"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <a 
                    href={`${import.meta.env.VITE_STORAGE_URL}/${item.gambar_tarif}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-2xl transform scale-90 group-hover:scale-100 duration-500"
                   >
                     <Eye size={24} />
                   </a>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-1">
                    {item.nama_tarif}
                  </h3>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-[24px] border border-slate-100 group-hover:border-amber-200 group-hover:bg-amber-50/50 transition-all">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-slate-50">
                      <FileText size={22} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5">Dokumen Resmi</p>
                      <a 
                        href={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-slate-700 hover:text-amber-600 truncate block transition-colors"
                      >
                        {item.url_file?.split('/').pop()}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 shadow-lg shadow-slate-900/10 active:scale-95 transition-all"
                  >
                    <Edit2 size={16} />
                    Edit Data
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-14 h-14 flex items-center justify-center rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-100 active:scale-95"
                    title="Hapus"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center mx-auto text-slate-200 shadow-sm mb-4">
            <FaMoneyBill size={40} />
          </div>
          <p className="text-slate-400 font-bold">Belum ada data tarif pelayanan yang ditambahkan.</p>
        </div>
      )}

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
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-inner">
                  <FaMoneyBill size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {editingItem ? "Edit Tarif Pelayanan" : "Tambah Tarif Baru"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Unggah poster gambar dan dokumen tarif resmi.
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

            <div className="p-8 space-y-8 overflow-y-auto">
              {/* Nama Tarif */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Nama Tarif Pelayanan
                </label>
                <input
                  type="text"
                  name="nama_tarif"
                  value={formData.nama_tarif}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Tarif Rawat Jalan"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none font-bold text-slate-700 shadow-inner"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Poster Gambar Tarif (JPG/PNG)
                </label>
                <div 
                   onClick={() => imageInputRef.current?.click()}
                   className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-4 text-center group hover:border-amber-500/30 hover:bg-amber-50 transition-all cursor-pointer relative overflow-hidden shadow-inner"
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
                        <span className="bg-white px-6 py-2 rounded-xl text-[10px] font-black uppercase text-slate-900 shadow-xl">Ganti Gambar</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-3 shadow-sm group-hover:scale-110 transition-all">
                        <ImageIcon size={24} />
                      </div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pilih Gambar Poster</p>
                    </div>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Dokumen Tarif (PDF/DOC)
                </label>
                <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="bg-slate-50 border border-slate-200 rounded-2xl flex items-center p-4 group hover:border-amber-500/30 hover:bg-amber-50 transition-all cursor-pointer shadow-inner"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 mr-4 shadow-sm group-hover:rotate-12 transition-transform">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-slate-700 truncate">
                      {fileName || "Pilih dokumen tarif resmi..."}
                    </p>
                    <p className="text-[9px] text-slate-400 font-medium italic">Hanya format PDF atau DOC (Maks 10MB)</p>
                  </div>
                  <Upload size={18} className="text-slate-300 ml-2" />
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
        title="Hapus Tarif Pelayanan"
        message="Apakah Anda yakin ingin menghapus data tarif pelayanan ini?"
      />
    </div>
  );
};

export default TarifPelayanan;
