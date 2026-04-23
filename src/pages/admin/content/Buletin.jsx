import React, { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Upload, X, ImageIcon, Images } from "lucide-react";
import { toast } from "react-toastify";
import BuletinModal from "../../../components/admin/BuletinModal";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import {
  getBuletin,
  createBuletin,
  updateBuletin,
  deleteBuletin,
} from "../../../api/content/buletin";
import useTitle from "../../../hooks/useTitle";

const Buletin = () => {
  useTitle("Manajemen Buletin");
  const [buletins, setBuletins] = useState([]);
  const [formData, setFormData] = useState({
    gambar: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  const fetchBuletin = async () => {
    setIsLoading(true);
    try {
      const response = await getBuletin();
      setBuletins(response.data);
    } catch (error) {
      console.error("Error fetching buletin:", error);
      toast.error("Gagal mengambil data buletin");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBuletin();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        gambar: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const data = new FormData();
    if (formData.gambar instanceof File) {
      data.append("gambar", formData.gambar);
    }

    if (editingItem) {
      data.append("_method", "PUT");
    }

    try {
      if (editingItem) {
        await updateBuletin(editingItem.id, data);
        toast.success("Buletin berhasil diupdate");
      } else {
        await createBuletin(data);
        toast.success("Buletin berhasil ditambahkan");
      }
      setIsModalOpen(false);
      resetForm();
      fetchBuletin();
    } catch (error) {
      console.error("Error saving buletin:", error);
      toast.error("Gagal menyimpan buletin");
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
      await deleteBuletin(itemToDelete);
      setBuletins(buletins.filter((b) => b.id !== itemToDelete));
      toast.success("Buletin berhasil dihapus");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus buletin");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const resetForm = () => {
    setFormData({
      gambar: "",
    });
    setEditingItem(null);
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        gambar: item.url_gambar || "",
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 text-slate-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Manajemen Buletin
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Kelola galeri gambar kover buletin RSUD Bagas Waras.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-primary-blue/30 transition-all active:scale-95 text-sm"
        >
          <Plus size={18} />
          Unggah Gambar Kover
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading ? (
          // Skeleton Grid Loader (Non-Circular)
          [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] border border-slate-100 shadow-sm animate-pulse overflow-hidden"
            >
              <div className="aspect-3/4 bg-slate-100 flex items-center justify-center">
                <ImageIcon className="text-slate-200" size={32} />
              </div>
              <div className="p-4 flex items-center gap-2 border-t border-slate-50 bg-white">
                <div className="h-10 bg-slate-50 rounded-xl flex-1"></div>
                <div className="h-10 bg-slate-50 rounded-xl w-12"></div>
              </div>
            </div>
          ))
        ) : (
          buletins.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Cover Preview Area */}
              <div className="aspect-3/4 bg-slate-100 relative overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Actions Bar */}
              <div className="p-4 flex items-center gap-2 border-t border-slate-50 bg-white">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-[10px] uppercase tracking-widest hover:bg-primary-blue hover:text-white transition-all border border-slate-100 font-sans"
                >
                  <Edit2 size={14} />
                  Ganti Kover
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-slate-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}

        {buletins.length === 0 && !isLoading && (
          <div className="col-span-full py-40 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-200">
              <Images size={40} />
            </div>
            <p className="text-slate-400 font-bold italic">
              Belum ada gambar buletin yang diunggah.
            </p>
          </div>
        )}
      </div>

      {/* Buletin Modal Component */}
      <BuletinModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingItem={editingItem}
        formData={formData}
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
        title="Hapus Buletin"
        message="Apakah Anda yakin ingin menghapus kover buletin ini?"
      />
    </div>
  );
};

export default Buletin;
