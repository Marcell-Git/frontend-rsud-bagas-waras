import React, { useState, useEffect, useRef } from "react";

import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import BannerModal from "../../../components/admin/BannerModal";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import {
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../../../api/content/banner";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    gambar: "",
    status: "Aktif",
    urutan: "",
  });

  const fileInputRef = useRef(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        gambar: file,
      });
    }
  };

  const fetchBanner = async () => {
    try {
      const response = await getBanner();
      setBanners(response.data);
    } catch (error) {
      toast.error("Gagal mengambil data banner");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("gambar", formData.gambar);
    data.append("status", formData.status);
    data.append("urutan", formData.urutan);

    if (editingBanner) {
      data.append("_method", "PUT");
    }

    try {
      if (editingBanner) {
        await updateBanner(editingBanner.id, data);
      } else {
        await createBanner(data);
        setFormData({
          gambar: "",
          status: "Aktif",
          urutan: "",
        });
      }

      setIsModalOpen(false);
      fetchBanner();
      toast.success(
        editingBanner
          ? "Banner berhasil diperbarui"
          : "Banner baru berhasil ditambahkan",
      );
    } catch (error) {
      toast.error("Gagal menyimpan banner");
      console.log(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      await deleteBanner(itemToDelete);
      setBanners(banners.filter((b) => b.id !== itemToDelete));
      toast.success("Banner berhasil dihapus");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus banner");
      console.log(error);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const handleToggleStatus = (id) => {
    setBanners(
      banners.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "Aktif" ? "Nonaktif" : "Aktif" }
          : b,
      ),
    );
    toast.success("Status banner berhasil diubah");
  };

  const openModal = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        gambar: "", // Reset so we don't accidentally re-upload old image unless changed
        status: banner.status,
        urutan: banner.urutan,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        gambar: "",
        status: "Aktif",
        urutan: "",
      });
    }

    setIsModalOpen(true);
  };

  const filteredBanners = banners;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Banner
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola banner slide utama pada halaman depan website.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah Banner
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-72">
                  Gambar Preview
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Urutan
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
              {filteredBanners.map((banner) => (
                <tr
                  key={banner.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="w-64 h-36 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shadow-sm transition-transform hover:scale-[1.02] duration-300">
                      <img
                        src={`${import.meta.env.VITE_STORAGE_URL}/${banner.url_gambar}`}
                        alt="Banner Image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm">
                      {banner.urutan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(banner.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        banner.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {banner.status === "Aktif" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <XCircle size={12} />
                      )}
                      {banner.status === "Aktif" ? "Aktif" : "Nonaktif"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openModal(banner)}
                        className="p-2 text-slate-400 hover:text-primary-blue hover:bg-primary-blue/10 rounded-lg transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
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
        {filteredBanners.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
              <ImageIcon size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium tracking-tight">
              Tidak ada banner ditemukan.
            </p>
          </div>
        )}
      </div>

      {/* Banner Modal Component */}
      <BannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingBanner={editingBanner}
        formData={formData}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        fileInputRef={fileInputRef}
        setFormData={setFormData}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Banner"
        message="Apakah Anda yakin ingin menghapus banner ini? Banner yang dihapus tidak dapat dikembalikan."
      />
    </div>
  );
};

export default Banner;
