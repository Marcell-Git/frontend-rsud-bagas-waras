import React, { useState, useEffect } from "react";
import NavbarPPID from "../../../components/publik/PPID/NavbarPPID";
import FooterPPID from "../../../components/publik/PPID/FooterPPID";
import hero from "../../../assets/publik/PPID/inf_kecuali.png";

import { getInformasiDikecualikan } from "../../../api/publik/berkasPpid";

const InformasiDikecuali = () => {
  const [ppidData, setPpidData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInformasiDikecualikan = async () => {
    setIsLoading(true);
    try {
      const response = await getInformasiDikecualikan();
      setPpidData(response.data || []);
    } catch (error) {
      console.error("Error fetching informasi dikecualikan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchInformasiDikecualikan();
  }, []);

  const groupData = (data) => {
    const preferredOrder = [
      "Profil",
      "LKJIP dan Laporan Tahunan",
      "Program dan Rencana Kerja (RKA, DPA, Renstra, Renja)",
      "KAK",
      "Laporan Kinerja",
      "Laporan Keuangan",
      "Peraturan dan Kebijakan",
      "Kode Kedaruratan",
      "Pengadaan",
      "Data Aset",
      "Standar Prosedur Pelayanan",
      "Pengaduan",
      "Lainnya",
    ];

    const groups = data.reduce((acc, item) => {
      const groupName = item.kelompok_dokumen || "Lainnya";
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(item);
      return acc;
    }, {});

    return Object.keys(groups)
      .sort((a, b) => {
        const indexA = preferredOrder.indexOf(a);
        const indexB = preferredOrder.indexOf(b);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
      })
      .map((key) => ({
        kategori: key,
        dokumen: groups[key],
      }));
  };

  const groupedData = groupData(ppidData);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary">
      <NavbarPPID />

      <main className="grow pb-24">
        {/* Hero Section */}
        <div className="w-full">
          <img
            src={hero}
            alt="Banner Informasi Dikecualikan"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500 font-medium tracking-wide">
                Memuat data...
              </p>
            </div>
          ) : groupedData.length > 0 ? (
            groupedData.map((section, idx) => (
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
                          <th className="py-4 px-6 md:px-8 font-semibold w-full border-b-4 border-amber-400">
                            NAMA DOKUMEN
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-600 text-sm md:text-base">
                        {section.dokumen.map((doc, dIdx) => (
                          <tr
                            key={dIdx}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-4 md:py-5 px-6 md:px-8 font-medium text-gray-800">
                              <a
                                href={`${import.meta.env.VITE_STORAGE_URL}/${doc.url_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-amber-500 transition-colors"
                              >
                                {doc.judul}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium italic">
                Data informasi dikecualikan belum tersedia.
              </p>
            </div>
          )}
        </div>
      </main>

      <FooterPPID />
    </div>
  );
};

export default InformasiDikecuali;
