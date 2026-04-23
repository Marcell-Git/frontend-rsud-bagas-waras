import React, { useState } from "react";
import NavbarWBS from "../../../components/publik/WBS/NavbarWBS";
import hero from "../../../assets/publik/WBS/hero-wbs.png"
import FooterWBS from "../../../components/publik/WBS/FooterWBS";

import FormKorupsi from "../../../components/publik/WBS/FormKorupsi";
import FormGratifikasi from "../../../components/publik/WBS/FormGratifikasi";
import FormBenturan from "../../../components/publik/WBS/FormBenturan";

import useTitle from "../../../hooks/useTitle";

const PengaduanWBS = () => {
  useTitle("Pengaduan WBS");
  
    const [activeTab, setActiveTab] = useState("korupsi");

    return (
        <div className="font-secondary min-h-screen flex flex-col">
            <NavbarWBS />
            
            <main className="grow">
                <div className="w-full">
                    <img
                        src={hero}
                        alt="Kawasan Zona Integritas WBS"
                        className="w-full h-auto object-cover"
                    />
                </div>

                <section className="bg-white py-12 md:py-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold font-primary tracking-wide">
                                <span className="text-[#922c40]">Persetujuan</span> <span className="text-gray-800">Pengaduan</span>
                            </h2>
                        </div>
                        
                        <div className="text-gray-600 leading-relaxed text-sm md:text-base space-y-4 mb-10 text-justify max-w-4xl mx-auto">
                            <p>
                                Whistleblower adalah seseorang yang mengadukan perbuatan dugaan tindakan korupsi atau gratifikasi atau benturan kepentingan yang terjadi di lingkungan RSUD Bagas Waras, baik itu Pegawai Negeri Sipil, Calon Pegawai Negeri Sipil dan pegawai lainnya yang bekerja di lingkungan RSUD Bagas Waras. Whistleblower mendapatkan hak perlindungan dan penghargaan serta berhak mengetahui tindak lanjut pengaduan.
                            </p>
                            <p>
                                Hak perlindungan berupa : kerahasiaan identitas, mendapat perlindungan dari tindakan administratif kepegawaian, perlindungan atas hak-hak saksi dan pelapor sebagaimana diatur dalam ketentuan peraturan perundang-undangan.
                            </p>
                            <p>
                                Dengan ini saya sebagai whistleblower RSUD Bagas Waras, melakukan pengaduan pada whistleblowing system dengan memberikan keterangan sebenar-benarnya, tanpa tekanan dari pihak manapun, tidak ada unsur menipu ataupun niatan memberikan keterangan palsu, bersedia memantau perkembangan pengaduan yang saya lakukan dan melakukan komunikasi dengan tim pengelola whistleblowing system apabila diperlukan.
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap justify-center border-b border-gray-200 mb-8 max-w-3xl mx-auto">
                            <button
                                type="button"
                                onClick={() => setActiveTab("korupsi")}
                                className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    activeTab === "korupsi"
                                        ? "text-[#922c40] border-b-2 border-[#922c40]"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Pengaduan Tindakan Korupsi
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("gratifikasi")}
                                className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    activeTab === "gratifikasi"
                                        ? "text-[#922c40] border-b-2 border-[#922c40]"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Lapor Gratifikasi
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("benturan")}
                                className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    activeTab === "benturan"
                                        ? "text-[#922c40] border-b-2 border-[#922c40]"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Lapor Benturan Kepentingan
                            </button>
                        </div>

                        {/* Form */}
                        {activeTab === "korupsi" && <FormKorupsi />}
                        {activeTab === "gratifikasi" && <FormGratifikasi />}
                        {activeTab === "benturan" && <FormBenturan />}
                    </div>
                </section>
            </main>
            
            <FooterWBS />
        </div>
    );
};

export default PengaduanWBS;