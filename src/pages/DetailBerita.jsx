import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import {
  FaCalendarAlt,
  FaUser,
  FaChevronRight,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "../components/viewer/Navbar";
import Footer from "../components/viewer/Footer";
import EmergencyCall from "../components/viewer/EmergencyCall";
import { getBeritaById, getBeritaTerbaru } from "../api/content/berita";

const DetailBerita = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [newsRes, latestRes] = await Promise.all([
          getBeritaById(id),
          getBeritaTerbaru(),
        ]);
        setNews(newsRes.data);
        setLatestNews(latestRes.data);
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
        toast.error("Gagal memuat berita");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = news?.judul || "Berita RSUD Bagas Waras";

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast.success("Link berhasil disalin!");
        return;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 animate-pulse">
          <div className="h-4 bg-gray-100 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="h-10 bg-gray-100 rounded w-full mb-4"></div>
              <div className="h-10 bg-gray-100 rounded w-3/4 mb-8"></div>
              <div className="h-4 bg-gray-100 rounded w-1/3 mb-10"></div>
              <div className="aspect-video bg-gray-100 rounded-3xl mb-10"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <EmergencyCall />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-primary font-bold text-dark-blue mb-4">
            Berita Tidak Ditemukan
          </h1>
          <p className="text-gray-500 mb-8 text-lg">
            Maaf, konten yang Anda cari telah dihapus atau dipindahkan.
          </p>
          <Link
            to="/berita"
            className="bg-primary-blue text-white px-8 py-3 rounded-2xl font-bold hover:bg-dark-blue transition-all"
          >
            Kembali ke Berita
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-secondary text-gray-700">
      <Navbar />

      <main className="pt-14 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <nav className="text-sm font-medium" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-primary-blue transition-colors"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <FaChevronRight className="w-3 h-3 text-gray-400 mx-1" />
                    <Link
                      to="/berita"
                      className="text-gray-500 hover:text-primary-blue transition-colors"
                    >
                      Berita
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <FaChevronRight className="w-3 h-3 text-gray-400 mx-1" />
                    <span className="text-primary-blue line-clamp-1 max-w-[200px] md:max-w-xs">
                      {news.judul}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <Link
              to="/berita"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary-blue hover:text-dark-blue transition-colors group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
              Kembali ke List Berita
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <header className="mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-primary font-extrabold text-dark-blue leading-tight mb-6">
                  {news.judul}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400 border-b border-gray-100 pb-8">
                  <div className="flex items-center gap-2 bg-light-blue/40 text-primary-blue px-3 py-1.5 rounded-lg border border-primary-blue/10">
                    <FaCalendarAlt />
                    {formatDate(news.tanggal)}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 hover:text-primary-blue transition-colors cursor-default">
                    <FaUser />
                    {news.penulis}
                  </div>
                </div>
              </header>

              {/* Feature Image */}
              <div className="mb-12">
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-primary-blue/5 border border-gray-100">
                  <img
                    src={`${import.meta.env.VITE_STORAGE_URL}/${news.url_gambar}`}
                    alt={news.judul}
                    className="w-full h-auto min-h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Body Text */}
              <div
                className="prose prose-lg prose-teal max-w-none text-gray-600 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: news.isi }}
              ></div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              {/* Other News */}
              <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-xl shadow-gray-50 flex flex-col gap-8">
                <h3 className="text-2xl font-primary font-bold text-dark-blue relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-primary-blue after:rounded-full">
                  Berita Terbaru
                </h3>

                <div className="space-y-8">
                  {latestNews
                    .filter((item) => item.id !== parseInt(id))
                    .slice(0, 5)
                    .map((item) => (
                      <Link
                        key={item.id}
                        to={`/berita/${item.id}`}
                        className="flex gap-4 group"
                      >
                        <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                          <img
                            src={`${import.meta.env.VITE_STORAGE_URL}/${item.url_gambar}`}
                            alt={item.judul}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[10px] font-black text-primary-blue uppercase tracking-widest mb-1">
                            {formatDate(item.tanggal)}
                          </span>
                          <h4 className="font-primary font-bold text-dark-blue line-clamp-2 leading-snug group-hover:text-primary-blue transition-colors">
                            {item.judul}
                          </h4>
                        </div>
                      </Link>
                    ))}
                </div>

                <Link
                  to="/berita"
                  className="w-full py-4 bg-light-blue text-primary-blue rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-blue hover:text-white transition-all border border-primary-blue/10"
                >
                  Lihat Semua Berita
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default DetailBerita;
