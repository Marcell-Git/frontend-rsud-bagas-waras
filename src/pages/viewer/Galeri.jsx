import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  FaChevronRight,
  FaImages,
  FaChevronLeft,
  FaEye,
  FaSearch,
  FaTimes,
  FaDownload,
} from "react-icons/fa";
import Navbar from "../../components/viewer/Navbar";
import Footer from "../../components/viewer/Footer";
import EmergencyCall from "../../components/viewer/EmergencyCall";
import { getGaleri } from "../../api/content/galeri";

const Galeri = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 12,
  });

  const fetchGaleri = async (page = 1) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(true);
    try {
      const response = await getGaleri({
        page,
        per_page: pagination.perPage,
        search: searchTerm,
      });
      setImages(response.data?.data || []);
      setPagination({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        total: response.data.total,
        perPage: response.data.per_page,
      });
    } catch (error) {
      console.error("Gagal mengambil data galeri:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.lastPage) {
      fetchGaleri(page);
    }
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
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
                  <span className="ml-1 md:ml-2 text-primary-blue">
                    Galeri Kegiatan
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-primary font-extrabold text-dark-blue tracking-tight">
                Galeri <span className="text-primary-blue">Kegiatan</span>
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl text-lg leading-relaxed">
                Kumpulan dokumentasi kegiatan medis, fasilitas pelayanan, dan
                berbagai acara di lingkungan RSUD Bagas Waras Klaten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            /* Skeleton Loading */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-100 rounded-[32px] animate-pulse"
                ></div>
              ))}
            </div>
          ) : images.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((item) => (
                  <div
                    key={item.id}
                    className="group relative aspect-square rounded-[32px] overflow-hidden bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                    onClick={() => openLightbox(item)}
                  >
                    <img
                      src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                      alt={item.keterangan || "Galeri Image"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-dark-blue/80 via-dark-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between gap-3 text-white">
                        <div className="flex-1">
                          <p className="font-primary font-bold text-sm line-clamp-2 leading-tight">
                            {item.judul || "RSUD Bagas Waras Klaten"}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-primary-blue group-hover:border-transparent transition-all">
                          <FaEye size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
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
            <div className="text-center py-24 flex flex-col items-center">
              <div className="w-24 h-24 bg-light-blue rounded-[40px] flex items-center justify-center mb-6 shadow-inner">
                <FaImages className="text-4xl text-primary-blue" />
              </div>
              <h3 className="text-2xl font-primary font-bold text-dark-blue mb-2">
                Belum Ada Dokumentasi
              </h3>
              <p className="text-gray-500 max-w-sm">
                Maaf, kami tidak menemukan foto dokumentasi yang Anda cari.
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-dark-blue/95 backdrop-blur-md"
            onClick={closeLightbox}
          ></div>

          <div className="relative w-full max-w-5xl group animate-[zoomIn_0.3s_ease-out]">
            <button
              onClick={closeLightbox}
              className="absolute -top-16 right-0 p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all"
            >
              <FaTimes size={24} />
            </button>

            <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl relative">
              <img
                src={`${import.meta.env.VITE_STORAGE_URL}/${selectedImage.url_gambar}`}
                alt={selectedImage.keterangan}
                className="w-full h-auto max-h-[70vh] object-contain bg-slate-900"
              />
              <div className="p-8 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-black text-primary-blue uppercase tracking-widest mb-1">
                    Dokumentasi RSUD Bagas Waras
                  </p>
                  <h3 className="text-xl font-primary font-bold text-dark-blue">
                    {selectedImage.keterangan || "Kegiatan Operasional"}
                  </h3>
                </div>
                <a
                  href={`${import.meta.env.VITE_STORAGE_URL}/${selectedImage.url_gambar}`}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-dark-blue text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-primary-blue transition-all active:scale-95 shadow-xl shadow-dark-blue/20"
                >
                  <FaDownload /> Download Image
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default Galeri;
