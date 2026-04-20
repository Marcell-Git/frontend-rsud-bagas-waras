import { Link } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

import logoRSUD from "../../../assets/publik/ZI/logo-rsud.png";

const NavbarZI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTentangKamiOpen, setIsTentangKamiOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Left */}
            <div className="flex shrink-0 items-center">
              <Link
                to="/zonaintegritas"
                className="flex items-center gap-3 group"
              >
                <img
                  src={logoRSUD}
                  alt="Logo RSUD Bagas Waras"
                  className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform"
                />
                <div className="font-primary font-bold text-base md:text-lg text-white leading-tight tracking-wide">
                  RSUD Bagas Waras
                  <span className="block text-sm text-emerald-500 font-medium">
                    Kabupaten Klaten
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu Right */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/zona-integritas"
                className="text-white hover:text-emerald-500 font-semibold uppercase text-sm tracking-wide transition-colors"
              >
                Home
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-white hover:text-emerald-500 font-semibold uppercase text-sm tracking-wide transition-colors py-6"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Tentang Kami{" "}
                  <FaChevronDown
                    className={`text-xs ml-1 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute left-0 top-full w-60 bg-white rounded-b-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top border-t-4 border-emerald-500 z-50 ${isDropdownOpen ? "block" : "hidden"}`}
                >
                  <div className="py-2">
                    <Link
                      to="/tentang-kami/visi-misi"
                      className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-500 hover:text-white transition-colors"
                    >
                      Visi & Misi
                    </Link>
                    <Link
                      to="/tentang-kami/sejarah-landasan-hukum"
                      className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-500 hover:text-white transition-colors"
                    >
                      Sejarah & Landasan Hukum
                    </Link>
                    <Link
                      to="/tentang-kami/struktur-organisasi"
                      className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-500 hover:text-white transition-colors"
                    >
                      Struktur Organisasi
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                to="/zona-integritas/kegiatan"
                className="text-white hover:text-emerald-500 font-semibold uppercase text-sm tracking-wide transition-colors"
              >
                Kegiatan WBK/WBBM
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-amber-400 focus:outline-none p-2 transition-colors"
              >
                {isMenuOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <FaBars className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMenuOpen
              ? "block border-t border-emerald-500 shadow-inner bg-gray-900"
              : "hidden"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/zonaintegritas/kegiatan"
              className="block px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              Kegiatan WBK/WBBM
            </Link>
            <Link
              to="/zonaintegritas"
              className="block px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              Home
            </Link>

            <div>
              <button
                onClick={() => setIsTentangKamiOpen(!isTentangKamiOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              >
                Tentang Kami
                <FaChevronDown
                  className={`text-xs transition-transform ${isTentangKamiOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`${isTentangKamiOpen ? "block" : "hidden"} bg-blue-900/40 rounded-lg mt-1 overflow-hidden`}
              >
                <Link
                  to="/zonaintegritas/visi-misi"
                  className="block px-8 py-3 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                >
                  Visi & Misi
                </Link>
                <Link
                  to="/zonaintegritas/sejarah-landasan-hukum"
                  className="block px-8 py-3 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                >
                  Sejarah & Landasan Hukum
                </Link>
                <Link
                  to="/zonaintegritas/struktur-organisasi"
                  className="block px-8 py-3 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                >
                  Struktur Organisasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarZI;
