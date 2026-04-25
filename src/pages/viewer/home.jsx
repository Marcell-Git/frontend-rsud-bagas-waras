import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaClipboardList,
  FaRoute,
  FaExclamationCircle,
  FaBed,
  FaUserMd,
  FaArrowRight,
  FaMobileAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import sketchRsud from "../../assets/sketch_rsud_blue.png";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import EmergencyCall from "../../components/viewer/EmergencyCall";

import { getBannerActive } from "../../api/content/banner";
import { getGaleriGambar } from "../../api/content/galeri";
import { getAllDokter } from "../../api/pelayanan/jadwalDokter";
import { getBeritaTerbaru } from "../../api/content/berita";
import { getLinkEksternal } from "../../api/content/linkEksternal";
import SimRS from "../../api/SimRS";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("");
  
  const navigate = useNavigate();
  const { roomSummary, loading, error, refresh } = SimRS();
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryRef = useRef(null);
  const [activeTab, setActiveTab] = useState("ruangan");
  const [isScrolled, setIsScrolled] = useState(false);
  const [banners, setBanners] = useState([]);
  const [galeri, setGaleri] = useState([]);
  const [dokter, setDokter] = useState([]);
  const [berita, setBerita] = useState([]);
  const [linkEksternal, setLinkEksternal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      const response = await getBannerActive();
      setBanners(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGaleriGambar = async () => {
    try {
      const response = await getGaleriGambar();
      setGaleri(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDokter = async () => {
    try {
      const response = await getAllDokter();
      setDokter(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBeritaTerbaru = async () => {
    try {
      const response = await getBeritaTerbaru();
      setBerita(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLinkEksternal = async () => {
    try {
      const response = await getLinkEksternal();
      setLinkEksternal(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchBanner(),
        fetchGaleriGambar(),
        fetchDokter(),
        fetchBeritaTerbaru(),
        fetchLinkEksternal(),
      ]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const galleryTimer = setInterval(() => {
      if (galleryRef.current) {
        const itemWidth = galleryRef.current.children[0]?.clientWidth || 0;
        const gap = 16;

        galleryRef.current.scrollBy({
          left: itemWidth + gap,
          behavior: "smooth",
        });
      }
    }, 3000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(galleryTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const timer = setInterval(() => {
        setActiveSlide((prev) => (prev >= banners.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [banners]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev >= banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev <= 0 ? banners.length - 1 : prev - 1));
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };


  return (
    <div className="bg-gray-50 min-h-screen text-gray-700 font-secondary">
      <Navbar />

      {/* Hero / Carousel Section */}
      <main>
        {/* Carousel Wrapper with Max Width to make it smaller/framed on big screens */}
        <div className="w-full max-w-6xl mx-auto xl:px-8 xl:py-6 relative z-0">
          <div
            className={`relative w-full bg-slate-200 overflow-hidden group xl:rounded-3xl shadow-2xl border border-slate-100 aspect-video md:aspect-21/9 ${
              isLoading ? "animate-pulse" : ""
            }`}
          >
            {/* Ghost image defining aspect ratio */}
            {banners.length > 0 && (
              <img
                src={`${import.meta.env.VITE_STORAGE_URL}/${banners[0].url_gambar}`}
                alt=""
                className="w-full h-auto invisible pointer-events-none"
              />
            )}

            {banners.map((banner, index) => {
              const slideContent = (
                <>
                  <img
                    src={`${import.meta.env.VITE_STORAGE_URL}/${banner.url_gambar}`}
                    alt={banner.status}
                    className="carousel-bg absolute inset-0 w-full h-full object-cover z-0"
                  />
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
                </>
              );

              return (
                <div
                  key={banner.id}
                  className={`carousel-slide absolute inset-0 flex items-center justify-center ${
                    activeSlide === index ? "active" : ""
                  }`}
                >
                  {banner.link_url ? (
                    <a
                      href={banner.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 w-full h-full block cursor-pointer z-10"
                    >
                      {slideContent}
                    </a>
                  ) : (
                    slideContent
                  )}
                </div>
              );
            })}

            {/* Navigation Arrows */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/30 hover:bg-white text-white hover:text-primary-blue backdrop-blur-md transition-all duration-300 shadow-lg"
                  aria-label="Previous slide"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/30 hover:bg-white text-white hover:text-primary-blue backdrop-blur-md transition-all duration-300 shadow-lg"
                  aria-label="Next slide"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}

            {/* Navigation Dots */}
            {banners.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeSlide === idx
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-40 -mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border border-gray-100">
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
              <div className="overflow-x-auto max-h-80 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse relative">
                  <thead className="sticky top-0 z-10 bg-gray-50 shadow-sm">
                    <tr className="border-b-2 border-gray-200 text-sm font-primary font-bold text-gray-600 uppercase tracking-wider">
                      {activeTab === "ruangan" ? (
                        <>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            No
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Nama Ruangan
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Kelas
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
                            Hari Praktik
                          </th>
                          <th className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            Jam Praktik
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {isLoading || loading
                      ? [...Array(4)].map((_, idx) => (
                          <tr key={idx} className="animate-pulse">
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              <div className="h-4 bg-gray-200 rounded w-4"></div>
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              <div className="h-4 bg-gray-200 rounded w-32"></div>
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              <div className="h-4 bg-gray-200 rounded w-20"></div>
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              <div className="h-4 bg-gray-200 rounded w-20"></div>
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </td>
                            <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                              <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </td>
                            {activeTab === "ruangan" && (
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                              </td>
                            )}
                          </tr>
                        ))
                      : activeTab === "ruangan"
                        ? roomSummary.map((item, index) => (
                            <tr
                              key={index}
                              className="hover:bg-light-blue transition-colors text-sm md:text-base"
                            >
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                                {index + 1}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 font-semibold text-gray-800 whitespace-nowrap">
                                {item.room}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                                <span className="bg-light-blue text-primary-blue px-3 py-1 rounded-full text-xs font-bold">
                                  {item.class}
                                </span>
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                                {item.total}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                                {item.filled}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 text-primary-blue font-bold whitespace-nowrap">
                                {item.total - item.filled}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                                <span
                                  className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-semibold ${item.total - item.filled > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                >
                                  {item.total - item.filled > 0
                                    ? "Tersedia"
                                    : "Penuh"}
                                </span>
                              </td>
                            </tr>
                          ))
                        : dokter.map((item, index) => (
                            <tr
                              key={index}
                              className="hover:bg-light-blue transition-colors text-sm md:text-base"
                            >
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                                {index + 1}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 font-semibold text-gray-800 whitespace-nowrap">
                                {item.nama_dokter}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                                <span className="bg-light-blue text-primary-blue px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold">
                                  {item.spesialisasi}
                                </span>
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap">
                                {item.hari}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-5 whitespace-nowrap font-bold text-primary-blue">
                                {item.jam}
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
              {isLoading
                ? [...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                    >
                      <div className="h-52 bg-gray-200"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  ))
                : berita.map((news, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
                    >
                      <div className="h-52 overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_STORAGE_URL}/${news.url_gambar}`}
                          alt={`News ${idx}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-sm font-semibold text-primary-blue mb-2 block">
                          {formatDate(news.tanggal)}
                        </span>
                        <h3 className="text-xl font-primary font-bold text-dark-blue mb-4 hover:text-primary-blue transition-colors cursor-pointer">
                          {news.judul}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">{news.isi}</p>
                      </div>
                    </div>
                  ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/berita")}
                className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
              >
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
                  const setWidth = el.scrollWidth / 3;

                  if (el.scrollLeft >= setWidth * 2) {
                    el.scrollLeft -= setWidth;
                  } else if (el.scrollLeft <= 0) {
                    el.scrollLeft += setWidth;
                  }
                }}
              >
                {isLoading
                  ? [...Array(5)].map((_, idx) => (
                      <div
                        key={idx}
                        className="shrink-0 snap-start w-64 md:w-80"
                      >
                        <div className="p-1 bg-white border border-gray-200 rounded shadow-sm animate-pulse">
                          <div className="w-full h-48 md:h-64 bg-gray-200 rounded-sm"></div>
                        </div>
                      </div>
                    ))
                  : [...galeri, ...galeri, ...galeri].map((img, idx) => (
                      <div
                        key={idx}
                        className="shrink-0 snap-start w-64 md:w-80"
                      >
                        <div className="p-1 bg-white border border-gray-200 rounded shadow-sm">
                          <img
                            src={`${import.meta.env.VITE_STORAGE_URL}/${img.url_gambar}`}
                            alt={`Gallery ${idx}`}
                            className="w-full h-48 md:h-64 object-cover rounded-sm pointer-events-none"
                          />
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/galeri")}
                className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
              >
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
              {isLoading
                ? [...Array(5)].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-200 p-4 h-24 w-36 md:h-28 md:w-44 rounded-xl animate-pulse"
                    ></div>
                  ))
                : linkEksternal.map((partner, idx) => (
                    <a
                      key={idx}
                      href={partner.url_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-4 h-24 w-36 md:h-28 md:w-44 rounded-xl shadow-sm border border-transparent hover:border-primary-blue hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center"
                    >
                      <img
                        src={`${import.meta.env.VITE_STORAGE_URL}/${partner.url_gambar}`}
                        alt={partner.nama}
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
