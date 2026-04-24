import React from "react";
import { Link } from "react-router";
import { PenBox } from "lucide-react";
import logoRSUD from "../../../assets/logo-rsud.png";

import useTitle from "../../../hooks/useTitle";

const Pengaduan = () => {
  useTitle("Pengaduan");
  
  return (
    <div className="min-h-screen flex flex-col font-secondary text-gray-800 bg-white">
      {/* Navbar Modern Minimalis */}
      <nav className="bg-amber-500 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo RSUD Kiri */}
            <div className="shrink-0">
              <img src={logoRSUD} alt="RSUD Bagas Waras" className="h-10" />
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-6 sm:gap-8 text-sm sm:text-base font-semibold">
              <Link to="/" className="hover:text-amber-100 transition-colors">
                Beranda
              </Link>
              <Link
                to="/pengaduan"
                className="border-b-2 border-white pb-1 text-white"
              >
                Laporkan Pengaduan
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-slate-50">
        {/* Subtle Dots Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#f59e0b 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 animate-[fadeIn_0.6s_ease-out]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 mb-6 leading-snug tracking-tight">
            Layanan Pengaduan Masyarakat <br className="hidden sm:block" />
            <span className="text-amber-500">RSUD Bagas Waras</span>
          </h1>

          <p className="text-gray-500 text-base sm:text-lg mb-12 max-w-2xl leading-relaxed">
            Anda dipersilakan untuk melaporkan pengaduan terhadap layanan RSUD
            Bagas Waras. Kritik dan saran Anda akan sangat membantu dalam
            perbaikan pelayanan kami secara berkelanjutan.
          </p>

          {/* Main Icon */}
          <div className="mb-12 relative group">
            <div className="absolute inset-0 bg-amber-200 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative bg-white p-8 sm:p-10 rounded-3xl border border-amber-100 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
              <PenBox
                className="w-24 h-24 sm:w-32 sm:h-32 text-amber-500"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Call to Action Button */}
          <button className="bg-amber-500 hover:bg-amber-600 text-white text-lg sm:text-xl font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 active:scale-95 flex items-center justify-center w-full sm:w-auto">
            <Link to="/pengaduan/form">Laporkan Pengaduan</Link>
          </button>
        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="bg-[#1f2937] text-gray-400 text-center py-6 text-sm mt-auto">
        <p>Copyright 2026 © IT RSUD BAGAS WARAS</p>
      </footer>
    </div>
  );
};

export default Pengaduan;
