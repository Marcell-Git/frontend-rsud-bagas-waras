import React from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import Header from "../../../components/viewer/Header";
import { FaBookOpen } from "react-icons/fa";

// Import Assets
import buletin1 from "../../../assets/buletin/buletin1.jpg";
import buletin2 from "../../../assets/buletin/buletin2.jpg";
import buletin3 from "../../../assets/buletin/buletin3.jpg";
import pita1 from "../../../assets/buletin/pita1.jpg";
import pita2 from "../../../assets/buletin/pita2.jpg";
import pita3 from "../../../assets/buletin/pita3.jpg";
import pita4 from "../../../assets/buletin/pita4.jpg";
import pita5 from "../../../assets/buletin/pita5.jpg";
import pita6 from "../../../assets/buletin/pita6.jpg";
import pita7 from "../../../assets/buletin/pita7.jpg";
import pita8 from "../../../assets/buletin/pita8.jpg";

const Buletin = () => {
  const allBuletins = [
    { id: 1, title: "Buletin Edisi 1", image: buletin1 },
    { id: 2, title: "Buletin Edisi 2", image: buletin2 },
    { id: 3, title: "Buletin Edisi 3", image: buletin3 },
    { id: 4, title: "Edisi Pita 1", image: pita1 },
    { id: 5, title: "Edisi Pita 2", image: pita2 },
    { id: 6, title: "Edisi Pita 3", image: pita3 },
    { id: 7, title: "Edisi Pita 4", image: pita4 },
    { id: 8, title: "Edisi Pita 5", image: pita5 },
    { id: 9, title: "Edisi Pita 6", image: pita6 },
    { id: 10, title: "Edisi Pita 7", image: pita7 },
    { id: 11, title: "Edisi Pita 8", image: pita8 },
  ];

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

          {/* Menampilkan 3 gambar per baris (lg:grid-cols-3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allBuletins.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default Buletin;
