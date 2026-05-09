import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaUserAlt,
} from "react-icons/fa";
import Navbar from "../../../components/viewer/Navbar";
import EmergencyCall from "../../../components/viewer/EmergencyCall";
import Footer from "../../../components/viewer/Footer";
import Header from "../../../components/viewer/Header";
import { getAllDokter } from "../../../api/pelayanan/jadwalDokter";
import useTitle from "../../../hooks/useTitle";
import sketchRsud from "../../../assets/sketch_rsud_blue.png";

const JadwalDokter = () => {
  useTitle("Jadwal Dokter");

  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState("Semua");
  const [selectedSpecialization, setSelectedSpecialization] = useState("Semua");
  const [specializations, setSpecializations] = useState([]);

  const days = [
    "Semua",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const response = await getAllDokter();
        const data = response.data;
        setSchedules(data);
        setFilteredSchedules(data);

        // Extract unique specializations dynamically
        const specs = [
          "Semua",
          ...new Set(data.map((item) => item.spesialisasi)),
        ].filter(Boolean);
        setSpecializations(specs);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    let filtered = schedules;

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.nama_dokter.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.spesialisasi.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedDay !== "Semua") {
      filtered = filtered.filter((s) => s.hari === selectedDay);
    }

    if (selectedSpecialization !== "Semua") {
      filtered = filtered.filter(
        (s) => s.spesialisasi === selectedSpecialization,
      );
    }

    setFilteredSchedules(filtered);
  }, [searchQuery, selectedDay, selectedSpecialization, schedules]);

  return (
    <div className="bg-gray-50 min-h-screen font-secondary text-gray-700">
      <Navbar />

      <Header
        subtitle="Pelayanan Kami"
        title="Jadwal Dokter"
        description="Temukan jadwal dokter spesialis kami dan dapatkan pelayanan kesehatan yang prima."
      />

      {/* Filter Section */}
      <section className="relative z-20 -mt-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              {/* Search */}
              <div className="lg:col-span-4">
                <label className="block text-sm font-bold text-dark-blue mb-2 uppercase tracking-wider">
                  Cari Dokter
                </label>
                <div className="relative group">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                  <input
                    type="text"
                    placeholder="Nama dokter atau spesialisasi..."
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue outline-hidden transition-all font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Specialization Filter */}
              <div className="lg:col-span-4">
                <label className="block text-sm font-bold text-dark-blue mb-2 uppercase tracking-wider">
                  Spesialisasi
                </label>
                <div className="relative">
                  <FaStethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue outline-hidden transition-all font-medium appearance-none cursor-pointer"
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                  >
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Day Filter - Horizontal scroll on mobile, flex on desktop */}
              <div className="lg:col-span-4">
                <label className="block text-sm font-bold text-dark-blue mb-2 uppercase tracking-wider">
                  Hari Praktek
                </label>
                <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar lg:flex-wrap">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        selectedDay === day
                          ? "bg-primary-blue text-white shadow-md shadow-primary-blue/20"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl font-primary font-bold text-dark-blue">
                Daftar Dokter Praktek
              </h2>
              <p className="text-gray-500 font-medium">
                Menampilkan{" "}
                <span className="text-primary-blue font-bold">
                  {filteredSchedules.length}
                </span>{" "}
                dokter yang tersedia
              </p>
            </div>

            {(searchQuery ||
              selectedDay !== "Semua" ||
              selectedSpecialization !== "Semua") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDay("Semua");
                  setSelectedSpecialization("Semua");
                }}
                className="text-primary-blue font-bold text-sm hover:underline flex items-center gap-2"
              >
                Reset Filter
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
                    <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSchedules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSchedules.map((doctor, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 p-6 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                >
                  {/* Decorative element */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-blue/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="flex items-center gap-5 mb-6 relative">
                    <div className="w-32 h-32 rounded-full bg-light-blue flex items-center justify-center text-primary-blue shadow-lg group-hover:bg-primary-blue group-hover:text-white transition-all duration-500 overflow-hidden border-4 border-white ring-8 ring-slate-50/50 group-hover:border-primary-blue/20 shrink-0">
                      {doctor.gambar ? (
                        <img
                          src={`${import.meta.env.VITE_STORAGE_URL}/${doctor.gambar}`}
                          alt={doctor.nama_dokter}
                          className="w-full h-full object-cover object-top rounded-full"
                        />
                      ) : (
                        <FaUserMd size={48} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-primary font-bold text-dark-blue group-hover:text-primary-blue transition-colors leading-tight mb-1">
                        {doctor.nama_dokter}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-light-blue text-primary-blue text-[11px] font-bold uppercase tracking-wider">
                        <FaStethoscope size={10} />
                        {doctor.spesialisasi}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 relative">
                    <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary-blue">
                          <FaCalendarAlt size={14} />
                        </div>
                        <span className="text-sm font-bold text-gray-600">
                          Hari Praktek
                        </span>
                      </div>
                      <span className="text-sm font-bold text-dark-blue">
                        {doctor.hari}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-secondary-blue">
                          <FaClock size={14} />
                        </div>
                        <span className="text-sm font-bold text-gray-600">
                          Jam Praktek
                        </span>
                      </div>
                      <span className="text-sm font-bold text-primary-blue">
                        {doctor.jam}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-inner border border-dashed border-gray-300">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserAlt className="text-gray-300 text-3xl" />
              </div>
              <h3 className="text-xl font-primary font-bold text-dark-blue mb-2">
                Tidak Ada Jadwal Ditemukan
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Maaf, kami tidak dapat menemukan jadwal dokter dengan kriteria
                filter tersebut. Coba ubah pencarian atau filter Anda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDay("Semua");
                  setSelectedSpecialization("Semua");
                }}
                className="mt-6 px-6 py-2.5 bg-primary-blue text-white rounded-lg font-bold hover:bg-dark-blue transition-colors shadow-lg shadow-primary-blue/20"
              >
                Tampilkan Semua Dokter
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <EmergencyCall />
    </div>
  );
};

export default JadwalDokter;
