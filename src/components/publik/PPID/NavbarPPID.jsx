import React, { useState } from "react";
import { Link } from "react-router";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const NavbarPPID = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex shrink-0 items-center">
            <Link
              to="/ppid"
              className="font-primary font-bold text-lg md:text-xl text-amber-400 leading-snug tracking-wide"
            >
              PPID PEMBANTU
              <span className="block text-sm md:text-base text-gray-400">
                RSUD BAGAS WARAS
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/ppid"
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              Home
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen1(true)}
              onMouseLeave={() => setIsDropdownOpen1(false)}
            >
              <button
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors py-2 focus:outline-none"
                onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
              >
                Tentang Kami{" "}
                <FaChevronDown
                  className={`text-[10px] transition-transform duration-300 ${isDropdownOpen1 ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right ${isDropdownOpen1 ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
              >
                <div className="py-2">
                  <Link
                    to="/tentang-kami/visi-misi"
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-amber-400 transition-colors"
                  >
                    Visi & Misi
                  </Link>
                  <Link
                    to="/tentang-kami/sejarah-landasan-hukum"
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-amber-400 transition-colors"
                  >
                    Sejarah & Landsan Hukum
                  </Link>
                  <Link
                    to="/tentang-kami/struktur-organisasi"
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-amber-400 transition-colors"
                  >
                    Struktur Organisasi
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen2(true)}
              onMouseLeave={() => setIsDropdownOpen2(false)}
            >
              <button
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors py-2 focus:outline-none"
                onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
              >
                Informasi Publik{" "}
                <FaChevronDown
                  className={`text-[10px] transition-transform duration-300 ${isDropdownOpen2 ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right ${isDropdownOpen2 ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
              >
                <div className="py-2">
                  <Link
                    to="/ppid/informasi-berkala"
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-amber-400 transition-colors"
                  >
                    Informasi Berkala
                  </Link>
                  <Link
                    to="/ppid/informasi-serta-merta"
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-amber-400 transition-colors"
                  >
                    Informasi Serta Merta
                  </Link>
                  <Link
                    to="/ppid/informasi-setiap-saat"
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-amber-400 transition-colors"
                  >
                    Informasi Setiap Saat
                  </Link>
                  <Link
                    to="/ppid/informasi-dikecualikan"
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-amber-400 transition-colors"
                  >
                    Informasi Yang Dikecualikan
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary-blue focus:outline-none p-2"
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

      <div
        className={`md:hidden transition-all duration-300 ${isMenuOpen ? "block border-t border-gray-100 shadow-inner bg-gray-50" : "hidden"}`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          <Link
            to="/"
            className="block px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:text-primary-blue hover:bg-white border border-transparent hover:border-blue-100 transition-all shadow-sm bg-white"
          >
            Home
          </Link>

          <div className="space-y-1 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary-blue transition-colors"
              onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
            >
              Informasi Publik
              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${isDropdownOpen2 ? "rotate-180 text-primary-blue" : ""}`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen2 ? "max-h-64 border-t border-gray-50" : "max-h-0"}`}
            >
              <div className="bg-gray-50/50 py-2">
                <Link
                  to="/ppid/informasi-berkala"
                  className="block px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-blue hover:bg-blue-50 transition-colors"
                >
                  Informasi Berkala
                </Link>
                <Link
                  to="/ppid/informasi-serta-merta"
                  className="block px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-blue hover:bg-blue-50 transition-colors"
                >
                  Informasi Serta Merta
                </Link>
                <Link
                  to="/ppid/informasi-setiap-saat"
                  className="block px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-blue hover:bg-blue-50 transition-colors"
                >
                  Informasi Setiap Saat
                </Link>
                <Link
                  to="/ppid/informasi-dikecualikan"
                  className="block px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-blue hover:bg-blue-50 transition-colors"
                >
                  Informasi Yang Dikecualikan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPPID;
