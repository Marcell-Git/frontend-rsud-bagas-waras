import React, { useState, useEffect } from "react";
import {
  Gift,
  Eye,
  X,
  User,
  Briefcase,
  CalendarDays,
  Banknote,
  PackageOpen,
  Info,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getLaporanGratifikasi,
  deleteLaporanGratifikasi,
} from "../../../api/pengaduan/laporanGratifikasi";
import Pagination from "../../../components/admin/Pagination";
import ConfirmModal from "../../../components/admin/ConfirmModal";

const LaporanGratifikasi = () => {
  const [dataGratifikasi, setDataGratifikasi] = useState([]);
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

  const fetchGratifikasi = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getLaporanGratifikasi({
        page,
        per_page: pagination.itemsPerPage,
      });
      if (response.data && response.data.data) {
        setDataGratifikasi(response.data.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      console.error("Error fetching gratifikasi:", error);
      toast.error("Gagal mengambil data laporan gratifikasi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGratifikasi(pagination.currentPage);
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
      await deleteLaporanGratifikasi(itemToDelete);
      toast.success("Laporan gratifikasi berhasil dihapus");
      setIsConfirmOpen(false);
      fetchGratifikasi(pagination.currentPage);
    } catch (error) {
      console.error("Error deleting gratifikasi:", error);
      toast.error("Gagal menghapus laporan gratifikasi");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
            <Gift size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Lapor Gratifikasi
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Transparansi pelaporan penolakan / penerimaan hadiah ilegal."
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-slate-100 text-slate-500 px-6 py-3 rounded-2xl font-bold border border-slate-200">
          <Info size={20} className="text-amber-500" />
          Akses Pemantauan (Read-Only)
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
                  Identitas Penerima
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/4">
                  Informasi Benda Uang
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Waktu Kejadian
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-32">
                  Bukti Lapor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading
                ? // Skeleton Rows
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
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-50 rounded-full w-full"></div>
                          <div className="h-3 bg-slate-50 rounded-full w-24"></div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="h-8 bg-slate-50 rounded-lg w-28 font-sans text-transparent">
                          date
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2">
                          <div className="w-24 h-10 bg-slate-50 rounded-xl"></div>
                          <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                : dataGratifikasi.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Nomor */}
                      <td className="px-8 py-6 align-middle font-bold text-slate-400">
                        #{item.id}
                      </td>

                      {/* Penerima */}
                      <td className="px-8 py-6 align-middle">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-800 flex items-center gap-2">
                            <User size={14} className="text-slate-400" />{" "}
                            {item.nama_penerima}
                          </span>
                          <span className="text-sm font-medium text-amber-600 flex items-center gap-2">
                            <Briefcase size={12} /> {item.jabatan_penerima}
                          </span>
                        </div>
                      </td>

                      {/* Objek Pemberian */}
                      <td className="px-8 py-6 align-middle">
                        <div className="flex flex-col gap-1.5 border-l-2 border-amber-200 pl-3">
                          <p className="font-bold text-slate-700 leading-snug line-clamp-1">
                            {item.nama_pemberian}
                          </p>
                          <p className="font-bold text-emerald-600 text-[10px] uppercase tracking-widest">
                            {item.nilai_pemberian}
                          </p>
                        </div>
                      </td>

                      {/* Tanggal */}
                      <td className="px-8 py-6 align-middle">
                        <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase rounded-lg border border-slate-200 tracking-wider">
                          <CalendarDays size={12} />
                          {new Date(item.waktu).toLocaleDateString("id-ID", {
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
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-500 text-amber-600 hover:text-white font-bold rounded-xl text-xs transition-all border border-amber-100"
                          >
                            <Eye size={16} />
                            Rincian
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
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {dataGratifikasi.length === 0 && !isLoading && (
        <div className="py-24 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-[32px] border border-dashed border-slate-200 flex items-center justify-center mx-auto text-slate-300 mb-6 font-sans">
            <CheckCircle size={40} />
          </div>
          <p className="text-slate-500 font-bold">
            Belum ada aduan gratifikasi yang terdata.
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
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Gift size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    Detail Kejadian Gratifikasi
                  </h2>
                  <p className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-2">
                    <CalendarDays size={14} /> Dilaporkan pada: {viewItem.waktu}
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
              {/* Section 1: Profil Penerima */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                  Identitas Pejabat / Pegawai (Penerima)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                        Nama Lengkap Penerima
                      </p>
                      <p className="font-bold text-slate-800">
                        {viewItem.nama_penerima}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                        Jabatan Instansi
                      </p>
                      <p className="font-bold text-amber-600 line-clamp-1">
                        {viewItem.jabatan_penerima}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Info Benda / Barang */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                  Deskripsi Hadiah / Barang Pemberian
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-5 bg-amber-50/50 rounded-3xl border border-amber-100">
                    <p className="text-[10px] uppercase font-bold text-amber-400 mb-1 flex items-center gap-1">
                      <PackageOpen size={12} /> Bentuk Benda / Jasa
                    </p>
                    <p className="font-black text-lg text-slate-800">
                      {viewItem.nama_pemberian}
                    </p>
                  </div>
                  <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <p className="text-[10px] uppercase font-bold text-emerald-500 mb-1 flex items-center gap-1">
                      <Banknote size={12} /> Estimasi Nilai Rupiah
                    </p>
                    <p className="font-black text-2xl text-emerald-700">
                      {viewItem.nilai_pemberian}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center gap-1">
                      Spesifikasi Lebih Lanjut
                    </p>
                    <p className="font-bold text-slate-700 leading-relaxed bg-white px-4 py-3 border border-slate-200 rounded-xl">
                      {viewItem.spesifikasi_pemberian}
                    </p>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">
                      Uraian Kronologis Penerimaan (Proses)
                    </p>
                    <p className="font-medium text-slate-600 leading-relaxed wrap-break-word bg-white p-4 border border-slate-200 rounded-2xl italic">
                      "{viewItem.uraian}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
              <button
                onClick={closeViewModal}
                className="px-8 py-3 bg-white border border-slate-200 text-amber-600 rounded-2xl font-bold hover:bg-amber-50 transition-all text-xs uppercase tracking-widest"
              >
                Tutup Rekapan
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
        title="Hapus Laporan Gratifikasi"
        message="Apakah Anda yakin ingin menghapus laporan gratifikasi ini secara permanen? Data yang dihapus tidak dapat dikembalikan."
      />
    </div>
  );
};

export default LaporanGratifikasi;
