import React, { useEffect, useState } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import {
  FaLandmark,
  FaScroll,
  FaChevronDown,
  FaChevronUp,
  FaGavel,
  FaFileAlt,
  FaHistory,
} from "react-icons/fa";
import Header from "../../../components/viewer/Header";
import rsudBuilding from "../../../assets/rsud-building.png";

import { getSejarah } from "../../../api/tentang/sejarah";
import { getLandasanHukum } from "../../../api/tentang/landasanHukum";

const HukumItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? "shadow-md bg-white" : "shadow-sm hover:shadow-md bg-white/80"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-4 md:p-5 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${open ? 'bg-primary-blue text-white' : 'bg-blue-50 text-primary-blue'}`}>
            <FaFileAlt className="text-sm" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] md:text-xs font-black text-primary-blue uppercase tracking-widest mb-1">
              {item.nama_peraturan}
            </span>
            <span className="block text-sm md:text-base font-bold text-dark-blue leading-snug">
              {item.judul}
            </span>
          </div>
        </div>
        <div className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <FaChevronDown className="text-xs text-gray-400" />
        </div>
      </button>
      {open && (
        <div className="px-5 md:px-7 pb-5 md:pb-7 bg-white border-t border-gray-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="pt-4 border-l-4 border-primary-blue/20 pl-4">
             <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {item.deskripsi}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const SejarahLandasanHukum = () => {
  const [sejarah, setSejarah] = useState([]);
  const [landasanHukum, setLandasanHukum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [sejarahRes, hukumRes] = await Promise.all([
        getSejarah(),
        getLandasanHukum()
      ]);
      setSejarah(sejarahRes.data?.data || sejarahRes.data || []);
      setLandasanHukum(hukumRes.data?.data || hukumRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-700 font-secondary flex flex-col">
      <Navbar />

      <main className="grow">
        <Header
          subtitle="Tentang Kami"
          title="Sejarah & Landasan Hukum"
          description="Jejak perjalanan RSUD Bagas Waras dan regulasi yang menjadi landasan operasional kami."
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 md:-mt-20 relative z-20 pb-16 md:pb-24">
          {/* ===== SEJARAH SECTION ===== */}
          <section className="bg-white rounded-3xl md:rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden mb-10 md:mb-16">
            <div className="bg-linear-to-r from-primary-blue to-light-blue p-6 md:p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute right-32 bottom-[-50px] w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md shadow-inner border border-white/20">
                  <FaLandmark className="text-white text-xl md:text-2xl" />
                </div>
                <div>
                  <span className="block text-blue-100 text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-0.5">
                    Profil Rumah Sakit
                  </span>
                  <h2 className="text-2xl md:text-3xl font-primary font-bold text-white">
                    Sejarah Singkat
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                <div className="flex-1">
                  {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                      <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                      <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                    </div>
                  ) : sejarah.length > 0 ? (
                    sejarah.map((item, idx) => (
                      <p
                        key={idx}
                        className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line"
                      >
                        {item.sejarah}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Data sejarah belum tersedia.</p>
                  )}
                </div>

                {/* Gambar Gedung - Clean Frame Side-by-Side */}
                <div className="hidden md:block w-[280px] lg:w-[340px] shrink-0">
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-white/80 group">
                    <div className="absolute inset-0 bg-linear-to-t from-primary-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                    <img
                      src={rsudBuilding}
                      alt="Gedung RSUD Bagas Waras"
                      className="w-full h-72 lg:h-[320px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== LANDASAN HUKUM SECTION ===== */}
          <section>
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100 mb-4">
                <FaScroll className="text-primary-blue" />
                <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Regulasi & Dasar Hukum</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-primary font-bold text-dark-blue">
                Dasar Hukum <span className="text-primary-blue">Operasional</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
               <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="h-24 bg-white rounded-3xl border border-gray-100 animate-pulse"></div>
                  ))
                ) : landasanHukum.length > 0 ? (
                  landasanHukum.map((item) => (
                    <HukumItem key={item.id} item={item} />
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">Data landasan hukum belum tersedia.</p>
                  </div>
                )}
              </div>
              
              {!isLoading && landasanHukum.length > 0 && (
                <div className="mt-12 p-8 bg-linear-to-br from-gray-50 to-white rounded-[32px] border border-gray-100 shadow-inner flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue shrink-0">
                    <FaGavel />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed italic">
                    Dokumen-dokumen di atas merupakan landasan legalitas formal bagi RSUD Bagas Waras dalam menjalankan operasional sebagai Rumah Sakit Umum Daerah Kelas C milik Pemerintah Kabupaten Klaten dengan Pola Pengelolaan Keuangan Badan Layanan Umum Daerah (PPK-BLUD).
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default SejarahLandasanHukum;
