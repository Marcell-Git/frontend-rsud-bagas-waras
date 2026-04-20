import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Video,
  Play,
  Images,
} from "lucide-react";
import { toast } from "react-toastify";
import GaleriModal from "../../../components/admin/GaleriModal";
import ConfirmModal from "../../../components/admin/ConfirmModal";

import {
  getGaleri,
  createGaleri,
  updateGaleri,
  deleteGaleri,
} from "../../../api/content/galeri";

const Galeri = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [media, setMedia] = useState([]);
  const [formData, setFormData] = useState({
    judul: "",
    gambar: "",
    url_video: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  const fetchGaleri = async () => {
    try {
      const response = await getGaleri();
      setMedia(response.data);
    } catch (error) {
      console.error("Error fetching galeri:", error);
      toast.error("Gagal mengambil data galeri");
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const data = new FormData();
    data.append("judul", formData.judul);
    if (formData.gambar instanceof File) {
      data.append("gambar", formData.gambar);
    }
    data.append("url_video", formData.url_video || "");


    if (editingItem) {
      data.append("_method", "PUT");
    }

    try {
      if (editingItem) {
        await updateGaleri(editingItem.id, data);
        toast.success("Media berhasil diupdate");
      } else {
        await createGaleri(data);
        toast.success("Media berhasil ditambahkan");
      }
      setIsModalOpen(false);
      resetForm();
      fetchGaleri();
    } catch (error) {
      console.error("Error saving galeri:", error);
      toast.error("Gagal menyimpan data galeri");
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
      await deleteGaleri(itemToDelete);
      setMedia(media.filter((m) => m.id !== itemToDelete));
      toast.success("Media berhasil dihapus");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus media");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const resetForm = () => {
    setFormData({
      judul: "",
      gambar: "",
      url_video: "",
    });
    setEditingItem(null);
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        judul: item.judul || "",
        gambar: item.gambar || "",
        url_video: item.url_video || "",
      });

    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.judul
      ? item.judul.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const isVideo = !!item.url_video;
    const matchesTab =
      activeTab === "Semua" ||
      (activeTab === "Gambar" && !isVideo) ||
      (activeTab === "Video" && isVideo);
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Galeri Media
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Kelola dokumentasi foto dan video kegiatan RSUD.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:shadow-primary-blue/30 transition-all active:scale-95"
        >
          <Plus size={20} />
          Tambah Media
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white p-4 rounded-[32px] shadow-sm border border-slate-100">
        {/* Tabs */}
        <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full lg:w-auto">
          {["Semua", "Gambar", "Video"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 lg:flex-none px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab
                  ? "bg-white text-primary-blue shadow-sm shadow-slate-200"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari judul media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredMedia.map((item) => {
          const isVideo = !!item.url_video;
          return (
            <div
              key={item.id}
              className="group relative bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              {/* Media Preview Area */}
              <div className="aspect-4/3 bg-slate-100 relative overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md border border-white/20 z-10 ${
                      isVideo
                        ? "bg-rose-500/90 text-white"
                        : "bg-white/90 text-slate-900"
                    }`}
                  >
                    {isVideo ? (
                      <Video size={12} />
                    ) : (
                      <ImageIcon size={12} />
                    )}
                    {isVideo ? "VIDEO" : "IMAGE"}
                  </span>
                </div>
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform cursor-pointer">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-primary-blue transition-colors leading-tight line-clamp-2">
                    {item.judul}
                  </h3>
                </div>

                {/* Permanent Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs hover:bg-primary-blue hover:text-white transition-all border border-slate-100"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2.5 rounded-xl bg-slate-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-slate-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Placeholder for Empty State */}
        {filteredMedia.length === 0 && (
          <div className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-24 h-24 bg-slate-100 rounded-[32px] flex items-center justify-center text-slate-300">
              <Images size={48} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">
                Belum ada media
              </p>
              <p className="text-slate-500 font-medium max-w-xs mx-auto">
                Silakan tambahkan foto atau video kegiatan untuk mengisi galeri.
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="text-primary-blue font-bold hover:underline"
            >
              Tambah Media Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Galeri Modal Component */}
      <GaleriModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
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
        title="Hapus Media"
        message="Apakah Anda yakin ingin menghapus media ini dari galeri?"
      />
    </div>
  );
};

export default Galeri;
