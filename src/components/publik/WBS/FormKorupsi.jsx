import React from "react";

const FormKorupsi = () => {
    return (
        <form className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">NAMA LENGKAP <span className="text-[#922c40]">*</span></label>
                    <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">EMAIL <span className="text-[#922c40]">*</span></label>
                    <input type="email" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">TELEPON <span className="text-[#922c40]">*</span></label>
                    <input type="tel" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">BUKTI PENDUKUNG <span className="text-[#922c40]">*</span></label>
                    <input type="file" className="w-full border border-gray-200 rounded-none text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:border-r file:border-gray-200 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">PERIHAL <span className="text-[#922c40]">*</span></label>
                    <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">PIHAK YANG TERLIBAT <span className="text-[#922c40]">*</span></label>
                    <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">URAIAN <span className="text-[#922c40]">*</span></label>
                <textarea rows="5" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" placeholder="Leave a comment here" required></textarea>
            </div>
            
            <div className="pt-2">
                <button type="submit" className="bg-[#922c40] hover:bg-[#7a2334] text-white font-semibold py-2.5 px-6 rounded-sm transition-colors text-sm uppercase tracking-wider shadow-sm">
                    Kirim Laporan
                </button>
                <p className="text-xs text-gray-500 mt-3 italic text-left">Keterangan : * harus diisi.</p>
            </div>
        </form>
    );
};

export default FormKorupsi;
