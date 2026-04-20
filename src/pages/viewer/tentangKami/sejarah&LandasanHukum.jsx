import React, { useEffect, useState } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import {
  FaLandmark,
  FaScroll,
  FaChevronDown,
  FaChevronUp,
  FaGavel,
  FaFileAlt,
} from "react-icons/fa";
import Header from "../../../components/viewer/Header";
import rsudBuilding from "../../../assets/rsud-building.png";

// Data Landasan Hukum
const landasanHukumData = [
  {
    kategori: "Peraturan Daerah Kabupaten Klaten",
    icon: <FaLandmark />,
    color: "from-primary-blue to-light-blue",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    items: [
      {
        nomor: "Perda Kab. Klaten No. 8 Tahun 2014",
        judul: "Tentang Rumah Sakit Umum Daerah Bagas Waras Kabupaten Klaten",
        desc: "RSUD Bagas Waras Kabupaten Klaten telah berdiri sejak tanggal 7 Agustus 2014 dan beralamatkan di Jln. Ir. Soekarno Km.2 Buntalan, Klaten Tengah Klaten Jawa Tengah, Telp. (0272) 3359188, Fax (0272) 335966 dengan luas tanah seluas 55.000 m² dan luas bangunan seluas ±10.415 m².",
      },
      {
        nomor: "Perda Kab. Klaten No. 10 Tahun 2014",
        judul:
          "Tentang Organisasi dan Tata Kerja Rumah Sakit Umum Daerah Kelas C Kabupaten Klaten",
        desc: "Rumah Sakit Umum Daerah selanjutnya disingkat RSUD adalah Rumah Sakit Umum Daerah Kelas C Kabupaten Klaten dengan status kepemilikan merupakan milik Pemerintah Daerah Kabupaten Klaten. RSUD Bagas Waras Kabupaten Klaten merupakan Satuan Kerja Perangkat Daerah (SKPD) yang dipimpin oleh direktur.",
      },
    ],
  },
  {
    kategori: "Keputusan Kepala Dinas Penanaman Modal",
    icon: <FaFileAlt />,
    color: "from-primary-blue to-light-blue",
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-700",
    items: [
      {
        nomor: "SK No. 503.24/002/OP/2015/29",
        judul: "Tentang Pemberian Izin Operasional Rumah Sakit",
        desc: "Kepala Kantor Penanaman Modal dan Perizinan Terpadu memutuskan memberikan Izin Operasional Rumah Sakit Umum Kelas C kepada RSUD Bagas Waras pada tanggal 30 September 2015. Masa berlaku Izin Operasional selama 5 (lima) tahun (30 September 2015 s/d 30 September 2020).",
      },
      {
        nomor: "SK No. 503.24/004/OP Tahun 2020",
        judul: "Tentang Pemberian Perpanjangan Izin Operasional Rumah Sakit",
        desc: "Terhitung mulai tanggal 23 Juli 2015, RSUD Bagas Waras Kabupaten Klaten menerima pola penetapan pola tata kelola keuangan Badan Layanan Umum Daerah (BLUD). Pola tata kelola keuangan BLUD di RSUD Bagas Waras Kabupaten Klaten pada Tahun 2015 dalam masa transisi sedangkan penggunaan BLUD penuh akan dilaksanakan pada Tahun 2016.",
      },
    ],
  },
  {
    kategori: "Keputusan Bupati Klaten",
    icon: <FaGavel />,
    color: "from-primary-blue to-light-blue",
    bgLight: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-700",
    items: [
      {
        nomor: "Keputusan Bupati Klaten No. 445/301 Tahun 2015",
        judul:
          "Tentang Penerapan Pola Pengelolaan Keuangan Badan Layanan Umum Daerah (BLUD) RSUD Bagas Waras Kabupaten Klaten",
        desc: "Terhitung mulai tanggal 23 Juli 2015, RSUD Bagas Waras Kabupaten Klaten menerima pola penetapan pola tata kelola keuangan Badan Layanan Umum Daerah (BLUD). Pola tata kelola keuangan BLUD di RSUD Bagas Waras Kabupaten Klaten pada Tahun 2015 dalam masa transisi sedangkan penggunaan BLUD penuh akan dilaksanakan pada Tahun 2016.",
      },
    ],
  },
];

const HukumItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${open ? "shadow-md" : "shadow-sm hover:shadow-md"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-4 md:p-5 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <FaFileAlt className="text-primary-blue mt-0.5 shrink-0 text-sm" />
          <div className="min-w-0">
            <span className="block text-xs font-bold text-primary-blue uppercase tracking-wide mb-0.5">
              {item.nomor}
            </span>
            <span className="block text-sm md:text-base font-bold text-dark-blue leading-snug">
              {item.judul}
            </span>
          </div>
        </div>
        <div className="shrink-0 text-gray-400">
          {open ? (
            <FaChevronUp className="text-xs" />
          ) : (
            <FaChevronDown className="text-xs" />
          )}
        </div>
      </button>
      {open && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed pt-3">
            {item.desc}
          </p>
        </div>
      )}
    </div>
  );
};

const SejarahLandasanHukum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-700 font-secondary flex flex-col">
      <Navbar />

      <main className="grow">
        {/* Hero Section */}
        <Header
          subtitle="Tentang Kami"
          title="Sejarah & Landasan Hukum"
          description="Sejarah singkat RSUD Bagas Waras dan landasan hukum yang mendasarinya."
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 lg:-mt-24 relative z-20 pb-16 md:pb-24">
          {/* ===== SEJARAH SECTION ===== */}
          <section className="bg-white rounded-3xl md:rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden mb-10 md:mb-16">
            <div className="bg-linear-to-r from-primary-blue to-light-blue p-6 md:p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute right-32 bottom-[-50px] w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md shadow-inner border border-white/20">
                  <FaLandmark className="text-white text-xl md:text-2xl" />
                </div>
                <div>
                  <span className="block text-blue-100 text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-0.5">
                    Profil Rumah Sakit
                  </span>
                  <h2 className="text-2xl md:text-3xl font-primary font-bold text-white">
                    Sejarah Singkat
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                <div className="flex-1">
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                    <strong className="text-primary-blue">
                      RSUD Bagas Waras
                    </strong>
                    {""}
                    merupakan Rumah Sakit Umum Daerah milik Pemerintah Kabupaten
                    Klaten yang berdiri sejak <strong>7 Agustus 2014</strong>
                    {""}
                    berdasarkan Peraturan Daerah Kabupaten Klaten Nomor 8 Tahun
                    2014. Rumah sakit ini beralamat di{""}
                    <strong>
                      Jln. Ir. Soekarno Km.2 Buntalan, Klaten Tengah, Jawa
                      Tengah (57419)
                    </strong>
                    , dengan Telp. (0272) 3359188 dan Fax (0272) 335966.
                  </p>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                    RSUD Bagas Waras merupakan Rumah Sakit Umum Daerah Kelas C
                    dengan luas tanah seluas{""}
                    <strong className="text-primary-blue">55.000 m²</strong> dan
                    luas bangunan seluas{""}
                    <strong className="text-primary-blue">±10.415 m²</strong>.
                    Sebagai Satuan Kerja Perangkat Daerah (SKPD) Kabupaten
                    Klaten, rumah sakit ini dipimpin oleh seorang direktur dan
                    bertanggung jawab langsung kepada Pemerintah Daerah
                    Kabupaten Klaten.
                  </p>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Nama{""}
                    <strong className="text-primary-blue">"Bagas Waras"</strong>
                    {""}
                    berasal dari bahasa Jawa yang bermakna{""}
                    <em>"Sehat Sejahtera"</em>, mencerminkan harapan dan tekad
                    bersama untuk mewujudkan masyarakat Klaten yang sehat, kuat,
                    dan sejahtera melalui layanan kesehatan yang bermutu,
                    terjangkau, dan berkeadilan.
                  </p>
                </div>

                {/* Gambar Gedung - Clean Frame Side-by-Side */}
                <div className="hidden md:block w-[280px] lg:w-[340px] shrink-0">
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-white/80 group">
                    <div className="absolute inset-0 bg-linear-to-t from-primary-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                    <img
                      src={rsudBuilding}
                      alt="Gedung RSUD Bagas Waras"
                      className="w-full h-72 lg:h-[320px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== LANDASAN HUKUM SECTION ===== */}
          <section>
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-blue rounded-2xl flex items-center justify-center shrink-0 shadow-md transform -rotate-3">
                <FaScroll className="text-white text-xl md:text-3xl" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-primary-blue uppercase tracking-widest mb-1">
                  Dasar & Regulasi
                </p>
                <h2 className="text-2xl md:text-4xl font-primary font-bold text-dark-blue">
                  Landasan Hukum
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {landasanHukumData.map((kategori, kIdx) => (
                <div
                  key={kIdx}
                  className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex flex-col"
                >
                  {/* Kategori Header */}
                  <div
                    className={`bg-linear-to-r ${kategori.color} p-5 md:p-6 flex items-center gap-3`}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-lg backdrop-blur-sm">
                      {kategori.icon}
                    </div>
                    <h3 className="font-primary font-bold text-white text-lg md:text-xl">
                      {kategori.kategori}
                    </h3>
                  </div>

                  {/* Peraturan List */}
                  <div className="p-4 md:p-5 flex flex-col gap-3 flex-1">
                    {kategori.items.map((item, iIdx) => (
                      <HukumItem key={iIdx} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default SejarahLandasanHukum;
