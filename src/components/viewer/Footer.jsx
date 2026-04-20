import React from "react";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPhoneAlt,
  FaFax,
  FaEnvelope,
} from "react-icons/fa";
import logoRsud from "../../assets/logo-rsud.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 md:border-t-8 border-primary-blue pt-12 md:pt-20 pb-6 md:pb-8 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 md:mb-16">
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-6 md:mb-8 inline-block">
              <img
                src={logoRsud}
                alt="Logo RSUD Bagas Waras"
                className="h-[50px] md:h-[70px] w-auto object-contain cursor-pointer"
              />
            </div>

            <div className="bg-light-blue/30 p-4 md:p-5 rounded-2xl border border-light-blue shadow-sm mt-0 md:mt-2 w-full max-w-sm md:max-w-none">
              <h4 className="text-dark-blue font-primary font-bold mb-3 leading-snug text-sm md:text-base">
                Bagaimana website RSUD Bagas Waras ini?
              </h4>
              <select
                defaultValue=""
                className="w-full p-2.5 md:p-3 rounded-xl border border-gray-200 outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 text-xs md:text-sm text-gray-700 bg-white transition-all cursor-pointer shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-size-[0.7rem_auto] bg-no-repeat bg-position-[right_1rem_center] pr-10"
              >
                <option value="" disabled>
                  -- Pilih tanggapan Anda --
                </option>
                <option value="Sangat Informatif">Sangat informatif</option>
                <option value="Cukup Informatif">Cukup informatif</option>
                <option value="Informatif Namun Kurang Lengkap">
                  Informatif namun kurang lengkap
                </option>
              </select>
              <button
                type="button"
                className="w-full mt-3 bg-primary-blue text-white py-2 md:py-2.5 rounded-xl font-bold hover:bg-dark-blue transition-colors shadow-sm text-xs md:text-sm active:scale-[0.98]"
                onClick={() =>
                  alert(
                    "Terima kasih atas tanggapan Anda yang sangat berharga!",
                  )
                }
              >
                Kirim Tanggapan
              </button>
            </div>
          </div>

          {/* Kolom Info Berkunjung */}
          <div className="lg:col-span-4 flex flex-col md:block items-center md:items-start text-center md:text-left">
            <h3 className="text-lg md:text-xl font-primary font-bold text-dark-blue mb-4 md:mb-6 pb-2 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-16 after:h-1.5 after:bg-primary-blue after:rounded-full">
              Waktu Kunjungan Pasien
            </h3>
            <div className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left w-full">
              <p className="mb-3 md:mb-4 text-gray-800">
                Dibuka mulai pukul{" "}
                <strong className="text-primary-blue">11.00 - 13.00 WIB</strong>{" "}
                &{" "}
                <strong className="text-primary-blue">17.00 - 19.00 WIB</strong>
                , dengan syarat:
              </p>
              <ol className="list-decimal pl-5 space-y-1 md:space-y-2 marker:font-bold marker:text-primary-blue font-medium">
                <li className="pl-1">
                  Masuk bergiliran, maksimal 4 pengunjung setiap pasien.
                </li>
                <li className="pl-1">
                  Wajib menerapkan prokes & menggunakan masker.
                </li>
              </ol>
            </div>
          </div>

          {/* Kolom Kontak */}
          <div className="md:col-span-2 lg:col-span-4 flex flex-col md:block items-center md:items-start text-center md:text-left">
            <h3 className="text-lg md:text-xl font-primary font-bold text-dark-blue mb-4 md:mb-6 pb-2 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-16 after:h-1.5 after:bg-primary-blue after:rounded-full">
              Pusat Bantuan
            </h3>
            <ul className="space-y-2 md:space-y-3 w-full text-left">
              <li className="flex items-start gap-3 md:gap-4 p-2.5 md:p-3 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-light-blue text-primary-blue flex items-center justify-center shrink-0 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                  <FaMapMarkerAlt className="text-base md:text-lg" />
                </div>
                <span className="text-gray-700 font-medium text-xs md:text-sm mt-0.5 leading-snug">
                  Jl. Ir. Soekarno KM.2, Buntalan, Klaten Tengah, Klaten, Jateng
                  57419
                </span>
              </li>
              <li className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-light-blue text-primary-blue flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <FaWhatsapp className="text-lg md:text-xl" />
                </div>
                <div>
                  <span className="text-[10px] md:text-xs text-gray-500 block font-bold mb-0.5">
                    WhatsApp Chat
                  </span>
                  <span className="text-dark-blue font-bold tracking-wide text-sm md:text-base">
                    081-1264-1547
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-light-blue text-primary-blue flex items-center justify-center shrink-0 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                  <FaPhoneAlt className="text-base md:text-lg" />
                </div>
                <div>
                  <span className="text-[10px] md:text-xs text-gray-500 block font-bold mb-0.5">
                    Telepon
                  </span>
                  <span className="text-dark-blue font-bold tracking-wide text-sm md:text-base">
                    (0272) 3359188 / 3359666
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-light-blue text-primary-blue flex items-center justify-center shrink-0 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                  <FaFax className="text-base md:text-lg" />
                </div>
                <div>
                  <span className="text-[10px] md:text-xs text-gray-500 block font-bold mb-0.5">
                    Fax
                  </span>
                  <span className="text-dark-blue font-bold tracking-wide text-sm md:text-base">
                    (0272) 3359199
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-light-blue text-primary-blue flex items-center justify-center shrink-0 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                  <FaEnvelope className="text-base md:text-lg" />
                </div>
                <div>
                  <span className="text-[10px] md:text-xs text-gray-500 block font-bold mb-0.5">
                    Email
                  </span>
                  <span className="text-dark-blue font-bold tracking-wide text-sm md:text-base">
                    rsudbagaswaras@gmail.com
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="w-full border-t border-gray-200 pt-6 md:pt-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-start items-center gap-2 md:gap-4">
          <div className="text-gray-500 font-semibold text-xs md:text-sm text-center md:text-left">
            &copy; Copyright IT RSUD Bagas Waras - {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
