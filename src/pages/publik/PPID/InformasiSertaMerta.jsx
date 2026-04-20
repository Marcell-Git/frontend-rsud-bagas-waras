import React, { useState } from "react";
import NavbarPPID from "../../../components/publik/PPID/NavbarPPID";
import FooterPPID from "../../../components/publik/PPID/FooterPPID";
import hero from "../../../assets/publik/PPID/inf_sertamerta.png";

const dataSertaMerta = [
  {
    kategori: "Kode Kedaruratan",
    dokumen: [
      {
        nama: "Prosedur Pengaktifan Code Blue (Henti Jantung/Napas)",
        jenis: "Kode Kedaruratan",
      },
      {
        nama: "Prosedur Penanganan Code Red (Kebakaran)",
        jenis: "Kode Kedaruratan",
      },
      {
        nama: "Prosedur Evakuasi Code Black (Ancaman Bom)",
        jenis: "Kode Kedaruratan",
      },
      {
        nama: "Prosedur Code Pink (Penculikan Bayi/Anak)",
        jenis: "Kode Kedaruratan",
      },
      {
        nama: "Nomor Panggilan Darurat dan SPGDT",
        jenis: "Kode Kedaruratan",
      },
    ],
  },
  {
    kategori: "Lainnya",
    dokumen: [
      {
        nama: "Informasi Gangguan Aliran Listrik / Kegagalan Utilitas",
        jenis: "Lainnya",
      },
      {
        nama: "Standar Pelayanan Keluhan dan Komplain Bencana",
        jenis: "Lainnya",
      },
    ],
  },
];

const InformasiSertaMerta = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-secondary">
      <NavbarPPID />

      <main className="grow pb-24">
        {/* Hero Section */}
        <div className="w-full">
          <img
            src={hero}
            alt="Banner Informasi Serta Merta"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
          {dataSertaMerta.map((section, idx) => (
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

export default InformasiSertaMerta;
