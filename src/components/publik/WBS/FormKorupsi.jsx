import React, { useState, useRef } from "react";

import { createPengaduanKorupsi } from "../../../api/publik/wbs";
import { toast } from "react-toastify";

const FormKorupsi = () => {
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    no_telp: "",
    perihal: "",
    pihak_terkait: "",
    uraian: "",
    bukti: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nama_lengkap", formData.nama_lengkap);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("no_telp", formData.no_telp);
      formDataToSend.append("perihal", formData.perihal);
      formDataToSend.append("pihak_terkait", formData.pihak_terkait);
      formDataToSend.append("uraian", formData.uraian);
      if (formData.bukti) {
        formDataToSend.append("bukti", formData.bukti);
      }

      await createPengaduanKorupsi(formDataToSend);
      toast.success("Pengaduan berhasil dikirim!");
      setFormData({
        nama_lengkap: "",
        email: "",
        no_telp: "",
        perihal: "",
        pihak_terkait: "",
        uraian: "",
        bukti: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submit pengaduan:", error);
      toast.error("Gagal mengirim pengaduan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
            NAMA LENGKAP <span className="text-[#922c40]">*</span>
          </label>
          <input
            name="nama_lengkap"
            value={formData.nama_lengkap}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
            EMAIL <span className="text-[#922c40]">*</span>
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
            TELEPON <span className="text-[#922c40]">*</span>
          </label>
          <input
            name="no_telp"
            value={formData.no_telp}
            onChange={handleChange}
            type="tel"
            className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
            BUKTI PENDUKUNG <span className="text-[#922c40]">*</span>
          </label>
          <input
            name="bukti"
            onChange={handleChange}
            ref={fileInputRef}
            type="file"
            className="w-full border border-gray-200 rounded-none text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:border-r file:border-gray-200 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
            PERIHAL <span className="text-[#922c40]">*</span>
          </label>
          <input
            name="perihal"
            value={formData.perihal}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
            PIHAK YANG TERLIBAT <span className="text-[#922c40]">*</span>
          </label>
          <input
            name="pihak_terkait"
            value={formData.pihak_terkait}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
          URAIAN <span className="text-[#922c40]">*</span>
        </label>
        <textarea
          name="uraian"
          value={formData.uraian}
          onChange={handleChange}
          rows="5"
          className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm"
          placeholder="Leave a comment here"
          required
        ></textarea>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#922c40] hover:bg-[#7a2334] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-sm transition-colors text-sm uppercase tracking-wider shadow-sm"
        >
          {isLoading ? "Mengirim..." : "Kirim Laporan"}
        </button>
        <p className="text-xs text-gray-500 mt-3 italic text-left">
          Keterangan : * harus diisi.
        </p>
      </div>
    </form>
  );
};

export default FormKorupsi;
