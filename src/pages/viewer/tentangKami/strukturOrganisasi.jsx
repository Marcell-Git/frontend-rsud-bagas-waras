import { useEffect, useState } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import { FaIdCard, FaTasks, FaHospital, FaCogs, FaImage } from "react-icons/fa";
import Header from "../../../components/viewer/Header";

import { getStrukturOrganisasi } from "../../../api/struktur/gambarSo";
import { getPegawai } from "../../../api/struktur/profilPegawai";
import { getTugasDivisi } from "../../../api/struktur/tugasPerDivisi";
import { getTugasRSUD } from "../../../api/struktur/tugasRSUD";
import { getFungsiRSUD } from "../../../api/struktur/fungsiRSUD";

const tabs = [
  { id: "profil", label: "Profil", icon: <FaIdCard /> },
  { id: "tugas-bidang", label: "Tugas per Bidang", icon: <FaTasks /> },
  { id: "tugas-rsud", label: "Tugas RSUD", icon: <FaHospital /> },
  { id: "fungsi-rsud", label: "Fungsi RSUD", icon: <FaCogs /> },
];

const StrukturOrganisasi = () => {
  const [activeTab, setActiveTab] = useState("profil");
  const [isLoading, setIsLoading] = useState(true);

  const [strukturOrganisasi, setStrukturOrganisasi] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [tugasDivisi, setTugasDivisi] = useState([]);
  const [tugasRSUD, setTugasRSUD] = useState([]);
  const [fungsiRSUD, setFungsiRSUD] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [soRes, pegawaiRes, divisiRes, tugasRes, fungsiRes] =
        await Promise.all([
          getStrukturOrganisasi(),
          getPegawai(),
          getTugasDivisi(),
          getTugasRSUD(),
          getFungsiRSUD(),
        ]);

      setStrukturOrganisasi(soRes.data?.data || soRes.data || []);
      setPegawai(pegawaiRes.data?.data || pegawaiRes.data || []);
      setTugasDivisi(divisiRes.data?.data || divisiRes.data || []);
      setTugasRSUD(tugasRes.data?.data || tugasRes.data || []);
      setFungsiRSUD(fungsiRes.data?.data || fungsiRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  // Get the latest SO Image
  const latestSOImage =
    strukturOrganisasi.length > 0 ? strukturOrganisasi[0].url_gambar : null;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary">
      <Navbar />

      <main className="grow">
        <Header
          subtitle="Tentang Kami"
          title="Struktur Organisasi"
          description="Bagan organisasi dan rincian tugas serta fungsi RSUD Bagas Waras sebagai penyedia layanan kesehatan."
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 md:-mt-20 relative z-20 pb-16 md:pb-24 space-y-8 md:space-y-12">
          {/* ===== BAGAN GAMBAR ===== */}
          <section className="bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12">
            <div className="text-center mb-10 md:mb-14">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-primary-blue rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Bagan Susunan Jabatan
              </span>
              <h2 className="text-2xl md:text-4xl font-primary font-bold text-dark-blue tracking-tight">
                Struktur Organisasi RSUD Bagas Waras
              </h2>
            </div>

            <div className="w-full overflow-hidden">
              {isLoading ? (
                <div className="w-full h-80 md:h-[500px] bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
                  <FaImage className="text-gray-300 text-6xl" />
                </div>
              ) : latestSOImage ? (
                <div className="w-full overflow-x-auto rounded-2xl bg-white p-2">
                  <img
                    src={`${import.meta.env.VITE_STORAGE_URL}/${latestSOImage}`}
                    alt="Struktur Organisasi RSUD Bagas Waras"
                    className="w-full h-auto object-contain transition-transform duration-500"
                    draggable={false}
                  />
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                  <FaImage className="text-gray-200 text-6xl mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">
                    Gambar struktur organisasi belum diunggah.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ===== TAB SECTION ===== */}
          <div className="bg-white rounded-3xl md:rounded-4xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-4 md:py-5 text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 border-b-2 shrink-0 ${
                    activeTab === tab.id
                      ? "border-primary-blue text-primary-blue bg-blue-50/50"
                      : "border-transparent text-gray-500 hover:text-primary-blue hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8 md:p-12">
              <div className="animate-[fadeIn_0.5s_ease-out]">
                {/* PROFIL */}
                {activeTab === "profil" && (
                  <div>
                    <div className="mb-8 md:mb-12">
                      <h3 className="text-2xl md:text-3xl font-primary font-bold text-dark-blue mb-3">
                        Pejabat Struktural
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base font-medium">
                        Daftar nama dan jabatan pimpinan RSUD Bagas Waras
                        Kabupaten Klaten
                      </p>
                    </div>

                    <div className="overflow-x-auto rounded-[32px] border border-gray-100 shadow-sm">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-linear-to-r from-dark-blue to-primary-blue text-white">
                            <th className="px-6 py-5 text-center font-black uppercase tracking-widest text-[10px] w-16">
                              No
                            </th>
                            <th className="px-6 py-5 text-left font-black uppercase tracking-widest text-[10px]">
                              Nama Pegawai
                            </th>
                            <th className="px-6 py-5 text-left font-black uppercase tracking-widest text-[10px]">
                              Jabatan
                            </th>
                            <th className="px-6 py-5 text-left font-black uppercase tracking-widest text-[10px]">
                              Pendidikan
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {isLoading ? (
                            Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                  <td className="px-6 py-6">
                                    <div className="h-4 bg-gray-100 rounded w-8 mx-auto"></div>
                                  </td>
                                  <td className="px-6 py-6">
                                    <div className="h-4 bg-gray-100 rounded w-48"></div>
                                  </td>
                                  <td className="px-6 py-6">
                                    <div className="h-4 bg-gray-100 rounded w-32"></div>
                                  </td>
                                  <td className="px-6 py-6">
                                    <div className="h-4 bg-gray-100 rounded w-40"></div>
                                  </td>
                                </tr>
                              ))
                          ) : pegawai.length > 0 ? (
                            pegawai.map((row, idx) => (
                              <tr
                                key={idx}
                                className="group hover:bg-blue-50/30 transition-colors"
                              >
                                <td className="px-6 py-5 text-center font-black text-primary-blue/40 group-hover:text-primary-blue transition-colors">
                                  {idx + 1}
                                </td>
                                <td className="px-6 py-5 font-bold text-dark-blue text-base">
                                  {row.nama}
                                </td>
                                <td className="px-6 py-5">
                                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[11px] font-bold uppercase tracking-wide group-hover:bg-primary-blue group-hover:text-white transition-all">
                                    {row.jabatan}
                                  </span>
                                </td>
                                <td className="px-6 py-5 text-gray-500 font-medium italic">
                                  {row.pendidikan || "-"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="4"
                                className="px-6 py-20 text-center text-gray-400 italic"
                              >
                                Data profil pegawai belum tersedia.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TUGAS PER BIDANG */}
                {activeTab === "tugas-bidang" && (
                  <div>
                    <div className="mb-8 md:mb-12">
                      <h3 className="text-2xl md:text-3xl font-primary font-bold text-dark-blue mb-3">
                        Tugas per Bidang & Bagian
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base font-medium">
                        Rincian pembagian tugas dan tanggung jawab masing-masing
                        unit kerja di RSUD
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {isLoading ? (
                        Array(4)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="h-32 bg-gray-100 rounded-3xl animate-pulse"
                            ></div>
                          ))
                      ) : tugasDivisi.length > 0 ? (
                        tugasDivisi.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-10 h-10 rounded-xl bg-primary-blue text-white flex items-center justify-center font-black text-sm shadow-lg group-hover:scale-110 transition-transform">
                                {idx + 1}
                              </div>
                              <h4 className="font-bold text-lg text-dark-blue leading-tight uppercase tracking-tight">
                                {item.nama_bidang || item.bidang}
                              </h4>
                            </div>
                            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                              {item.deskripsi_tugas || item.deskripsi}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                          <p className="text-gray-400 italic">
                            Data tugas per bidang belum tersedia.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TUGAS RSUD */}
                {activeTab === "tugas-rsud" && (
                  <div>
                    <div className="mb-8 md:mb-12">
                      <h3 className="text-2xl md:text-3xl font-primary font-bold text-dark-blue mb-3">
                        Tugas Pokok RSUD
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base font-medium">
                        Daftar kewajiban utama rumah sakit berdasarkan regulasi
                        daerah
                      </p>
                    </div>

                    <div className="space-y-4">
                      {isLoading ? (
                        Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="h-16 bg-gray-100 rounded-2xl animate-pulse"
                            ></div>
                          ))
                      ) : tugasRSUD.length > 0 ? (
                        tugasRSUD.map((tugas, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-5 p-5 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-lg transition-all"
                          >
                            <div className="mt-1 w-6 h-6 rounded-full bg-white text-primary-blue text-xs font-black flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                              {idx + 1}
                            </div>
                            <p className="text-gray-600 font-medium leading-relaxed">
                              {tugas.tugas_rsud || tugas.deskripsi || tugas}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                          <p className="text-gray-400 italic">
                            Data tugas RSUD belum tersedia.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* FUNGSI RSUD */}
                {activeTab === "fungsi-rsud" && (
                  <div>
                    <div className="mb-8 md:mb-12">
                      <h3 className="text-2xl md:text-3xl font-primary font-bold text-dark-blue mb-3">
                        Fungsi Rumah Sakit
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base font-medium">
                        Penjabaran fungsional pelayanan kesehatan RSUD Bagas
                        Waras
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {isLoading ? (
                        Array(6)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="h-20 bg-gray-100 rounded-2xl animate-pulse"
                            ></div>
                          ))
                      ) : fungsiRSUD.length > 0 ? (
                        fungsiRSUD.map((fungsi, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all border-l-4 border-l-primary-blue"
                          >
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-primary-blue text-xs font-black flex items-center justify-center shrink-0">
                              {idx + 1}
                            </div>
                            <p className="text-gray-600 font-bold leading-tight">
                              {fungsi.fungsi_rsud || fungsi.deskripsi || fungsi}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                          <p className="text-gray-400 italic">
                            Data fungsi RSUD belum tersedia.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default StrukturOrganisasi;
