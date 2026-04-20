import React, { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import logoWBS from "../../../assets/publik/WBS/logo-wbs.png";

const NavbarWBS = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="bg-white w-full border-b border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full flex justify-center">
          <img
            src={logoWBS}
            alt="Logo WBS RSUD Bagas Waras"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>
      </div>

      <nav className="bg-[#922c40] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between md:justify-center items-center h-14 md:h-16">
            <div className="hidden md:flex items-center space-x-12">
              <Link
                to="/wbs"
                className="text-white/90 hover:text-white font-bold transition-all hover:scale-105"
              >
                Home
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1.5 text-white/90 hover:text-white font-bold transition-all hover:scale-105 py-2 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Tentang Kami{" "}
                  <FaChevronDown
                    className={`text-[10px] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right ${isDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
                >
                  <div className="py-2">
                    <Link
                      to="/tentang-kami/visi-misi"
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-blue transition-all"
                    >
                      Visi & Misi
                    </Link>
                    <Link
                      to="/tentang-kami/sejarah-landasan-hukum"
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-blue transition-all"
                    >
                      Sejarah & Landasan Hukum
                    </Link>
                    <Link
                      to="/tentang-kami/struktur-organisasi"
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-blue transition-all"
                    >
                      Struktur Organisasi
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                to="/wbs/pengaduan"
                className="text-white/90 hover:text-white font-bold transition-all hover:scale-105"
              >
                Formulir Whistle Blowing
              </Link>
            </div>

            <div className="md:hidden text-white font-bold tracking-widest text-sm uppercase">
              MENU WBS
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white/80 hover:text-white focus:outline-none p-2"
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

        {/* Menu Mobile */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMenuOpen
              ? "block border-t border-white/10 shadow-inner bg-[#7a2334]"
              : "hidden"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/wbs"
              className="block px-4 py-3 rounded-lg text-base font-semibold text-white/90 hover:text-white hover:bg-white/10 border border-transparent transition-all shadow-sm"
            >
              Home
            </Link>
            <Link
              to="/wbs/pengaduan"
              className="block px-4 py-3 rounded-lg text-base font-semibold text-white/90 hover:text-white hover:bg-white/10 border border-transparent transition-all shadow-sm"
            >
              Formulir Whistle Blowing
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarWBS;
