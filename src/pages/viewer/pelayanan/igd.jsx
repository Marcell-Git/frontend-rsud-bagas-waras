import { useEffect } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import { FaPhoneAlt, FaAmbulance } from "react-icons/fa";
import Header from "../../../components/viewer/Header";
import useTitle from "../../../hooks/useTitle";

const IGD = () => {
  useTitle("IGD");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary">
      <Navbar />

      <main className="grow">
        {/* ===== HERO ===== */}
        <Header
          subtitle="Pelayanan Kami"
          title="Instalasi Gawat Darurat"
          description="Siap melayani pasien darurat 24 jam sehari, 7 hari seminggu, 365 hari setahun tanpa henti."
        />

        {/* ===== MAIN CONTENT ===== */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-20 pb-16 md:pb-24 space-y-6 md:space-y-8">
          {/* ===== INFO CARDS ===== */}

          {/* ===== PENGERTIAN IGD ===== */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">
              Tentang Layanan
            </span>
            <h2 className="text-xl md:text-2xl font-primary font-bold text-dark-blue mb-4">
              Apa itu Instalasi Gawat Darurat (IGD)?
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-primary-blue">
                  Instalasi Gawat Darurat (IGD)
                </strong>{" "}
                adalah unit pelayanan rumah sakit yang memberikan penanganan
                awal bagi pasien yang mengalami kondisi gawat darurat — yaitu
                kondisi yang mengancam jiwa dan membutuhkan tindakan medis
                segera.
              </p>
              <p>
                IGD RSUD Bagas Waras Kabupaten Klaten beroperasi{" "}
                <strong>selama 24 jam penuh</strong> setiap harinya, dilayani
                oleh dokter dan tenaga medis terlatih yang siap menangani
                berbagai kondisi kegawatdaruratan medis maupun trauma.
              </p>
              <p>
                Pasien dapat datang langsung ke IGD atau menghubungi nomor
                darurat kami terlebih dahulu untuk mendapatkan panduan
                penanganan awal sebelum tiba di rumah sakit.
              </p>
            </div>
          </div>

          {/* ===== CTA DARURAT ===== */}
          <div className="bg-linear-to-r from-primary-blue to-light-blue rounded-3xl p-6 md:p-10 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-primary font-bold mb-2">
                  Butuh Pertolongan Segera?
                </h2>
                <p className="text-blue-200 text-sm max-w-md">
                  Jangan tunda jika ada kondisi darurat. Segera hubungi kami
                  atau langsung datang ke IGD RSUD Bagas Waras.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="tel:02723392233"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-blue font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md text-sm"
                >
                  <FaPhoneAlt className="text-sm" />
                  (0272)3392233
                </a>
                <a
                  href="https://wa.me/08112641547"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-blue text-white font-bold rounded-xl hover:bg-white/30 transition-colors border border-white/30 text-sm"
                >
                  <FaAmbulance className="text-sm" />
                  WhatsApp Darurat
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default IGD;
