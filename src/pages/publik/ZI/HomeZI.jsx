import NavbarZI from "../../../components/publik/ZI/NavbarZI";
import FooterZI from "../../../components/publik/ZI/FooterZI";
import hero from "../../../assets/publik/ZI/banner-zi.png";
import { FaAngleDoubleDown } from "react-icons/fa";

import useTitle from "../../../hooks/useTitle";

import imgManajemenPerubahan from "../../../assets/publik/ZI/mana-perubahan.png";
import imgTataLaksana from "../../../assets/publik/ZI/tata-laksana.png";
import imgSDM from "../../../assets/publik/ZI/SDM.png";
import imgAkunKerja from "../../../assets/publik/ZI/akun-kerja.png";
import imgPengawasan from "../../../assets/publik/ZI/pengawasan.png";
import imgPelayananPublik from "../../../assets/publik/ZI/yanblik.png";

const HomeZI = () => {
  useTitle("ZI");
  
  const programs = [
    { title: "Manajemen Perubahan", img: imgManajemenPerubahan },
    { title: "Penataan Tatalaksana", img: imgTataLaksana },
    { title: "Penataan Sistem Manajemen SDM", img: imgSDM },
    { title: "Akuntabilitas Kerja", img: imgAkunKerja },
    { title: "Pengawasan", img: imgPengawasan },
    { title: "Peningkatan Kualitas Pelayanan Publik", img: imgPelayananPublik },
  ];

  return (
    <div className="font-secondary min-h-screen flex flex-col bg-white">
      <NavbarZI />

      <main className="grow">
        <section className="w-full">
          <img
            src={hero}
            alt="Zona Integritas RSUD Bagas Waras"
            className="w-full h-auto object-cover"
          />
          <div className="w-full bg-gray-900 py-3 flex justify-center text-white">
            <FaAngleDoubleDown className="text-2xl animate-bounce" />
          </div>
        </section>

        {/* Info Cards Section */}
        <section className="py-16 px-4 sm:px-6 bg-linear-to-b from-white to-gray-50/50">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
            {/* ZI Main Card */}
            <div className="bg-white rounded-4xl shadow-sm border border-gray-100 p-8 md:p-12 text-center max-w-5xl mx-auto transform transition duration-500 hover:shadow-md relative overflow-hidden group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-emerald-500 rounded-b-full group-hover:w-40 transition-all duration-500"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-5 tracking-wide mt-2">
                Zona Integritas (ZI)
              </h2>
              <p className="text-gray-600 text-[15px] md:text-base leading-relaxed max-w-3xl mx-auto">
                Zona Integritas (ZI){""}
                <span className="font-semibold text-gray-800">adalah</span>{" "}
                predikat yang diberikan kepada instansi{""}
                <span className="font-semibold text-gray-800">
                  pemerintah
                </span>{" "}
                yang pimpinan dan jajarannya{""}
                <span className="font-semibold text-gray-800">
                  mempunyai komitmen
                </span>{" "}
                untuk mewujudkan WBK/WBBM melalui reformasi birokrasi, khususnya
                dalam{""}
                <span className="font-semibold text-gray-800">hal</span>{" "}
                pencegahan korupsi dan{""}
                <span className="font-semibold text-gray-800">
                  peningkatan kualitas
                </span>{" "}
                pelayanan publik.
              </p>
            </div>

            {/* WBK and WBBM Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* WBK Card */}
              <div className="bg-white rounded-4xl shadow-sm border border-emerald-50 p-8 md:p-10 text-center transform transition duration-500 hover:-translate-y-1 hover:shadow-md hover:border-emerald-100 group">
                <div className="w-12 h-1.5 bg-emerald-200 mx-auto mb-6 rounded-full group-hover:bg-emerald-500 group-hover:w-16 transition-all duration-300"></div>
                <h2 className="text-xl md:text-2xl font-bold text-emerald-600 mb-4 tracking-wide">
                  (Menuju) Wilayah Bebas Korupsi (WBK)
                </h2>
                <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                  (Menuju) Wilayah Bebas Korupsi (WBK){""}
                  <span className="font-semibold text-gray-800">
                    adalah
                  </span>{" "}
                  predikat yang diberikan{""}
                  <span className="font-semibold text-gray-800">
                    kepada suatu unit
                  </span>{" "}
                  kerja yang memenuhi{""}
                  <span className="font-semibold text-gray-800">
                    sebagian besar program manajemen perubahan
                  </span>
                  , penataan tata laksana, penataan{""}
                  <span className="font-semibold text-gray-800">
                    sistem manajemen SDM
                  </span>
                  , penguatan akuntabilitas kinerja, dan penguatan pengawasan.
                </p>
              </div>

              {/* WBBM Card */}
              <div className="bg-white rounded-4xl shadow-sm border border-emerald-50 p-8 md:p-10 text-center transform transition duration-500 hover:-translate-y-1 hover:shadow-md hover:border-emerald-100 group">
                <div className="w-12 h-1.5 bg-emerald-200 mx-auto mb-6 rounded-full group-hover:bg-emerald-500 group-hover:w-16 transition-all duration-300"></div>
                <h2 className="text-xl md:text-2xl font-bold text-emerald-600 mb-4 tracking-wide">
                  (Menuju) Wilayah Birokrasi Bersih dan Melayani (WBBM)
                </h2>
                <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                  (Menuju) WBBM{""}
                  <span className="font-semibold text-gray-800">
                    adalah
                  </span>{" "}
                  predikat yang{""}
                  <span className="font-semibold text-gray-800">
                    diberikan kepada
                  </span>{" "}
                  suatu unit kerja yang memenuhi{""}
                  <span className="font-semibold text-gray-800">
                    sebagian besar kelima program
                  </span>{" "}
                  pada WBK di atas{""}
                  <span className="font-semibold text-gray-800">
                    ditambah dengan program penguatan kualitas
                  </span>{" "}
                  pelayanan publik.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Proses Pembangunan Section */}
        <section className="py-20 px-4 sm:px-6 text-center bg-gray-50 relative overflow-hidden border-t border-gray-100">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -left-32 w-120 h-120 bg-emerald-100/30 rounded-full blur-[80px]"></div>
            <div className="absolute top-1/2 -right-32 w-100 h-100 bg-blue-100/30 rounded-full blur-[80px]"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 tracking-wide">
                Proses Pembangunan{" "}
                <span className="text-emerald-600">Zona Integritas (ZI)</span>
              </h2>
              <p className="text-gray-600 text-[15px] max-w-2xl mx-auto">
                Proses pembangunan Zona Integritas difokuskan kepada penerapan
                beberapa program inti sebagai langkah konkret:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 max-w-5xl mx-auto mb-16 px-4 md:px-0">
              {programs.map((prog, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="w-56 h-56 md:w-64 md:h-64 relative flex justify-center items-center p-6 bg-white rounded-[2.5rem] shadow-sm border border-emerald-50/50 group-hover:shadow-xl group-hover:border-emerald-100 transition-all duration-500 cursor-pointer">
                    <img
                      src={prog.img}
                      alt={prog.title}
                      className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-lg transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 max-w-5xl mx-auto relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 group-hover:w-2 transition-all duration-300"></div>
              <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed text-left pl-6 md:pl-8">
                Setelah{" "}
                <span className="font-semibold text-gray-800">
                  unit kerja yang diusulkan
                </span>{" "}
                sebagai Zona Integritas{" "}
                <span className="font-semibold text-gray-800">
                  menuju WBK/WBBM ditetapkan
                </span>
                , maka hal selanjutnya yang dilakukan adalah menentukan
                komponen-komponen yang harus dibangun. Terdapat dua jenis
                komponen dalam unit kerja terpilih, yaitu{" "}
                <span className="font-bold text-emerald-600">
                  komponen pengungkit
                </span>{" "}
                dan{" "}
                <span className="font-bold text-emerald-600">
                  komponen hasil
                </span>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <FooterZI />
    </div>
  );
};

export default HomeZI;
