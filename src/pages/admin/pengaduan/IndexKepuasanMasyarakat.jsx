import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  Upload,
  CalendarDays,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getIndexKepuasanApi,
  createIndexKepuasanApi,
  updateIndexKepuasanApi,
  deleteIndexKepuasanApi,
} from "../../../api/pengaduan/indexKepuasan";
import Pagination from "../../../components/admin/Pagination";
import ConfirmModal from "../../../components/admin/ConfirmModal";

const IndexKepuasanMasyarakat = () => {
  const [dataIndex, setDataIndex] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const [formData, setFormData] = useState({
    judul: "",
    tanggal: "",
    gambar: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  const fetchData = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await getIndexKepuasanApi({
          page,
          per_page: pagination.itemsPerPage,
        });
        if (response.data && response.data.data) {
          setDataIndex(response.data.data);
          setPagination((prev) => ({
            ...prev,
            currentPage: response.data.current_page,
            totalPages: response.data.last_page,
            totalItems: response.data.total,
          }));
        }
      } catch (error) {
        console.error("Error fetching index kepuasan:", error);
        toast.error("Gagal mengambil data index kepuasan");
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.itemsPerPage],
  );

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage, fetchData]);

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
      await deleteIndexKepuasanApi(itemToDelete);
      toast.success("Data berhasil dihapus");
      setIsConfirmOpen(false);
      fetchData(pagination.currentPage);
    } catch {
      toast.error("Gagal menghapus data");
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
        gambar: null,
      });
      setImagePreview(`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`);
    } else {
      setEditingItem(null);
      setFormData({
        judul: "",
        tanggal: new Date().toISOString().split("T")[0],
        gambar: null,
      });
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB");
        return;
      }
      setFormData((prev) => ({ ...prev, gambar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.judul || !formData.tanggal) {
      return toast.warning("Judul dan Tanggal harus diisi");
    }

    if (!editingItem && !formData.gambar) {
      return toast.warning("Silakan unggah gambar index kepuasan");
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("judul", formData.judul);
      data.append("tanggal", formData.tanggal);
      if (formData.gambar) {
        data.append("gambar", formData.gambar);
      }

      if (editingItem) {
        data.append("_method", "PUT");
        await updateIndexKepuasanApi(editingItem.id, data);
        toast.success("Data berhasil diperbarui");
      } else {
        await createIndexKepuasanApi(data);
        toast.success("Data berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData(pagination.currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 font-sans">
      {/* Header section with Glassmorphism */}
      <div className="relative overflow-hidden bg-white/40 backdrop-blur-xl p-10 rounded-[40px] border border-white shadow-2xl shadow-indigo-500/10">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Users size={120} className="text-indigo-600" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                <Users size={24} />
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Index Kepuasan Masyarakat
              </h1>
            </div>
            <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
              Kelola data publikasi grafik index kepuasan masyarakat RSUD Bagas
              Waras secara periodik.
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="group flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-slate-900 shadow-xl shadow-indigo-500/20 active:scale-95 transition-all duration-300"
          >
            <Plus size={20} className="transition-transform duration-500" />
            Tambah Data
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] w-24">
                  #
                </th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Preview Grafik
                </th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Judul Publikasi
                </th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Tanggal
                </th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6">
                      <div className="h-4 bg-slate-100 rounded w-8"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-24 w-40 bg-slate-50 rounded-xl"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-4 bg-slate-100 rounded w-48"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-4 bg-slate-100 rounded w-32"></div>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <div className="inline-block w-10 h-10 bg-slate-50 rounded-xl"></div>
                      <div className="inline-block w-10 h-10 bg-slate-50 rounded-xl"></div>
                    </td>
                  </tr>
                ))
              ) : dataIndex.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <ImageIcon
                      size={48}
                      className="mx-auto text-slate-200 mb-4"
                    />
                    <p className="text-slate-400 font-medium">
                      Belum ada data publikasi index kepuasan.
                    </p>
                  </td>
                </tr>
              ) : (
                dataIndex.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-8 py-6 font-bold text-slate-400">
                      {(pagination.currentPage - 1) * pagination.itemsPerPage +
                        idx +
                        1}
                    </td>
                    <td className="px-8 py-6">
                      <div className="w-56 rounded-xl overflow-hidden border border-slate-200 shadow-sm transition-transform hover:scale-110 duration-500 bg-slate-50 flex items-center justify-center p-0.5">
                        <img
                          src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                          alt={item.judul}
                          className="w-full h-auto rounded-lg object-contain"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-bold text-slate-800 leading-tight">
                        {item.judul}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-sans">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">
                        <CalendarDays size={14} />
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(item)}
                          className="p-3 bg-white text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-slate-200 shadow-sm"
                          title="Edit Data"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-3 bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-slate-200 shadow-sm"
                          title="Hapus Data"
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

        {!isLoading && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
          />
        )}
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingItem
                    ? "Edit Data Publikasi"
                    : "Tambah Data Publikasi"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Lengkapi informasi publikasi index kepuasan masyarakat.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-500 rounded-xl text-slate-500 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar"
            >
              <div className="space-y-6">
                {/* Image Upload Area */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={14} /> Upload Gambar Grafik
                  </label>
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className={`relative border-2 border-dashed rounded-[32px] overflow-hidden group cursor-pointer transition-all duration-300 ${
                      imagePreview
                        ? "border-indigo-500 bg-indigo-50/10"
                        : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50"
                    }`}
                  >
                    {imagePreview ? (
                      <div className="relative w-full overflow-hidden flex items-center justify-center bg-slate-50 rounded-3xl">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-auto object-contain"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                          <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl text-slate-900 font-bold shadow-xl">
                            <Upload size={18} /> Ganti Gambar
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-16 text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                          <Upload size={28} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-slate-700">
                            Klik untuk unggah gambar
                          </p>
                          <p className="text-xs text-slate-400">
                            Rekomendasi ukuran aspek 16:9 atau grafik HD (Max
                            2MB)
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                </div>

                {/* Judul Input */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-widest">
                    Judul Publikasi
                  </label>
                  <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleInputChange}
                    placeholder="Contoh: Index Kepuasan Masyarakat Triwulan I - 2024"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>

                {/* Tanggal Input */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-widest flex items-center gap-2">
                    <CalendarDays size={14} /> Tanggal Publikasi
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-slate-900 shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Save size={18} />
                  )}
                  {editingItem ? "Update Data" : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Data Publikasi"
        message="Apakah Anda yakin ingin menghapus data publikasi index kepuasan ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default IndexKepuasanMasyarakat;
