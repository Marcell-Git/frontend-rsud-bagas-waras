import React, { useState, useEffect } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Header from "../../../components/viewer/Header";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import { FaFileAlt } from "react-icons/fa";
import ModalPdfViewer from "../../../components/viewer/ModalPdfViewer";

import { getLaporanTindakLanjut } from "../../../api/pengaduan/laporanTindakLanjut";
import useTitle from "../../../hooks/useTitle";

const LaporanTindakLanjutPengaduan = () => {
  useTitle("Laporan Tindak Lanjut Pengaduan");

  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await getLaporanTindakLanjut({ per_page: 100 });
      setReports(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error fetching laporan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReports();
  }, []);

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <Header
        subtitle="Publikasi"
        title="Laporan Tindak Lanjut Pengaduan"
        description="Dokumen laporan pengaduan dan rekapitulasi tindak lanjut pengaduan RSUD Bagas Waras Kabupaten Klaten."
      />

      <main className="grow py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full -mt-16 relative z-10 mb-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaFileAlt className="text-cyan-500" />
              Daftar Dokumen Laporan
            </h2>
            <p className="text-gray-500 mt-2">
              Silahkan klik tombol{" "}
              <span className="font-semibold text-cyan-600">
                "Lihat Berkas"
              </span>{" "}
              untuk membaca detail atau mengunduh laporan tindak lanjut.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-50 rounded-2xl animate-pulse border border-gray-100"></div>
              ))}
            </div>
          ) : reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
              {reports.map((report, index) => (
                <div
                  key={report.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white hover:bg-cyan-50 hover:border-cyan-200 transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto overflow-hidden">
                    <div className="p-3.5 bg-cyan-100 text-cyan-600 rounded-xl group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300 shrink-0">
                      <FaFileAlt className="text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-md group-hover:text-cyan-700 transition-colors truncate sm:whitespace-normal sm:line-clamp-2">
                        {report.judul}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                         {new Date(report.waktu_upload).toLocaleDateString("id-ID", { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedPdf({
                        nama: report.judul,
                        pdf: `${import.meta.env.VITE_STORAGE_URL}/${report.file_path}`,
                        filePdf: report.file_path.split('/').pop(),
                      })
                    }
                    className="w-full sm:w-auto shrink-0 inline-flex justify-center items-center gap-2 bg-gray-50 text-cyan-600 border border-gray-200 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 font-bold py-2.5 px-5 rounded-xl transition-all active:scale-95 text-sm shadow-sm cursor-pointer"
                  >
                    <span>Lihat Berkas</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
               <p className="text-gray-400 font-medium italic">Belum ada laporan tindak lanjut yang tersedia.</p>
            </div>
          )}
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

export default LaporanTindakLanjutPengaduan;
