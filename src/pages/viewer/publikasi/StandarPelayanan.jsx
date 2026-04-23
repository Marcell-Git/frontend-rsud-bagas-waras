import React, { useState, useEffect  } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import Header from "../../../components/viewer/Header";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import ImageModal from "../../../components/viewer/ImageModal";
import {
  FaFileMedical,
  FaBed,
  FaVials,
  FaXRay,
  FaSearchPlus,
} from "react-icons/fa";

import { getStandarPelayanan } from "../../../api/content/standarPelayanan";
import useTitle from "../../../hooks/useTitle";

const StandarPelayanan = () => {
  useTitle("Standar Pelayanan");

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchStandar = async () => {
    setIsLoading(true);
    try {
      const response = await getStandarPelayanan({ per_page: 50 });
      setItems(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error fetching standar pelayanan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStandar();
  }, []);

  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes("jalan")) return <FaFileMedical className="text-5xl text-cyan-500 mb-4 drop-shadow-sm" />;
    if (t.includes("inap")) return <FaBed className="text-5xl text-cyan-500 mb-4 drop-shadow-sm" />;
    if (t.includes("laboratorium") || t.includes("lab")) return <FaVials className="text-5xl text-cyan-500 mb-4 drop-shadow-sm" />;
    if (t.includes("radiologi")) return <FaXRay className="text-5xl text-cyan-500 mb-4 drop-shadow-sm" />;
    return <FaFileMedical className="text-5xl text-cyan-500 mb-4 drop-shadow-sm" />;
  };

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Header
        subtitle="Publikasi"
        title="Standar Pelayanan"
        description="Dokumen komitmen RSUD Bagas Waras dalam memberikan pelayanan prima, mempublikasikan transparansi mutu, dan menjalankan standar operasional prosedur."
      />

      {/* Grid Area */}
      <main className="grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-16 relative z-10 mb-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-64 shadow-sm animate-pulse border border-gray-100"></div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center justify-between group"
              >
                <div className="flex flex-col items-center grow w-full mb-6">
                  <div className="p-4 bg-cyan-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(item.nama_pelayanan)}
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2">
                    {item.nama_pelayanan}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedImage(`${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`)}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md shadow-cyan-600/20"
                >
                  <FaSearchPlus className="text-lg" />
                  Lihat
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
             <p className="text-gray-400 font-medium italic">Data standar pelayanan belum tersedia.</p>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <a
            href="https://wa.me/c/628112641547"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-cyan-600 border-2 border-cyan-500 hover:bg-cyan-600 hover:text-white font-bold text-[15px] md:text-base py-3.5 px-6 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            Klik Link Ini Untuk Informasi Standar Pelayanan Lainnya
          </a>
        </div>
      </main>

      <ImageModal 
        isOpen={!!selectedImage} 
        imageUrl={selectedImage} 
        onClose={() => setSelectedImage(null)} 
        title="Dokumen Standar Pelayanan" 
      />

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default StandarPelayanan;
