import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Header from "../../../components/viewer/Header";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import ImageModal from "../../../components/viewer/ImageModal";
import { FaChartBar, FaSearchPlus, FaCalendarAlt, FaChartPie, FaPoll } from "react-icons/fa";
import { getIndexKepuasanApi } from "../../../api/pengaduan/indexKepuasan";

import useTitle from "../../../hooks/useTitle";

const IndeksKepuasanMasyarakat = () => {
  useTitle("Indeks Kepuasan Masyarakat");

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const fetchIkm = async () => {
    setIsLoading(true);
    try {
      const response = await getIndexKepuasanApi({ per_page: 50 });
      setItems(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error fetching IKM:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchIkm();
  }, []);

  const processedData = useMemo(() => {
    return items.map((item, index) => {
      const tahun = new Date(item.tanggal).getFullYear();
      let triwulan = "";
      const lowerTitle = (item.judul || "").toLowerCase();
      if (lowerTitle.includes("januari - maret") || lowerTitle.includes("jan-mar") || lowerTitle.includes("tw 1") || lowerTitle.includes("triwulan 1")) triwulan = "Triwulan I";
      else if (lowerTitle.includes("april - juni") || lowerTitle.includes("apr-jun") || lowerTitle.includes("tw 2") || lowerTitle.includes("triwulan 2")) triwulan = "Triwulan II";
      else if (lowerTitle.includes("juli - september") || lowerTitle.includes("jul-sep") || lowerTitle.includes("tw 3") || lowerTitle.includes("triwulan 3")) triwulan = "Triwulan III";
      else if (lowerTitle.includes("oktober - desember") || lowerTitle.includes("okt-des") || lowerTitle.includes("tw 4") || lowerTitle.includes("triwulan 4")) triwulan = "Triwulan IV";

      return {
        ...item,
        badgeLabel: triwulan ? `${triwulan} - ${tahun}` : `Tahun ${tahun}`,
        icon: index % 2 === 0 ? <FaChartPie className="text-5xl text-cyan-500 drop-shadow-sm" /> : <FaPoll className="text-5xl text-cyan-500 drop-shadow-sm" />,
        image: `${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`
      };
    });
  }, [items]);

  const handleOpenModal = (item) => {
    setSelectedImage(item.image);
    setModalTitle(item.judul);
  };

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Header
        subtitle="Publikasi"
        title="Indeks Kepuasan Masyarakat"
        description="Transparansi data hasil evaluasi dan penilaian tingkat kepuasan masyarakat terhadap mutu layanan di RSUD Bagas Waras secara berkala."
      />

      <main className="grow py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        {/* Title Section */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-cyan-100/50 rounded-full mb-5 shadow-sm border border-cyan-100">
               <FaChartBar className="text-4xl text-cyan-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 tracking-tight">Laporan Pemantauan IKM</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Pilih laporan di bawah ini untuk melihat infografis detail pencapaian dan penilaian kepuasan masyarakat dari waktu ke waktu sebagai bahan evaluasi komitmen layanan prima kami.
            </p>
        </div>

        {/* Data Grid with Icons */}
        {isLoading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl h-64 shadow-sm animate-pulse border border-gray-100"></div>
              ))}
           </div>
        ) : processedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
            {processedData.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center justify-between group max-w-sm mx-auto w-full"
              >
                <div className="flex flex-col items-center grow w-full mb-6">
                  <div className="p-4 bg-cyan-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-cyan-600 bg-cyan-50 px-4 py-1.5 rounded-full mb-5 border border-cyan-100">
                    <FaCalendarAlt />
                    {item.badgeLabel}
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-gray-800 leading-relaxed px-2">
                    {item.judul}
                  </h3>
                </div>
                
                <button 
                  onClick={() => handleOpenModal(item)}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md shadow-cyan-600/20"
                >
                  <FaSearchPlus className="text-lg" />
                  Lihat Laporan
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
             <p className="text-gray-400 font-medium italic">Data IKM belum tersedia.</p>
          </div>
        )}
      </main>

      <ImageModal 
        isOpen={!!selectedImage} 
        imageUrl={selectedImage} 
        onClose={() => setSelectedImage(null)} 
        title={modalTitle} 
      />

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default IndeksKepuasanMasyarakat;
