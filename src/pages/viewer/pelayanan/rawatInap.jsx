import { useEffect, useState } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import Header from "../../../components/viewer/Header";
import { FaCheckCircle, FaImage } from "react-icons/fa";

import { getRawatInap } from "../../../api/pelayanan/rawatInap";

const RawatInap = () => {
  const [kamar, setKamar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getRawatInap();
      setKamar(res.data?.data || res.data || []);
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
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary text-gray-700">
      <Navbar />

      <main className="grow">
        <Header
          subtitle="Pelayanan Kami"
          title="Rawat Inap"
          description="Fasilitas rawat inap yang nyaman dengan berbagai pilihan kelas kamar untuk mendukung proses pemulihan pasien."
        />

        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-20 pb-16 md:pb-24 space-y-6 md:space-y-8">
          <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">
              Tentang Layanan
            </span>
            <h2 className="text-xl md:text-2xl font-primary font-bold text-dark-blue mb-4">
              Apa itu Rawat Inap?
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-primary-blue">Rawat Inap</strong> adalah
                pelayanan bagi pasien yang memerlukan perawatan dan pemantauan
                intensif oleh tenaga medis di dalam rumah sakit selama beberapa
                hari hingga kondisi pasien memungkinkan untuk pulang.
              </p>
              <p>
                RSUD Bagas Waras menyediakan berbagai pilihan kelas kamar rawat
                inap yang dapat disesuaikan dengan kebutuhan dan kemampuan
                pasien, mulai dari kelas III hingga VIP, dengan fasilitas yang
                memadai dan tenaga medis yang berdedikasi.
              </p>
            </div>
          </section>

          <section>
            <div className="mb-6">
              <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-1">
                Fasilitas Kamar
              </span>
              <h2 className="text-xl md:text-2xl font-primary font-bold text-dark-blue">
                Pilihan Kelas Kamar Rawat Inap
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {isLoading ? (
                // Previous-style Skeleton Loader
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-pulse"
                    >
                      <div className="h-64 bg-gray-100"></div>
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-50 rounded w-full"></div>
                          <div className="h-3 bg-gray-50 rounded w-full"></div>
                          <div className="h-3 bg-gray-50 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : kamar.length > 0 ? (
                kamar.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Gambar (Original Look) */}
                    <div className="relative h-64 overflow-hidden">
                      {item.gambar ? (
                        <img
                          src={`${import.meta.env.VITE_STORAGE_URL}/${item.gambar}`}
                          alt={`Foto ${item.nama_kamar}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                          <FaImage size={40} />
                        </div>
                      )}

                      {/* Tipe Kamar Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-blue font-black rounded-lg shadow-sm text-[10px] uppercase tracking-widest border border-white/20">
                          {item.tipe_kamar}
                        </span>
                      </div>

                      {/* Badge nama (Original Look) */}
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-dark-blue/80 to-transparent px-4 pt-8 pb-3">
                        <h3 className="text-white font-primary font-bold text-lg md:text-xl drop-shadow">
                          {item.nama_kamar}
                        </h3>
                      </div>
                    </div>

                    {/* Fasilitas (Original Look with Checkmarks) */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col bg-white">
                      <p className="text-xs font-bold text-primary-blue uppercase tracking-widest mb-4">
                        Fasilitas
                      </p>
                      <ul className="space-y-2.5 flex-1">
                        {item.fasilitas?.split(",").map((fas, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <FaCheckCircle className="text-primary-blue text-sm mt-0.5 shrink-0" />
                            <span className="text-gray-600 text-sm md:text-base leading-tight">
                              {fas.trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium italic">
                    Data kamar tidak tersedia.
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

export default RawatInap;
