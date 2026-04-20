import React from "react";

const FormGratifikasi = () => {
    return (
        <form className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">NAMA PENERIMA <span className="text-[#922c40]">*</span></label>
                        <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">JABATAN PENERIMA <span className="text-[#922c40]">*</span></label>
                        <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">WAKTU <span className="text-[#922c40]">*</span></label>
                        <input type="date" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">NAMA PEMBERIAN <span className="text-[#922c40]">*</span></label>
                        <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                </div>
                
                <div className="flex flex-col space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">SPESIFIKASI PEMBERIAN <span className="text-[#922c40]">*</span></label>
                        <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">NILAI PEMBERIAN <span className="text-[#922c40]">*</span></label>
                        <input type="text" className="w-full border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm" required />
                    </div>
                    <div className="flex-grow flex flex-col">
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">URAIAN <span className="text-[#922c40]">*</span></label>
                        <textarea className="w-full flex-grow border border-gray-200 rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:border-[#922c40] focus:ring-1 focus:ring-[#922c40] transition-colors bg-white shadow-sm min-h-[120px] md:min-h-[148px]" placeholder="Leave a comment here" required></textarea>
                    </div>
                </div>
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

export default FormGratifikasi;
