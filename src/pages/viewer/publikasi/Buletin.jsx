import React, { useEffect, useState } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import Header from "../../../components/viewer/Header";
import { FaBookOpen } from "react-icons/fa";
import { getBuletin } from "../../../api/content/buletin";

const Buletin = () => {
  const [buletins, setBuletins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBuletins = async () => {
    setIsLoading(true);
    try {
      const response = await getBuletin();
      setItems(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error fetching buletin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setItems = (data) => setBuletins(data);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBuletins();
  }, []);

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <Header
        subtitle="Publikasi"
        title="Buletin RSUD"
        description="Kumpulan majalah buletin dan edisi informasi kesehatan dari RSUD Bagas Waras Kabupaten Klaten."
      />

      <main className="grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-16 relative z-10 mb-12">
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <FaBookOpen className="text-cyan-500" />
              Galeri Buletin & Publikasi
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Berbagai edisi publikasi dan informasi terkini layanan rumah sakit untuk masyarakat.
            </p>
          </div>

          {isLoading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="aspect-[3/4] bg-gray-50 rounded-2xl animate-pulse border border-gray-100"></div>
               ))}
             </div>
          ) : buletins.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {buletins.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <img 
                    src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`} 
                    alt={item.judul} 
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4 border-t border-gray-50">
                     <h3 className="font-bold text-gray-700 text-sm">{item.judul}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
               <p className="text-gray-400 italic">Belum ada buletin yang tersedia.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default Buletin;
