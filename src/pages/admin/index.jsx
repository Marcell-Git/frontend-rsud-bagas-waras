import React from "react";
import { Sun, Moon, Cloud, Calendar, Clock, Activity, ShieldCheck } from "lucide-react";
import useTitle from "../../hooks/useTitle";
import { getWithExpiry } from "../../utils/localStorageHelper";

const Admin = () => {
  useTitle("Dashboard Admin");
  const user = getWithExpiry("user") || {};
  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return { text: "Selamat Pagi", icon: Sun, color: "text-amber-500" };
    if (hours < 15) return { text: "Selamat Siang", icon: Sun, color: "text-orange-500" };
    if (hours < 18) return { text: "Selamat Sore", icon: Cloud, color: "text-blue-500" };
    return { text: "Selamat Malam", icon: Moon, color: "text-indigo-500" };
  };

  const { text: greeting, icon: GreetingIcon, color: greetingColor } = getTimeOfDay();
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-blue/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="z-10 w-full max-w-4xl px-6">
        <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary-blue/10 relative overflow-hidden group">
          {/* Subtle inner gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left Side: Avatar/Icon */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-linear-to-br from-primary-blue to-dark-blue p-1 shadow-xl shadow-primary-blue/30 rotate-3 transition-transform group-hover:rotate-0 duration-500">
                  <div className="w-full h-full bg-white rounded-[1.4rem] flex items-center justify-center text-primary-blue">
                    <ShieldCheck size={48} className="md:size-16" strokeWidth={1.5} />
                  </div>
                </div>
                {/* Micro-badge */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg border-4 border-white">
                  <Activity size={20} />
                </div>
              </div>

              {/* Right Side: Welcome Text */}
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <GreetingIcon className={`${greetingColor} animate-bounce-slow`} size={24} />
                  <span className="text-slate-500 font-semibold tracking-wide uppercase text-xs">Administrator Dashboard</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                  {greeting}, <span className="bg-linear-to-r from-primary-blue to-secondary-blue bg-clip-text text-transparent">{user.nama_lengkap}</span>
                </h1>
                
                <p className="text-slate-600 text-lg md:text-xl font-medium max-w-lg mb-8 leading-relaxed">
                  Selamat datang di panel kendali RSUD Bagas Waras. Seluruh sistem berjalan dengan optimal hari ini.
                </p>

                {/* Info Pills */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-2xl text-slate-600 text-sm font-semibold border border-slate-200">
                    <Calendar size={16} className="text-primary-blue" />
                    {currentDate}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl text-emerald-700 text-sm font-semibold border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    Sistem Aktif
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Quick Action Suggestion (Transparent) */}
        <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <Clock size={16} />
                <span>Terakhir login: {new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })} WIB</span>
            </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default Admin;

