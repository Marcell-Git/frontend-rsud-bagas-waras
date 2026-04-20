import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  FaClipboardList,
  FaRoute,
  FaExclamationCircle,
  FaBed,
  FaUserMd,
  FaArrowRight,
  FaMobileAlt,
} from "react-icons/fa";
import hero1 from "../../assets/img/hero1.png";
import hero2 from "../../assets/img/hero2.png";
import hero3 from "../../assets/img/Banner_Web_Aktif.png";
import sketchRsud from "../../assets/sketch_rsud_blue.png";
import partnerBpjsKes from "../../assets/partner/BPJS_kesehatan.jpg";
import partnerBpjsKet from "../../assets/partner/BPJS_ketenagakerjaan.png";
import partnerMaturibu from "../../assets/partner/MATURIBU.jpeg";
import partnerAwasi from "../../assets/partner/awasicorona.png";
import partnerCovid from "../../assets/partner/covid_logo.png";
import partnerPemkab from "../../assets/partner/pemkab.png";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import EmergencyCall from "../../components/viewer/EmergencyCall";

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryRef = useRef(null);
  const [activeTab, setActiveTab] = useState("ruangan");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 5000);

    const galleryTimer = setInterval(() => {
      if (galleryRef.current) {
        const itemWidth = galleryRef.current.children[0]?.clientWidth || 0;
        const gap = 16; // 1rem (gap-4)

        galleryRef.current.scrollBy({
          left: itemWidth + gap,
          behavior: "smooth",
        });
      }
    }, 3000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(timer);
      clearInterval(galleryTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const galleryImages = [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
  ];

  const ruanganData = [
    {
      no: 1,
      nama: "Ruang ICU",
      kapasitas: 15,
      terisi: 12,
      kosong: 3,
      status: "Tersedia",
    },
    {
      no: 2,
      nama: "Ruang IGD",
      kapasitas: 30,
      terisi: 30,
      kosong: 0,
      status: "Penuh",
    },
    {
      no: 3,
      nama: "Ruang Melati (VIP)",
      kapasitas: 10,
      terisi: 5,
      kosong: 5,
      status: "Tersedia",
    },
    {
      no: 4,
      nama: "Ruang Anggrek (Kelas 1)",
      kapasitas: 20,
      terisi: 18,
      kosong: 2,
      status: "Tersedia",
    },
  ];

  const dokterData = [
    {
      no: 1,
      nama: "dr. Budi Santoso, Sp.PD",
      spesialisasi: "Penyakit Dalam",
      jadwal: "Senin - Rabu (08:00 - 14:00)",
    },
    {
      no: 2,
      nama: "dr. Siti Aminah, Sp.A",
      spesialisasi: "Anak",
      jadwal: "Selasa - Kamis (09:00 - 15:00)",
    },
    {
      no: 3,
      nama: "dr. Candra Wijaya, Sp.B",
      spesialisasi: "Bedah Umum",
      jadwal: "Jumat - Sabtu (08:00 - 12:00)",
    },
    {
      no: 4,
      nama: "dr. Dewi Lestari, Sp.OG",
      spesialisasi: "Kandungan",
      jadwal: "Senin, Kamis (10:00 - 16:00)",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-700 font-secondary">
      <Navbar />

      {/* Hero / Carousel Section */}
      <main>
        {/* Carousel Wrapper with Max Width to make it smaller/framed on big screens */}
        <div className="w-full max-w-6xl mx-auto xl:px-8 xl:py-6 relative z-0">
          <div className="relative w-full bg-[#f8fafc] overflow-hidden group xl:rounded-3xl shadow-xl border border-gray-100/50">
            {/* Ghost image defining aspect ratio, removed max height to ensure absolutely NO cropping */}
            <img
              src={hero3}
              alt=""
              className="w-full h-auto invisible pointer-events-none"
            />
            <div
              className={`carousel-slide absolute inset-0 flex items-center justify-center ${activeSlide === 0 ? "active" : ""}`}
            >
              <img
                src={hero1}
                alt="RSUD Bagas Waras Building"
                className="carousel-bg absolute inset-0 w-full h-full object-cover z-0"
              />
            </div>

            <div
              className={`carousel-slide absolute inset-0 flex items-center justify-center ${activeSlide === 1 ? "active" : ""}`}
            >
              <img
                src={hero2}
                alt="Professional Doctor"
                className="carousel-bg absolute inset-0 w-full h-full object-cover z-0"
              />
            </div>

            <div
              className={`carousel-slide absolute inset-0 flex items-center justify-center ${activeSlide === 2 ? "active" : ""}`}
            >
              <img
                src={hero3}
                alt="Professional Doctor"
                className="carousel-bg absolute inset-0 w-full h-full object-cover z-0"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-40 -mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border border-gray-100">
            {/* Survey Kepuasan Pasien */}
            <Link
              className="group relative flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 border border-transparent hover:bg-light-blue hover:border-primary-blue hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer"
              to="https://skm.klaten.go.id/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-16 h-16 rounded-full bg-primary-blue text-white flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-primary-blue transition-colors">
                <FaClipboardList className="text-3xl" />
              </div>
              <div className="font-primary font-semibold text-dark-blue text-lg">
                Survey Kepuasan Pasien
              </div>
            </Link>

            {/* Alur Pelayanan */}
            <Link
              className="group relative flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 border border-transparent hover:bg-light-blue hover:border-primary-blue hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer"
              to="/alur-pelayanan"
            >
              <div className="w-16 h-16 rounded-full bg-primary-blue text-white flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-primary-blue transition-colors">
                <FaRoute className="text-3xl" />
              </div>
              <div className="font-primary font-semibold text-dark-blue text-lg">
                Alur Pelayanan
              </div>
            </Link>

            {/* Form Pengaduan */}
            <Link
              className="group relative flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 border border-transparent hover:bg-light-blue hover:border-primary-blue hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer"
              to="/pengaduan"
            >
              <div className="w-16 h-16 rounded-full bg-primary-blue text-white flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-primary-blue transition-colors">
                <FaExclamationCircle className="text-3xl" />
              </div>
              <div className="font-primary font-semibold text-dark-blue text-lg">
                Form Pengaduan
              </div>
            </Link>

            {/* Pendaftaran Online */}
            <Link
              className="group relative flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 border border-transparent hover:bg-light-blue hover:border-primary-blue hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer"
              to="/pendaftaran-online"
            >
              <span className="badge-new absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                NEW
              </span>
              <div className="w-16 h-16 rounded-full bg-primary-blue text-white flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-primary-blue transition-colors">
                <FaMobileAlt className="text-3xl" />
              </div>
              <div className="font-primary font-semibold text-dark-blue text-lg">
                Pendaftaran Online
              </div>
            </Link>
          </div>
        </div>

        <section
          className="py-24 relative bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${sketchRsud})` }}
        >
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px]"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12 relative">
              <h2 className="text-4xl font-primary font-bold text-dark-blue inline-block relative after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1.5 after:bg-primary-blue after:rounded-full">
                Informasi Layanan
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 w-full">
              <button
                className={`flex items-center justify-center gap-2 px-4 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full transition-all w-full sm:w-auto ${activeTab === "ruangan" ? "bg-primary-blue text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                onClick={() => setActiveTab("ruangan")}
              >
                <FaBed className="text-lg sm:text-xl shrink-0" />{" "}
                <span className="truncate">Info Ketersediaan Ruangan</span>
              </button>
              <button
                className={`flex items-center justify-center gap-2 px-4 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full transition-all w-full sm:w-auto ${activeTab === "dokter" ? "bg-primary-blue text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                onClick={() => setActiveTab("dokter")}
              >
                <FaUserMd className="text-lg sm:text-xl shrink-0" />{" "}
                <span className="truncate">Info Jadwal Dokter</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-[fadeIn_0.5s_ease-out]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200 text-sm font-primary font-bold text-gray-600 uppercase tracking-wider">
                      {activeTab === "ruangan" ? (
                        <>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            No
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Nama Ruangan
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Kapasitas
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Terisi
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Kosong
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Status
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            No
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Nama Dokter
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Spesialisasi
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Jadwal Praktik
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activeTab === "ruangan"
                      ? ruanganData.map((item) => (
                          <tr
                            key={item.no}
                            className="hover:bg-light-blue transition-colors text-sm md:text-base"
                          >
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              {item.no}
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 font-semibold text-gray-800 whitespace-nowrap">
                              {item.nama}
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              {item.kapasitas}
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              {item.terisi}
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 text-primary-blue font-bold whitespace-nowrap">
                              {item.kosong}
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-semibold ${item.status === "Tersedia" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      : dokterData.map((item) => (
                          <tr
                            key={item.no}
                            className="hover:bg-light-blue transition-colors text-sm md:text-base"
                          >
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              {item.no}
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 font-semibold text-gray-800 whitespace-nowrap">
                              {item.nama}
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              <span className="bg-light-blue text-primary-blue px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold">
                                {item.spesialisasi}
                              </span>
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              {item.jadwal}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Berita Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 relative">
              <h2 className="text-4xl font-primary font-bold text-dark-blue inline-block relative after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1.5 after:bg-primary-blue after:rounded-full">
                Berita Terkini
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  date: "12 Mei 2026",
                  title: "Peresmian Gedung Rawat Inap Baru RSUD Bagas Waras",
                  img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
                },
                {
                  date: "08 Mei 2026",
                  title:
                    "Edukasi Kesehatan: Pencegahan dan Penanganan Demam Berdarah",
                  img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=800",
                },
                {
                  date: "01 Mei 2026",
                  title: "Layanan Antar Obat ke Rumah Bagi Lansia",
                  img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
                },
              ].map((news, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
                >
                  <div className="h-52 overflow-hidden">
                    <img
                      src={news.img}
                      alt={`News ${idx}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm font-semibold text-primary-blue mb-2 block">
                      {news.date}
                    </span>
                    <h3 className="text-xl font-primary font-bold text-dark-blue mb-4 hover:text-primary-blue transition-colors cursor-pointer">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      RSUD Bagas Waras terus meningkatkan kualitas pelayanan
                      demi kenyamanan dan keselamatan pasien sesuai dengan
                      standar medis terkini...
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors">
                Lihat Semua Berita <FaArrowRight />
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-linear-to-b from-light-blue/60 to-white relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-blue/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/4"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 relative">
              <h2 className="text-4xl font-primary font-bold text-dark-blue inline-block relative after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1.5 after:bg-primary-blue after:rounded-full">
                Galeri Kegiatan
              </h2>
              <p className="mt-8 text-gray-500 max-w-2xl mx-auto text-[15px] md:text-[16px] leading-relaxed">
                Dokumentasi berbagai aktivitas medis, penyuluhan kesehatan
                masyarakat, dan momen-momen penting di lingkungan RSUD Bagas
                Waras Klaten.
              </p>
            </div>

            <div className="relative w-full overflow-hidden">
              <div
                ref={galleryRef}
                className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  // Total 3 set duplikat, satu set adalah 1/3 dari total panjang.
                  const setWidth = el.scrollWidth / 3;

                  // Jika sudah melewati set pertama (masuk terlalu dalam), kita teleportasi balik sebanyak diam-diam 1 set!
                  if (el.scrollLeft >= setWidth * 2) {
                    el.scrollLeft -= setWidth;
                  } else if (el.scrollLeft <= 0) {
                    el.scrollLeft += setWidth;
                  }
                }}
              >
                {/* Render 3 pasang gambar kembar agar loop transisi perputaran menjadi tidak terhingga & tidak ada jeda rewind */}
                {[...galleryImages, ...galleryImages, ...galleryImages].map(
                  (img, idx) => (
                    <div key={idx} className="shrink-0 snap-start w-64 md:w-80">
                      <div className="p-1 bg-white border border-gray-200 rounded shadow-sm">
                        <img
                          src={img}
                          alt={`Gallery ${idx}`}
                          className="w-full h-48 md:h-64 object-cover rounded-sm pointer-events-none"
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="text-center mt-12">
              <button className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors shadow-sm">
                Lihat Detail Galeri <FaArrowRight />
              </button>
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section className="py-16 bg-light-blue">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-primary font-bold text-dark-blue mb-10">
              Link Terkait
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {[
                { img: partnerPemkab, alt: "Pemerintah Kabupaten Klaten" },
                { img: partnerBpjsKes, alt: "BPJS Kesehatan" },
                { img: partnerBpjsKet, alt: "BPJS Ketenagakerjaan" },
                { img: partnerMaturibu, alt: "Matur Ibu" },
                { img: partnerAwasi, alt: "Awasi Corona" },
                { img: partnerCovid, alt: "Covid" },
              ].map((partner, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-white p-4 h-24 w-36 md:h-28 md:w-44 rounded-xl shadow-sm border border-transparent hover:border-primary-blue hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center"
                >
                  <img
                    src={partner.img}
                    alt={partner.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <EmergencyCall />
    </div>
  );
};

export default Home;
