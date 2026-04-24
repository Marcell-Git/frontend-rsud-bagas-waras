import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import logoRSUD from "../../../assets/logo-rsud.png";
import { toast } from "react-toastify";
import { createPengaduanMasyarakat } from "../../../api/pengaduan/pengaduanMasyarakat";

import useTitle from "../../../hooks/useTitle";

const FormPengaduan = () => {
  useTitle("Formulir Pengaduan");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    no_telp: "",
    email: "",
    isi_pengaduan: "",
    tanggal: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.no_telp || !formData.email || !formData.isi_pengaduan) {
      toast.error("Semua field harus diisi!");
      return;
    }

    setLoading(true);
    try {
      await createPengaduanMasyarakat(formData);
      toast.success("Pengaduan berhasil terkirim!");
      setFormData({
        no_telp: "",
        email: "",
        isi_pengaduan: "",
        tanggal: new Date().toISOString().split("T")[0],
      });
      // Optional: navigate back after success
      // setTimeout(() => navigate("/pengaduan"), 2000);
    } catch (error) {
      console.error("Error submitting pengaduan:", error);
      toast.error("Gagal mengirim pengaduan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col font-secondary text-gray-800 bg-slate-50">
      {/* Navbar Modern Minimalis */}
      <nav className="bg-amber-500 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo RSUD Kiri */}
            <div className="shrink-0">
              <img src={logoRSUD} alt="RSUD Bagas Waras" className="h-10" />
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-6 sm:gap-8 text-sm sm:text-base font-semibold">
              <Link to="/" className="hover:text-amber-100 transition-colors">
                Beranda
              </Link>
              <Link
                to="/pengaduan"
                className="border-b-2 border-white pb-1 text-white"
              >
                Laporkan Pengaduan
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Form */}
      <main className="flex-1 flex flex-col py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 animate-[fadeIn_0.5s_ease-out]">
          <div className="mb-10 border-b border-gray-100 pb-6">
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">
              Formulir Pengaduan
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Silakan isi data dan pesan pengaduan Anda pada kolom di bawah ini.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Field: No Telp */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label
                htmlFor="phone"
                className="md:w-1/4 font-semibold text-gray-700 text-lg md:text-right"
              >
                No Telp
              </label>
              <div className="md:w-3/4">
                <input
                  type="text"
                  id="phone"
                  name="no_telp"
                  value={formData.no_telp}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-inner"
                  placeholder="Masukkan nomor telepon aktif"
                  required
                />
              </div>
            </div>

            {/* Field: Email */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label
                htmlFor="email"
                className="md:w-1/4 font-semibold text-gray-700 text-lg md:text-right"
              >
                Email
              </label>
              <div className="md:w-3/4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-inner"
                  placeholder="Masukkan alamat email aktif"
                  required
                />
              </div>
            </div>

            {/* Field: Pengaduan */}
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
              <label
                htmlFor="message"
                className="md:w-1/4 pt-4 font-semibold text-gray-700 text-lg md:text-right"
              >
                Pengaduan
              </label>
              <div className="md:w-3/4">
                <textarea
                  id="message"
                  name="isi_pengaduan"
                  value={formData.isi_pengaduan}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-inner resize-y"
                  placeholder="Ketikkan detail pengaduan Anda..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Button Submit */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-8 pt-6">
              <div className="md:w-1/4 hidden md:block"></div>{" "}
              {/* Spacer buat menyamakan layout dengan input form */}
              <div className="md:w-3/4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold py-3.5 px-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Pengaduan"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="bg-[#1f2937] text-gray-400 text-center py-6 text-sm mt-auto">
        <p>Copyright 2026 © IT RSUD BAGAS WARAS</p>
      </footer>
    </div>
  );
};

export default FormPengaduan;
