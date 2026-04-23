import { useEffect, useState } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import Header from "../../../components/viewer/Header";
import { FaFileAlt, FaEye } from "react-icons/fa";
import ModalPdfViewer from "../../../components/viewer/ModalPdfViewer";

import { getTarifPelayanan } from "../../../api/pelayanan/tarifPelayanan";

const TarifPelayanan = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchTarif = async () => {
    setIsLoading(true);
    try {
      const response = await getTarifPelayanan({ per_page: 50 });
      setItems(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error fetching tarif:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTarif();
  }, []);

  const handleSelect = (item) => {
    setSelected({
      nama: item.nama_tarif,
      pdf: `${import.meta.env.VITE_STORAGE_URL}/${item.url_file}`,
      filePdf: item.url_file.split('/').pop()
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary">
      <Navbar />

      <main className="grow">
        <Header
          subtitle="Pelayanan Kami"
          title="Tarif Pelayanan"
          description="Informasi lengkap mengenai tarif pelayanan RSUD Bagas Waras Kabupaten Klaten."
        />

        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-20 pb-16 md:pb-24 space-y-6 md:space-y-8">
          {/* ===== KETERANGAN ===== */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">
              Informasi Tarif
            </span>
            <h2 className="text-xl md:text-2xl font-primary font-bold text-dark-blue mb-4">
              Tarif Pelayanan RSUD Bagas Waras
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-primary-blue">Tarif Pelayanan</strong>{" "}
                adalah biaya yang dikenakan untuk setiap layanan medis yang
                diberikan oleh RSUD Bagas Waras Kabupaten Klaten. Tarif ini
                ditetapkan berdasarkan Peraturan Bupati yang berlaku.
              </p>
              <p>
                Klik tombol <strong>Lihat Tarif</strong> pada masing-masing
                kategori untuk melihat rincian tarif secara lengkap. Tarif dapat
                berubah sewaktu-waktu sesuai kebijakan pemerintah daerah.
              </p>
            </div>
          </div>

          {/* ===== GRID TARIF ===== */}
          <div>
            <div className="mb-6">
              <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-1">
                Dokumen Tarif
              </span>
              <h2 className="text-xl md:text-2xl font-primary font-bold text-dark-blue">
                Daftar Tarif Layanan
              </h2>
            </div>

            {isLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-3xl h-80 shadow-md animate-pulse border border-gray-100"></div>
                  ))}
               </div>
            ) : items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {items.map((tarif, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Gambar Preview */}
                    <div className="relative h-64 overflow-hidden bg-white flex items-center justify-center p-4">
                      <img
                        src={`${import.meta.env.VITE_STORAGE_URL}/${tarif.gambar_tarif}`}
                        alt={`Preview ${tarif.nama_tarif}`}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow">
                        <FaFileAlt className="text-primary-blue text-sm" />
                      </div>
                    </div>

                    {/* Tombol */}
                    <div className="p-4 md:p-5">
                      <h3 className="text-sm font-bold text-dark-blue mb-3 line-clamp-1">{tarif.nama_tarif}</h3>
                      <button
                        onClick={() => handleSelect(tarif)}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary-blue text-white text-xs md:text-sm font-bold rounded-xl hover:bg-dark-blue transition-colors duration-300 shadow-sm cursor-pointer"
                      >
                        <FaEye className="text-xs" />
                        Lihat Tarif
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic">Data tarif belum tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <EmergencyCall />

      <ModalPdfViewer tarif={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default TarifPelayanan;
