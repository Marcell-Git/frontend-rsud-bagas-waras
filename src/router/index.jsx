import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "../pages/Auth";

import Home from "../pages/viewer/home";
import Berita from "../pages/viewer/Berita";
import DetailBerita from "../pages/DetailBerita";
import Galeri from "../pages/viewer/Galeri";

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
import JadwalDokter from "../pages/viewer/pelayanan/jadwalDokter";

import PPID from "../pages/publik/PPID/HomePPID";
import InformasiBerkala from "../pages/publik/PPID/InformasiBerkala";
import InformasiSertaMerta from "../pages/publik/PPID/InformasiSertaMerta";
import InformasiSetiapSaat from "../pages/publik/PPID/InformasiSetiapSaat";
import InformasiDikecuali from "../pages/publik/PPID/InformasiDikecuali";

import WBS from "../pages/publik/WBS/HomeWBS";
import PengaduanWBS from "../pages/publik/WBS/PengaduanWBS";

import HomeZI from "../pages/publik/ZI/HomeZI";
import KegiatanZI from "../pages/publik/ZI/KegiatanZI";

import JDIH from "../pages/publik/JDIH";

import StandarPelayanan from "../pages/viewer/publikasi/StandarPelayanan";
import IndeksKepuasanMasyarakat from "../pages/viewer/publikasi/IndeksKepuasanMasyarakat";
import LaporanTindakLanjutPengaduan from "../pages/viewer/publikasi/LaporanTindakLanjutPengaduan";
import Buletin from "../pages/viewer/publikasi/Buletin";
import Informasi from "../pages/viewer/publikasi/Informasi";

import Pengumuman from "../pages/viewer/Pengumuman";

import adminRoutes from "./adminRouter";
import AccessibilityManager from "../components/AccessibilityManager";
import TextToSpeech from "../components/TextToSpeech";
import { Outlet } from "react-router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AccessibilityManager />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/berita",
        element: <Berita />,
      },
      {
        path: "/berita/:id",
        element: <DetailBerita />,
      },
      {
        path: "/galeri",
        element: <Galeri />,
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
        children: [
          {
            index: true,
            element: <Pengaduan />,
          },
          {
            path: "form",
            element: <FormPengaduan />,
          },
        ],
      },
      {
        path: "/pendaftaran-online",
        element: <PendaftaranOnline />,
      },
      {
        path: "/tentang-kami",
        children: [
          {
            path: "visi-misi",
            element: <VisiMisi />,
          },
          {
            path: "sejarah-landasan-hukum",
            element: <SejarahLandasanHukum />,
          },
          {
            path: "struktur-organisasi",
            element: <StrukturOrganisasi />,
          },
        ],
      },
      {
        path: "/pelayanan",
        children: [
          {
            path: "igd",
            element: <IGD />,
          },
          {
            path: "rawat-jalan",
            element: <RawatJalan />,
          },
          {
            path: "rawat-inap",
            element: <RawatInap />,
          },
          {
            path: "layanan-informasi",
            element: <LayananInformasi />,
          },
          {
            path: "tarif-pelayanan",
            element: <TarifPelayanan />,
          },
          {
            path: "jadwal-dokter",
            element: <JadwalDokter />,
          },
        ],
      },
      {
        path: "/ppid",
        element: (
          <>
            <TextToSpeech />
            <Outlet />
          </>
        ),
        children: [
          {
            index: true,
            element: <PPID />,
          },
          {
            path: "informasi-berkala",
            element: <InformasiBerkala />,
          },
          {
            path: "informasi-serta-merta",
            element: <InformasiSertaMerta />,
          },
          {
            path: "informasi-setiap-saat",
            element: <InformasiSetiapSaat />,
          },
          {
            path: "informasi-dikecualikan",
            element: <InformasiDikecuali />,
          },
        ],
      },
      {
        path: "/wbs",
        children: [
          {
            index: true,
            element: <WBS />,
          },
          {
            path: "pengaduan",
            element: <PengaduanWBS />,
          },
        ],
      },
      {
        path: "/zona-integritas",
        children: [
          {
            index: true,
            element: <HomeZI />,
          },
          {
            path: "kegiatan",
            element: <KegiatanZI />,
          },
        ],
      },
      {
        path: "/publik/jdih",
        element: <JDIH />,
      },
      {
        path: "/publikasi",
        children: [
          {
            path: "standar-pelayanan",
            element: <StandarPelayanan />,
          },
          {
            path: "indeks-kepuasan-masyarakat",
            element: <IndeksKepuasanMasyarakat />,
          },
          {
            path: "laporan-tindak-lanjut-pengaduan",
            element: <LaporanTindakLanjutPengaduan />,
          },
          {
            path: "buletin",
            element: <Buletin />,
          },
          {
            path: "informasi",
            element: <Informasi />,
          },
        ],
      },
      {
        path: "/pengumuman",
        element: <Pengumuman />,
      },
      ...adminRoutes,
    ],
  },
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
