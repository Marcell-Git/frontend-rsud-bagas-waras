import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Target, X, Save } from "lucide-react";
import { toast } from "react-toastify";

import {
  getMisi,
  createMisi,
  updateMisi,
  deleteMisi,
} from "../../../api/tentang/misi";

const Misi = () => {
  const [misiPoints, setMisiPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    misi: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getMisi();
      setMisiPoints(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Gagal mengambil data misi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus poin misi ini?")) {
      try {
        await deleteMisi(id);
        toast.success("Poin misi berhasil dihapus");
        fetchData();
      } catch (error) {
        toast.error("Gagal menghapus poin misi");
      }
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        misi: item.misi || item.text || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        misi: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.misi) return toast.warning("Deskripsi misi harus diisi");

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateMisi(editingItem.id, formData);
        toast.success("Poin misi berhasil diperbarui");
      } else {
        await createMisi(formData);
        toast.success("Poin misi baru berhasil ditambahkan");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan data misi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
            <Target size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Misi RSUD
            </h1>
            <p className="text-slate-400 mt-1 italic text-sm font-bold">
              "Langkah nyata untuk mewujudkan visi institusi."
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-xl hover:shadow-emerald-500/30 transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
        >
          <Plus size={20} />
          Tambah Poin Misi
        </button>
      </div>

      {/* Grid of Mission Points */}
      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <div className="py-20 text-center">
             <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
             Memuat data...
          </div>
        ) : (
          misiPoints.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 flex flex-col md:flex-row gap-6 items-start relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>

              <div className="w-12 h-12 rounded-2xl bg-slate-50 text-emerald-500 font-black flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 text-lg">
                {index + 1}
              </div>

              <div className="flex-1 flex flex-col justify-between pt-1">
                <p className="text-lg font-bold text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors font-sans">
                  {item.misi || item.text}
                </p>

                {/* Actions Bar */}
                <div className="flex items-center gap-2 pt-5 mt-4 border-t border-slate-50 font-sans">
                  <button
                    onClick={() => openModal(item)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs hover:bg-emerald-500 hover:text-white transition-all border border-slate-100 font-sans"
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

        {!isLoading && misiPoints.length === 0 && (
          <div className="py-24 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 shadow-sm mb-4">
              <Target size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Daftar misi masih kosong.
            </p>
            <button
              onClick={() => openModal()}
              className="text-emerald-600 font-black text-xs uppercase tracking-widest mt-2 hover:underline"
            >
              Tambah Misi Pertama
            </button>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col font-sans"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 font-sans">
              <div className="flex items-center gap-4 font-sans">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-sans">
                  <Plus size={24} />
                </div>
                <div className="font-sans">
                  <h2 className="text-xl font-bold text-slate-900 leading-tight font-sans">
                    {editingItem ? "Edit Misi" : "Tambah Misi"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium font-sans">
                    Lengkapi langkah strategis RSUD.
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
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                  Deskripsi Misi
                </label>
                <textarea
                  name="misi"
                  value={formData.misi}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tuliskan misi secara spesifik dan terukur..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[32px] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-700 leading-relaxed font-sans"
                ></textarea>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 font-sans">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest font-sans"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-95 text-xs uppercase tracking-widest"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                   <>
                     <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Menyimpan...
                   </>
                ) : (
                  <>
                    <Save size={18} /> Simpan Poin Misi
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

export default Misi;
