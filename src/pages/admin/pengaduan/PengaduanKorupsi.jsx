import React, { useState } from "react";
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
} from "lucide-react";

const PengaduanKorupsi = () => {
  // Dummy Read-Only Data
  const [dataPengaduan] = useState([
    {
      id: 1,
      tanggal: "12 Sep 2023 - 10:30 WIB",
      namaLengkap: "Budi Santoso (Anonim)",
      email: "budi.anon@gmail.com",
      telepon: "081234567890",
      perihal: "Dugaan Pungli di Loket Pendaftaran",
      pihakTerlibat: "Oknum petugas di loket 3 (Inisial A)",
      uraian:
        "Pada hari Senin tanggal 11 September, oknum petugas tersebut meminta sejumlah uang tambahan di luar biaya retribusi resmi dengan dalih untuk mempercepat proses pembuatan kartu pasien baru.",
      buktiPendukung: "https://example.com/bukti1.pdf", // Simulasi link file
    },
    {
      id: 2,
      tanggal: "15 Sep 2023 - 08:15 WIB",
      namaLengkap: "Siti Aminah",
      email: "siti.aminah@yahoo.com",
      telepon: "085711223344",
      perihal: "Mark-up Kuota Obat Fasilitas Umum",
      pihakTerlibat: "Staf Instalasi Farmasi",
      uraian:
        "Saya menyadari adanya ketidaksesuaian jumlah tebusan resep obat yang ditagihkan kepada keluarga pasien non-BPJS dengan jumlah yang tertera di nota asli apotek luar.",
      buktiPendukung: "https://example.com/bukti2.jpg",
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
          <div className="w-14 h-14 rounded-[22px] bg-rose-50 text-rose-600 flex items-center justify-center shadow-inner">
            <ShieldAlert size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Pengaduan Tipikor
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm">
              "Kotak masuk pengawasan indikasi tindak pidana korupsi."
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-slate-100 text-slate-500 px-6 py-3 rounded-2xl font-bold border border-slate-200">
          <ShieldAlert size={20} className="text-rose-500" />
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
              {dataPengaduan.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Nomor */}
                  <td className="px-8 py-6 align-middle font-bold text-slate-400">
                    #{index + 1}
                  </td>

                  {/* Pengirim */}
                  <td className="px-8 py-6 align-middle">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-800 flex items-center gap-2">
                        <User size={14} className="text-slate-400" />{" "}
                        {item.namaLengkap}
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
                      {item.tanggal.split(" - ")[0]}
                    </span>
                  </td>

                  {/* Aksi (Hanya Lihat Info) */}
                  <td className="px-8 py-6 align-middle text-right">
                    <button
                      onClick={() => openViewModal(item)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold rounded-xl text-xs transition-all border border-rose-100 hover:border-rose-500 hover:shadow-lg hover:shadow-rose-500/20"
                    >
                      <Eye size={16} />
                      Cek Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {dataPengaduan.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4">
              <ShieldAlert size={40} />
            </div>
            <p className="text-slate-500 font-bold">
              Belum ada aduan tindak pidana korupsi.
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
                      {viewItem.namaLengkap}
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
                      {viewItem.telepon}
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
                      {viewItem.pihakTerlibat}
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
    </div>
  );
};

export default PengaduanKorupsi;
