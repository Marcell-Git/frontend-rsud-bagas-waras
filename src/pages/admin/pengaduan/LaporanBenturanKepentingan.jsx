import React, { useState } from "react";
import {
  HandMetal,
  Eye,
  X,
  User,
  Briefcase,
  CalendarDays,
  ShieldAlert,
  Search,
  Info,
  Scale,
} from "lucide-react";

const LaporanBenturanKepentingan = () => {
  // Dummy Read-Only Data
  const [dataBenturan] = useState([
    {
      id: 1,
      waktu: "12 Oktober 2023 - 10:20 WIB",
      namaPelapor: "Budi Santoso",
      jabatanPelapor: "Staf Administrasi Umum",
      perihal: "Proses Pengadaan ATK Tahunan",
      pihakTerkait: "CV. Maju Jaya (Milik Keluarga Dekat Pejabat)",
      uraian:
        "Terdapat indikasi bahwa pemenang tender pengadaan ATK memiliki hubungan kekerabatan langsung dengan salah satu anggota tim pengadaan barang. Proses seleksi diduga tidak dilakukan secara objektif karena adanya intervensi dari pihak manajemen.",
      status: "Dalam Investigasi",
    },
    {
      id: 2,
      waktu: "20 Oktober 2023 - 15:30 WIB",
      namaPelapor: "Siti Aminah",
      jabatanPelapor: "Perawat Senior (Komite Keperawatan)",
      perihal: "Penunjukan Vendor Seragam Perawat",
      pihakTerkait: "PT. Tekstil Abadi (Direktur adalah adik kandung Wakil Direktur)",
      uraian:
        "Penunjukan langsung vendor seragam baru tanpa melalui proses lelang terbuka. Vendor tersebut diketahui dipimpin oleh kerabat dari pimpinan rumah sakit, yang berpotensi merugikan transparansi anggaran.",
      status: "Selesai Tindak Lanjut",
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
          <div className="w-14 h-14 rounded-[22px] bg-sky-50 text-sky-600 flex items-center justify-center shadow-inner">
            <HandMetal size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Benturan Kepentingan
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Laporan mengenai situasi konflik kepentingan di lingkungan instansi."
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
                  Perihal & Pihak Terkait
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Identitas Pelapor
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Waktu Pelaporan
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right w-32">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataBenturan.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6 align-middle font-bold text-slate-400">
                    #{index + 1}
                  </td>

                  {/* Perihal */}
                  <td className="px-8 py-6 align-middle">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-800 flex items-center gap-2">
                        <Scale size={14} className="text-slate-400" />{" "}
                        {item.perihal}
                      </span>
                      <span className="text-sm font-medium text-sky-600 flex items-center gap-2">
                        <ShieldAlert size={12} /> {item.pihakTerkait}
                      </span>
                    </div>
                  </td>

                  {/* Pelapor */}
                  <td className="px-8 py-6 align-middle">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700 text-sm">
                        {item.namaPelapor}
                      </span>
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-tight">
                        {item.jabatanPelapor}
                      </span>
                    </div>
                  </td>

                  {/* Tanggal */}
                  <td className="px-8 py-6 align-middle">
                    <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase rounded-lg border border-slate-200 tracking-wider">
                      <CalendarDays size={12} />
                      {item.waktu.split(" - ")[0]}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-8 py-6 align-middle text-right">
                    <button
                      onClick={() => openViewModal(item)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white font-bold rounded-xl text-xs transition-all border border-sky-100 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/20"
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

        {dataBenturan.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4">
              <HandMetal size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada laporan benturan kepentingan yang terdata.
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
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 shadow-inner">
                  <HandMetal size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    Rincian Benturan Kepentingan
                  </h2>
                  <p className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-2">
                    <CalendarDays size={14} /> Waktu Lapor: {viewItem.waktu}
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
            <div className="p-8 space-y-8 overflow-y-auto">
              {/* Section 1: Identitas */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <User size={14} /> Identitas Pelapor & Pihak Terkait
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Nama Pelapor</p>
                    <p className="font-bold text-slate-800">{viewItem.namaPelapor}</p>
                    <p className="text-xs font-medium text-slate-500 mt-1">{viewItem.jabatanPelapor}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 border-l-4 border-l-sky-400">
                    <p className="text-[10px] uppercase font-bold text-sky-400 mb-0.5">Pihak Berkonflik</p>
                    <p className="font-bold text-slate-800">{viewItem.pihakTerkait}</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Uraian */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Search size={14} /> Uraian Kronologis & Situasi
                </h3>
                <div className="space-y-4">
                  <div className="p-5 bg-sky-50/30 rounded-3xl border border-sky-100">
                    <p className="text-[10px] uppercase font-bold text-sky-400 mb-2">Tema / Perihal Laporan</p>
                    <p className="font-black text-lg text-slate-800">{viewItem.perihal}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-3 ml-1">Deskripsi Detail Kondisi</p>
                    <div className="bg-white p-5 border border-slate-200 rounded-2xl">
                      <p className="font-medium text-slate-600 leading-relaxed text-sm italic">
                        "{viewItem.uraian}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Status Tracking */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Info size={14} /> Status Penanganan
                </h3>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs ${viewItem.status.includes('Selesai') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                  <div className={`w-2 h-2 rounded-full ${viewItem.status.includes('Selesai') ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
                  {viewItem.status}
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
    </div>
  );
};

export default LaporanBenturanKepentingan;
