import React, { useEffect, useState, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Calendar,
  User,
  Clock,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import BeritaModal from "../../../components/admin/BeritaModal";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import Pagination from "../../../components/admin/Pagination";

import {
  getBerita,
  createBerita,
  updateBerita,
  deleteBerita,
} from "../../../api/content/berita";
import useTitle from "../../../hooks/useTitle";

const Berita = () => {
  useTitle("Manajemen Berita");
  const [berita, setBerita] = useState([]);
  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    tanggal: "",
    penulis: "",
    gambar: "",
    status: "",
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState(null);
  
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      gambar: e.target.files[0],
    });
  };

  const fetchBerita = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getBerita({ page, per_page: pagination.itemsPerPage });
      const data = response.data?.data || response.data || [];
      setBerita(Array.isArray(data) ? data : []);
      
      if (response.data && response.data.current_page) {
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      console.error("Error fetching berita:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleSubmit = async (e, forcedStatus = null) => {
    if (e) e.preventDefault();

    const data = new FormData();
    data.append("judul", formData.judul);
    data.append("isi", formData.isi);
    data.append("tanggal", formData.tanggal);
    data.append("penulis", formData.penulis);
    if (formData.gambar) {
      data.append("gambar", formData.gambar);
    }
    data.append("status", forcedStatus || formData.status);

    if (editingBerita) {
      data.append("_method", "PUT");
    }

    try {
      if (editingBerita) {
        await updateBerita(editingBerita.id, data);
        toast.success("Berita berhasil diupdate");
      } else {
        await createBerita(data);
        toast.success("Berita berhasil ditambahkan");
      }
      setIsModalOpen(false);
      setFormData({
        judul: "",
        isi: "",
        tanggal: "",
        penulis: "",
        gambar: "",
        status: "",
      });
      fetchBerita();
    } catch (error) {
      console.error("Error saving berita:", error);
      toast.error("Gagal menyimpan berita");
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
      await deleteBerita(itemToDelete);
      setBerita(berita.filter((b) => b.id !== itemToDelete));
      toast.success("Berita berhasil dihapus");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus berita");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingBerita(item);
      setFormData({
        judul: item.judul || "",
        isi: item.isi || "",
        tanggal: item.tanggal || "",
        penulis: item.penulis || item.penulis_id || "",
        gambar: "",
        status: item.status || "published",
      });
    } else {
      setEditingBerita(null);
      setFormData({
        judul: "",
        isi: "",
        tanggal: "",
        penulis: "",
        gambar: "",
        status: "published",
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Manajemen Berita
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola artikel, berita, dan tips kesehatan untuk pengunjung website.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tulis Berita
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Konten Berita
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Info Publikasi
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
              {isLoading ? (
                // Skeleton Loader (Non-Circular)
                [...Array(3)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-6 max-w-md">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 shrink-0 rounded-xl bg-slate-100 border border-slate-100 flex items-center justify-center">
                          <ImageIcon className="text-slate-200" size={24} />
                        </div>
                        <div className="flex flex-col justify-center flex-1 gap-2">
                          <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                          <div className="h-4 bg-slate-100 rounded-full w-2/3"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2 px-3 border-l-2 border-slate-50">
                        <div className="h-3 bg-slate-50 rounded-full w-24"></div>
                        <div className="h-3 bg-slate-50 rounded-full w-32"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="mx-auto w-20 h-6 rounded-full bg-slate-50"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <div className="w-9 h-9 rounded-lg bg-slate-50"></div>
                        <div className="w-9 h-9 rounded-lg bg-slate-50"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                berita.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 shrink-0 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                          <img
                            src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="font-bold text-slate-900 line-clamp-2 leading-tight">
                            {item.judul}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1.5 px-3 border-l-2 border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <User size={14} className="text-slate-300" />
                          {item.penulis}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <Calendar size={14} className="text-slate-300" />
                          {item.tanggal}
                        </div>
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
                        <button
                          onClick={() => openModal(item)}
                          className="p-2 text-slate-400 hover:text-primary-blue hover:bg-primary-blue/10 rounded-lg transition-all"
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
                ))
              )}
              {berita.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center text-slate-400 italic font-medium"
                  >
                    Belum ada berita yang tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {berita.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
          />
        )}
      </div>

      {/* Berita Modal Component */}
      <BeritaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingBerita={editingBerita}
        formData={formData}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        fileInputRef={fileInputRef}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Berita"
        message="Apakah Anda yakin ingin menghapus berita ini secara permanen?"
      />
    </div>
  );
};

export default Berita;
