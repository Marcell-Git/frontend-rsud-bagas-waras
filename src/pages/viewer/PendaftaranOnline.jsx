import React from "react";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import Header from "../../components/viewer/Header";
import EmergencyCall from "../../components/viewer/EmergencyCall";
import {
  FaGooglePlay,
  FaWhatsapp,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";

import imgPoster from "../../assets/e-registrasi.png";

const PendaftaranOnline = () => {
  return (
    <div className="font-secondary min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="grow py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10 mb-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Top Content Area */}
          <div className="p-6 sm:p-12 text-center border-b border-gray-100 flex flex-col items-center">
            {/* Poster Image */}
            <div className="mb-10 w-full max-w-2xl">
              <div className="p-2 sm:p-3 border border-gray-100 shadow-xl rounded-2xl bg-white transform hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={imgPoster}
                  alt="Poster Pendaftaran Online Bagas Waras"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-cyan-900 mb-6 tracking-tight uppercase">
              Pendaftaran Online <br className="hidden sm:block" /> RSUD Bagas
              Waras Klaten
            </h2>

            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
              Mulai tanggal <strong>11 April 2022</strong>, RSUD Bagas Waras
              Kab. Klaten menyediakan fasilitas pendaftaran{""}
              <em className="text-primary-blue font-semibold">online</em>
              {""}
              melalui aplikasi{""}
              <strong className="text-dark-blue">
                "Pendaftaran Online Bagas Waras"
              </strong>
              {""}
              yang dapat Anda unduh di Playstore, scan QR Code, atau dengan
              menekan tombol berikut:
            </p>

            <a
              href="https://play.google.com/store/apps/details?id=com.er.ro_bagaswaras"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-6 sm:px-10 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 active:scale-95 text-center"
            >
              <FaGooglePlay className="text-2xl sm:text-3xl shrink-0" />
              <span className="text-sm sm:text-base md:text-lg leading-tight text-left">
                KLIK DI SINI UNTUK UNDUH <br className="sm:hidden" /> APLIKASI
                PENDAFTARAN
              </span>
            </a>
          </div>

          {/* Terms and Conditions Section */}
          <div className="p-6 sm:p-12 bg-[#f4fbfc] relative">
            {/* Motif Background Hiasan */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
              <svg
                className="absolute w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="dotPattern"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="2" fill="#000"></circle>
                  </pattern>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#dotPattern)"
                ></rect>
              </svg>
            </div>

            <div className="relative z-10">
              <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <FaInfoCircle className="text-3xl sm:text-4xl text-amber-500 shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-amber-900 bg-amber-100 px-4 py-2 rounded-lg inline-block border border-amber-200">
                  Ketentuan Umum Via Aplikasi"Pendaftaran Online Bagas Waras"
                </h3>
              </div>

              <ul className="space-y-4 text-gray-700 text-base sm:text-lg">
                <li className="flex items-start gap-4">
                  <FaCheckCircle className="text-cyan-500 mt-1 shrink-0 text-xl" />
                  <span>
                    Pendaftaran Online digunakan terhitung mulai tanggal{""}
                    <strong>11 April 2022</strong>;
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <FaCheckCircle className="text-cyan-500 mt-1 shrink-0 text-xl" />
                  <span>
                    Pendaftaran Online bisa dilakukan oleh pasien yang telah
                    memiliki <strong>No. Rekam Medik</strong> (Pasien yang
                    pernah periksa di RSUD Bagas Waras) maupun pasien baru;
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <FaCheckCircle className="text-cyan-500 mt-1 shrink-0 text-xl" />
                  <span>
                    Pendaftaran Online bisa dilakukan oleh pasien dengan tipe
                    pembayaran <strong>Umum</strong> atau <strong>BPJS</strong>;
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <FaCheckCircle className="text-cyan-500 mt-1 shrink-0 text-xl" />
                  <span>
                    Pendaftaran Online bisa dilakukan sampai{""}
                    <strong>H-3 (24 Jam)</strong> sebelum jadwal kedatangan
                    periksa;
                  </span>
                </li>

                {/* Info Penting Red Box */}
                <li className="flex items-start gap-4 bg-red-50 p-5 rounded-2xl border border-red-200 shadow-sm my-6">
                  <FaExclamationTriangle className="text-red-500 mt-1 shrink-0 text-2xl" />
                  <span className="text-red-800 font-bold leading-relaxed">
                    Khusus untuk pasien yang hendak mendaftar secara online H-1
                    periksa, maksimal penggunaan Pendaftaran Online adalah pukul
                    12.00 WIB.
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <FaCheckCircle className="text-cyan-500 mt-1 shrink-0 text-xl" />
                  <span>
                    Pasien yang telah mendaftar online akan mendapatkan{""}
                    <strong className="text-primary-blue bg-cyan-100 px-2 py-0.5 rounded">
                      kode reservasi
                    </strong>
                    {""}
                    yang akan digunakan untuk proses check-in di Mesin Anjungan
                    Mandiri / pendaftaran;
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <FaCheckCircle className="text-cyan-500 mt-1 shrink-0 text-xl" />
                  <span>
                    Kode reservasi bisa di-<em>screenshot</em> atau dicetak,
                    kemudian dibawa saat periksa untuk proses check-in;
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <FaCheckCircle className="text-cyan-500 mt-1 shrink-0 text-xl" />
                  <span>
                    Pasien yang berhalangan hadir namun sudah melakukan
                    reservasi online,{""}
                    <strong className="text-red-600 underline">
                      WAJIB MELAKUKAN PEMBATALAN RESERVASI H-1
                    </strong>
                    . Pembatalan reservasi bisa diakses di menu{""}
                    <strong>HISTORY</strong>.
                  </span>
                </li>
              </ul>

              {/* Contact Area */}
              <div className="mt-14 bg-white p-8 sm:p-10 rounded-3xl border border-cyan-100 shadow-md text-center">
                <p className="text-gray-600 mb-6 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
                  Informasi lebih lanjut dan pertanyaan terkait Pendaftaran
                  Online di RSUD Bagas Waras, dapat menghubungi nomor di bawah
                  ini <br className="hidden md:block" />
                  {""}
                  <span className="text-rose-600 font-bold">
                    (hanya menerima chat)
                  </span>
                  :
                </p>
                <a
                  href="https://wa.me/628112641547"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-rose-600 hover:bg-rose-700 text-white text-xl sm:text-2xl font-black py-4 px-8 rounded-2xl shadow-[0_8px_30px_rgb(225,29,72,0.3)] hover:shadow-[0_8px_30px_rgb(225,29,72,0.5)] transition-all active:scale-95 transform hover:-translate-y-1"
                >
                  <FaWhatsapp className="text-4xl" />
                  <span>+62 811-2641-547</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <EmergencyCall />
      <Footer />
    </div>
  );
};

export default PendaftaranOnline;
