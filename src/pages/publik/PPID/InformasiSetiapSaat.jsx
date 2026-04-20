import NavbarPPID from "../../../components/publik/PPID/NavbarPPID";
import FooterPPID from "../../../components/publik/PPID/FooterPPID";
import hero from "../../../assets/publik/PPID/inf_setiapsaat.png";

const dataSetiapSaat = [
  {
    kategori: "RKA, DPA, Renstra, Renja",
    dokumen: [
      {
        nama: "RENJA RSUD BAGAS WARAS 2023",
        jenis: "Program dan Rencana Kerja (RKA, DPA, Renstra, Renja)",
      },
      {
        nama: "Rencana_Bisnis_dan_Anggaran_Capaian_2020_dan_Target_Capaian_SPM_2021",
        jenis: "Program dan Rencana Kerja (RKA, DPA, Renstra, Renja)",
      },
    ],
  },
  {
    kategori: "Pengadaan",
    dokumen: [
      {
        nama: "Rencana_Pengadaan_Barang_Jasa_Tahun_2021",
        jenis: "Pengadaan",
      },
      {
        nama: "Rencana_Pengadaan_Barang_Jasa_Tahun_2022",
        jenis: "Pengadaan",
      },
    ],
  },
  {
    kategori: "Data Aset",
    dokumen: [
      {
        nama: "Daftar Aset RSUD Bagas Waras 2022",
        jenis: "Data Aset",
      },
      {
        nama: "Daftar Aset RSUD Bagas Waras 2021",
        jenis: "Data Aset",
      },
      {
        nama: "Daftar Aset RSUD Bagas Waras 2020",
        jenis: "Data Aset",
      },
      {
        nama: "Daftar Aset RSUD Bagas Waras 2019",
        jenis: "Data Aset",
      },
    ],
  },
  {
    kategori: "Standar Prosedur Layanan",
    dokumen: [
      {
        nama: "SPO Sterilisasi Rung Rawat Inap Rawat Jalan Atau Ruang Tindakan Medis lainnya",
        jenis: "Standar Prosedur Layanan",
      },
      {
        nama: "SPO Pengendalian dan Pencegahan Infeksi",
        jenis: "Standar Prosedur Layanan",
      },
      {
        nama: "SPO Pelayanan Farmasi",
        jenis: "Standar Prosedur Layanan",
      },
      {
        nama: "SPO Pelayanan Radiologi",
        jenis: "Standar Prosedur Layanan",
      },
    ],
  },
  {
    kategori: "Pengaduan",
    dokumen: [
      {
        nama: "Format Rekapitulasi Pengaduan Bulan Juni 2021",
        jenis: "Pengaduan",
      },
      {
        nama: "Format Rekapitulasi Pengaduan Bulan Juli 2021",
        jenis: "Pengaduan",
      },
      {
        nama: "Format Rekapitulasi Pengaduan Bulan Agustus 2021",
        jenis: "Pengaduan",
      },
      {
        nama: "Format Rekapitulasi Pengaduan Bulan September 2021",
        jenis: "Pengaduan",
      },
      {
        nama: "Format Rekapitulasi Pengaduan Bulan Oktober 2021",
        jenis: "Pengaduan",
      },
      {
        nama: "Format Rekapitulasi Pengaduan Bulan November 2021",
        jenis: "Pengaduan",
      },
      {
        nama: "Format Rekapitulasi Pengaduan Bulan Desember 2021",
        jenis: "Pengaduan",
      },
    ],
  },
  {
    kategori: "Lainnya",
    dokumen: [
      { nama: "Standar Pelayanan Kasir", jenis: "Lainnya" },
      { nama: "Standar Pelayanan Humas", jenis: "Lainnya" },
      { nama: "Standar Pelayanan Farmasi", jenis: "Lainnya" },
      { nama: "Standar Pelayanan Radiologi", jenis: "Lainnya" },
    ],
  },
];

const InformasiSetiapSaat = () => {
  return (
    <div>
      <NavbarPPID />
      <main className="grow">
        {/* Hero Section */}
        <div className="w-full">
          <img
            src={hero}
            alt="Banner Informasi Setiap Saat"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
          {dataSetiapSaat.map((section, idx) => (
            <div key={idx} className="mb-12 md:mb-16">
              {/* Category Title */}
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-primary uppercase tracking-wide">
                  {section.kategori}
                </h3>
                <div className="w-12 h-1 bg-amber-400 mx-auto mt-3 rounded-full"></div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden relative">
                <div className="overflow-auto max-h-[320px]">
                  <table className="w-full text-left border-collapse min-w-[600px] relative">
                    <thead className="sticky top-0 z-10 bg-gray-800 shadow-sm">
                      <tr className="text-white text-sm uppercase tracking-wider">
                        <th className="py-4 px-6 md:px-8 font-semibold w-2/3 border-b-4 border-amber-400">
                          NAMA DOKUMEN
                        </th>
                        <th className="py-4 px-6 md:px-8 font-semibold w-1/3 border-b-4 border-amber-400">
                          JENIS DOKUMEN
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600 text-sm md:text-base">
                      {section.dokumen.map((doc, dIdx) => (
                        <tr
                          key={dIdx}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 md:py-5 px-6 md:px-8 font-medium">
                            {doc.nama}
                          </td>
                          <td className="py-4 md:py-5 px-6 md:px-8">
                            {doc.jenis}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <FooterPPID />
    </div>
  );
};

export default InformasiSetiapSaat;
