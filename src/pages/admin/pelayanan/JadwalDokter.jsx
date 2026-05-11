import React, { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, X, Stethoscope } from "lucide-react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import Pagination from "../../../components/admin/Pagination";
import DokterModal from "../../../components/admin/DokterModal";
import JadwalModal from "../../../components/admin/JadwalModal";

import useTitle from "../../../hooks/useTitle";
import {
  getJadwalDokter,
  createJadwalDokter,
  updateJadwalDokter,
  deleteJadwalDokter,
} from "../../../api/pelayanan/jadwalDokter";
import {
  getDokter,
  createDokter,
  updateDokter,
  deleteDokter,
} from "../../../api/pelayanan/dokter";

const DokterManager = () => {
  useTitle("Manajemen Dokter");
  const [dokterData, setDokterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // States for Doctor Modal
  const [dokterFormData, setDokterFormData] = useState({
    nama_dokter: "",
    spesialisasi: "",
    gambar: null,
  });
  const [isDokterModalOpen, setIsDokterModalOpen] = useState(false);
  const [editingDokter, setEditingDokter] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const imageInputRef = useRef(null);

  // States for Schedule Modal
  const [jadwalFormData, setJadwalFormData] = useState({
    dokter_id: "",
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
  });
  const [isJadwalModalOpen, setIsJadwalModalOpen] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getDokter({
        page,
        per_page: pagination.itemsPerPage,
      });
      const data = response.data?.data || response.data || [];
      setDokterData(data);

      if (response.data && response.data.current_page) {
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      toast.error("Gagal mengambil data dokter");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handleDeleteDokter = (id) => {
    setItemToDelete({ type: "dokter", id });
    setIsConfirmOpen(true);
  };

  const handleDeleteJadwal = (id) => {
    setItemToDelete({ type: "jadwal", id });
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      if (itemToDelete.type === "dokter") {
        await deleteDokter(itemToDelete.id);
        toast.success("Dokter berhasil dihapus");
      } else {
        await deleteJadwalDokter(itemToDelete.id);
        toast.success("Jadwal dokter berhasil dihapus");
      }
      setIsConfirmOpen(false);
      fetchData(pagination.currentPage);
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openDokterModal = (item = null) => {
    if (item) {
      setEditingDokter(item);
      setDokterFormData({
        nama_dokter: item.nama_dokter || "",
        spesialisasi: item.spesialisasi || "",
        gambar: null,
      });
      if (item.gambar) {
        setPreviewImage(`${import.meta.env.VITE_STORAGE_URL}/${item.gambar}`);
      } else {
        setPreviewImage(null);
      }
    } else {
      setEditingDokter(null);
      setDokterFormData({
        nama_dokter: "",
        spesialisasi: "",
        gambar: null,
      });
      setPreviewImage(null);
    }
    setIsDokterModalOpen(true);
  };

  const openJadwalModal = (dokter) => {
    setJadwalFormData({
      dokter_id: dokter.id,
      hari: "",
      jam_mulai: "",
      jam_selesai: "",
    });
    setEditingJadwal(null);
    setIsJadwalModalOpen(true);
  };

  const handleDokterImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDokterFormData((prev) => ({ ...prev, gambar: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleDokterChange = (e) => {
    setDokterFormData({ ...dokterFormData, [e.target.name]: e.target.value });
  };

  const handleJadwalChange = (e) => {
    setJadwalFormData({ ...jadwalFormData, [e.target.name]: e.target.value });
  };

  const handleDokterSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("nama_dokter", dokterFormData.nama_dokter);
      data.append("spesialisasi", dokterFormData.spesialisasi);
      if (dokterFormData.gambar) {
        data.append("gambar", dokterFormData.gambar);
      }

      if (editingDokter) {
        data.append("_method", "PUT");
        await updateDokter(editingDokter.id, data);
        toast.success("Data dokter berhasil diperbarui");
      } else {
        await createDokter(data);
        toast.success("Dokter baru berhasil ditambahkan");
      }
      setIsDokterModalOpen(false);
      fetchData(pagination.currentPage);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal menyimpan data dokter",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJadwalSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      await createJadwalDokter(jadwalFormData);
      toast.success("Jadwal dokter berhasil ditambahkan");
      setIsJadwalModalOpen(false);
      fetchData(pagination.currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan jadwal");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Dokter</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola profil tenaga medis dan atur jadwal praktek mereka.
          </p>
        </div>
        <button
          onClick={() => openDokterModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah Dokter
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">Memuat data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center w-16">
                    No
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Informasi Dokter
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Spesialisasi
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Jadwal Praktek
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-48">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dokterData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6 align-middle text-center font-bold text-slate-400 text-sm">
                      {(pagination.currentPage - 1) * pagination.itemsPerPage +
                        (index + 1)}
                    </td>
                    <td className="px-8 py-6 align-middle">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-4 ring-slate-50 shrink-0">
                          {item.gambar ? (
                            <img
                              src={`${import.meta.env.VITE_STORAGE_URL}/${item.gambar}`}
                              className="w-full h-full object-cover object-top"
                              alt={item.nama_dokter}
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                              <Stethoscope size={24} />
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-slate-800">
                          {item.nama_dokter}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 align-middle">
                      <span className="inline-flex items-center px-3 py-1 bg-primary-blue/10 text-primary-blue text-[10px] font-black uppercase rounded-full border border-primary-blue/20 tracking-wider">
                        {item.spesialisasi}
                      </span>
                    </td>
                    <td className="px-8 py-6 align-middle">
                      <div className="flex flex-col gap-2">
                        {item.jadwals && item.jadwals.length > 0 ? (
                          item.jadwals.map((j, i) => (
                            <div
                              key={i}
                              className="group/j relative flex items-center justify-between px-3 py-2 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-xl border border-slate-100 hover:bg-white hover:border-primary-blue/30 transition-all shadow-xs w-full max-w-[200px]"
                            >
                              <div className="flex flex-col">
                                <span className="text-slate-900">{j.hari}</span>
                                <span className="text-[9px] text-slate-400 font-mono leading-none mt-0.5">
                                  {j.jam_mulai} - {j.jam_selesai}
                                </span>
                              </div>
                              <button
                                onClick={() => handleDeleteJadwal(j.id)}
                                className="opacity-0 group-hover/j:opacity-100 text-rose-500 hover:scale-125 transition-all p-1"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400 italic font-medium">
                            Belum ada jadwal
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openJadwalModal(item)}
                          className="p-2.5 text-slate-400 hover:text-primary-blue hover:bg-blue-50 rounded-xl transition-all"
                          title="Tambah Jadwal"
                        >
                          <Plus size={18} />
                        </button>
                        <button
                          onClick={() => openDokterModal(item)}
                          className="p-2.5 text-slate-400 hover:text-primary-blue hover:bg-primary-blue/5 rounded-xl transition-all"
                          title="Edit Dokter"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteDokter(item.id)}
                          className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          title="Hapus Dokter"
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
        )}
      </div>

      {/* Doctor Modal */}
      <DokterModal
        isOpen={isDokterModalOpen}
        onClose={() => setIsDokterModalOpen(false)}
        onSubmit={handleDokterSubmit}
        formData={dokterFormData}
        onChange={handleDokterChange}
        onImageChange={handleDokterImageChange}
        previewImage={previewImage}
        isSubmitting={isSubmitting}
        editingItem={editingDokter}
        imageInputRef={imageInputRef}
      />

      {/* Schedule Modal */}
      <JadwalModal
        isOpen={isJadwalModalOpen}
        onClose={() => setIsJadwalModalOpen(false)}
        onSubmit={handleJadwalSubmit}
        formData={jadwalFormData}
        onChange={handleJadwalChange}
        isSubmitting={isSubmitting}
      />

      {/* Pagination */}
      {dokterData.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) =>
            setPagination((prev) => ({ ...prev, currentPage: page }))
          }
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
        />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title={`Hapus ${itemToDelete?.type === "dokter" ? "Dokter" : "Jadwal"}`}
        message={`Apakah Anda yakin ingin menghapus ${itemToDelete?.type === "dokter" ? "profil dokter ini beserta seluruh jadwalnya" : "jadwal praktek ini"}?`}
      />
    </div>
  );
};

export default DokterManager;
