import React from "react";
import { X } from "lucide-react";

const JadwalModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => !isSubmitting && onClose()}
      ></div>
      <form
        onSubmit={onSubmit}
        className="bg-white w-full max-w-md rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col"
      >
        <div className="p-8 border-b border-slate-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Tambah Jadwal Praktek
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Atur hari dan jam praktek dokter.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Hari Praktek
            </label>
            <select
              name="hari"
              value={formData.hari}
              onChange={onChange}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-blue/10 focus:border-primary-blue outline-none font-bold text-slate-700"
            >
              <option value="">Pilih Hari</option>
              {[
                "Senin",
                "Selasa",
                "Rabu",
                "Kamis",
                "Jumat",
                "Sabtu",
                "Minggu",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Jam Mulai
              </label>
              <input
                type="time"
                name="jam_mulai"
                value={formData.jam_mulai}
                onChange={onChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-primary-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Jam Selesai
              </label>
              <input
                type="time"
                name="jam_selesai"
                value={formData.jam_selesai}
                onChange={onChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-primary-blue"
              />
            </div>
          </div>
        </div>
        <div className="p-8 border-t border-slate-100 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all text-slate-900"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 bg-primary-blue text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary-blue/20"
          >
            {isSubmitting ? "Menyimpan..." : "Tambah Jadwal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JadwalModal;
