import { useEffect } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import Header from "../../../components/viewer/Header";
import { FaPhoneAlt, FaHeadset } from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";

const LayananInformasi = () => {
  useTitle("Layanan Informasi");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary">
      <Navbar />

      <main className="grow">
        <Header
          subtitle="Pelayanan Kami"
          title="Layanan Informasi"
          description="Dapatkan informasi lengkap seputar layanan RSUD Bagas Waras Kabupaten Klaten melalui petugas informasi kami."
        />

        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-20 pb-16 md:pb-24 space-y-6 md:space-y-8">
          {/* ===== KONTAK UTAMA ===== */}
          <div className="bg-linear-to-r from-primary-blue to-secondary-blue rounded-3xl p-6 md:p-10 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Icon */}
              <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <FaHeadset className="text-4xl md:text-5xl text-white" />
              </div>
              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">
                  Hubungi Kami
                </p>
                <h2 className="text-xl md:text-2xl font-primary font-bold mb-3">
                  Layanan Informasi RSUD Bagas Waras
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href="tel:02723359188"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-primary-blue font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md text-sm"
                  >
                    <FaPhoneAlt className="text-sm" />
                    (0272) 3359188
                  </a>
                  <a
                    href="tel:02723359666"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors border border-white/30 text-sm"
                  >
                    <FaPhoneAlt className="text-sm" />
                    (0272) 3359666
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ===== TENTANG LAYANAN ===== */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">
              Tentang Layanan
            </span>
            <h2 className="text-xl md:text-2xl font-primary font-bold text-dark-blue mb-4">
              Apa itu Layanan Informasi?
            </h2>
            <div className="space-y-3 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-primary-blue">Layanan Informasi</strong>{" "}
                adalah unit pelayanan RSUD Bagas Waras yang bertugas memberikan
                informasi kepada pasien, keluarga pasien, dan masyarakat umum
                mengenai segala hal yang berkaitan dengan pelayanan di rumah
                sakit.
              </p>
              <p>
                Petugas kami siap membantu Anda mendapatkan informasi yang
                dibutuhkan dengan ramah dan profesional, baik secara langsung di
                loket informasi maupun melalui saluran telepon yang tersedia.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default LayananInformasi;
