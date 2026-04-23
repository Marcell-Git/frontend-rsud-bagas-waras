import React, { useState, useEffect } from "react";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import Header from "../../components/viewer/Header";
import EmergencyCall from "../../components/viewer/EmergencyCall";
import { FaRoute, FaInfoCircle } from "react-icons/fa";
import { getAlurPelayanan } from "../../api/pelayanan/alurPelayanan";
import { getSyaratPelayanan } from "../../api/pelayanan/syaratPelayanan";

const AlurPelayanan = () => {
  const [activeTab, setActiveTab] = useState("alur");
  const [alurData, setAlurData] = useState([]);
  const [syaratData, setSyaratData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [alurRes, syaratRes] = await Promise.all([
        getAlurPelayanan(),
        getSyaratPelayanan()
      ]);
      setAlurData(alurRes.data?.data || alurRes.data || []);
      setSyaratData(syaratRes.data?.data || syaratRes.data || []);
    } catch (error) {
      console.error("Error fetching alur/syarat pelayanan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="grow py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-10 mb-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Banner & Tabs */}
          <div className="bg-cyan-700 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-5">
            <h2 className="text-white font-bold text-lg sm:text-xl flex items-center gap-2 uppercase tracking-wide">
              <FaRoute className="text-2xl" />
              <span>| Alur Pelayanan, Syarat Pelayanan & Alur Pengaduan</span>
            </h2>

            {/* Toggle Tabs */}
            <div className="flex bg-white/10 rounded-lg p-1 w-full md:w-auto shrink-0 shadow-inner">
              <button
                onClick={() => setActiveTab("alur")}
                className={`flex-1 md:px-6 py-2 rounded-md font-bold text-sm transition-all duration-300 ${
                  activeTab === "alur"
                    ? "bg-white text-cyan-800 shadow-md transform scale-100"
                    : "text-cyan-50 hover:bg-white/20 hover:text-white"
                }`}
              >
                Alur Pelayanan
              </button>
              <button
                onClick={() => setActiveTab("syarat")}
                className={`flex-1 md:px-6 py-2 rounded-md font-bold text-sm transition-all duration-300 ${
                  activeTab === "syarat"
                    ? "bg-white text-cyan-800 shadow-md transform scale-100"
                    : "text-cyan-50 hover:bg-white/20 hover:text-white"
                }`}
              >
                Syarat & Pengaduan
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-12 bg-cyan-50/40 relative min-h-[500px]">
            {isLoading ? (
               <div className="flex flex-col gap-12 max-w-5xl mx-auto animate-pulse">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="w-full aspect-video bg-white/50 rounded-2xl"></div>
                  ))}
               </div>
            ) : activeTab === "alur" ? (
              <div className="flex flex-col gap-12 sm:gap-16 max-w-5xl mx-auto items-center animate-[fadeIn_0.4s_ease-out]">
                {alurData.length > 0 ? (
                  alurData.map((item) => (
                    <div key={item.id} className="w-full flex flex-col gap-6 text-center group">
                      <div className="bg-white p-2 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                        <img
                          src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                          alt={item.judul}
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </div>
                      {item.judul && <p className="font-bold text-cyan-800">{item.judul}</p>}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 text-gray-400 italic">Data alur pelayanan belum tersedia.</div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto animate-[fadeIn_0.4s_ease-out]">
                {syaratData.length > 0 ? (
                  syaratData.map((item) => (
                    <div key={item.id} className="w-full flex flex-col gap-6 text-center group">
                      <div className="bg-white p-2 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                        <img
                          src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                          alt={item.judul}
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </div>
                      {item.judul && <p className="font-bold text-cyan-800">{item.judul}</p>}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 text-gray-400 italic">Data syarat pelayanan belum tersedia.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default AlurPelayanan;
