import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "../pages/Auth";

import Home from "../pages/viewer/home";
import AlurPelayanan from "../pages/viewer/AlurPelayanan";
import Pengaduan from "../pages/viewer/pengaduan/Pengaduan";
import FormPengaduan from "../pages/viewer/pengaduan/FormPengaduan";
import PendaftaranOnline from "../pages/viewer/PendaftaranOnline";

import VisiMisi from "../pages/viewer/tentangKami/visiMisi";
import SejarahLandasanHukum from "../pages/viewer/tentangKami/sejarah&LandasanHukum";
import StrukturOrganisasi from "../pages/viewer/tentangKami/strukturOrganisasi";

import IGD from "../pages/viewer/pelayanan/igd";
import RawatJalan from "../pages/viewer/pelayanan/rawatJalan";
import RawatInap from "../pages/viewer/pelayanan/rawatInap";
import LayananInformasi from "../pages/viewer/pelayanan/layananInformasi";
import TarifPelayanan from "../pages/viewer/pelayanan/tarifPelayanan";

import PPID from "../pages/publik/PPID/HomePPID";
import InformasiBerkala from "../pages/publik/PPID/InformasiBerkala";
import InformasiSertaMerta from "../pages/publik/PPID/InformasiSertaMerta";
import InformasiSetiapSaat from "../pages/publik/PPID/InformasiSetiapSaat";
import InformasiDikecuali from "../pages/publik/PPID/InformasiDikecuali";

import WBS from "../pages/publik/WBS/HomeWBS";
import PengaduanWBS from "../pages/publik/WBS/PengaduanWBS";

import HomeZI from "../pages/publik/ZI/HomeZI";
import KegiatanZI from "../pages/publik/ZI/KegiatanZI";

import StandarPelayanan from "../pages/viewer/publikasi/StandarPelayanan";
import IndeksKepuasanMasyarakat from "../pages/viewer/publikasi/IndeksKepuasanMasyarakat";
import LaporanTindakLanjutPengaduan from "../pages/viewer/publikasi/LaporanTindakLanjutPengaduan";
import Buletin from "../pages/viewer/publikasi/Buletin";
import Informasi from "../pages/viewer/publikasi/Informasi";

import Pengumuman from "../pages/viewer/Pengumuman";

import adminRoutes from "./adminRouter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/alur-pelayanan",
    element: <AlurPelayanan />,
  },
  {
    path: "/pengaduan",
    element: <Pengaduan />,
  },
  {
    path: "/pengaduan/form",
    element: <FormPengaduan />,
  },
  {
    path: "/pendaftaran-online",
    element: <PendaftaranOnline />,
  },
  {
    path: "/tentang-kami/visi-misi",
    element: <VisiMisi />,
  },
  {
    path: "/tentang-kami/sejarah-landasan-hukum",
    element: <SejarahLandasanHukum />,
  },
  {
    path: "/tentang-kami/struktur-organisasi",
    element: <StrukturOrganisasi />,
  },
  {
    path: "/pelayanan/igd",
    element: <IGD />,
  },
  {
    path: "/pelayanan/rawat-jalan",
    element: <RawatJalan />,
  },
  {
    path: "/pelayanan/rawat-inap",
    element: <RawatInap />,
  },
  {
    path: "/pelayanan/layanan-informasi",
    element: <LayananInformasi />,
  },
  {
    path: "/pelayanan/tarif-pelayanan",
    element: <TarifPelayanan />,
  },
  {
    path: "/ppid",
    element: <PPID />,
  },
  {
    path: "/ppid/informasi-berkala",
    element: <InformasiBerkala />,
  },
  {
    path: "/ppid/informasi-serta-merta",
    element: <InformasiSertaMerta />,
  },
  {
    path: "/ppid/informasi-setiap-saat",
    element: <InformasiSetiapSaat />,
  },
  {
    path: "/ppid/informasi-dikecualikan",
    element: <InformasiDikecuali />,
  },
  {
    path: "/wbs",
    element: <WBS />,
  },
  {
    path: "/wbs/pengaduan",
    element: <PengaduanWBS />,
  },
  {
    path: "/zona-integritas",
    element: <HomeZI />,
  },
  {
    path: "/zona-integritas/kegiatan",
    element: <KegiatanZI />,
  },
  {
    path: "/publikasi/standar-pelayanan",
    element: <StandarPelayanan />,
  },
  {
    path: "/publikasi/indeks-kepuasan-masyarakat",
    element: <IndeksKepuasanMasyarakat />,
  },
  {
    path: "/publikasi/laporan-tindak-lanjut-pengaduan",
    element: <LaporanTindakLanjutPengaduan />,
  },
  {
    path: "/publikasi/buletin",
    element: <Buletin />,
  },
  {
    path: "/publikasi/informasi",
    element: <Informasi />,
  },
  {
    path: "/pengumuman",
    element: <Pengumuman />,
  },
  ...adminRoutes,
]);

const AppRouter = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </>
  );

};

export default AppRouter;
