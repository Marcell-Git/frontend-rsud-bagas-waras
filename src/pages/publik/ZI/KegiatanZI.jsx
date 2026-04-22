import React, { useState, useEffect } from "react";
import NavbarZI from "../../../components/publik/ZI/NavbarZI";
import FooterZI from "../../../components/publik/ZI/FooterZI";
import { FaCalendarAlt } from "react-icons/fa";
import { getWBKWBBM } from "../../../api/publik/kegiatanWbkwbbm";

const KegiatanZI = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKegiatan = async () => {
    setIsLoading(true);
    try {
      const response = await getWBKWBBM();
      setKegiatan(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Gagal mengambil data kegiatan ZI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKegiatan();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-gray-50/50">
      <NavbarZI />

      <main className="grow py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight">
            Kegiatan WBK/WBBM{" "}
            <span className="text-emerald-600 block md:inline mt-2 md:mt-0">
              RSUD Bagas Waras
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="space-y-12">
          {isLoading ? (
            /* Skeleton Loading State */
            [...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-[45%] lg:w-2/5 h-64 md:h-80 bg-gray-200 shrink-0"></div>
                  <div className="p-8 md:p-10 flex flex-col justify-center grow space-y-4">
                    <div className="h-8 bg-gray-200 rounded-full w-32"></div>
                    <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
                    <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="space-y-2 pt-2">
                      <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                      <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                      <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : kegiatan.length > 0 ? (
            kegiatan.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-[45%] lg:w-2/5 shrink-0 relative overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 bg-gray-900/5 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                    <img
                      src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                      alt={item.judul}
                      className="h-64 md:h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Content Box */}
                  <div className="p-8 md:p-10 flex flex-col justify-center grow">
                    <div className="flex items-center text-xs font-semibold text-gray-500 mb-5 bg-emerald-50 w-fit px-4 py-2 rounded-full border border-emerald-100">
                      <FaCalendarAlt className="text-emerald-500 mr-2.5 text-sm" />
                      <time>{formatDate(item.tanggal)}</time>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-snug group-hover:text-emerald-600 transition-colors">
                      {item.judul}
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-[15px] text-justify line-clamp-4 md:line-clamp-none">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium italic">Belum ada kegiatan WBK/WBBM yang dipublikasikan.</p>
            </div>
          )}
        </div>
      </main>

      <FooterZI />
    </div>
  );
};

export default KegiatanZI;
