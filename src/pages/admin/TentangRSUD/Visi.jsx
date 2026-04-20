import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Compass,
  X,
  Save,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getVisi,
  createVisi,
  updateVisi,
  deleteVisi,
} from "../../../api/tentang/visi";

const Visi = () => {
  const [visiPoints, setVisiPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    visi: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getVisi();
      setVisiPoints(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data visi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus poin visi ini?")) {
      try {
        await deleteVisi(id);
        toast.success("Poin visi berhasil dihapus");
        fetchData();
      } catch (error) {
        toast.error("Gagal menghapus poin visi");
      }
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        visi: item.visi || item.text || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        visi: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.visi) return toast.warning("Narasi visi harus diisi");

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateVisi(editingItem.id, formData);
        toast.success("Poin visi berhasil diperbarui");
      } else {
        await createVisi(formData);
        toast.success("Poin visi baru berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan data visi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-primary-blue/10 text-primary-blue flex items-center justify-center shadow-inner">
            <Compass size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Visi RSUD
            </h1>
            <p className="text-slate-400 mt-1 italic text-sm font-bold">
              "Mendefinisikan tujuan masa depan institusi kita."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:shadow-primary-blue/30 transition-all active:scale-95 shadow-lg shadow-primary-blue/10"
        >
          <Plus size={20} />
          Tambah Poin Visi
        </button>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-20 text-center">
             <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-blue rounded-full animate-spin mx-auto mb-4"></div>
             Memuat data...
          </div>
        ) : (
          visiPoints.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-blue/20 transition-all duration-300 flex gap-6 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 font-black flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                {index + 1}
              </div>
              <div className="flex-1 flex flex-col justify-between pt-1">
                <p className="text-lg font-bold text-slate-700 leading-relaxed font-sans">
                  {item.visi || item.text}
                </p>

                {/* Actions Bar */}
                <div className="flex items-center gap-2 pt-5 mt-4 border-t border-slate-50 font-sans">
                  <button
                    onClick={() => openModal(item)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs hover:bg-primary-blue hover:text-white transition-all border border-slate-100 font-sans"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all border border-slate-100 font-sans"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {!isLoading && visiPoints.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 shadow-sm mb-4">
              <Compass size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada poin visi yang ditambahkan.
            </p>
            <button
              onClick={() => openModal()}
              className="text-primary-blue font-black text-xs uppercase tracking-widest mt-2 hover:underline"
            >
              Tambah sekarang
            </button>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-primary-blue/5 rounded-[32px] p-6 flex gap-4 border border-primary-blue/10">
        <AlertCircle className="text-primary-blue shrink-0 mt-1" size={20} />
        <div className="space-y-1">
          <h4 className="font-bold text-primary-blue text-sm uppercase tracking-widest">
            Informasi Tampilan
          </h4>
          <p className="text-slate-600 text-sm font-bold leading-relaxed">
            Data visi ini akan ditampilkan di halaman utama dan halaman "Tentang
            Kami". Pastikan poin visi singkat, padat, dan mencerminkan cita-cita
            RSUD Bagas Waras.
          </p>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col font-sans"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 font-sans">
              <div className="flex gap-4 font-sans">
                 <div className="w-12 h-12 rounded-2xl bg-primary-blue/10 text-primary-blue flex items-center justify-center shrink-0 shadow-inner font-sans">
                    <Compass size={24} />
                  </div>
                <div className="font-sans">
                  <h2 className="text-xl font-bold text-slate-900 leading-tight font-sans">
                    {editingItem ? "Edit Poin Visi" : "Tambah Poin Visi"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1 font-sans">
                    Gunakan kalimat yang inspiratif.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors font-sans"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto font-sans">
              <div className="space-y-3 font-sans">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2 font-sans">
                  Narasi Visi
                </label>
                <textarea
                  name="visi"
                  value={formData.visi}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tuliskan poin visi di sini..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[32px] focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue transition-all outline-none font-bold text-slate-700 leading-relaxed font-sans"
                ></textarea>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 font-sans">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest font-sans"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-sans disabled:bg-slate-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                   <>
                     <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Menyimpan...
                   </>
                ) : (
                  <>
                    <Save size={18} /> Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Visi;
