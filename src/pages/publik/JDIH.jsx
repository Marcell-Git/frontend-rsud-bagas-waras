import React, { useEffect, useState } from "react";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import Header from "../../components/viewer/Header";
import EmergencyCall from "../../components/viewer/EmergencyCall";
import { FaGavel, FaCalendarAlt, FaFilePdf, FaSearch } from "react-icons/fa";
import { getJdih } from "../../api/publik/jdih";
import useTitle from "../../hooks/useTitle";

const JDIH = () => {
  useTitle("JDIH - Jaringan Dokumentasi dan Informasi Hukum");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchJdih = async () => {
    setIsLoading(true);
    try {
      const response = await getJdih();
      setItems(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error fetching JDIH:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJdih();
  }, []);

  const filteredItems = items.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <Header
        subtitle="Informasi Publik"
        title="JDIH"
        description="Jaringan Dokumentasi dan Informasi Hukum RSUD Bagas Waras Kabupaten Klaten."
      />

      <main className="grow py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full -mt-16 relative z-10 mb-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaGavel className="text-primary-blue" />
              Dokumen Hukum & Peraturan
            </h2>
            <p className="text-gray-500 mt-2">
              Daftar peraturan, kebijakan, dan dokumentasi hukum terkait
              operasional RSUD Bagas Waras.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-slate-400 group-focus-within:text-primary-blue transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari judul dokumen..."
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-blue/10 focus:bg-white focus:border-primary-blue transition-all duration-300 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-50 rounded-2xl animate-pulse border border-gray-100"
                ></div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-white hover:border-primary-blue/30 transition-all duration-300 group shadow-sm hover:shadow-lg overflow-hidden"
                >
                  <div className="w-full aspect-video bg-gray-100 relative overflow-hidden shrink-0 group-hover:opacity-95 transition-opacity">
                    <div className="absolute top-3 left-3 bg-primary-blue/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm z-20 flex items-center gap-1.5 uppercase tracking-wider">
                      <FaGavel size={10} /> JDIH
                    </div>

                    {/* Display as image since migration uses 'gambar' */}
                    <iframe
                      src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                      title={`Thumbnail ${item.judul}`}
                      className="w-[200%] h-[200%] absolute top-0 left-0 border-0 pointer-events-none transform scale-50 origin-top-left -translate-y-4"
                      tabIndex={-1}
                    />

                    <div className="absolute inset-0 z-10 bg-linear-to-t from-gray-900/60 via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-col flex-1 p-5 gap-4">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-primary-blue transition-colors line-clamp-3 leading-snug">
                      {item.judul}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <FaCalendarAlt className="text-primary-blue" />
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100/80">
                      <a
                        href={`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex justify-center items-center gap-2 bg-primary-blue text-white hover:bg-dark-blue font-bold py-3 px-4 rounded-xl transition-all active:scale-95 text-sm shadow-md shadow-primary-blue/20"
                      >
                        <FaFilePdf size={14} />
                        <span>Lihat Dokumen</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium italic">
                {searchQuery
                  ? `Tidak ada dokumen yang sesuai dengan "${searchQuery}"`
                  : "Belum ada dokumen JDIH yang tersedia."}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default JDIH;
