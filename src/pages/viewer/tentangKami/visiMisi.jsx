import React, { useEffect, useState } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import { FaEye, FaBullseye } from "react-icons/fa";
import Header from "../../../components/viewer/Header";

import { getVisiTerbaru } from "../../../api/tentang/visi";  
import { getMisi } from "../../../api/tentang/misi";

import useTitle from "../../../hooks/useTitle";

const VisiMisi = () => {
  useTitle("Visi & Misi");

  const [visi, setVisi] = useState([]);
  const [misi, setMisi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVisi = async () => {
    try {
      const response = await getVisiTerbaru();
      setVisi(response.data);
    } catch (error) {
      console.error("Error fetching visi:", error);
    }
  };

  const fetchMisi = async () => {
    try {
      const response = await getMisi();
      setMisi(response.data);
    } catch (error) {
      console.error("Error fetching misi:", error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([fetchVisi(), fetchMisi()]);
    setIsLoading(false);
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
          title="Visi & Misi"
          description="Visi dan misi RSUD Bagas Waras yang menjadi pedoman dalam memberikan pelayanan kesehatan."
        />

        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 lg:-mt-24 relative z-20 pb-16 md:pb-24">
          {/* Visi Card */}
          {isLoading ? (
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 mb-12 md:mb-16 border border-gray-100 animate-pulse">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="w-16 h-16 md:w-22 md:h-22 lg:w-28 lg:h-28 bg-gray-200 rounded-full shrink-0"></div>
                <div className="w-full">
                  <div className="h-4 bg-gray-200 rounded-full w-24 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-48 mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-full mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 mb-12 md:mb-16 border border-gray-100 transform hover:-translate-y-1 md:hover:-translate-y-2 transition-transform duration-500 group">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="shrink-0 relative">
                  <div className="relative w-16 h-16 md:w-22 md:h-22 lg:w-28 lg:h-28 bg-linear-to-br from-light-blue to-blue-100 rounded-full flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                    <FaEye className="text-3xl md:text-4xl lg:text-5xl text-primary-blue drop-shadow-sm" />
                  </div>
                </div>
                <div className="text-center md:text-left w-full">
                  <h2 className="text-xs md:text-sm font-bold text-primary-blue uppercase tracking-widest mb-2">
                    Pandangan Ke Depan
                  </h2>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-primary font-bold text-dark-blue mb-3 md:mb-4">
                    Visi Kami
                  </h3>
                  <div className="relative inline-block md:block px-4 md:px-0">
                    <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-medium relative z-10 w-full">
                      {visi.visi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Misi Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-start mb-0 md:mb-24">
            <div className="lg:col-span-5 relative lg:sticky lg:top-28 bg-linear-to-br from-white to-gray-50 p-6 md:p-10 rounded-3xl md:rounded-4xl shadow-lg border border-gray-200 z-20">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-blue rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-md transform -rotate-3 mx-auto md:mx-0">
                <FaBullseye className="text-3xl md:text-5xl text-white" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xs md:text-sm font-bold text-primary-blue uppercase tracking-widest mb-1 md:mb-2">
                  Langkah Strategis
                </h2>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-primary font-bold text-dark-blue mb-4 md:mb-6">
                  Misi Kami
                </h3>
                <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                  Untuk mewujudkan visi tersebut, RSUD Bagas Waras menyusun dan
                  menjalankan langkah-langkah nyata yang diwujudkan dalam misi
                  pelayanan yang komprehensif, terukur, dan berorientasi pada
                  masyarakat.
                </p>
                <div className="w-16 md:w-24 h-1.5 bg-primary-blue rounded-full mx-auto md:mx-0"></div>
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4 md:gap-6 relative mt-4 lg:mt-0">
              {/* Vertical Line Connecting Steps */}
              <div className="absolute left-6 md:left-7 lg:left-9 top-10 bottom-10 w-1 bg-gray-200 rounded-full hidden md:block"></div>

              {isLoading
                ? [...Array(5)].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-row gap-4 md:gap-6 animate-pulse"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 shrink-0"></div>
                      <div className="flex flex-col justify-center w-full gap-2">
                        <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  ))
                : misi.map((misi, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-md md:hover:shadow-xl border border-gray-100 flex flex-row gap-4 md:gap-6 hover:translate-x-1 md:hover:-translate-y-1 md:hover:translate-x-0 transition-all duration-300 relative group z-10 items-stretch"
                    >
                      <div className="shrink-0 mt-0 md:mt-1 relative flex items-center md:items-start">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-light-blue border-2 md:border-4 border-white flex items-center justify-center shadow-md group-hover:bg-primary-blue transition-colors duration-300">
                          <span className="text-lg md:text-xl font-black text-primary-blue group-hover:text-white transition-colors duration-300">
                            0{idx + 1}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center w-full">
                        <p className="text-gray-600 text-sm md:text-lg leading-relaxed md:leading-relaxed font-medium">
                          {misi.misi}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </main>

      <EmergencyCall />
      <Footer />
    </div>
  );
};

export default VisiMisi;
