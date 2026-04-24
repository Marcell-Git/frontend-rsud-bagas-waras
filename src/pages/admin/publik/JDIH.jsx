import React, { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Scale, FileText, Download, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";
import JdihModal from "../../../components/admin/JdihModal";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import { getJdih, createJdih, updateJdih, deleteJdih } from "../../../api/publik/jdih";
import useTitle from "../../../hooks/useTitle";

const JDIH = () => {
  useTitle("Manajemen JDIH");
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    judul: "",
    file: "",
    tanggal: new Date().toISOString().split("T")[0],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getJdih();
      setItems(response.data);
    } catch (error) {
      toast.error("Gagal mengambil data JDIH");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file: file });
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        judul: item.judul,
        file: "",
        tanggal: item.tanggal,
      });
    } else {
      setEditingItem(null);
      setFormData({
        judul: "",
        file: "",
        tanggal: new Date().toISOString().split("T")[0],
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("judul", formData.judul);
    data.append("tanggal", formData.tanggal);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      if (editingItem) {
        await updateJdih(editingItem.id, data);
        toast.success("Data JDIH berhasil diperbarui");
      } else {
        await createJdih(data);
        toast.success("Data JDIH berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan data");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteJdih(itemToDelete);
      toast.success("Data JDIH berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen JDIH</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola dokumen Jaringan Dokumentasi dan Informasi Hukum.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah JDIH
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-20">No</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Dokumen JDIH</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Tanggal</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-8"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-24"></div></td>
                    <td className="px-6 py-4 text-right"><div className="h-8 bg-slate-100 rounded w-16 ml-auto"></div></td>
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-500 font-medium">
                    Belum ada data JDIH.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-400">#{index + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary-blue border border-slate-100 group-hover:scale-110 transition-transform">
                          <FileText size={22} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-slate-800 line-clamp-1">{item.judul}</span>
                          <a 
                            href={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-primary-blue font-black uppercase tracking-widest mt-1 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink size={10} />
                            Lihat Dokumen
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
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
            </tbody>
          </table>
        </div>
      </div>

      <JdihModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingItem={editingItem}
        formData={formData}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        fileInputRef={fileInputRef}
        isLoading={isSubmitting}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Data JDIH"
        message="Apakah Anda yakin ingin menghapus data ini? Data yang dihapus akan dipindahkan ke tempat sampah (Soft Delete)."
      />
    </div>
  );
};

export default JDIH;
