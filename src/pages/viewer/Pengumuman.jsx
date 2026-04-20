import React, { useState } from "react";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import Header from "../../components/viewer/Header";
import EmergencyCall from "../../components/viewer/EmergencyCall";
import { FaBullhorn } from "react-icons/fa";
import ModalPdfViewer from "../../components/viewer/ModalPdfViewer";

import contohpdf from "../../assets/Presentasi_Pak_Direktur.pdf";

const Pengumuman = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const pengumumanData = [
    {
      id: 1,
      title:
        "PENGUMUMAN SEWA BARANG MILIK DAERAH BERUPA TANAH UNTUK PARKIR DI RSUD BAGAS WARAS",
      file: contohpdf,
      filename: "PENGUMUMAN_SEWA_PARKIR.pdf",
    },
    {
      id: 2,
      title:
        "PENGUMUMAN HASIL PEMILIHAN MITRA KSO LABORATORIUM RSUD BAGAS WARAS KABUPATEN KLATEN TAHUN 2024",
      file: contohpdf,
      filename: "PENGUMUMAN_KSO_LABORATORIUM.pdf",
    },
    {
      id: 3,
      title:
        "PENGUMUMAN HASIL SELEKSI PEGAWAI TETAP BLUD NON PNS TAHUN 2023 DI LINGKUNGAN RSUD BAGAS WARAS KABUPATEN KLATEN",
      file: contohpdf,
      filename: "PENGUMUMAN_PEGAWAI_BLUD_2023.pdf",
    },
    {
      id: 4,
      title:
        "PENGUMUMAN PESERTA LOLOS SELEKSI PENGADAAN PEGAWAI BADAN LAYANAN UMUM DAERAH NON PEGAWAI NEGERI SIPIL TIDAK TETAP PADA RSUD BAGAS WARAS KABUPATEN KLATEN TAHUN 2020",
      file: contohpdf,
      filename: "PENGUMUMAN_PEGAWAI_BLUD_2020.pdf",
    },
    {
      id: 5,
      title:
        "PENGUMUMAN PESERTA YANG LOLOS UJIAN TEKNIS KOMPETENSI DASAR (TKD) PENGADAAN PEGAWAI BADAN LAYANAN UMUM DAERAH NON PEGAWAI NEGERI SIPIL TIDAK TETAP PADA RSUD BAGAS WARAS KABUPATEN KLATEN TAHUN 2020",
      file: contohpdf,
      filename: "PENGUMUMAN_LOLOS_TKD_2020.pdf",
    },
    {
      id: 6,
      title:
        "TEMPAT DAN LOKASI TEST PENGADAAN PEGAWAI BADAN LAYANAN UMUM DAERAH NON PEGAWAI NEGERI SIPIL TIDAK TETAP PADA RSUD BAGAS WARAS KABUPATEN KLATEN TAHUN 2020",
      file: contohpdf,
      filename: "LOKASI_TEST_BLUD_2020.pdf",
    },
  ];

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <Header
        subtitle="Informasi"
        title="Pengumuman"
        description="Pengumuman mengenai pelayanan dan kegiatan terkini di RSUD Bagas Waras Kabupaten Klaten."
      />

      <main className="grow py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full -mt-16 relative z-10 mb-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaBullhorn className="text-cyan-500" />
              Daftar Pengumuman
            </h2>
            <p className="text-gray-500 mt-2">
              Silahkan klik tombol{""}
              <span className="font-semibold text-cyan-600">
                "Lihat Berkas"
              </span>
              {""}
              untuk membaca detail atau mengunduh file pengumuman terkait.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {pengumumanData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white hover:border-cyan-300 transition-all duration-300 group shadow-sm hover:shadow-lg overflow-hidden"
              >
                {/* Thumbnail Area dengan Live PDF Preview */}
                <div
                  className="w-full aspect-3/4 bg-gray-200 relative overflow-hidden shrink-0 cursor-pointer group-hover:opacity-90 transition-opacity"
                  onClick={() =>
                    setSelectedPdf({
                      nama: item.title,
                      pdf: item.file,
                      filePdf: item.filename,
                    })
                  }
                >
                  <div className="absolute top-3 left-3 bg-cyan-700/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-20 flex items-center gap-1.5">
                    <FaBullhorn /> Pengumuman
                  </div>

                  {/* Iframe PDF as Thumbnail */}
                  <iframe
                    src={`${item.file}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                    title={`Thumbnail ${item.title}`}
                    className="w-[200%] h-[200%] absolute top-0 left-0 border-0 pointer-events-none transform scale-50 origin-top-left -translate-y-4"
                    tabIndex={-1}
                  />

                  {/* Overlay interaktif & perlindungan klik iframe */}
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-gray-900/40 to-transparent"></div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 p-5 gap-4">
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-cyan-700 transition-colors line-clamp-3 leading-snug">
                    {item.title}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-gray-100/80">
                    <button
                      onClick={() =>
                        setSelectedPdf({
                          nama: item.title,
                          pdf: item.file,
                          filePdf: item.filename,
                        })
                      }
                      className="w-full inline-flex justify-center items-center gap-2 bg-cyan-50 text-cyan-700 hover:bg-cyan-600 hover:text-white font-bold py-2.5 px-4 rounded-xl transition-all active:scale-95 text-sm cursor-pointer shadow-sm"
                    >
                      <span>Lihat Berkas</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedPdf && (
        <ModalPdfViewer
          tarif={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default Pengumuman;
