import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  X,
  Link as LinkIcon,
  Globe,
} from "lucide-react";
import { toast } from "react-toastify";

import Pagination from "../../../components/admin/Pagination";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import {
  getLinkEksternal,
  createLinkEksternal,
  updateLinkEksternal,
  deleteLinkEksternal,
} from "../../../api/content/linkEksternal";
import useTitle from "../../../hooks/useTitle";

const LinkEksternal = () => {
  useTitle("Manajemen Link Eksternal");
  const [links, setLinks] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama_link: "",
    url_link: "",
    gambar: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLinks = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getLinkEksternal({ page, per_page: pagination.itemsPerPage });
      setLinks(response.data?.data || response.data || []);
      
      if (response.data && response.data.current_page) {
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      toast.error("Gagal mengambil data link eksternal");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks(pagination.currentPage);
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
      await deleteLinkEksternal(itemToDelete);
      toast.success("Link eksternal berhasil dihapus");
      setIsConfirmOpen(false);
      fetchLinks(pagination.currentPage);
    } catch (error) {
      toast.error("Gagal menghapus link eksternal");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama_link: item.nama_link || "",
        url_link: item.url_link || "",
        gambar: null,
      });
      setPreviewUrl(`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`);
    } else {
      setEditingItem(null);
      setFormData({
        nama_link: "",
        url_link: "",
        gambar: null,
      });
      setPreviewUrl(null);
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
      setFormData((prev) => ({ ...prev, gambar: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama_link || !formData.url_link) {
      return toast.warning("Nama link dan URL harus diisi");
    }

    const data = new FormData();
    data.append("nama_link", formData.nama_link);
    data.append("url_link", formData.url_link);
    if (formData.gambar) {
      data.append("gambar", formData.gambar);
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        data.append("_method", "PUT");
        await updateLinkEksternal(editingItem.id, data);
        toast.success("Link eksternal berhasil diperbarui");
      } else {
        await createLinkEksternal(data);
        toast.success("Link eksternal baru berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchLinks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan link eksternal");
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
            Link Eksternal
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola tautan cepat ke website instansi terkait.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah Link
        </button>
      </div>

      {/* Grid Layout */}
      {isLoading ? (
        // Skeleton Grid Loader (Non-Circular)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] border border-slate-100 shadow-sm animate-pulse flex flex-col font-sans"
            >
              <div className="aspect-2/1 bg-slate-50 flex items-center justify-center p-8 border-b border-slate-100">
                <Globe className="text-slate-200" size={32} />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-5 bg-slate-100 rounded-full w-full"></div>
                  <div className="h-3 bg-slate-50 rounded-full w-2/3 mx-auto"></div>
                </div>
                <div className="flex items-center gap-2 pt-5 mt-5 border-t border-slate-50">
                  <div className="h-10 bg-slate-50 rounded-xl flex-1"></div>
                  <div className="h-10 bg-slate-50 rounded-xl w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {links.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col font-sans"
            >
              {/* Logo Preview Area */}
              <div className="aspect-2/1 bg-slate-50 flex items-center justify-center p-8 relative overflow-hidden group/img font-sans border-b border-slate-100">
                <img
                  src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                  alt={item.nama_link}
                  className="max-w-full max-h-full object-contain group-hover/img:scale-110 transition-transform duration-500 font-sans"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity font-sans">
                  <a
                    href={item.url_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all transform hover:rotate-12 font-sans"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between font-sans">
                <div className="space-y-2 font-sans text-center">
                  <h3 className="font-bold text-slate-900 leading-tight line-clamp-1 font-sans text-lg">
                    {item.nama_link}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold truncate uppercase tracking-widest font-sans">
                    {item.url_link}
                  </p>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center gap-2 pt-5 mt-5 border-t border-slate-50 font-sans">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all border border-slate-100 font-sans"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all border border-slate-100 font-sans"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {links.length > 0 && (
            <div className="col-span-full">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
              />
            </div>
          )}

          {links.length === 0 && (
            <div className="col-span-full py-40 text-center space-y-4 bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center mx-auto text-slate-200 shadow-sm">
                <LinkIcon size={40} />
              </div>
              <p className="text-slate-400 font-bold font-sans">
                Belum ada link eksternal yang ditambahkan.
              </p>
            </div>
          )}
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
            className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] font-sans border border-white"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 font-sans">
              <div className="flex gap-4 font-sans">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-inner font-sans">
                    <Globe size={24} />
                  </div>
                <div className="font-sans">
                  <h2 className="text-xl font-bold text-slate-900 font-sans leading-tight">
                    {editingItem ? "Edit Link Eksternal" : "Tambah Link Baru"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium font-sans">
                    Lengkapi detail tautan mitra internasional/nasional.
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
              {/* Title Input */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Nama Link / Mitra
                </label>
                <input
                  type="text"
                  name="nama_link"
                  value={formData.nama_link}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: BPJS Kesehatan"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-700 font-sans"
                />
              </div>

              {/* URL Input */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  URL / Tautan (Wajib Gunakan http:// atau https://)
                </label>
                <div className="relative font-sans">
                  <LinkIcon
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-sans"
                    size={20}
                  />
                  <input
                    type="url"
                    name="url_link"
                    value={formData.url_link}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold text-slate-700 font-sans"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Logo / Gambar Mitra
                </label>
                <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="aspect-2/1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-6 text-center group hover:border-indigo-500/30 hover:bg-indigo-50 transition-all cursor-pointer overflow-hidden relative font-sans shadow-inner"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        className="absolute inset-0 w-full h-full object-contain p-8 font-sans"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[2px] font-sans">
                        <span className="bg-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase text-slate-900 shadow-2xl font-sans">
                          Ganti Logo
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center font-sans">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-500 mb-4 shadow-sm group-hover:scale-110 transition-all z-10 font-sans border border-slate-100">
                        <Upload size={24} />
                      </div>
                      <p className="text-[10px] font-black uppercase text-slate-400 z-10 font-sans tracking-widest">
                        Klik untuk unggah logo mitra
                      </p>
                      <p className="text-[9px] text-slate-300 mt-2 font-sans italic">Hanya format gambar (PNG/JPG)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 font-sans">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all text-[10px] uppercase tracking-[0.2em] font-sans"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-95 text-[10px] uppercase tracking-[0.2em] font-sans disabled:bg-slate-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                   <div className="flex items-center gap-2 justify-center font-sans">
                      <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Menyimpan...
                   </div>
                ) : "Simpan Link"}
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
        title="Hapus Link Eksternal"
        message="Apakah Anda yakin ingin menghapus link eksternal ini?"
      />
    </div>
  );
};

export default LinkEksternal;
