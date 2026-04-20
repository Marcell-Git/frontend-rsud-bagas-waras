import { useEffect } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import Header from "../../../components/viewer/Header";
import { FaCheckCircle, FaPhoneAlt } from "react-icons/fa";

import kamarVVIP from "../../../assets/img/kamar_vvip.png";
import kamarVIP from "../../../assets/img/kamar_vip.png";
import kamarKelas1 from "../../../assets/img/kamar_kelas1.png";
import kamarKelas2 from "../../../assets/img/kamar_kelas2.png";
import kamarKelas3 from "../../../assets/img/kamar_kelas3.png";

const kamarData = [
  {
    nama: "Kamar VVIP",
    gambar: kamarVVIP,
    fasilitas: [
      "1 Tempat Tidur Pasien",
      "1 Tempat Tidur Penunggu",
      "Kamar Mandi Dalam",
      "AC",
      "Televisi",
      "Sofa / Kursi Tamu",
      "Kulkas",
      "Telepon",
      "Lemari Pakaian",
      "WiFi",
    ],
  },
  {
    nama: "Kamar VIP",
    gambar: kamarVIP,
    fasilitas: [
      "1 Tempat Tidur Pasien",
      "1 Tempat Tidur Penunggu",
      "Kamar Mandi Dalam",
      "AC",
      "Televisi",
      "Kursi Penunggu",
      "Lemari",
      "WiFi",
    ],
  },
  {
    nama: "Kelas I",
    gambar: kamarKelas1,
    fasilitas: [
      "2 Tempat Tidur Pasien",
      "Kamar Mandi Dalam",
      "AC",
      "Televisi",
      "Kursi Penunggu",
      "Lemari",
    ],
  },
  {
    nama: "Kelas II",
    gambar: kamarKelas2,
    fasilitas: [
      "3 Tempat Tidur Pasien",
      "Kamar Mandi Dalam",
      "Kipas Angin",
      "Kursi Penunggu",
      "Lemari",
    ],
  },
  {
    nama: "Kelas III",
    gambar: kamarKelas3,
    fasilitas: [
      "4–6 Tempat Tidur Pasien",
      "Kamar Mandi Bersama",
      "Kipas Angin",
      "Kursi Penunggu",
    ],
  },
];

const RawatInap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary">
      <Navbar />

      <main className="grow">
        <Header
          subtitle="Pelayanan Kami"
          title="Rawat Inap"
          description="Fasilitas rawat inap yang nyaman dengan berbagai pilihan kelas kamar untuk mendukung proses pemulihan pasien."
        />

        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-20 pb-16 md:pb-24 space-y-6 md:space-y-8">
          {/* ===== DESKRIPSI ===== */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
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
                pasien, mulai dari kelas III hingga VVIP, dengan fasilitas yang
                memadai dan tenaga medis yang berdedikasi.
              </p>
            </div>
          </div>

          {/* ===== KARTU KAMAR ===== */}
          <div>
            <div className="mb-6">
              <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-1">
                Fasilitas Kamar
              </span>
              <h2 className="text-xl md:text-2xl font-primary font-bold text-dark-blue">
                Pilihan Kelas Kamar Rawat Inap
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {kamarData.map((kamar, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Gambar */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={kamar.gambar}
                      alt={`Foto ${kamar.nama}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge nama */}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-dark-blue/80 to-transparent px-4 pt-8 pb-3">
                      <h3 className="text-white font-primary font-bold text-lg md:text-xl drop-shadow">
                        {kamar.nama}
                      </h3>
                    </div>
                  </div>

                  {/* Fasilitas */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <p className="text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">
                      Fasilitas
                    </p>
                    <ul className="space-y-2 flex-1">
                      {kamar.fasilitas.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <FaCheckCircle className="text-primary-blue text-sm mt-0.5 shrink-0" />
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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

export default RawatInap;
