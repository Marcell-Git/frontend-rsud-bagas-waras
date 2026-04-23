import React, { useState, useEffect } from "react";
import NavbarPPID from "../../../components/publik/PPID/NavbarPPID";
import FooterPPID from "../../../components/publik/PPID/FooterPPID";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Data images
import carousel1 from "../../../assets/publik/PPID/ppid-new.png";
import carousel2 from "../../../assets/publik/PPID/pengaduan-new.png";

import icon1 from "../../../assets/publik/PPID/info-berkala-baru.png";
import icon2 from "../../../assets/publik/PPID/info-sertamerta-baru.png";
import icon3 from "../../../assets/publik/PPID/info-tiapsaat-baru.png";
import icon4 from "../../../assets/publik/PPID/info-kecuali-baru.png";

import useTitle from "../../../hooks/useTitle";

const PPID = () => {
  useTitle("PPID");
  
  // === CAROUSEL LOGIC ===
  const slides = [carousel1, carousel2];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // === CARDS DATA ===
  const informationCards = [
    {
      title: "Informasi Berkala",
      desc: "Berikut adalah daftar Informasi Berkala yang disediakan oleh PPID pembantu RSD Bagas Waras:",
      icon: icon1,
      link: "/publik/ppid/informasi-berkala",
    },
    {
      title: "Informasi Serta Merta",
      desc: "Berikut adalah daftar Informasi Serta Merta yang disediakan oleh PPID pembantu RSD Bagas Waras:",
      icon: icon2,
      link: "/publik/ppid/informasi-serta-merta",
    },
    {
      title: "Informasi Setiap Saat",
      desc: "Berikut adalah daftar Informasi Setiap Saat yang disediakan oleh PPID pembantu RSD Bagas Waras:",
      icon: icon3,
      link: "/publik/ppid/informasi-setiap-saat",
    },
    {
      title: "Informasi Dikecualikan",
      desc: "Berikut adalah daftar Informasi Dikecualikan yang disediakan oleh PPID pembantu RSD Bagas Waras:",
      icon: icon4,
      link: "/publik/ppid/informasi-dikecualikan",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary">
      <NavbarPPID />

      <main className="grow">
        {/* === CAROUSEL SECTION === */}
        <section className="relative w-full overflow-hidden bg-gray-900 group flex items-center justify-center">
          <img
            src={slides[0]}
            alt="carousel placeholder"
            className="w-full h-auto opacity-0 block pointer-events-none"
          />

          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          ))}

          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-amber-400 w-8"
                    : "bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? slides.length - 1 : prev - 1,
              )
            }
          >
            <FaChevronLeft className="mr-1" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1,
              )
            }
          >
            <FaChevronRight className="ml-1" />
          </button>
        </section>

        {/* === KARTU LAYANAN INFORMASI === */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <span className="block text-amber-500 font-bold tracking-widest uppercase text-sm mb-2">
              PPID RSUD Bagas Waras
            </span>
            <h2 className="text-3xl md:text-4xl font-primary font-bold text-gray-800 mb-6">
              Layanan Informasi Publik
            </h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Berikut adalah daftar klasifikasi informasi publik yang disediakan
              untuk mempermudah akses informasi bagi masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {informationCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border-b-4 border-b-transparent hover:border-b-amber-400 flex-1 h-full"
              >
                <div className="w-28 h-28 mb-8 rounded-full bg-amber-50 shadow-inner flex items-center justify-center p-6 group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold font-primary text-gray-800 mb-4">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8 grow">
                  {card.desc}
                </p>
                <a
                  href={card.link}
                  className="w-full py-3.5 px-4 bg-gray-50 hover:bg-gray-900 text-gray-700 hover:text-amber-400 font-bold rounded-2xl transition-all duration-300 border border-gray-100 hover:border-gray-900 flex items-center justify-center gap-2 mt-auto"
                >
                  Selengkapnya
                  <FaChevronRight className="text-[10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FooterPPID />
    </div>
  );
};

export default PPID;
