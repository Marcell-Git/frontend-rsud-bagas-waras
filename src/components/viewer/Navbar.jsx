import React, { useState } from"react";
import { Link, useLocation } from"react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaChevronDown,
  FaPhoneAlt,
} from"react-icons/fa";
import logoRsud from"../../assets/logo-rsud.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const pathname = location.pathname;

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const isActiveMenu = (path) => {
    if (path ==="/") return pathname ==="/";
    if (path ==="/publik") {
      return pathname.startsWith("/ppid") || 
             pathname.startsWith("/wbs") || 
             pathname.startsWith("/zona-integritas");
    }
    return pathname === path || pathname.startsWith(path +"/");
  };

  const activeNavClass =
"text-white relative lg:after:content-[''] lg:after:absolute lg:after:-bottom-1 lg:after:left-0 lg:after:w-full lg:after:h-0.5 lg:after:bg-white lg:after:rounded-full";
  const inactiveNavClass ="text-white/90 hover:text-white";

  return (
    <header className="w-full bg-white flex flex-col relative z-50">
      {/* Topbar - Desktop Only */}
      <div className="hidden lg:block border-b border-light-blue py-3 bg-light-blue w-full">
        <div className="max-w-7xl mx-auto px-6 flex justify-center lg:justify-between items-center">
          <Link to="/" className="flex items-center gap-4 cursor-pointer">
            <img
              src={logoRsud}
              alt="Logo RSUD Bagas Waras"
              className="h-14 w-auto object-contain hover:opacity-90 transition-opacity"
            />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {/* Emergency Call */}
            <a
              href="tel:02723392233"
              className="flex items-center gap-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 px-4 py-2 rounded-full transition-all group shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-red-600 group-hover:bg-white text-white group-hover:text-red-600 flex items-center justify-center transition-all shrink-0">
                <FaPhoneAlt className="text-xs" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-widest leading-none opacity-80">
                  Emergency Call
                </span>
                <span className="text-sm font-bold leading-tight">
                  (0272) 3392233
                </span>
              </div>
            </a>
            {/* Divider */}
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-gray-500 flex items-center justify-center border border-gray-200 hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all shadow-sm"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-gray-500 flex items-center justify-center border border-gray-200 hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all shadow-sm"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-gray-500 flex items-center justify-center border border-gray-200 hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all shadow-sm"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-gray-500 flex items-center justify-center border border-gray-200 hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all shadow-sm"
              >
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav className="w-full sticky top-0 transition-all duration-300 z-40 bg-primary-blue py-3">
        <div className="max-w-7xl mx-auto px-6 flex justify-between lg:justify-center items-center relative gap-4">
          {/* Logo - Mobile Only */}
          <Link to="/" className="lg:hidden shrink-0">
            <img
              src={logoRsud}
              alt="Logo RSUD Bagas Waras"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <ul
            className={`${isMobileMenuOpen ?"flex" :"hidden"} flex-col absolute top-full left-0 w-full bg-primary-blue pb-6 px-6 shadow-xl gap-4 z-50 lg:flex! lg:flex-row lg:static lg:w-auto lg:bg-transparent lg:pb-0 lg:px-0 lg:shadow-none lg:gap-7 items-start lg:items-center list-none m-0 text-[13px] xl:text-[14px] font-bold text-white uppercase tracking-wider`}
          >
            {/* Home */}
            <li>
              <Link
                to="/"
                className={`flex items-center gap-1 transition-colors py-2 ${isActiveMenu("/") ? activeNavClass : inactiveNavClass}`}
              >
                Home
              </Link>
            </li>

            {/* Tentang Kami */}
            <li className="relative group w-full lg:w-auto">
              <div
                className={`flex items-center justify-between lg:justify-start gap-1.5 transition-colors cursor-pointer py-2 w-full lg:w-auto ${isActiveMenu("/tentang-kami") ? activeNavClass : inactiveNavClass}`}
                onClick={() => toggleDropdown("tentang")}
              >
                Tentang Kami{""}
                <FaChevronDown
                  className={`text-[10px] mt-0.5 transition-transform ${activeDropdown ==="tentang" ?"rotate-180 lg:rotate-0" :""}`}
                />
              </div>
              <ul
                className={`lg:absolute static left-0 top-full pt-2 lg:pt-4 ${activeDropdown ==="tentang" ?"block" :"hidden"} lg:group-hover:block z-50 w-full lg:w-auto`}
              >
                <div className="bg-white shadow-xl min-w-[260px] rounded-lg overflow-hidden py-2">
                  <li>
                    <Link
                      to="/tentang-kami/visi-misi"
                      className={`block px-6 py-2.5 text-sm capitalize font-bold transition-colors ${pathname ==="/tentang-kami/visi-misi" ?"bg-light-blue text-primary-blue" :"text-gray-700 hover:bg-light-blue hover:text-primary-blue"}`}
                    >
                      Visi & Misi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tentang-kami/sejarah-landasan-hukum"
                      className={`block px-6 py-2.5 text-sm capitalize font-bold transition-colors ${pathname ==="/tentang-kami/sejarah-landasan-hukum" ?"bg-light-blue text-primary-blue" :"text-gray-700 hover:bg-light-blue hover:text-primary-blue"}`}
                    >
                      Sejarah & Landasan Hukum
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tentang-kami/struktur-organisasi"
                      className={`block px-6 py-2.5 text-sm capitalize font-bold transition-colors ${pathname ==="/tentang-kami/struktur-organisasi" ?"bg-light-blue text-primary-blue" :"text-gray-700 hover:bg-light-blue hover:text-primary-blue"}`}
                    >
                      Struktur Organisasi
                    </Link>
                  </li>
                </div>
              </ul>
            </li>

            {/* Pelayanan */}
            <li className="relative group w-full lg:w-auto">
              <div
                className={`flex items-center justify-between lg:justify-start gap-1.5 transition-colors cursor-pointer py-2 w-full lg:w-auto ${isActiveMenu("/pelayanan") ? activeNavClass : inactiveNavClass}`}
                onClick={() => toggleDropdown("pelayanan")}
              >
                Pelayanan{""}
                <FaChevronDown
                  className={`text-[10px] mt-0.5 transition-transform ${activeDropdown ==="pelayanan" ?"rotate-180 lg:rotate-0" :""}`}
                />
              </div>
              <ul
                className={`lg:absolute static left-0 top-full pt-2 lg:pt-4 ${activeDropdown ==="pelayanan" ?"block" :"hidden"} lg:group-hover:block z-50 w-full lg:w-auto`}
              >
                <div className="bg-white shadow-xl min-w-[240px] rounded-lg overflow-hidden py-2">
                  <li>
                    <Link
                      to="/pelayanan/igd"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      IGD
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pelayanan/rawat-jalan"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Rawat Jalan
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pelayanan/rawat-inap"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Rawat Inap
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pelayanan/layanan-informasi"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Layanan Informasi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pelayanan/tarif-pelayanan"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Tarif Pelayanan
                    </Link>
                  </li>
                </div>
              </ul>
            </li>

            {/* Publik */}
            <li className="relative group w-full lg:w-auto">
              <div
                className={`flex items-center justify-between lg:justify-start gap-1.5 transition-colors cursor-pointer py-2 w-full lg:w-auto ${isActiveMenu("/publik") ? activeNavClass : inactiveNavClass}`}
                onClick={() => toggleDropdown("publik")}
              >
                Informasi Publik
                <FaChevronDown
                  className={`text-[10px] mt-0.5 transition-transform ${activeDropdown ==="publik" ?"rotate-180 lg:rotate-0" :""}`}
                />
              </div>
              <ul
                className={`lg:absolute static left-0 top-full pt-2 lg:pt-4 ${activeDropdown ==="publik" ?"block" :"hidden"} lg:group-hover:block z-50 w-full lg:w-auto`}
              >
                <div className="bg-white shadow-xl min-w-[220px] rounded-lg overflow-hidden py-2">
                  <li>
                    <Link
                      to="/ppid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm uppercase font-bold transition-colors"
                    >
                      PPID
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/wbs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm uppercase font-bold transition-colors"
                    >
                      WBS
                    </a>
                  </li>
                  <li>
                    <a
                      href="/zona-integritas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm uppercase font-bold transition-colors"
                    >
                      WBK & WBBM
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.lapor.go.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm uppercase font-bold transition-colors"
                    >
                      SP4N Lapor
                    </a>
                  </li>
                </div>
              </ul>
            </li>

            {/* Publikasi */}
            <li className="relative group w-full lg:w-auto">
              <div
                className={`flex items-center justify-between lg:justify-start gap-1.5 transition-colors cursor-pointer py-2 w-full lg:w-auto ${isActiveMenu("/publikasi") ? activeNavClass : inactiveNavClass}`}
                onClick={() => toggleDropdown("publikasi")}
              >
                Publikasi{""}
                <FaChevronDown
                  className={`text-[10px] mt-0.5 transition-transform ${activeDropdown ==="publikasi" ?"rotate-180 lg:rotate-0" :""}`}
                />
              </div>
              <ul
                className={`lg:absolute static left-0 top-full pt-2 lg:pt-4 ${activeDropdown ==="publikasi" ?"block" :"hidden"} lg:group-hover:block z-50 w-full lg:w-auto`}
              >
                <div className="bg-white shadow-xl min-w-[320px] rounded-lg overflow-hidden py-2">
                  <li>
                    <a
                      href="/publikasi/standar-pelayanan"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Standar Pelayanan
                    </a>
                  </li>
                  <li>
                    <a
                      href="/publikasi/indeks-kepuasan-masyarakat"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Indeks Kepuasan Masyarakat
                    </a>
                  </li>
                  <li>
                    <a
                      href="/publikasi/laporan-tindak-lanjut-pengaduan"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Laporan Tindak Lanjut Pengaduan
                    </a>
                  </li>
                  <li>
                    <a
                      href="/publikasi/buletin"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Buletin
                    </a>
                  </li>
                  <li>
                    <a
                      href="/publikasi/informasi"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Informasi
                    </a>
                  </li>
                </div>
              </ul>
            </li>

            {/* Pengumuman */}
            <li>
              <a
                href="/pengumuman"
                className={`flex items-center gap-1 transition-colors py-2 ${isActiveMenu("/pengumuman") ? activeNavClass : inactiveNavClass}`}
              >
                Pengumuman
              </a>
            </li>

            {/* Inovasi */}
            <li className="relative group w-full lg:w-auto">
              <div
                className={`flex items-center justify-between lg:justify-start gap-1.5 transition-colors cursor-pointer py-2 w-full lg:w-auto ${isActiveMenu("/inovasi") ? activeNavClass : inactiveNavClass}`}
                onClick={() => toggleDropdown("inovasi")}
              >
                Inovasi{""}
                <FaChevronDown
                  className={`text-[10px] mt-0.5 transition-transform ${activeDropdown ==="inovasi" ?"rotate-180 lg:rotate-0" :""}`}
                />
              </div>
              <ul
                className={`lg:absolute static right-0 top-full pt-2 lg:pt-4 ${activeDropdown ==="inovasi" ?"block" :"hidden"} lg:group-hover:block z-50 w-full lg:w-auto`}
              >
                <div className="bg-white shadow-xl min-w-[200px] rounded-lg overflow-hidden py-2">
                  <li>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScWhXFeBsPHJx-SzgXJ8ztEcNaaXWmnidrVeLXZCe23wVEZdw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-light-blue hover:text-primary-blue text-sm capitalize font-bold transition-colors"
                    >
                      Layanan ASIK
                    </a>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
          <button
            className="lg:hidden text-white text-2xl focus:outline-none z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ?"✕" :"☰"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
