import { useEffect, useState } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import { FaCheckCircle } from "react-icons/fa";
import Header from "../../../components/viewer/Header";

import { getPoli } from "../../../api/pelayanan/rawatJalan";
import useTitle from "../../../hooks/useTitle";

const RawatJalan = () => {
  useTitle("Rawat Jalan");

  const [poli, setPoli] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getPoli();
      setPoli(res.data?.data || res.data || []);
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
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary">
      <Navbar />

      <main className="grow">
        {/* ===== HERO ===== */}
        <Header
          subtitle="Pelayanan Kami"
          title="Rawat Jalan"
          description="Pelayanan kesehatan tanpa perlu menginap, didukung tim dokter spesialis dan fasilitas modern."
        />

        {/* ===== MAIN CONTENT ===== */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-20 pb-16 md:pb-24 space-y-6 md:space-y-8">
          {/* ===== PENGERTIAN ===== */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">
              Tentang Layanan
            </span>
            <h2 className="text-xl md:text-2xl font-primary font-bold text-dark-blue mb-4">
              Apa itu Rawat Jalan?
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-primary-blue">Rawat Jalan</strong>{" "}
                adalah pelayanan kesehatan yang diberikan kepada pasien yang
                tidak memerlukan perawatan menginap di rumah sakit. Pasien dapat
                datang, mendapatkan pemeriksaan dan pengobatan, lalu pulang pada
                hari yang sama.
              </p>
              <p>
                RSUD Bagas Waras menyediakan layanan rawat jalan melalui
                berbagai poli spesialis yang dilayani oleh{" "}
                <strong>dokter spesialis berpengalaman</strong>. Layanan ini
                terbuka untuk pasien umum maupun peserta BPJS Kesehatan dengan
                surat rujukan dari Fasilitas Kesehatan Tingkat Pertama (FKTP).
              </p>
              <p>
                Tersedia pula layanan konsultasi, pemeriksaan penunjang
                (laboratorium & radiologi), serta pengambilan obat di apotek
                rumah sakit dalam satu kali kunjungan.
              </p>
            </div>
          </div>

          {/* ===== DAFTAR KLINIK ===== */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">
              Unit Pelayanan
            </span>
            <h2 className="text-xl md:text-2xl font-primary font-bold text-dark-blue mb-2">
              Daftar Klinik Rawat Jalan
            </h2>
            <p className="text-gray-500 text-sm mb-6 md:mb-8">
              Tersedia {poli.length} klinik spesialis yang siap melayani
              kebutuhan kesehatan Anda.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {poli.map((klinik, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 md:p-4 rounded-2xl border border-gray-100 hover:border-primary-blue/40 hover:bg-light-blue/30 hover:shadow-md transition-all duration-300 group cursor-default"
                >
                  <div className="w-9 h-9 shrink-0 bg-light-blue rounded-xl flex items-center justify-center group-hover:bg-primary-blue transition-colors duration-300">
                    <FaCheckCircle className="text-sm text-primary-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-dark-blue leading-tight">
                    {klinik.nama_poli}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default RawatJalan;
