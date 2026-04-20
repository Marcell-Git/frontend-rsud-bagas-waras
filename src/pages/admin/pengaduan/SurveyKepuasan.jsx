import React, { useState, useEffect } from "react";
import {
  Smile,
  ThumbsUp,
  HelpCircle,
  BarChart3,
  CalendarDays,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getSurveyKepuasan,
  getStatistik,
} from "../../../api/pengaduan/surveyKepuasan";
import Pagination from "../../../components/admin/Pagination";

const SurveyKepuasan = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const [statistik, setStatistik] = useState({});

  const fetchStatistik = async () => {
    try {
      const response = await getStatistik();
      setStatistik(response.data);
    } catch (error) {
      console.error("Error fetching statistik:", error);
      toast.error("Gagal mengambil data statistik");
    }
  };

  const fetchSurvey = async (page = 1) => {
    try {
      const response = await getSurveyKepuasan({
        page,
        per_page: pagination.itemsPerPage,
      });
      if (response.data && response.data.data) {
        setSurveyData(response.data.data);
        setPagination({
          ...pagination,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalItems: response.data.total,
        });
      } else {
        setSurveyData(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Error fetching survey:", error);
      toast.error("Gagal mengambil data survey kepuasan");
    }
  };

  useEffect(() => {
    fetchStatistik();
    fetchSurvey(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  // Menggunakan data dari state statistik yang diambil dari API
  const totalResponses = statistik.total || 0;
  const sangatInformatifCount = statistik.sangat_informatif || 0;
  const cukupInformatifCount = statistik.cukup_informatif || 0;
  const kurangLengkapCount = statistik.kurang_informatif || 0;

  const sangatInformatifPerc = Math.round(statistik.presentase_sangat_informatif || 0);
  const cukupInformatifPerc = Math.round(statistik.presentase_cukup_informatif || 0);
  const kurangLengkapPerc = Math.round(statistik.presentase_kurang_informatif || 0);

  const getBadgeStyle = (indikator) => {
    switch (indikator) {
      case "Sangat Informatif":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Cukup Informatif":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Informatif Namun Kurang Lengkap":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getIcon = (indikator) => {
    switch (indikator) {
      case "Sangat Informatif":
        return <ThumbsUp size={14} className="mr-1.5" />;
      case "Cukup Informatif":
        return <Smile size={14} className="mr-1.5" />;
      case "Informatif Namun Kurang Lengkap":
        return <HelpCircle size={14} className="mr-1.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100 font-sans">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[22px] bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner font-sans">
            <Smile size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              Survey Kepuasan Website RSUD
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic text-sm font-sans">
              "Pantau tingkat kepuasan publik terhadap layanan informasi RSUD."
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-sans">
        {/* Total Responden */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 flex flex-col justify-between font-sans transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-4 font-sans">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-sans">
              <Users size={20} />
            </div>
            <p className="font-bold text-slate-500 uppercase tracking-widest text-[10px] font-sans">
              Total Responden
            </p>
          </div>
          <div className="font-sans">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter font-sans">
              {totalResponses}
            </h2>
            <p className="text-slate-400 font-medium text-xs mt-1 font-sans">
              Umpan balik diterima
            </p>
          </div>
        </div>

        {/* Breakdown Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {/* Sangat Informatif */}
          <div className="bg-emerald-500 text-white rounded-[32px] shadow-lg shadow-emerald-500/20 p-6 flex flex-col justify-between relative overflow-hidden group font-sans">
            <div className="absolute -right-6 -top-6 text-emerald-400/30 group-hover:scale-110 transition-transform font-sans">
              <ThumbsUp size={120} />
            </div>
            <div className="relative z-10 flex items-center gap-2 mb-8 font-sans">
              <p className="font-bold uppercase tracking-widest text-[10px] text-emerald-50 font-sans">
                Sangat Informatif
              </p>
            </div>
            <div className="relative z-10 font-sans">
              <div className="flex items-end gap-3 font-sans">
                <h2 className="text-5xl font-black tracking-tighter font-sans">
                  {sangatInformatifPerc}%
                </h2>
                <p className="font-bold text-emerald-100 mb-1 font-sans text-xs">
                  ({sangatInformatifCount})
                </p>
              </div>
              <div className="w-full h-1.5 bg-emerald-600 rounded-full mt-4 overflow-hidden font-sans">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 font-sans"
                  style={{ width: `${sangatInformatifPerc}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Cukup Informatif */}
          <div className="bg-amber-500 text-white rounded-[32px] shadow-lg shadow-amber-500/20 p-6 flex flex-col justify-between relative overflow-hidden group font-sans">
            <div className="absolute -right-6 -top-6 text-amber-400/30 group-hover:scale-110 transition-transform font-sans">
              <Smile size={120} />
            </div>
            <div className="relative z-10 flex items-center gap-2 mb-8 font-sans">
              <p className="font-bold uppercase tracking-widest text-[10px] text-amber-50 font-sans">
                Cukup Informatif
              </p>
            </div>
            <div className="relative z-10 font-sans">
              <div className="flex items-end gap-3 font-sans">
                <h2 className="text-5xl font-black tracking-tighter font-sans">
                  {cukupInformatifPerc}%
                </h2>
                <p className="font-bold text-amber-100 mb-1 font-sans text-xs">
                  ({cukupInformatifCount})
                </p>
              </div>
              <div className="w-full h-1.5 bg-amber-600 rounded-full mt-4 overflow-hidden font-sans">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 font-sans"
                  style={{ width: `${cukupInformatifPerc}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Kurang Lengkap */}
          <div className="bg-rose-500 text-white rounded-[32px] shadow-lg shadow-rose-500/20 p-6 flex flex-col justify-between relative overflow-hidden group font-sans">
            <div className="absolute -right-6 -top-6 text-rose-400/30 group-hover:scale-110 transition-transform font-sans">
              <HelpCircle size={120} />
            </div>
            <div className="relative z-10 flex items-center gap-2 mb-8 font-sans">
              <p
                className="font-bold uppercase tracking-widest text-[10px] text-rose-50 line-clamp-1 font-sans"
                title="Informatif Namun Kurang Lengkap"
              >
                Kurang Lengkap
              </p>
            </div>
            <div className="relative z-10 font-sans">
              <div className="flex items-end gap-3 font-sans">
                <h2 className="text-5xl font-black tracking-tighter font-sans">
                  {kurangLengkapPerc}%
                </h2>
                <p className="font-bold text-rose-100 mb-1 font-sans text-xs">
                  ({kurangLengkapCount})
                </p>
              </div>
              <div className="w-full h-1.5 bg-rose-600 rounded-full mt-4 overflow-hidden font-sans">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 font-sans"
                  style={{ width: `${kurangLengkapPerc}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabular Data Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mt-8 font-sans">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 font-sans">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 font-sans">
            <BarChart3 size={18} className="text-indigo-500 font-sans" />
            Riwayat Responden Terbaru
          </h3>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-[10px] rounded-lg tracking-widest uppercase font-sans">
            Read Only
          </span>
        </div>

        <div className="overflow-x-auto font-sans">
          <table className="w-full text-left border-collapse font-sans font-sans">
            <thead>
              <tr className="bg-white border-b border-slate-100 font-sans">
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest w-24 font-sans">
                  No.
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest font-sans">
                  Tanggal Penilaian
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest font-sans">
                  Indikator Kepuasan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-sm">
              {surveyData.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors font-sans"
                >
                  <td className="px-8 py-6 align-middle font-sans">
                    <span className="font-bold text-slate-400 font-sans">
                      #{item.id}
                    </span>
                  </td>

                  <td className="px-8 py-6 align-middle font-sans">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 font-bold text-[11px] rounded-lg border border-slate-200 font-sans uppercase tracking-tight">
                      <CalendarDays size={14} className="font-sans" />
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </td>

                  <td className="px-8 py-6 align-middle font-sans">
                    <span
                      className={`inline-flex items-center px-4 py-2 font-bold rounded-xl border text-[11px] tracking-wide shadow-sm font-sans ${getBadgeStyle(item.indikator)}`}
                    >
                      {getIcon(item.indikator)}
                      {item.indikator}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {surveyData.length === 0 && (
          <div className="py-24 text-center font-sans">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 mb-4 font-sans shadow-inner">
              <Smile size={40} className="font-sans" />
            </div>
            <p className="text-slate-500 font-bold font-sans">
              Belum ada data survey yang masuk.
            </p>
          </div>
        )}

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
        />
      </div>
    </div>
  );
};

export default SurveyKepuasan;
