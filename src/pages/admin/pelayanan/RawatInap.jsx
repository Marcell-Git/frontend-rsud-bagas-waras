import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  BedDouble,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";
import Modal from "../../../components/admin/Modal";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import useTitle from "../../../hooks/useTitle";
import {
  getRawatInap,
  createRawatInap,
  updateRawatInap,
  deleteRawatInap,
} from "../../../api/pelayanan/rawatInap";

const RawatInap = () => {
  useTitle("Manajemen Rawat Inap");
  const [inapData, setInapData] = useState([]);
  const [formData, setFormData] = useState({
    nama_kamar: "",
    tipe_kamar: "",
    fasilitas: "",
    gambar: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // States for Image Upload
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const fetchRawatInap = async () => {
    setIsLoading(true);
    try {
      const response = await getRawatInap();
      setInapData(response.data);
    } catch (error) {
      console.error("Error fetching rawat inap:", error);
      toast.error("Gagal mengambil data rawat inap");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRawatInap();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.nama_kamar || !formData.tipe_kamar || !formData.fasilitas) {
      toast.warning("Harap lengkapi informasi kamar");
      return;
    }

    const data = new FormData();
    data.append("nama_kamar", formData.nama_kamar);
    data.append("tipe_kamar", formData.tipe_kamar);
    data.append("fasilitas", formData.fasilitas);

    if (selectedFile) {
      data.append("gambar", selectedFile);
    }

    try {
      if (editingItem) {
        data.append("_method", "PUT");
        await updateRawatInap(editingItem.id, data);
        toast.success("Data kamar berhasil diupdate");
      } else {
        await createRawatInap(data);
        toast.success("Kamar baru berhasil ditambahkan");
      }
      closeModal();
      fetchRawatInap();
    } catch (error) {
      console.error("Error saving rawat inap:", error);
      toast.error("Gagal menyimpan data kamar");
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
      await deleteRawatInap(itemToDelete);
      setInapData(inapData.filter((i) => i.id !== itemToDelete));
      toast.success("Data kamar berhasil dihapus");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus data kamar");
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
        nama_kamar: item.nama_kamar || "",
        tipe_kamar: item.tipe_kamar || "",
        fasilitas: item.fasilitas || "",
      });
      if (item.gambar) {
        setPreviewUrl(
          `${import.meta.env.VITE_STORAGE_URL}/${item.gambar}`,
        );
      } else {
        setPreviewUrl(null);
      }
    } else {
      setEditingItem(null);
      setFormData({
        nama_kamar: "",
        tipe_kamar: "",
        fasilitas: "",
        gambar: "",
      });
      setPreviewUrl(null);
      setSelectedFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.warning("Mohon pilih file format gambar.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Fasilitas Rawat Inap
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola kamar dan fasilitas ruang perawatan RSUD Bagas Waras.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah Kamar
        </button>
      </div>

      {/* Grid of Wards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {isLoading ? (
          // Skeleton Grid Loader (Non-Circular)
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col animate-pulse"
            >
              <div className="h-56 bg-slate-100 flex items-center justify-center">
                <ImageIcon className="text-slate-200" size={48} />
              </div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-slate-100 rounded-full w-full"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-50 rounded-full w-full"></div>
                  <div className="h-3 bg-slate-50 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          inapData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col group relative font-sans"
            >
              {/* Image Section */}
              <div className="relative h-56 bg-slate-100 overflow-hidden font-sans">
                {item.gambar ? (
                  <img
                    src={`${import.meta.env.VITE_STORAGE_URL}/${item.gambar}`}
                    alt={item.nama_kamar}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon size={48} />
                  </div>
                )}

                {/* Badge Kelas */}
                <div className="absolute top-4 left-4 font-sans">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-teal-700 font-black rounded-xl shadow-sm text-[10px] border border-white/20 uppercase tracking-widest">
                    {item.tipe_kamar}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openModal(item)}
                    className="p-2.5 bg-white shadow-md text-slate-600 hover:text-teal-600 hover:bg-white rounded-xl transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2.5 bg-white shadow-md text-rose-500 hover:text-white hover:bg-rose-500 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Gradient overlay for blending */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-slate-900/60 to-transparent"></div>

                {/* Bangsal Title */}
                <h3 className="absolute bottom-4 left-5 right-5 text-xl font-bold text-white tracking-wide font-sans">
                  {item.nama_kamar}
                </h3>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1 bg-white font-sans">
                <div className="space-y-4 font-sans">
                  <div className="font-sans">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 font-sans">
                      <CheckCircle2 size={14} className="text-teal-500" />
                      Fasilitas Kamar
                    </h4>
                    <ul className="space-y-2 font-sans">
                      {item.fasilitas?.split(",").map((fas, index) => (
                        <li
                          key={index}
                          className="text-slate-600 text-sm font-medium flex gap-2 font-sans"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
                          <span className="leading-relaxed font-sans text-xs">
                            {fas.trim()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {inapData.length === 0 && !isLoading && (
        <div className="py-24 text-center bg-white rounded-[40px] border border-slate-100 shadow-sm font-sans">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4 font-sans">
            <BedDouble size={40} />
          </div>
          <p className="text-slate-500 font-bold font-sans">
            Data fasilitas rawat inap belum ditambahkan.
          </p>
        </div>
      )}

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          editingItem ? "Edit Kamar Rawat Inap" : "Tambah Kamar Rawat Inap"
        }
        subtitle="Lengkapi informasi ruangan dan fasilitas terlampir untuk pasien."
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
              className="px-8 py-3.5 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-sans"
            >
              <Save size={16} />
              Simpan Bangsal
            </button>
          </div>
        }
      >
        <div className="space-y-6 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {/* Nama Bangsal */}
            <div className="space-y-3 font-sans">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                Nama Bangsal / Kamar
              </label>
              <input
                type="text"
                name="nama_kamar"
                value={formData.nama_kamar}
                onChange={handleChange}
                placeholder="Contoh: Bangsal Melati"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold text-slate-700 font-sans"
              />
            </div>

            {/* Kelas */}
            <div className="space-y-3 font-sans">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                Kelas Rawat
              </label>
              <select
                name="tipe_kamar"
                value={formData.tipe_kamar}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold text-slate-700 font-sans appearance-none cursor-pointer"
              >
                <option value="">Pilih Kelas</option>
                <option value="Kelas VIP">Kelas VIP</option>
                <option value="Kelas I">Kelas I</option>
                <option value="Kelas II">Kelas II</option>
                <option value="Kelas III">Kelas III</option>
                <option value="-">-</option>
              </select>
            </div>
          </div>

          {/* Fasilitas */}
          <div className="space-y-3 font-sans">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex justify-between font-sans">
              <span>Daftar Fasilitas</span>
              <span className="text-teal-500 font-medium lowercase italic font-sans text-[9px]">
                Pisahkan dengan koma (,)
              </span>
            </label>
            <textarea
              name="fasilitas"
              value={formData.fasilitas}
              onChange={handleChange}
              rows={4}
              placeholder="Contoh: AC, TV, Kulkas Kecil, Sofa, Kamar Mandi Dalam..."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-medium text-slate-700 leading-relaxed font-sans"
            ></textarea>
          </div>

          {/* Foto Upload */}
          <div className="space-y-3 font-sans">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
              Foto Ruangan
            </label>
            <div
              className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all font-sans ${
                dragActive
                  ? "border-teal-500 bg-teal-50"
                  : "border-slate-200 bg-slate-50"
              } ${previewUrl ? "border-none p-0 bg-transparent" : "cursor-pointer hover:bg-slate-100"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !previewUrl && fileInputRef.current?.click()}
            >
              {!previewUrl ? (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-500 mb-4 shadow-sm border border-slate-100 font-sans">
                    <Upload size={24} />
                  </div>
                  <p className="font-bold text-slate-700 mb-1 font-sans">
                    Pilih foto ruangan
                  </p>
                  <p className="text-slate-400 text-xs font-sans">
                    Klik atau tarik gambar ke sini
                  </p>
                </>
              ) : (
                <div className="relative w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group font-sans">
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-10 backdrop-blur-sm font-sans">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-4 py-2 bg-white rounded-lg text-slate-700 font-bold text-sm font-sans"
                    >
                      Ganti
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                      className="px-4 py-2 bg-rose-500 text-white rounded-lg font-bold text-sm font-sans"
                    >
                      Hapus
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <img
                    src={previewUrl}
                    alt="Preview Kamar"
                    className="w-full h-48 object-cover font-sans"
                  />
                </div>
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
        title="Hapus Kamar"
        message="Apakah Anda yakin ingin menghapus data fasilitas kamar ini?"
      />
    </div>
  );
};

export default RawatInap;
