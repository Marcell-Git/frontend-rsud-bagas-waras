import React, { useState } from "react";
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
} from "lucide-react";

const LaporanGratifikasi = () => {
  // Dummy Read-Only Data
  const [dataGratifikasi] = useState([
    {
      id: 1,
      waktu: "10 September 2023 - 13:45 WIB",
      namaPenerima: "Dr. Ahmad Subarjo",
      jabatanPenerima: "Kepala Instalasi Rawat Jalan",
      namaPemberian: "Parsel Buah & Bingkisan Barang",
      spesifikasiPemberian:
        "Parsel ukuran besar berisi buah-buahan impor dan alat kesehatan pribadi.",
      nilaiPemberian: "± Rp 1.500.000",
      uraian:
        "Keluarga pasien yang baru saja pulang dari perawatan mendatangi ruang dokter dan memaksa meninggalkan parsel di meja sebagai tanda terima kasih atas pelayanan yang diberikan.",
    },
    {
      id: 2,
      waktu: "15 September 2023 - 09:00 WIB",
      namaPenerima: "Dra. Kusuma Wardhani",
      jabatanPenerima: "Pejabat Pengadaan Barang",
      namaPemberian: "Voucher Liburan & Uang Tunai",
      spesifikasiPemberian:
        "2 Lembar voucher hotel bintang 5 dan amplop tertutup.",
      nilaiPemberian: "Rp 5.000.000",
      uraian:
        "Dalam rangka memenangkan tender alat kesehatan tahunan, perwakilan pemasok menyelipkan amplop dan voucher di dalam berkas dokumen lelang saat penyerahan proposal di ruang rapat.",
    },
  ]);

  const [viewItem, setViewItem] = useState(null);

  const openViewModal = (item) => {
    setViewItem(item);
  };

  const closeViewModal = () => {
    setViewItem(null);
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
              {dataGratifikasi.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Nomor */}
                  <td className="px-8 py-6 align-middle font-bold text-slate-400">
                    #{index + 1}
                  </td>

                  {/* Penerima */}
                  <td className="px-8 py-6 align-middle">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-800 flex items-center gap-2">
                        <User size={14} className="text-slate-400" />{" "}
                        {item.namaPenerima}
                      </span>
                      <span className="text-sm font-medium text-amber-600 flex items-center gap-2">
                        <Briefcase size={12} /> {item.jabatanPenerima}
                      </span>
                    </div>
                  </td>

                  {/* Objek Pemberian */}
                  <td className="px-8 py-6 align-middle">
                    <div className="flex flex-col gap-1.5 border-l-2 border-amber-200 pl-3">
                      <p className="font-bold text-slate-700 leading-snug line-clamp-1">
                        {item.namaPemberian}
                      </p>
                      <p className="font-bold text-emerald-600 text-[10px] uppercase tracking-widest">
                        {item.nilaiPemberian}
                      </p>
                    </div>
                  </td>

                  {/* Tanggal */}
                  <td className="px-8 py-6 align-middle">
                    <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase rounded-lg border border-slate-200 tracking-wider">
                      <CalendarDays size={12} />
                      {item.waktu.split(" - ")[0]}
                    </span>
                  </td>

                  {/* Aksi (Hanya Lihat Info) */}
                  <td className="px-8 py-6 align-middle text-right">
                    <button
                      onClick={() => openViewModal(item)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-500 text-amber-600 hover:text-white font-bold rounded-xl text-xs transition-all border border-amber-100 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                    >
                      <Eye size={16} />
                      Rincian
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {dataGratifikasi.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4">
              <Gift size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada aduan gratifikasi yang terdata.
            </p>
          </div>
        )}
      </div>

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
                        {viewItem.namaPenerima}
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
                        {viewItem.jabatanPenerima}
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
                      {viewItem.namaPemberian}
                    </p>
                  </div>
                  <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <p className="text-[10px] uppercase font-bold text-emerald-500 mb-1 flex items-center gap-1">
                      <Banknote size={12} /> Estimasi Nilai Rupiah
                    </p>
                    <p className="font-black text-2xl text-emerald-700">
                      {viewItem.nilaiPemberian}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center gap-1">
                      Spesifikasi Lebih Lanjut
                    </p>
                    <p className="font-bold text-slate-700 leading-relaxed bg-white px-4 py-3 border border-slate-200 rounded-xl">
                      {viewItem.spesifikasiPemberian}
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
    </div>
  );
};

export default LaporanGratifikasi;
