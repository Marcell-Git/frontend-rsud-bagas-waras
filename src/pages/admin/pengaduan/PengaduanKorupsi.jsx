import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Eye,
  X,
  FileText,
  User,
  Mail,
  Phone,
  AlertTriangle,
  Users2,
  CalendarDays,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getPengaduanKorupsi,
  deletePengaduanKorupsi,
} from "../../../api/pengaduan/korupsi";
import Pagination from "../../../components/admin/Pagination";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import useTitle from "../../../hooks/useTitle";

const PengaduanKorupsi = () => {
  useTitle("Pengaduan Korupsi");
  const [dataPengaduan, setDataPengaduan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const [viewItem, setViewItem] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchKorupsi = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getPengaduanKorupsi({
        page,
        per_page: pagination.itemsPerPage,
      });
      if (response.data && response.data.data) {
        setDataPengaduan(response.data.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      console.error("Error fetching tipikor:", error);
      toast.error("Gagal mengambil data aduan tipikor");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKorupsi(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const openViewModal = (item) => {
    setViewItem(item);
  };

  const closeViewModal = () => {
    setViewItem(null);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deletePengaduanKorupsi(itemToDelete);
      toast.success("Laporan aduan berhasil dihapus");
      setIsConfirmOpen(false);
      fetchKorupsi(pagination.currentPage);
    } catch (error) {
      console.error("Error deleting tipikor:", error);
      toast.error("Gagal menghapus laporan aduan");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Pengaduan Tipikor
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kotak masuk pengawasan indikasi tindak pidana korupsi.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 bg-slate-100 text-slate-500 px-6 py-2.5 rounded-xl font-bold border border-slate-200 text-sm">
          <ShieldAlert size={18} className="text-rose-500" />
          Data Bersifat Rahasia
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-16">
                  No
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Informasi Pengirim
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">
                  Perihal Aduan
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Tanggal Lapor
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-32">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                // Skeleton Rows
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-8 py-6">
                      <div className="h-4 bg-slate-100 rounded w-8"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-100 rounded-full w-40"></div>
                        <div className="h-3 bg-slate-50 rounded-full w-32"></div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-5 bg-slate-50 rounded-full w-full"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="h-8 bg-slate-50 rounded-lg w-28"></div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-2">
                        <div className="w-24 h-10 bg-slate-50 rounded-xl"></div>
                        <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                dataPengaduan.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Nomor */}
                    <td className="px-8 py-6 align-middle font-bold text-slate-400">
                      #{item.id}
                    </td>

                    {/* Pengirim */}
                    <td className="px-8 py-6 align-middle">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-800 flex items-center gap-2">
                          <User size={14} className="text-slate-400" />{" "}
                          {item.nama_lengkap}
                        </span>
                        <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
                          <Mail size={12} className="text-slate-400" />{" "}
                          {item.email}
                        </span>
                      </div>
                    </td>

                    {/* Perihal */}
                    <td className="px-8 py-6 align-middle">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 mt-2 rounded-full bg-rose-500 shrink-0"></div>
                        <p className="font-bold text-slate-700 leading-snug line-clamp-2">
                          {item.perihal}
                        </p>
                      </div>
                    </td>

                    {/* Tanggal */}
                    <td className="px-8 py-6 align-middle">
                      <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase rounded-lg border border-slate-200 tracking-wider">
                        <CalendarDays size={12} />
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="px-8 py-6 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openViewModal(item)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold rounded-xl text-xs transition-all border border-rose-100"
                        >
                          <Eye size={16} />
                          Cek Detail
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-slate-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        </div>

        {dataPengaduan.length === 0 && !isLoading && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[32px] border border-dashed border-slate-200 flex items-center justify-center mx-auto text-slate-300 mb-6 font-sans">
              <ShieldCheck size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada aduan tindak pidana korupsi.
            </p>
          </div>
        )}

        {!isLoading && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
          />
        )}

      {/* Read-Only Detail Modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeViewModal}
          ></div>

          <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50 sticky top-0 z-10 shrink-0">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 shadow-inner">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    Detail Laporan Tipikor
                  </h2>
                  <p className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-2">
                    <CalendarDays size={14} /> {viewItem.tanggal}
                  </p>
                </div>
              </div>
              <button
                onClick={closeViewModal}
                className="p-3 hover:bg-slate-200 rounded-2xl text-slate-400 transition-colors bg-white shadow-sm border border-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Read Only Information */}
            <div className="p-8 space-y-8 overflow-y-auto">
              {/* Section 1: Profil Pelapor */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                  Informasi Identitas Pelapor
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Nama Lengkap
                    </p>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      <User size={14} className="text-slate-400" />{" "}
                      {viewItem.nama_lengkap}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Alamat Email
                    </p>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />{" "}
                      {viewItem.email}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Nomor Telepon
                    </p>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" />{" "}
                      {viewItem.no_telp || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Isi Aduan */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                  Rincian Perkara Aduan
                </h3>

                <div className="space-y-4">
                  <div className="p-5 bg-rose-50/50 rounded-3xl border border-rose-100">
                    <p className="text-[10px] uppercase font-bold text-rose-400 mb-1 flex items-center gap-1">
                      <AlertTriangle size={12} /> Perihal Pokok
                    </p>
                    <p className="font-black text-xl text-slate-800">
                      {viewItem.perihal}
                    </p>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center gap-1">
                      <Users2 size={12} /> Pihak yang Diduga Terlibat
                    </p>
                    <p className="font-bold text-slate-700 bg-white px-4 py-2 border border-slate-200 rounded-xl inline-block">
                      {viewItem.pihak_terkait}
                    </p>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">
                      Uraian Kronologis Kejadian
                    </p>
                    <p className="font-medium text-slate-600 leading-relaxed wrap-break-word bg-white p-4 border border-slate-200 rounded-2xl">
                      {viewItem.uraian}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Lampiran */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                  Dokumen / Bukti Dukung
                </h3>
                <a
                  href={viewItem.buktiPendukung}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-white border border-slate-200 hover:border-rose-300 rounded-2xl hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 group-hover:text-rose-600 transition-colors">
                        Lampiran_Bukti_Dukung_Terlampir
                      </p>
                      <p className="text-xs text-slate-400 font-medium">
                        Klik untuk meilihat atau mengunduh
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-300 group-hover:text-rose-500 mr-2">
                    <Eye size={20} />
                  </div>
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
              <button
                onClick={closeViewModal}
                className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all text-xs uppercase tracking-widest"
              >
                Tutup Pemantauan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Aduan Tipikor"
        message="Apakah Anda yakin ingin menghapus laporan aduan tindak pidana korupsi ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default PengaduanKorupsi;
