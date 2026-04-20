import React, { useState, useEffect, useRef } from "react";
import {
  GitMerge,
  Upload,
  Trash2,
  Image as ImageIcon,
  Save,
  X,
  Plus,
  FileSearch,
} from "lucide-react";
import { toast } from "react-toastify";
import Modal from "../../../components/admin/Modal";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import {
  getAlurPelayanan,
  createAlurPelayanan,
  deleteAlurPelayanan,
  updateAlurPelayanan,
} from "../../../api/pelayanan/alurPelayanan";

const AlurPelayanan = () => {
  const [alurImages, setAlurImages] = useState([]);
  const [formData, setFormData] = useState({
    gambar: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAlur = async () => {
    try {
      const response = await getAlurPelayanan();
      setAlurImages(response.data);
    } catch (error) {
      console.error("Error fetching alur:", error);
      toast.error("Gagal mengambil data alur pelayanan");
    }
  };

  useEffect(() => {
    fetchAlur();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData({ ...formData, gambar: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.gambar && !editingItem) {
      toast.warning("Mohon pilih gambar diagram alur.");
      return;
    }

    const data = new FormData();
    if (formData.gambar) {
      data.append("gambar", formData.gambar);
    }

    console.log(formData.gambar);

    try {
      if (editingItem) {
        data.append("_method", "PUT");
        await updateAlurPelayanan(editingItem.id, data);
        toast.success("Gambar alur berhasil diperbarui");
      } else {
        await createAlurPelayanan(data);
        toast.success("Gambar alur baru ditambahkan");
      }
      closeModal();
      fetchAlur();
    } catch (error) {
      console.error("Error saving alur:", error);
      toast.error("Gagal menyimpan alur pelayanan");
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
      await deleteAlurPelayanan(itemToDelete);
      setAlurImages(alurImages.filter((a) => a.id !== itemToDelete));
      toast.success("Gambar alur berhasil dihapus");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus gambar alur");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setPreviewUrl(`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`);
      setFormData({ gambar: null });
    } else {
      setEditingItem(null);
      setPreviewUrl(null);
      setFormData({ gambar: null });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ gambar: null });
    setPreviewUrl(null);
    setEditingItem(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100 font-sans">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner font-sans">
            <GitMerge size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              Alur Pelayanan
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm font-sans">
              "Manajemen gambar alur langkah pelayanan pasien (Banner Model)."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-600/20 font-sans"
        >
          <Plus size={20} />
          Tambah Alur
        </button>
      </div>

      {/* Table Section (Sama Seperti Banner) */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden font-sans">
        <div className="overflow-x-auto font-sans">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 font-sans">
                <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest w-96 font-sans">
                  Gambar Pratinjau Alur
                </th>
                <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest font-sans">
                  Detail ID
                </th>
                <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-right w-32 font-sans">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {alurImages.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors font-sans group"
                >
                  <td className="px-8 py-6 font-sans">
                    <div className="w-80 h-44 rounded-[24px] bg-slate-100 overflow-hidden border border-slate-200 shadow-inner transition-transform duration-500 group-hover:scale-[1.03] font-sans">
                      <img
                        src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                        alt="Alur Pelayanan"
                        className="w-full h-full object-cover font-sans"
                      />
                    </div>
                  </td>
                  <td className="px-8 py-6 font-sans">
                    <div className="flex flex-col gap-1 font-sans">
                       <span className="text-sm font-bold text-slate-700 font-sans">#ALUR-{item.id}</span>
                       <span className="text-[10px] text-slate-400 font-medium font-sans italic">Terakhir diupdate: {new Date(item.updated_at).toLocaleDateString("id-ID")}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-sans">
                    <div className="flex justify-end gap-2 font-sans">
                      <button
                        onClick={() => openModal(item)}
                        className="p-3 bg-white text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all border border-slate-200 font-sans shadow-sm"
                        title="Edit Alur"
                      >
                        <ImageIcon size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-white text-slate-400 hover:text-white hover:bg-rose-500 rounded-xl transition-all border border-slate-200 font-sans shadow-sm"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {alurImages.length === 0 && (
          <div className="py-24 text-center font-sans">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center mx-auto text-slate-200 mb-6 border border-dashed border-slate-200 font-sans">
              <FileSearch size={40} />
            </div>
            <p className="text-slate-500 font-bold font-sans">
              Belum ada diagram alur pelayanan yang ditemukan.
            </p>
            <button
               onClick={() => openModal()}
               className="text-teal-600 font-black text-xs uppercase tracking-widest mt-4 hover:underline font-sans"
            >
                Klik untuk tambah
            </button>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Update Diagram Alur" : "Unggah Alur Baru"}
        subtitle="Pastikan diagram alur pelayanan terbaca dengan jelas (HD)."
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
              className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-sans"
            >
              <Save size={16} />
              Simpan Diagram
            </button>
          </div>
        }
      >
        <div className="space-y-6 font-sans">
          {/* Upload Area */}
          <div className="space-y-3 font-sans">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
              File Diagram Alur Pelayanan
            </label>
            <div
               onClick={() => fileInputRef.current?.click()}
               className={`relative border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer font-sans ${
                  previewUrl ? "border-teal-500 bg-teal-50/30" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
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
                            alt="Preview" 
                            className="w-full h-auto max-h-[300px] object-contain rounded-2xl shadow-sm font-sans"
                        />
                        <p className="mt-4 text-[10px] font-black text-teal-600 uppercase tracking-widest font-sans">Klik diagram untuk mengganti file</p>
                    </div>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 mb-4 shadow-sm border border-slate-100 font-sans">
                            <Upload size={28} />
                        </div>
                        <p className="font-bold text-slate-700 text-lg mb-1 font-sans">Pilih Gambar Diagram</p>
                        <p className="text-slate-400 text-sm font-sans">Format file: JPG, PNG, atau WEBP</p>
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
        title="Hapus Alur Pelayanan"
        message="Diagram alur akan dihapus secara permanen dari server. Lanjutkan?"
      />
    </div>
  );
};

export default AlurPelayanan;
