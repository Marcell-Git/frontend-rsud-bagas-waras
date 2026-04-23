import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Eye, 
  X,
  MessageSquare,
  Clock,
  Phone,
  Mail,
  Trash2
} from 'lucide-react';
import { toast } from 'react-toastify';
import { getPengaduanMasyarakat, deletePengaduanMasyarakat } from '../../../api/pengaduan/pengaduanMasyarakat';
import Pagination from '../../../components/admin/Pagination';
import ConfirmModal from '../../../components/admin/ConfirmModal';
import useTitle from "../../../hooks/useTitle";

const PengaduanMasyarakat = () => {
  useTitle("Pengaduan Masyarakat");
  const [laporan, setLaporan] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [isLoading, setIsLoading] = useState(true);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLaporan = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getPengaduanMasyarakat({ page, per_page: pagination.itemsPerPage });
      if (response.data && response.data.data) {
        setLaporan(response.data.data);
        setPagination({
          ...pagination,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        });
      }
    } catch (error) {
      console.error("Error fetching pengaduan:", error);
      toast.error("Gagal mengambil data pengaduan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLaporan(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const openViewModal = (data) => {
    setSelectedLaporan(data);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deletePengaduanMasyarakat(itemToDelete);
      toast.success("Pengaduan berhasil dihapus");
      setIsConfirmOpen(false);
      fetchLaporan(pagination.currentPage);
    } catch (error) {
      toast.error("Gagal menghapus pengaduan");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">Pengaduan Masyarakat</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium font-sans italic opacity-80">Layanan aspirasi, keluhan, dan aspresiasi langsung dari masyarakat umum.</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden font-sans transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 font-sans">
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest font-sans">Kontak Pengadu</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest w-[40%] font-sans">Isi Pengaduan</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest font-sans">Waktu Masuk</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center font-sans">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 transition-all font-sans">
              {isLoading ? (
                // Skeleton Rows
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-8 py-5">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-slate-100"></div>
                          <div className="h-4 bg-slate-100 rounded-full w-32 font-sans"></div>
                        </div>
                        <div className="h-3 bg-slate-50 rounded-full w-24 ml-10 font-sans text-transparent">phone</div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-50 rounded-full w-full"></div>
                        <div className="h-4 bg-slate-50 rounded-full w-2/3"></div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="h-8 bg-slate-50 rounded-lg w-40 font-sans"></div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-50"></div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                laporan.map((item) => (
                  <tr key={item.id} className="transition-colors group hover:bg-slate-50/50 font-sans text-sm">
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-1.5 font-sans">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-sans">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 font-sans">
                            <Mail size={14} />
                          </div>
                          <span className="truncate max-w-[180px] font-sans">{item.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 font-sans">
                          <Phone size={14} className="opacity-40" />
                          {item.no_telp}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm line-clamp-2 w-full font-medium text-slate-600 leading-relaxed font-sans">
                        {item.isi_pengaduan}
                      </p>
                    </td>
                    <td className="px-8 py-5 font-sans">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 font-sans uppercase tracking-tight">
                        <Clock size={14} className="text-slate-300 font-sans" />
                        {new Date(item.tanggal).toLocaleDateString("id-ID", { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </td>
                    <td className="px-8 py-5 font-sans">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => openViewModal(item)}
                          className="p-3 rounded-xl transition-all bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:bg-teal-50 hover:border-teal-100 shadow-sm"
                          title="Lihat Detail"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-3 rounded-xl transition-all bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 shadow-sm"
                          title="Hapus Pengaduan"
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
        
        {laporan.length === 0 && !isLoading && (
          <div className="py-24 text-center font-sans">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center mx-auto mb-6 border border-dashed border-slate-200 shadow-inner font-sans">
              <MessageSquare size={32} className="text-slate-200" />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs font-sans">Belum ada pengaduan masyarakat.</p>
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
      </div>

      {/* View Detail Modal */}
      {isViewModalOpen && selectedLaporan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)}></div>
          
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-white font-sans">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-linear-to-r from-teal-50/50 to-emerald-50/30 font-sans">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-teal-600 border border-teal-100 font-sans">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight font-sans">
                    Detail Pengaduan
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">
                    <span className="flex items-center gap-1.5"><Clock size={14}/> {new Date(selectedLaporan.tanggal).toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="p-2.5 bg-white/80 hover:bg-rose-50 hover:text-rose-500 rounded-xl text-slate-400 transition-all border border-slate-100 font-sans"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto space-y-8 font-sans">
              
              {/* Sender Info Card */}
              <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 font-sans">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 font-sans">Informasi Kontak Pengadu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-teal-500 font-sans">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans">Alamat Email</p>
                      <p className="font-bold text-slate-900 tracking-tight font-sans">{selectedLaporan.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-500 font-sans">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans">No. Telepon</p>
                      <p className="font-bold text-slate-900 tracking-tight font-sans">{selectedLaporan.no_telp || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 font-sans">
                  <MessageSquare size={14} className="text-teal-500 font-sans" /> Pesan Pengaduan
                </h3>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-inner min-h-[150px] font-sans">
                  <p className="text-slate-700 font-medium leading-relaxed text-lg font-sans">
                    {selectedLaporan.isi_pengaduan}
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-50 bg-slate-50/30 flex justify-end items-center font-sans">
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 font-sans"
              >
                Tutup Jendela
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
        title="Hapus Pengaduan"
        message="Anda akan menghapus pengaduan ini secara permanen. Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default PengaduanMasyarakat;
