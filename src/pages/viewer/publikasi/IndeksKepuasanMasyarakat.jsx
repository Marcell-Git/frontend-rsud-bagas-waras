import React, { useState, useMemo } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Header from "../../../components/viewer/Header";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import ImageModal from "../../../components/viewer/ImageModal";
import { FaChartBar, FaSearchPlus, FaCalendarAlt, FaChartPie, FaPoll } from "react-icons/fa";

// Sebagai fallback jika foto asli / img_name dari server belum berjalan 
import imgIkmPlaceholder from "../../../assets/publikasi/ikm_2023.png";

const IndeksKepuasanMasyarakat = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  // Data disimulasikan dari format riil Database / Backend
  const dbDataIkm = [
    {
      id: 22,
      img_name: "IKM_Januari_Maret_2024.jpg",
      title: "Indeks Kepuasan Masyarakat Bulan Januari - Maret 2024",
      waktu_upload: "2024-05-29 11:52:10"
    },
    {
      id: 21,
      img_name: "IKM_Januari-Maret_2024_page-0001.jpg",
      title: "Indeks Kepuasan Masyarakat Bulan Januari - Maret 2024",
      waktu_upload: "2024-05-21 03:23:53"
    },
    {
      id: 20,
      img_name: "IKM_TW_4_2023_page-0001.jpg",
      title: "Indeks Kepuasan Masyarakat Bulan Oktober - Desember 2023",
      waktu_upload: "2024-05-21 03:23:29"
    },
    {
      id: 17,
      img_name: "IKM_April-Juni_2023.jpeg",
      title: "Indeks Kepuasan Masyarakat Bulan April - Juni 2023",
      waktu_upload: "2023-07-05 07:31:15"
    },
    {
      id: 16,
      img_name: "IKM_Jan-Mar_2023.jpeg",
      title: "Indeks Kepuasan Masyarakat Bulan Januari - Maret 2023",
      waktu_upload: "2023-06-22 07:42:26"
    },
    {
      id: 13,
      img_name: "IKM_JUL-SEP_2022.jpg",
      title: "Indeks Kepuasan Masyarakat Bulan Juli - September 2022",
      waktu_upload: "2023-05-16 06:00:52"
    },
    {
      id: 12,
      img_name: "IKM_Jan-Maret_2022.jpg",
      title: "Indeks Kepuasan Masyarakat Bulan Januari - Maret 2022",
      waktu_upload: "2023-05-16 06:00:14"
    },
    {
      id: 11,
      img_name: "IKM_APRIL-JUNI_2021.jpg",
      title: "Indeks Kepuasan Masyarakat Bulan April - Juni 2021",
      waktu_upload: "2023-05-16 05:59:41"
    }
  ];

  // Helper untuk mendapatkan icon & label cantik (Triwulan) dari teks "title"
  const enrichData = (records) => {
    return records.map((item, index) => {
      // Menentukan Tahun dari waktu_upload
      const tahun = new Date(item.waktu_upload).getFullYear();
      
      // Deteksi Triwulan dari Judul
      let triwulan = "";
      const lowerTitle = item.title.toLowerCase();
      if (lowerTitle.includes("januari - maret")) triwulan = "Triwulan I";
      else if (lowerTitle.includes("april - juni")) triwulan = "Triwulan II";
      else if (lowerTitle.includes("juli - september")) triwulan = "Triwulan III";
      else if (lowerTitle.includes("oktober - desember")) triwulan = "Triwulan IV";

      return {
        ...item,
        badgeLabel: triwulan ? `${triwulan} - ${tahun}` : `Tahun ${tahun}`,
        icon: index % 2 === 0 ? <FaChartPie className="text-5xl text-cyan-500 drop-shadow-sm" /> : <FaPoll className="text-5xl text-cyan-500 drop-shadow-sm" />,
        // Gunakan imgUrl dari API jika sudah siap, misal: `http://localhost:8080/uploads/ikm/${item.img_name}`
        // Sementara ini fallback ke placeholder:
        image: imgIkmPlaceholder 
      };
    });
  };

  const processedData = useMemo(() => enrichData(dbDataIkm), []);

  const handleOpenModal = (item) => {
    setSelectedImage(item.image); // Ganti "item.image" menjadi URL API Anda nantinya
    setModalTitle(item.title);
  };

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Header
        subtitle="Publikasi"
        title="Indeks Kepuasan Masyarakat"
        description="Transparansi data hasil evaluasi dan penilaian tingkat kepuasan masyarakat terhadap mutu layanan di RSUD Bagas Waras secara berkala."
      />

      <main className="grow py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        {/* Title Section */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-cyan-100/50 rounded-full mb-5 shadow-sm border border-cyan-100">
               <FaChartBar className="text-4xl text-cyan-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 tracking-tight">Laporan Pemantauan IKM</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Pilih laporan di bawah ini untuk melihat infografis detail pencapaian dan penilaian kepuasan masyarakat dari waktu ke waktu sebagai bahan evaluasi komitmen layanan prima kami.
            </p>
        </div>

        {/* Data Grid with Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
          {processedData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center justify-between group max-w-sm mx-auto w-full"
            >
              <div className="flex flex-col items-center grow w-full mb-6">
                <div className="p-4 bg-cyan-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                </div>
                
                <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-cyan-600 bg-cyan-50 px-4 py-1.5 rounded-full mb-5 border border-cyan-100">
                  <FaCalendarAlt />
                  {item.badgeLabel}
                </div>

                <h3 className="text-sm md:text-base font-bold text-gray-800 leading-snug">
                  {item.title}
                </h3>
              </div>
              
              <button 
                onClick={() => handleOpenModal(item)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md shadow-cyan-600/20"
              >
                <FaSearchPlus className="text-lg" />
                Lihat Laporan
              </button>
            </div>
          ))}
        </div>
      </main>

      <ImageModal 
        isOpen={!!selectedImage} 
        imageUrl={selectedImage} 
        onClose={() => setSelectedImage(null)} 
        title={modalTitle} 
      />

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default IndeksKepuasanMasyarakat;
