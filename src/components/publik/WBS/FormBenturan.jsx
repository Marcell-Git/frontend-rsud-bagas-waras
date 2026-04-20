import React from "react";

const FormBenturan = () => {
    return (
        <form className="max-w-4xl mx-auto space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 text-center">NAMA <span className="text-[#922c40]">*</span></label>
                    <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 text-center">NO. TELP/HP <span className="text-[#922c40]">*</span></label>
                    <input type="tel" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 text-center">SATUAN KERJA <span className="text-[#922c40]">*</span></label>
                    <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 text-center">URAIAN <span className="text-[#922c40]">*</span></label>
                    <textarea rows="5" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" placeholder="Leave a comment here" required></textarea>
                </div>
            </div>
            
            <div className="pt-2 flex flex-col items-center">
                <button type="submit" className="bg-[#922c40] hover:bg-[#7a2334] text-white font-semibold py-2.5 px-6 rounded-sm transition-colors text-sm uppercase tracking-wider shadow-sm">
                    Kirim Laporan
                </button>
                <p className="text-xs text-gray-500 mt-3 italic text-center">Keterangan : * harus diisi.</p>
            </div>
        </form>
    );
};

export default FormBenturan;
