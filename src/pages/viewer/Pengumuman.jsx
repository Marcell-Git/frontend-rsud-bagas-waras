import React, { useEffect, useState } from "react";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import Header from "../../components/viewer/Header";
import EmergencyCall from "../../components/viewer/EmergencyCall";
import { FaBullhorn, FaCalendarAlt } from "react-icons/fa";

import { getPengumuman } from "../../api/content/pengumuman";
import ModalPdfViewer from "../../components/viewer/ModalPdfViewer";
import useTitle from "../../hooks/useTitle";

const Pengumuman = () => {
  useTitle("Pengumuman");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const fetchPengumuman = async () => {
    setIsLoading(true);
    try {
      const response = await getPengumuman();
      setItems(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error fetching pengumuman:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPengumuman();
  }, []);

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

          {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="h-80 bg-gray-50 rounded-2xl animate-pulse border border-gray-100"></div>
               ))}
             </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-white hover:border-cyan-300 transition-all duration-300 group shadow-sm hover:shadow-lg overflow-hidden"
                >
                  <div
                    className="w-full aspect-3/4 bg-gray-200 relative overflow-hidden shrink-0 cursor-pointer group-hover:opacity-90 transition-opacity"
                    onClick={() => {
                      if (item.url_file) {
                        setSelectedPdf({
                          nama: item.judul,
                          pdf: `${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`,
                          filePdf: item.url_file.split("/").pop() || "file.pdf",
                        });
                      }
                    }}
                  >
                    <div className="absolute top-3 left-3 bg-cyan-700/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-20 flex items-center gap-1.5">
                      <FaBullhorn /> Pengumuman
                    </div>

                    <iframe
                      src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                      title={`Thumbnail ${item.judul}`}
                      className="w-[200%] h-[200%] absolute top-0 left-0 border-0 pointer-events-none transform scale-50 origin-top-left -translate-y-4"
                      tabIndex={-1}
                    />

                    {/* Overlay interaktif & perlindungan klik iframe */}
                    <div className="absolute inset-0 z-10 bg-linear-to-t from-gray-900/40 to-transparent"></div>
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-col flex-1 p-5 gap-4">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-cyan-700 transition-colors line-clamp-3 leading-snug">
                      {item.judul}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <FaCalendarAlt className="text-cyan-600" />
                      {new Date(item.updated_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100/80">
                      <button
                        onClick={() => {
                          if (item.url_file) {
                            setSelectedPdf({
                              nama: item.judul,
                              pdf: `${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`,
                              filePdf: item.url_file.split("/").pop() || "file.pdf",
                            });
                          }
                        }}
                        disabled={!item.url_file}
                        className={`w-full inline-flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-xl transition-all active:scale-95 text-sm shadow-sm ${
                          item.url_file
                            ? "bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-600/20"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <span>Lihat Berkas</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
               <p className="text-gray-400 font-medium italic">Belum ada pengumuman yang tersedia.</p>
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

export default Pengumuman;
