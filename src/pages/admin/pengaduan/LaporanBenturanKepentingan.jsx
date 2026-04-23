import React, { useState, useEffect } from "react";
import {
  HandMetal,
  Eye,
  X,
  User,
  Phone,
  Building2,
  Info,
  Trash2,
  CheckCircle,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getLaporanBenturanKepentingan,
  deleteLaporanBenturanKepentingan,
} from "../../../api/pengaduan/benturanKepentingan";
import Pagination from "../../../components/admin/Pagination";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import useTitle from "../../../hooks/useTitle";

const LaporanBenturanKepentingan = () => {
  useTitle("Laporan Benturan Kepentingan");
  const [dataBenturan, setDataBenturan] = useState([]);
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

  const fetchBenturan = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getLaporanBenturanKepentingan({
        page,
        per_page: pagination.itemsPerPage,
      });
      if (response.data && response.data.data) {
        setDataBenturan(response.data.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        }));
      }
    } catch (error) {
      console.error("Error fetching benturan:", error);
      toast.error("Gagal mengambil data laporan benturan kepentingan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBenturan(pagination.currentPage);
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
      await deleteLaporanBenturanKepentingan(itemToDelete);
      toast.success("Laporan berhasil dihapus");
      setIsConfirmOpen(false);
      fetchBenturan(pagination.currentPage);
    } catch (error) {
      console.error("Error deleting benturan:", error);
      toast.error("Gagal menghapus laporan");
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
          <div className="w-14 h-14 rounded-[22px] bg-sky-50 text-sky-600 flex items-center justify-center shadow-inner">
            <HandMetal size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Benturan Kepentingan
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Laporan mengenai situasi konflik kepentingan di lingkungan
              instansi."
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-slate-100 text-slate-500 px-6 py-3 rounded-2xl font-bold border border-slate-200">
          <Info size={20} className="text-sky-500" />
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
                  Identitas Pelapor
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Satuan Kerja
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Uraian
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-32">
                  Aksi
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
                          <div className="h-4 bg-slate-100 rounded-full w-full font-sans text-transparent tracking-tighter">
                            perihal
                          </div>
                          <div className="h-3 bg-slate-50 rounded-full w-3/4"></div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-50 rounded-full w-32"></div>
                          <div className="h-2 bg-slate-50 rounded-full w-24"></div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="h-8 bg-slate-100 rounded-lg w-28"></div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2">
                          <div className="w-24 h-10 bg-slate-50 rounded-xl"></div>
                          <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                : dataBenturan.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-6 align-middle font-bold text-slate-400">
                        #{item.id}
                      </td>

                      {/* Identitas Pelapor */}
                      <td className="px-8 py-6 align-middle">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-800 flex items-center gap-2">
                            <User size={14} className="text-slate-400" />{" "}
                            {item.nama}
                          </span>
                          <span className="text-sm font-medium text-sky-600 flex items-center gap-2">
                            <Phone size={12} /> {item.no_telp}
                          </span>
                        </div>
                      </td>

                      {/* Satuan Kerja */}
                      <td className="px-8 py-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Building2 size={14} className="text-slate-400 shrink-0" />
                          <span className="text-sm font-semibold text-slate-700">
                            {item.satuan_kerja}
                          </span>
                        </div>
                      </td>

                      {/* Uraian */}
                      <td className="px-8 py-6 align-middle max-w-xs">
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {item.uraian}
                        </p>
                      </td>

                      {/* Aksi */}
                      <td className="px-8 py-6 align-middle text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openViewModal(item)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white font-bold rounded-xl text-xs transition-all border border-sky-100"
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

      {dataBenturan.length === 0 && !isLoading && (
        <div className="py-24 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-[32px] border border-dashed border-slate-200 flex items-center justify-center mx-auto text-slate-300 mb-6 font-sans">
            <CheckCircle size={40} />
          </div>
          <p className="text-slate-500 font-bold">
            Belum ada laporan benturan kepentingan yang terdata.
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

          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50 sticky top-0 z-10 shrink-0">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 shadow-inner">
                  <HandMetal size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    Rincian Benturan Kepentingan
                  </h2>
                  <p className="text-sm font-bold text-slate-500 mt-1">
                    ID Laporan: #{viewItem.id}
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

            {/* Modal Content */}
            <div className="p-8 space-y-6 overflow-y-auto">
              {/* Section 1: Identitas */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <User size={14} /> Identitas Pelapor
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Nama
                    </p>
                    <p className="font-bold text-slate-800">
                      {viewItem.nama}
                    </p>
                  </div>
                  <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                    <p className="text-[10px] uppercase font-bold text-sky-400 mb-1">
                      No. Telepon
                    </p>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      <Phone size={14} className="text-sky-500" />
                      {viewItem.no_telp}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 md:col-span-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Satuan Kerja
                    </p>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      <Building2 size={14} className="text-slate-500" />
                      {viewItem.satuan_kerja}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Uraian */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <FileText size={14} /> Uraian Laporan
                </h3>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="font-medium text-slate-600 leading-relaxed text-sm">
                    {viewItem.uraian}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
              <button
                onClick={closeViewModal}
                className="px-8 py-3 bg-white border border-slate-200 text-sky-600 rounded-2xl font-bold hover:bg-sky-50 transition-all text-xs uppercase tracking-widest"
              >
                Tutup Monitoring
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
        title="Hapus Laporan"
        message="Apakah Anda yakin ingin menghapus laporan benturan kepentingan ini secara permanen? Data yang dihapus tidak dapat dikembalikan."
      />
    </div>
  );
};

export default LaporanBenturanKepentingan;
