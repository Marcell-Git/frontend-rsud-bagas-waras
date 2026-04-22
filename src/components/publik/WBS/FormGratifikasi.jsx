import React, { useState } from "react";
import { toast } from "react-toastify";
import { createLaporanGratifikasi } from "../../../api/publik/wbs";

const FormGratifikasi = () => {
    const [formData, setFormData] = useState({
        nama_penerima: "",
        jabatan_penerima: "",
        spesifikasi_pemberian: "",
        nilai_pemberian: "",
        nama_pemberian: "",
        waktu: "",
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
            formDataToSend.append("nama_penerima", formData.nama_penerima);
            formDataToSend.append("jabatan_penerima", formData.jabatan_penerima);
            formDataToSend.append("spesifikasi_pemberian", formData.spesifikasi_pemberian);
            formDataToSend.append("nilai_pemberian", formData.nilai_pemberian);
            formDataToSend.append("nama_pemberian", formData.nama_pemberian);
            formDataToSend.append("waktu", formData.waktu);
            formDataToSend.append("uraian", formData.uraian);

            await createLaporanGratifikasi(formDataToSend);
            toast.success("Laporan berhasil dikirim!");
            setFormData({
                nama_penerima: "",
                jabatan_penerima: "",
                spesifikasi_pemberian: "",
                nilai_pemberian: "",
                nama_pemberian: "",
                waktu: "",
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">NAMA PENERIMA <span className="text-[#922c40]">*</span></label>
                        <input name="nama_penerima" value={formData.nama_penerima} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">JABATAN PENERIMA <span className="text-[#922c40]">*</span></label>
                        <input name="jabatan_penerima" value={formData.jabatan_penerima} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">WAKTU <span className="text-[#922c40]">*</span></label>
                        <input name="waktu" value={formData.waktu} onChange={handleChange} type="date" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">NAMA PEMBERIAN <span className="text-[#922c40]">*</span></label>
                        <input name="nama_pemberian" value={formData.nama_pemberian} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                </div>
                
                <div className="flex flex-col space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">SPESIFIKASI PEMBERIAN <span className="text-[#922c40]">*</span></label>
                        <input name="spesifikasi_pemberian" value={formData.spesifikasi_pemberian} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">NILAI PEMBERIAN <span className="text-[#922c40]">*</span></label>
                        <input name="nilai_pemberian" value={formData.nilai_pemberian} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div className="flex-grow flex flex-col">
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">URAIAN <span className="text-[#922c40]">*</span></label>
                        <textarea name="uraian" value={formData.uraian} onChange={handleChange} className="w-full flex-grow border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm min-h-[120px] md:min-h-[148px]" placeholder="Leave a comment here" required></textarea>
                    </div>
                </div>
            </div>
            
            <div className="pt-2">
                <button type="submit" disabled={isLoading} className="bg-[#922c40] hover:bg-[#7a2334] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-sm transition-colors text-sm uppercase tracking-wider shadow-sm">
                    {isLoading ? "Mengirim..." : "Kirim Laporan"}
                </button>
                <p className="text-xs text-gray-500 mt-3 italic text-left">Keterangan : * harus diisi.</p>
            </div>
        </form>
    );
};

export default FormGratifikasi;
