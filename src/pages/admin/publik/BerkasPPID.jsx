import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  FolderOpen,
  Save,
  X,
  FileText,
  Upload,
  FileBadge,
} from "lucide-react";
import { toast } from "react-toastify";
import Modal from "../../../components/admin/Modal";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import Pagination from "../../../components/admin/Pagination";

import {
  getPPID,
  createPPID,
  updatePPID,
  deletePPID,
} from "../../../api/publik/berkasPpid";

const BerkasPPID = () => {
  const [ppidData, setPpidData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [formData, setFormData] = useState({
    judul: "",
    kategori: "Informasi Berkala",
    kelompok_dokumen: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPPID = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getPPID({ page, per_page: pagination.itemsPerPage });
      const data = response.data?.data || response.data || [];
      setPpidData(Array.isArray(data) ? data : []);
      
      if (response.data && response.data.current_page) {
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      console.error("Error fetching PPID:", error);
      toast.error("Gagal mengambil data PPID");
      setPpidData([]); // Ensure it stays an array on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPPID(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.judul || !formData.kelompok_dokumen) {
      toast.warning("Mohon lengkapi informasi dokumen");
      return;
    }

    if (!selectedFile && !editingItem) {
      toast.warning("Mohon pilih file dokumen");
      return;
    }

    const data = new FormData();
    data.append("judul", formData.judul);
    data.append("kategori", formData.kategori);
    data.append("kelompok_dokumen", formData.kelompok_dokumen);
    
    if (selectedFile) {
      data.append("file", selectedFile);
    }

    if (editingItem) {
      data.append("_method", "PUT");
    }

    try {
      if (editingItem) {
        await updatePPID(editingItem.id, data);
        toast.success("Dokumen PPID berhasil diperbarui");
      } else {
        await createPPID(data);
        toast.success("Dokumen PPID berhasil ditambahkan");
      }
      closeModal();
      fetchPPID();
    } catch (error) {
      console.error("Error saving PPID:", error);
      toast.error("Gagal menyimpan dokumen PPID");
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
      await deletePPID(itemToDelete);
      setPpidData(ppidData.filter((d) => d.id !== itemToDelete));
      toast.success("Dokumen berhasil dihapus");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus dokumen");
      console.error(error);
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
        kategori: item.kategori || "Berkala",
        kelompok_dokumen: item.kelompok_dokumen || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        judul: "",
        kategori: "Berkala",
        kelompok_dokumen: "",
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setSelectedFile(null);
  };

  const getKategoriColor = (kategori) => {
    switch (kategori) {
      case "Informasi Berkala":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Informasi Serta Merta":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Informasi Setiap Saat":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Informasi Dikecualikan":
        return "bg-slate-100 text-slate-700 border-slate-300";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100 font-sans">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner font-sans">
            <FolderOpen size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              Berkas PPID
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm font-sans">
              "Manajemen Pejabat Pengelola Informasi dan Dokumentasi (PPID)."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20 font-sans"
        >
          <Plus size={20} />
          Unggah Dokumen
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden font-sans">
        <div className="overflow-x-auto font-sans">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 font-sans">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-2/5 font-sans">
                  Informasi Dokumen
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-sans">
                  Kategori Informasi
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-sans">
                  File Berkas
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-32 font-sans">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-sm">
              {isLoading ? (
                // Skeleton Loader (Non-Circular)
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-8 py-6">
                      <div className="space-y-3">
                        <div className="h-5 bg-slate-100 rounded-full w-full"></div>
                        <div className="h-4 bg-slate-50 rounded-full w-2/3"></div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="w-24 h-6 rounded-lg bg-slate-100"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="w-32 h-10 rounded-xl bg-slate-50"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-50"></div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                ppidData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors font-sans"
                >
                  <td className="px-8 py-6 align-middle font-sans">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-2 font-sans">
                        {item.judul}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 font-sans">
                        <FileBadge size={14} className="text-slate-400 font-sans" />
                        {item.kelompok_dokumen}
                      </p>
                    </div>
                  </td>

                  <td className="px-8 py-6 align-middle font-sans">
                    <span
                      className={`inline-block px-3 py-1.5 font-bold rounded-lg border text-[10px] uppercase tracking-wider font-sans ${getKategoriColor(item.kategori)}`}
                    >
                      {item.kategori}
                    </span>
                  </td>

                  <td className="px-8 py-6 align-middle font-sans">
                    <a
                      href={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold rounded-xl text-xs transition-all group border border-transparent hover:border-blue-100 font-sans"
                    >
                      <FileText
                        size={16}
                        className="text-slate-400 group-hover:text-blue-500 font-sans"
                      />
                      Lihat Dokumen
                    </a>
                  </td>

                  <td className="px-8 py-6 align-middle text-right font-sans">
                    <div className="flex justify-end gap-2 font-sans">
                      <button
                        onClick={() => openModal(item)}
                        className="p-3 bg-white text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-200 font-sans shadow-sm"
                        title="Edit Dokumen"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-white text-slate-400 hover:text-white hover:bg-rose-500 rounded-xl transition-all border border-slate-200 font-sans shadow-sm"
                        title="Hapus Dokumen"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {ppidData.length > 0 && !isLoading && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
        />
      )}

      {ppidData.length === 0 && !isLoading && (
        <div className="py-24 text-center font-sans">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 shadow-sm mb-4 font-sans">
            <FolderOpen size={40} />
          </div>
          <p className="text-slate-500 font-bold font-sans">
            Data dokumen PPID masih kosong.
          </p>
        </div>
      )}
    </div>

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit Dokumen PPID" : "Unggah Dokumen PPID"}
        subtitle="Klasifikasi informasi publik sesuai UU Keterbukaan Informasi."
        footer={
          <div className="flex gap-4 w-full justify-end font-sans">
            <button
              onClick={closeModal}
              className="px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest font-sans"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-sans"
            >
              <Save size={16} />
              Simpan Dokumen
            </button>
          </div>
        }
      >
        <div className="space-y-6 font-sans">
           {/* Nama Dokumen */}
           <div className="space-y-3 font-sans">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
              Nama / Judul Dokumen
            </label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              placeholder="Contoh: Laporan Kinerja Instansi RSUD Tahun 2023"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-700 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {/* Kategori Informasi */}
            <div className="space-y-3 font-sans">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                Kategori Informasi
              </label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-700 font-sans appearance-none cursor-pointer"
              >
                <option value="Informasi Berkala">Informasi Berkala</option>
                <option value="Informasi Serta Merta">Informasi Serta Merta</option>
                <option value="Informasi Setiap Saat">Informasi Setiap Saat</option>
                <option value="Informasi Dikecualikan">Informasi Dikecualikan</option>
              </select>
            </div>

            {/* Kelompok Dokumen */}
            <div className="space-y-3 font-sans">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                Sub-Kelompok Dokumen
              </label>
              <input
                type="text"
                name="kelompok_dokumen"
                value={formData.kelompok_dokumen}
                onChange={handleChange}
                placeholder="Contoh: Laporan Keuangan"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-700 font-sans"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-3 pt-2 font-sans">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex justify-between font-sans">
              <span>File Lampiran Dokumen</span>
              <span className="text-blue-500 italic lowercase font-medium font-sans">Format PDF / Dokumen</span>
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer font-sans ${
                selectedFile ? "border-blue-500 bg-blue-50/50" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {selectedFile ? (
                <div className="flex flex-col items-center font-sans">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 font-sans shadow-sm">
                    <FileText size={32} />
                  </div>
                  <p className="font-bold text-slate-800 text-sm max-w-xs truncate font-sans">
                    {selectedFile.name}
                  </p>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2 font-sans">
                    Klik untuk mengganti berkas
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-500 mb-4 shadow-sm border border-slate-100 font-sans">
                    <Upload size={28} />
                  </div>
                  <p className="font-bold text-slate-700 mb-1 font-sans">Pilih / Tarik Berkas di Sini</p>
                  <p className="text-slate-400 text-xs font-sans">Mendukung semua format dokumen resmi</p>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Dokumen PPID"
        message="Dokumen akan dihapus permanen dari server publik. Lanjutkan?"
      />
    </div>
  );
};

export default BerkasPPID;
