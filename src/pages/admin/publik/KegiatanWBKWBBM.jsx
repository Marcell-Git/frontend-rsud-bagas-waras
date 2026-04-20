import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Award,
  Save,
  X,
  FileText,
  Upload,
  CalendarDays,
  FileBadge,
  ImageIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import Modal from "../../../components/admin/Modal";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import Pagination from "../../../components/admin/Pagination";

import {
  getWBKWBBM,
  createWBKWBBM,
  updateWBKWBBM,
  deleteWBKWBBM,
} from "../../../api/publik/kegiatanWbkwbbm";

const KegiatanWBKWBBM = () => {
  const [kegiatanData, setKegiatanData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [formData, setFormData] = useState({
    judul: "",
    tanggal: "",
    deskripsi: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchKegiatan = async (page = 1) => {
    try {
      const response = await getWBKWBBM({ page, per_page: pagination.itemsPerPage });
      const data = response.data?.data || response.data || [];
      setKegiatanData(Array.isArray(data) ? data : []);
      
      if (response.data && response.data.current_page) {
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      console.error("Error fetching kegiatan:", error);
      toast.error("Gagal mengambil data kegiatan WBK/WBBM");
      setKegiatanData([]);
    }
  };

  useEffect(() => {
    fetchKegiatan(pagination.currentPage);
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
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.judul || !formData.tanggal || !formData.deskripsi) {
      toast.warning("Mohon lengkapi informasi kegiatan");
      return;
    }

    if (!selectedFile && !editingItem) {
      toast.warning("Mohon pilih foto dokumentasi kegiatan");
      return;
    }

    const data = new FormData();
    data.append("judul", formData.judul);
    data.append("tanggal", formData.tanggal);
    data.append("deskripsi", formData.deskripsi);
    
    if (selectedFile) {
      data.append("gambar", selectedFile);
    }

    if (editingItem) {
      data.append("_method", "PUT");
    }

    try {
      if (editingItem) {
        await updateWBKWBBM(editingItem.id, data);
        toast.success("Catatan kegiatan berhasil diperbarui");
      } else {
        await createWBKWBBM(data);
        toast.success("Kegiatan baru berhasil dicatat");
      }
      closeModal();
      fetchKegiatan();
    } catch (error) {
      console.error("Error saving kegiatan:", error);
      toast.error("Gagal menyimpan data kegiatan");
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
      await deleteWBKWBBM(itemToDelete);
      setKegiatanData(kegiatanData.filter((k) => k.id !== itemToDelete));
      toast.success("Data kegiatan berhasil dihapus");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus data kegiatan");
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
        tanggal: item.tanggal || "",
        deskripsi: item.deskripsi || "",
      });
      setPreviewUrl(`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`);
    } else {
      setEditingItem(null);
      setFormData({
        judul: "",
        tanggal: "",
        deskripsi: "",
      });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100 font-sans">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner font-sans">
            <Award size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              Kegiatan WBK/WBBM
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm font-sans">
              "Dokumentasi menuju Wilayah Bebas Korupsi & Birokrasi Bersih Melayani."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20 font-sans"
        >
          <Plus size={20} />
          Tambah Kegiatan
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden font-sans">
        <div className="overflow-x-auto font-sans">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 font-sans">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/4 font-sans">
                  Informasi Kegiatan
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-2/5 font-sans">
                  Detail & Uraian
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest font-sans">
                  Dokumentasi
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-32 font-sans">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-sm">
              {kegiatanData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors font-sans"
                >
                  <td className="px-8 py-6 align-top font-sans">
                    <div className="flex flex-col gap-2 font-sans">
                      <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase rounded-lg border border-slate-200 tracking-wider font-sans">
                        <CalendarDays size={12} />
                        {new Date(item.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug font-sans truncate-2">
                        {item.judul}
                      </h3>
                    </div>
                  </td>

                  <td className="px-8 py-6 align-top font-sans">
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 font-sans">
                      {item.deskripsi}
                    </p>
                  </td>

                  <td className="px-8 py-6 align-top font-sans">
                    <div className="w-32 h-20 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-inner font-sans">
                        <img 
                            src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                            alt="Dokumentasi"
                            className="w-full h-full object-cover font-sans"
                        />
                    </div>
                  </td>

                  <td className="px-8 py-6 align-top text-right font-sans">
                    <div className="flex justify-end gap-2 mt-1 font-sans">
                      <button
                        onClick={() => openModal(item)}
                        className="p-3 bg-white text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-200 font-sans shadow-sm"
                        title="Edit Data"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-white text-slate-400 hover:text-white hover:bg-rose-500 rounded-xl transition-all border border-slate-200 font-sans shadow-sm"
                        title="Hapus Data"
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

        {kegiatanData.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
          />
        )}

        {kegiatanData.length === 0 && (
          <div className="py-24 text-center font-sans">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 shadow-sm mb-4 font-sans">
              <Award size={40} />
            </div>
            <p className="text-slate-500 font-bold font-sans">
              Belum ada data kegiatan yang dicatat.
            </p>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit Catatan Kegiatan" : "Catat Kegiatan WBK/WBBM"}
        subtitle="Dokumentasikan langkah nyata rumah sakit dalam reformasi birokrasi."
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
              Simpan Data
            </button>
          </div>
        }
      >
        <div className="space-y-6 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
             {/* Tanggal */}
            <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                    Tanggal Kegiatan
                </label>
                <div className="relative font-sans">
                    <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-sans" size={18} />
                    <input
                        type="date"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-700 font-sans"
                    />
                </div>
            </div>

            {/* Judul Kegiatan */}
            <div className="md:col-span-2 space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                    Nama / Judul Kegiatan
                </label>
                <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleChange}
                    placeholder="Contoh: Pencanangan Pembangunan Zona Integritas"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-700 font-sans"
                />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-3 font-sans">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
              Ringkasan & Detail Kegiatan
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows={4}
              placeholder="Jelaskan ringkasan jalannya kegiatan dan tujuan yang dicapai..."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-slate-700 leading-relaxed font-sans"
            ></textarea>
          </div>

          {/* Upload Dokumentasi */}
          <div className="space-y-3 font-sans">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex justify-between font-sans">
              <span>Foto Dokumentasi</span>
              <span className="text-blue-500 italic lowercase font-medium font-sans">Format Gambar (JPG/PNG)</span>
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer font-sans ${
                previewUrl ? "border-blue-500 bg-blue-50/30" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="w-full font-sans">
                  <img
                    src={previewUrl}
                    alt="Preview Dokumentasi"
                    className="w-full h-auto max-h-[300px] object-contain rounded-2xl shadow-sm font-sans"
                  />
                  <p className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest font-sans">Klik gambar untuk mengganti foto</p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-500 mb-4 shadow-sm border border-slate-100 font-sans">
                    <Upload size={28} />
                  </div>
                  <p className="font-bold text-slate-700 mb-1 font-sans">Klik untuk Pilih Foto</p>
                  <p className="text-slate-400 text-xs font-sans">Unggah foto kegiatan sebagai bukti dukung</p>
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
        title="Hapus Log Kegiatan"
        message="Data dokumentasi kegiatan ini akan dihapus permanen. Lanjutkan?"
      />
    </div>
  );
};

export default KegiatanWBKWBBM;
