import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  FaCalendarAlt,
  FaUser,
  FaSearch,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaRegNewspaper,
} from "react-icons/fa";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import EmergencyCall from "../../components/viewer/EmergencyCall";
import { getBerita } from "../../api/content/berita";

const Berita = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 9,
  });

  const fetchBerita = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getBerita({
        page,
        per_page: pagination.perPage,
        search: searchTerm,
      });
      setNews(response.data?.data || []);
      setPagination({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        total: response.data.total,
        perPage: response.data.per_page,
      });
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.lastPage) {
      fetchBerita(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen font-secondary text-gray-700">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-14 pb-16 bg-linear-to-b from-light-blue/50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <nav
            className="flex mb-4 text-sm text-gray-500 font-medium"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="hover:text-primary-blue transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <FaChevronRight className="w-3 h-3 mx-1 text-gray-400" />
                  <span className="ml-1 md:ml-2 text-primary-blue">Berita</span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-primary font-extrabold text-dark-blue tracking-tight">
                Berita & <span className="text-primary-blue">Informasi</span>
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl text-lg leading-relaxed">
                Update terbaru seputar layanan medis, kegiatan edukasi
                kesehatan, dan perkembangan fasilitas di RSUD Bagas Waras
                Klaten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            /* Skeleton Loading */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(10)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="h-56 bg-gray-100"></div>
                  <div className="p-8 space-y-4">
                    <div className="h-4 bg-gray-100 rounded-full w-24"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-100 rounded-full w-full"></div>
                      <div className="h-6 bg-gray-100 rounded-full w-4/5"></div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="h-3 bg-gray-100 rounded-full w-full"></div>
                      <div className="h-3 bg-gray-100 rounded-full w-full"></div>
                      <div className="h-3 bg-gray-100 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-blue text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg shadow-lg">
                          News
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wide">
                        <div className="flex items-center gap-1.5 hover:text-primary-blue transition-colors">
                          <FaCalendarAlt className="text-primary-blue" />
                          {item.tanggal}
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-primary-blue transition-colors">
                          <FaUser className="text-primary-blue" />
                          {item.penulis || "Admin"}
                        </div>
                      </div>
                      <h2 className="text-xl font-primary font-bold text-dark-blue mb-4 group-hover:text-primary-blue transition-colors line-clamp-2">
                        {item.judul}
                      </h2>
                      <div
                        className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: item.isi }}
                      ></div>
                      <div className="mt-auto">
                        <Link
                          to={`/berita/${item.id}`}
                          className="inline-flex items-center gap-2 text-primary-blue font-bold text-sm group/btn hover:gap-3 transition-all"
                        >
                          Baca Selengkapnya
                          <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {pagination.lastPage > 1 && (
                <div className="mt-16 flex justify-center items-center gap-3">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="p-3 rounded-2xl border border-gray-200 hover:bg-primary-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    <FaChevronLeft />
                  </button>

                  <div className="flex gap-2">
                    {[...Array(pagination.lastPage)].map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-12 h-12 rounded-2xl font-bold transition-all shadow-sm ${
                            pagination.currentPage === pageNum
                              ? "bg-primary-blue text-white scale-110 shadow-lg shadow-primary-blue/30"
                              : "bg-white border border-gray-200 hover:border-primary-blue text-gray-500"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.lastPage}
                    className="p-3 rounded-2xl border border-gray-200 hover:bg-primary-blue hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-24 h-24 bg-light-blue rounded-[40px] flex items-center justify-center mb-6 shadow-inner">
                <FaRegNewspaper className="text-4xl text-primary-blue" />
              </div>
              <h3 className="text-2xl font-primary font-bold text-dark-blue mb-2">
                Tidak Ada Berita
              </h3>
              <p className="text-gray-500">
                Maaf, kami tidak menemukan berita yang Anda cari.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-8 text-primary-blue font-bold underline hover:text-dark-blue transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default Berita;
