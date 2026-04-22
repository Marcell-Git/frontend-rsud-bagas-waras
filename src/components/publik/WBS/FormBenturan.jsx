import React, { useState } from "react";
import { toast } from "react-toastify";
import { createLaporanBenturKepentingan } from "../../../api/publik/wbs";

const FormBenturan = () => {

    const [formData, setFormData] = useState({
        nama: "",
        no_telp: "",
        satuan_kerja: "",
        uraian: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("nama", formData.nama);
            formDataToSend.append("no_telp", formData.no_telp);
            formDataToSend.append("satuan_kerja", formData.satuan_kerja);
            formDataToSend.append("uraian", formData.uraian);

            await createLaporanBenturKepentingan(formDataToSend);
            toast.success("Laporan berhasil dikirim!");
            setFormData({
                nama: "",
                no_telp: "",
                satuan_kerja: "",
                uraian: "",
            });
        } catch (error) {
            console.error("Error submit laporan:", error);
            toast.error("Gagal mengirim laporan. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 text-center">NAMA <span className="text-[#922c40]">*</span></label>
                    <input name="nama" value={formData.nama} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 text-center">NO. TELP/HP <span className="text-[#922c40]">*</span></label>
                    <input name="no_telp" value={formData.no_telp} onChange={handleChange} type="tel" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 text-center">SATUAN KERJA <span className="text-[#922c40]">*</span></label>
                    <input name="satuan_kerja" value={formData.satuan_kerja} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 text-center">URAIAN <span className="text-[#922c40]">*</span></label>
                    <textarea name="uraian" value={formData.uraian} onChange={handleChange} rows="5" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" placeholder="Leave a comment here" required></textarea>
                </div>
            </div>
            
            <div className="pt-2 flex flex-col items-center">
                <button type="submit" disabled={isLoading} className="bg-[#922c40] hover:bg-[#7a2334] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-sm transition-colors text-sm uppercase tracking-wider shadow-sm">
                    {isLoading ? "Mengirim..." : "Kirim Laporan"}
                </button>
                <p className="text-xs text-gray-500 mt-3 italic text-center">Keterangan : * harus diisi.</p>
            </div>
        </form>
    );
};

export default FormBenturan;
