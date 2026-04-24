import NavbarWBS from "../../../components/publik/WBS/NavbarWBS";
import hero from "../../../assets/publik/WBS/hero-wbs.png";
import FooterWBS from "../../../components/publik/WBS/FooterWBS";
import {
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserSecret,
  FaCamera,
} from "react-icons/fa";

import useTitle from "../../../hooks/useTitle";

const WBS = () => {
  useTitle("WBS");
  
  return (
    <div className="font-secondary min-h-screen flex flex-col">
      <NavbarWBS />

      <main className="grow">
        <div className="w-full">
          <img
            src={hero}
            alt="Kawasan Zona Integritas WBS"
            className="w-full h-auto object-cover"
          />
        </div>

        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-primary tracking-wide">
              Whistle Blowing <span className="text-[#922c40]">System</span>
            </h2>
            <p className="text-gray-600 leading-relaxed md:text-lg">
              Whistle Blowing System merupakan bagian dari sistem penanganan
              pengaduan pegawai dan masyarakat terpadu yang memfokuskan pada
              penanganan dugaan tindak pidana korupsi. Sistem ini disediakan bagi
              siapa saja yang perlu melaporkan dugaan terjadinya pelanggaran yang
              dilakukan oleh pihak internal RSUD Bagas Waras (PNS, Non-PNS, dan
              Outsourcing).
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24 border-y border-gray-100 shadow-[inset_0_4px_6px_-6px_rgba(0,0,0,0.1)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#922c40] mb-6 font-primary tracking-wide">
              Whistleblower
            </h2>
            <p className="text-gray-600 leading-relaxed md:text-lg">
              Seseorang yang melaporkan perbuatan dugaan tindak pidana korupsi
              yang terjadi di dalam organisasi tempatnya bekerja, atau pihak
              terkait lainnya yang memiliki akses informasi yang memadai atas
              terjadinya dugaan tindak pidana korupsi tersebut.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-primary tracking-wide">
                Kriteria <span className="text-[#922c40]">Whistleblower</span>
              </h2>
              <div className="w-20 h-1 bg-[#922c40] mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#922c40] group-hover:shadow-[0_0_20px_rgba(146,44,64,0.3)] transition-all duration-300 shadow-sm border border-gray-100 cursor-default">
                  <FaQuestionCircle className="text-4xl text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-600 font-medium">
                  Ada penyimpangan kasus yang dilaporkan.
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#922c40] group-hover:shadow-[0_0_20px_rgba(146,44,64,0.3)] transition-all duration-300 shadow-sm border border-gray-100 cursor-default">
                  <FaMapMarkerAlt className="text-4xl text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-600 font-medium">
                  Menjelaskan <span className="font-bold">Dimana</span> kasus tersebut
                  dilakukan.
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#922c40] group-hover:shadow-[0_0_20px_rgba(146,44,64,0.3)] transition-all duration-300 shadow-sm border border-gray-100 cursor-default">
                  <FaCalendarAlt className="text-4xl text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-600 font-medium">
                  Menjelaskan <span className="font-bold">Kapan</span> kasus tersebut
                  dilakukan.
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#922c40] group-hover:shadow-[0_0_20px_rgba(146,44,64,0.3)] transition-all duration-300 shadow-sm border border-gray-100 cursor-default">
                  <FaUserSecret className="text-4xl text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-600 font-medium">
                  Siapa pejabat/pegawai RSUD Bagas Waras yang melakukan atau
                  terlibat.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-4 md:mt-12">
              <div className="flex flex-col items-center text-center group max-w-xl">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#922c40] group-hover:shadow-[0_0_20px_rgba(146,44,64,0.3)] transition-all duration-300 shadow-sm border border-gray-100 cursor-default">
                  <FaCamera className="text-4xl text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Bagaimana perbuatan tersebut dilakukan (modus, cara, dsb). Dilengkapi
                  dengan bukti permulaan (data, dokumen, gambar dan rekaman) yang
                  mendukung/menjelaskan adanya dugaan Tindak Pidana Korupsi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterWBS />
    </div>
  );
};

export default WBS;