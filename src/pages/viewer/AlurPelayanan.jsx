import React, { useState } from "react";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import Header from "../../components/viewer/Header";
import EmergencyCall from "../../components/viewer/EmergencyCall";
import { FaRoute, FaInfoCircle } from "react-icons/fa";

import AlurPelayananPng from "../../assets/baganAlur/BaganAlurPelayanan.png";
import AlurRanapPng from "../../assets/baganAlur/BaganAlurRanap.png";
import AlurPengaduanPng from "../../assets/baganAlur/BaganAlurPengaduan.png";

import SyaratRanap from "../../assets/baganAlur/sp1.jpg";
import SyaratRajal from "../../assets/baganAlur/sp2.jpg";
import SyaratPengaduan from "../../assets/baganAlur/pengaduan.jpg";

const AlurPelayanan = () => {
  const [activeTab, setActiveTab] = useState("alur");

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
            {activeTab === "alur" ? (
              <div className="flex flex-col gap-12 sm:gap-16 max-w-5xl mx-auto items-center animate-[fadeIn_0.4s_ease-out]">
                {/* Diagram Rawat Jalan */}
                <div className="w-full flex flex-col gap-6 text-center group">
                  <div className="bg-white p-2 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <img
                      src={AlurPelayananPng}
                      alt="Bagan Alur Pelayanan Rawat Jalan"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* Diagram Rawat Inap */}
                <div className="w-full flex flex-col gap-6 text-center group">
                  <div className="bg-white p-2 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <img
                      src={AlurRanapPng}
                      alt="Bagan Alur Pelayanan Rawat Inap"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* Diagram Pengaduan */}
                <div className="w-full flex flex-col gap-6 text-center group">
                  <div className="bg-white p-2 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <img
                      src={AlurPengaduanPng}
                      alt="Bagan Alur Pelayanan Pengaduan"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-4 text-gray-500 animate-[fadeIn_0.4s_ease-out]">
                {/* Diagram Rawat Jalan */}
                <div className="w-full flex flex-col gap-6 text-center group">
                  <div className="bg-white p-2 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <img
                      src={SyaratRanap}
                      alt="Bagan Alur Pelayanan Rawat Jalan"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* Diagram Rawat Inap */}
                <div className="w-full flex flex-col gap-6 text-center group">
                  <div className="bg-white p-2 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <img
                      src={SyaratRajal}
                      alt="Bagan Alur Pelayanan Rawat Inap"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* Diagram Pengaduan */}
                <div className="w-full flex flex-col gap-6 text-center group">
                  <div className="bg-white p-2 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <img
                      src={SyaratPengaduan}
                      alt="Bagan Alur Pelayanan Pengaduan"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>
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
