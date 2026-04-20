import React, { useState } from "react";
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

import standarRawatJalan from "../../../assets/RawatJalan.png";
import standarRawatInap from "../../../assets/RawatInap.png";
import standarLaboratorium from "../../../assets/Laboratorium.png";
import standarRadiologi from "../../../assets/Radiologi.png";

const StandarPelayanan = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Array data standar beserta ikonnya
  const dataStandar = [
    {
      id: 1,
      title: "Standar Pelayanan Rawat Jalan",
      image: standarRawatJalan,
      icon: (
        <FaFileMedical className="text-5xl text-cyan-500 mb-4 drop-shadow-sm" />
      ),
    },
    {
      id: 2,
      title: "Standar Pelayanan Rawat Inap",
      image: standarRawatInap,
      icon: <FaBed className="text-5xl text-cyan-500 mb-4 drop-shadow-sm" />,
    },
    {
      id: 3,
      title: "Standar Pelayanan Laboratorium",
      image: standarLaboratorium,
      icon: <FaVials className="text-5xl text-cyan-500 mb-4 drop-shadow-sm" />,
    },
    {
      id: 4,
      title: "Standar Pelayanan Radiologi",
      image: standarRadiologi,
      icon: <FaXRay className="text-5xl text-cyan-500 mb-4 drop-shadow-sm" />,
    },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dataStandar.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center justify-between group"
            >
              <div className="flex flex-col items-center grow w-full mb-6">
                <div className="p-4 bg-cyan-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-800 leading-snug">
                  {item.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedImage(item.image)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md shadow-cyan-600/20"
              >
                <FaSearchPlus className="text-lg" />
                Lihat
              </button>
            </div>
          ))}
        </div>

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
