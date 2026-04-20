import { useEffect, useState } from "react";
import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import strukturBaru from "../../../assets/img/Struktur_baru.png";
import { FaIdCard, FaTasks, FaHospital, FaCogs } from "react-icons/fa";
import Header from "../../../components/viewer/Header";

// ===== DATA TAB =====

const tabs = [
  { id: "profil", label: "Profil", icon: <FaIdCard /> },
  { id: "tugas-bidang", label: "Tugas per Bidang", icon: <FaTasks /> },
  { id: "tugas-rsud", label: "Tugas RSUD", icon: <FaHospital /> },
  { id: "fungsi-rsud", label: "Fungsi RSUD", icon: <FaCogs /> },
];

const profilData = [
  {
    nama: "dr. H. Cahyono Widodo, M.Kes",
    jabatan: "Direktur",
    pendidikan: "S2 Kesehatan Masyarakat",
  },
  {
    nama: "dr. Agus Budi Santoso, Sp.PD",
    jabatan: "Wakil Direktur Pelayanan",
    pendidikan: "Spesialis Penyakit Dalam",
  },
  {
    nama: "Dra. Retno Hastuti, M.M",
    jabatan: "Wakil Direktur Umum & Keuangan",
    pendidikan: "S2 Manajemen",
  },
  {
    nama: "dr. Siti Rahayu, M.Kes",
    jabatan: "Kepala Bidang Pelayanan Medis",
    pendidikan: "S2 Kesehatan Masyarakat",
  },
  {
    nama: "Ns. Bambang Susilo, S.Kep",
    jabatan: "Kepala Bidang Keperawatan",
    pendidikan: "S1 Keperawatan",
  },
  {
    nama: "apt. Dian Permata, S.Farm",
    jabatan: "Kepala Bidang Penunjang Medis",
    pendidikan: "S1 Farmasi",
  },
  {
    nama: "Supriyanto, S.E., M.M",
    jabatan: "Kepala Bagian Umum & Kepegawaian",
    pendidikan: "S2 Manajemen",
  },
  {
    nama: "Ika Wahyuni, S.E., Ak",
    jabatan: "Kepala Bagian Keuangan",
    pendidikan: "S1 Akuntansi",
  },
  {
    nama: "Teguh Prasetyo, S.Kom",
    jabatan: "Kepala Bagian Perencanaan & Informasi",
    pendidikan: "S1 Sistem Informasi",
  },
];

const tugasBidangData = [
  {
    bagian: "Direktur",
    rincian:
      "Memimpin, mengkoordinasikan, dan mengendalikan seluruh kegiatan RSUD Bagas Waras sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.",
  },
  {
    bagian: "Wakil Direktur Pelayanan",
    rincian:
      "Membantu Direktur dalam mengkoordinasikan dan mengendalikan kegiatan di bidang pelayanan medis, keperawatan, dan penunjang medis.",
  },
  {
    bagian: "Wakil Direktur Umum & Keuangan",
    rincian:
      "Membantu Direktur dalam mengkoordinasikan dan mengendalikan kegiatan di bidang administrasi umum, kepegawaian, keuangan, dan perencanaan.",
  },
  {
    bagian: "Bidang Pelayanan Medis",
    rincian:
      "Melaksanakan perencanaan, pengkoordinasian, pembinaan, dan pengendalian kegiatan pelayanan medis rawat jalan, rawat inap, dan rawat darurat.",
  },
  {
    bagian: "Bidang Keperawatan",
    rincian:
      "Melaksanakan perencanaan, pengkoordinasian, pembinaan, dan pengendalian kegiatan asuhan keperawatan dan pelayanan keperawatan di seluruh unit.",
  },
  {
    bagian: "Bidang Penunjang Medis",
    rincian:
      "Melaksanakan perencanaan, pengkoordinasian, dan pengendalian kegiatan pelayanan penunjang medis meliputi farmasi, laboratorium, radiologi, dan rehabilitasi medis.",
  },
  {
    bagian: "Bagian Umum & Kepegawaian",
    rincian:
      "Melaksanakan pengelolaan administrasi umum, ketatausahaan, kepegawaian, logistik, rumah tangga, kehumasan, dan sarana prasarana RSUD.",
  },
  {
    bagian: "Bagian Keuangan",
    rincian:
      "Melaksanakan pengelolaan keuangan RSUD yang meliputi penyusunan anggaran, penatausahaan keuangan, akuntansi, dan pelaporan keuangan.",
  },
  {
    bagian: "Bagian Perencanaan & Informasi",
    rincian:
      "Melaksanakan penyusunan rencana program dan kegiatan, pengelolaan sistem informasi manajemen rumah sakit (SIMRS), dan pelaporan kinerja RSUD.",
  },
  {
    bagian: "Komite Medik",
    rincian:
      "Membantu Direktur dalam menyusun standar pelayanan medis, melakukan pembinaan etika profesi, dan mengatur kewenangan klinis tenaga medis.",
  },
  {
    bagian: "Komite Keperawatan",
    rincian:
      "Membantu Direktur dalam menyusun standar asuhan keperawatan, melakukan pembinaan etika profesi, dan mengatur kewenangan klinis tenaga keperawatan.",
  },
  {
    bagian: "Satuan Pengawas Internal (SPI)",
    rincian:
      "Membantu Direktur dalam melakukan pengawasan internal terhadap seluruh kegiatan operasional RSUD untuk memastikan kepatuhan terhadap peraturan yang berlaku.",
  },
];

const tugasRSUD = [
  "Melaksanakan upaya kesehatan secara berdaya guna dan berhasil guna dengan mengutamakan upaya penyembuhan dan pemulihan yang dilaksanakan secara serasi dan terpadu dengan upaya peningkatan dan pencegahan serta melaksanakan upaya rujukan.",
  "Menyelenggarakan pelayanan medis yang berkualitas sesuai standar pelayanan minimal rumah sakit yang ditetapkan oleh peraturan perundang-undangan.",
  "Menyelenggarakan pelayanan rawat jalan, rawat inap, rawat intensif, rawat darurat, bedah, rehabilitasi medis, dan tindakan medis lainnya.",
  "Menyelenggarakan pelayanan penunjang medis yang meliputi farmasi, laboratorium klinik, radiologi, gizi klinik, dan sterilisasi.",
  "Menyelenggarakan pelayanan keperawatan dan asuhan keperawatan yang bermutu kepada seluruh pasien.",
  "Melaksanakan pendidikan dan pelatihan sumber daya manusia kesehatan dalam rangka peningkatan kemampuan dalam memberikan pelayanan kesehatan.",
  "Melaksanakan administrasi umum dan keuangan sesuai ketentuan peraturan perundang-undangan yang berlaku.",
];

const fungsiRSUD = [
  "Penyelenggaraan pelayanan pengobatan dan pemulihan kesehatan sesuai standar pelayanan rumah sakit.",
  "Pemeliharaan dan peningkatan kesehatan perorangan melalui pelayanan kesehatan yang paripurna tingkat kedua dan ketiga sesuai kebutuhan medis.",
  "Penyelenggaraan pendidikan dan pelatihan sumber daya manusia dalam rangka peningkatan kemampuan dalam pemberian pelayanan kesehatan.",
  "Penyelenggaraan penelitian dan pengembangan serta penapisan teknologi bidang kesehatan dalam rangka peningkatan pelayanan kesehatan dengan memperhatikan etika ilmu pengetahuan bidang kesehatan.",
  "Penyelenggaraan pelayanan penunjang medis dan non medis guna mendukung mutu pelayanan kesehatan di rumah sakit.",
  "Penyelenggaraan sistem rujukan pelayanan kesehatan dari fasilitas kesehatan primer ke tingkat lanjutan secara terstruktur.",
  "Penyelenggaraan administrasi umum dan keuangan rumah sakit yang akuntabel, transparan, dan efisien sesuai ketentuan yang berlaku.",
];

const StrukturOrganisasi = () => {
  const [activeTab, setActiveTab] = useState("profil");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        {/* Hero Section */}
        <Header
          subtitle="Tentang Kami"
          title="Struktur Organisasi"
          description="Struktur organisasi RSUD Bagas Waras yang menjadi pedoman dalam memberikan pelayanan kesehatan."
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-20 pb-16 md:pb-24 space-y-6 md:space-y-8">
          {/* ===== BAGAN GAMBAR ===== */}
          <div className="bg-white rounded-3xl md:rounded-4xl shadow-xl border border-gray-100 p-6 md:p-10">
            <div className="text-center mb-6 md:mb-10">
              <span className="inline-block text-xs font-bold text-primary-blue uppercase tracking-widest mb-2">
                Susunan Jabatan
              </span>
              <h2 className="text-xl md:text-3xl font-primary font-bold text-dark-blue">
                RSUD Bagas Waras Kabupaten Klaten
              </h2>
              <div className="w-16 h-1 bg-primary-blue rounded-full mx-auto mt-4"></div>
            </div>

            <div className="w-full overflow-x-auto">
              <div className="min-w-[320px]">
                <img
                  src={strukturBaru}
                  alt="Struktur Organisasi RSUD Bagas Waras Kabupaten Klaten"
                  className="w-full h-auto object-contain rounded-xl"
                  draggable={false}
                />
              </div>
            </div>
          </div>

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
            <div className="p-6 md:p-10">
              {/* PROFIL */}
              {activeTab === "profil" && (
                <div>
                  <h3 className="text-lg md:text-2xl font-primary font-bold text-dark-blue mb-2">
                    Profil Pegawai RSUD Bagas Waras
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Daftar nama pejabat struktural RSUD Bagas Waras Kabupaten
                    Klaten
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-linear-to-r from-primary-blue to-light-blue text-white">
                          <th className="px-4 py-3 text-center font-bold w-10 rounded-tl-2xl">
                            No
                          </th>
                          <th className="px-5 py-3 text-left font-bold">
                            Nama Pegawai
                          </th>
                          <th className="px-5 py-3 text-left font-bold">
                            Jabatan
                          </th>
                          <th className="px-5 py-3 text-left font-bold rounded-tr-2xl">
                            Pendidikan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {profilData.map((row, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                          >
                            <td className="px-4 py-3.5 text-center font-black text-primary-blue">
                              {idx + 1}
                            </td>
                            <td className="px-5 py-3.5 font-semibold text-dark-blue">
                              {row.nama}
                            </td>
                            <td className="px-5 py-3.5 text-gray-600">
                              {row.jabatan}
                            </td>
                            <td className="px-5 py-3.5 text-gray-600">
                              {row.pendidikan}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TUGAS PER BIDANG */}
              {activeTab === "tugas-bidang" && (
                <div>
                  <h3 className="text-lg md:text-2xl font-primary font-bold text-dark-blue mb-2">
                    Tugas per Bidang / Bagian
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Rincian tugas masing-masing unit kerja RSUD Bagas Waras
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-linear-to-r from-primary-blue to-light-blue text-white">
                          <th className="px-4 py-3 text-center font-bold w-10 rounded-tl-2xl">
                            No
                          </th>
                          <th className="px-5 py-3 text-left font-bold w-1/3">
                            Bagian / Bidang
                          </th>
                          <th className="px-5 py-3 text-left font-bold rounded-tr-2xl">
                            Rincian Tugas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tugasBidangData.map((item, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-gray-50 align-top ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                          >
                            <td className="px-4 py-4 text-center font-black text-primary-blue">
                              {idx + 1}
                            </td>
                            <td className="px-5 py-4 font-bold text-dark-blue">
                              {item.bagian}
                            </td>
                            <td className="px-5 py-4 text-gray-600 leading-relaxed">
                              {item.rincian}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TUGAS RSUD */}
              {activeTab === "tugas-rsud" && (
                <div>
                  <h3 className="text-lg md:text-2xl font-primary font-bold text-dark-blue mb-2">
                    Tugas RSUD Bagas Waras
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Berdasarkan Perda Kabupaten Klaten Nomor 8 & 10 Tahun 2014
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-linear-to-r from-primary-blue to-light-blue text-white">
                          <th className="px-4 py-3 text-center font-bold w-12 rounded-tl-2xl">
                            No
                          </th>
                          <th className="px-5 py-3 text-left font-bold rounded-tr-2xl">
                            Tugas RSUD Bagas Waras
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tugasRSUD.map((tugas, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-gray-50 align-top ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                          >
                            <td className="px-4 py-4 text-center font-black text-primary-blue">
                              {idx + 1}
                            </td>
                            <td className="px-5 py-4 text-gray-600 leading-relaxed">
                              {tugas}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* FUNGSI RSUD */}
              {activeTab === "fungsi-rsud" && (
                <div>
                  <h3 className="text-lg md:text-2xl font-primary font-bold text-dark-blue mb-2">
                    Fungsi RSUD Bagas Waras
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Fungsi yang dijalankan RSUD Bagas Waras dalam melayani
                    masyarakat
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-linear-to-r from-primary-blue to-light-blue text-white">
                          <th className="px-4 py-3 text-center font-bold w-12 rounded-tl-2xl">
                            No
                          </th>
                          <th className="px-5 py-3 text-left font-bold rounded-tr-2xl">
                            Fungsi RSUD Bagas Waras
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fungsiRSUD.map((fungsi, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-gray-50 align-top ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                          >
                            <td className="px-4 py-4 text-center font-black text-primary-blue">
                              {idx + 1}
                            </td>
                            <td className="px-5 py-4 text-gray-600 leading-relaxed">
                              {fungsi}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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
