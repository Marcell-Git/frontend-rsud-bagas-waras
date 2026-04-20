import NavbarZI from "../../../components/publik/ZI/NavbarZI";
import FooterZI from "../../../components/publik/ZI/FooterZI";
import { FaCalendarAlt } from "react-icons/fa";

import imgKegiatan1 from "../../../assets/publik/ZI/kegiatan1.png";
import imgKegiatan2 from "../../../assets/publik/ZI/kegiatan2.png";
import imgKegiatan3 from "../../../assets/publik/ZI/kegiatan3.png";

const KegiatanZI = () => {
  // Data dummy kegiatan
  const mockKegiatan = [
    {
      id: 1,
      title:
        "Penandatanganan Pakta Integritas Seluruh Pegawai RSUD Bagas Waras",
      date: "12 April 2024",
      thumbnail: imgKegiatan1,
      description:
        "Dalam rangka mewujudkan Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM), seluruh jajaran direksi, manajemen, dan pegawai RSUD Bagas Waras Kabupaten Klaten secara serentak melaksanakan pembacaan dan penandatanganan Pakta Integritas. Kegiatan ini merupakan wujud komitmen nyata seluruh elemen rumah sakit untuk menolak segala bentuk gratifikasi, pungli, dan korupsi demi meningkatkan kualitas pelayanan publik yang paripurna bagi masyarakat.",
    },
    {
      id: 2,
      title: "Sosialisasi Penerapan Sistem Whistle Blowing (WBS)",
      date: "28 Maret 2024",
      thumbnail: imgKegiatan2,
      description:
        "RSUD Bagas Waras mengadakan kegiatan sosialisasi internal mengenai tata cara penggunaan portal Whistle Blowing System (WBS). Acara ini bertujuan untuk mengedukasi seluruh staf agar tidak ragu melaporkan segala bentuk indikasi kecurangan, pelanggaran kode etik, maupun benturan kepentingan yang terjadi di lingkungan kerja. Sosialisasi ini diharapkan mampu menciptakan iklim organisasi yang transparan dan selalu akuntabel.",
    },
    {
      id: 3,
      title: "Workshop Peningkatan Kualitas Layanan Publik Berbasis Digital",
      date: "15 Februari 2024",
      thumbnail: imgKegiatan3,
      description:
        "Sebagai salah satu elemen penting dalam indikator penilaian WBBM, RSUD Bagas Waras menggelar workshop peningkatan layanan fasilitas digital bagi staf pelayanan garis depan. Digitalisasi pendaftaran dan sistem antrean diyakini mampu mempercepat prosedur layanan kesehatan dan secara efektif meniadakan potensi perantara pihak ketiga. Inovasi layanan elektronik ini mendukung penuh visi terwujudnya Zona Integritas yang bersih.",
    },
  ];

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-gray-50/50">
      <NavbarZI />

      <main className="grow py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight">
            Kegiatan WBK/WBBM{" "}
            <span className="text-emerald-600 block md:inline mt-2 md:mt-0">
              RSUD Bagas Waras
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="space-y-12">
          {mockKegiatan.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-[45%] lg:w-2/5 shrink-0 relative overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-gray-900/5 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-64 md:h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content Box */}
                <div className="p-8 md:p-10 flex flex-col justify-center grow">
                  <div className="flex items-center text-xs font-semibold text-gray-500 mb-5 bg-emerald-50 w-fit px-4 py-2 rounded-full border border-emerald-100">
                    <FaCalendarAlt className="text-emerald-500 mr-2.5 text-sm" />
                    <time>{item.date}</time>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-snug group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 leading-relaxed text-[15px] text-justify line-clamp-4 md:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <FooterZI />
    </div>
  );
};

export default KegiatanZI;
