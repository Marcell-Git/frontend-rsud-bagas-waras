import { Outlet } from "react-router";
import Admin from "../pages/admin";
import AdminLayout from "../components/admin/AdminLayout";
import Banner from "../pages/admin/content/Banner";
import Berita from "../pages/admin/content/Berita";
import Galeri from "../pages/admin/content/Galeri";
import Pengumuman from "../pages/admin/content/Pengumuman";
import Buletin from "../pages/admin/content/Buletin";
import LinkEksternal from "../pages/admin/content/LinkEksternal";
import StandarPelayanan from "../pages/admin/content/StandarPelayanan";

import Visi from "../pages/admin/TentangRSUD/Visi";
import Misi from "../pages/admin/TentangRSUD/Misi";
import Sejarah from "../pages/admin/TentangRSUD/Sejarah";
import LandasanHukum from "../pages/admin/TentangRSUD/LandasanHukum";

import GambarStruktur from "../pages/admin/StrukturOrganisasi/GambarStruktur";
import ProfilPegawai from "../pages/admin/StrukturOrganisasi/ProfilPegawai";
import TugasRSUD from "../pages/admin/StrukturOrganisasi/TugasRSUD";
import FungsiRSUD from "../pages/admin/StrukturOrganisasi/FungsiRSUD";
import TugasDivisi from "../pages/admin/StrukturOrganisasi/TugasDivisi";

import JadwalDokter from "../pages/admin/pelayanan/JadwalDokter";
import RawatInap from "../pages/admin/pelayanan/RawatInap";
import RawatJalan from "../pages/admin/pelayanan/RawatJalan";
import AlurPelayanan from "../pages/admin/pelayanan/AlurPelayanan";
import SyaratPelayanan from "../pages/admin/pelayanan/SyaratPelayanan";

import BerkasPPID from "../pages/admin/publik/BerkasPPID";
import KegiatanWBKWBBM from "../pages/admin/publik/KegiatanWBKWBBM";

import SurveyKepuasan from "../pages/admin/pengaduan/SurveyKepuasan";
import IndexKepuasanMasyarakat from "../pages/admin/pengaduan/IndexKepuasanMasyarakat";
import LaporanTindakLanjut from "../pages/admin/pengaduan/LaporanTindakLanjut";
import PengaduanKorupsi from "../pages/admin/pengaduan/PengaduanKorupsi";
import LaporanGratifikasi from "../pages/admin/pengaduan/LaporanGratifikasi";
import LaporanBenturanKepentingan from "../pages/admin/pengaduan/LaporanBenturanKepentingan";
import PengaduanMasyarakat from "../pages/admin/pengaduan/PengaduanMasyarakat";

import User from "../pages/admin/userManajemen/User";

import ProtectedRoute from "../components/auth/ProtectedRoute";

const adminRoutes = [
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: (
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        ),
        children: [
          {
            index: true,
            element: <Admin />,
          },
      {
        path: "banner",
        element: <Banner />,
      },
      {
        path: "berita",
        element: <Berita />,
      },
      {
        path: "galeri",
        element:  <Galeri />
      },
      {
        path: "pengumuman",
        element:  <Pengumuman />
      },
      {
        path: "buletin",
        element:  <Buletin /> 
      },
      {
        path: "link-eksternal",
        element:  <LinkEksternal /> 
      },
      {
        path: "standar-pelayanan",
        element:  <StandarPelayanan /> 
      },
      {
        path: "visi",
        element: <Visi />
      },
      {
        path: "misi",
        element: <Misi />
      },
      {
        path: "sejarah",
        element: <Sejarah />
      },
      {
        path: "landasan-hukum",
        element: <LandasanHukum />
      },
      {
        path: "gambar-struktur",
        element: <GambarStruktur />
      },
      {
        path: "profil-pegawai",
        element: <ProfilPegawai />
      },
      {
        path: "tugas-rsud",
        element: <TugasRSUD />
      },
      {
        path: "fungsi-rsud",
        element: <FungsiRSUD />
      },
      {
        path: "tugas-divisi",
        element: <TugasDivisi />
      },
      {
        path: "jadwal-dokter",
        element: <JadwalDokter />
      },
      {
        path: "rawat-inap",
        element: <RawatInap />
      },
      {
        path: "rawat-jalan",
        element: <RawatJalan />
      },
      {
        path: "alur-pelayanan",
        element: <AlurPelayanan />
      },
      {
        path: "syarat-pelayanan",
        element: <SyaratPelayanan />
      },
      {
        path: "berkas-ppid",
        element: <BerkasPPID />
      },
      {
        path: "kegiatan-wbkwbbm",
        element: <KegiatanWBKWBBM />
      },
      {
        path: "survey-kepuasan",
        element: <SurveyKepuasan />
      },
      {
        path: "index-kepuasan-masyarakat",
        element: <IndexKepuasanMasyarakat />
      },
      {
        path: "laporan-tindak-lanjut",
        element: <LaporanTindakLanjut />
      },
      {
        path: "pengaduan-korupsi",
        element: <PengaduanKorupsi />
      },
      {
        path: "lapor-gratifikasi",
        element: <LaporanGratifikasi />
      },
      {
        path: "benturan-kepentingan",
        element: <LaporanBenturanKepentingan />
      },
      {
        path: "pengaduan-masyarakat",
        element: <PengaduanMasyarakat />
      },
      {
        path: "users",
        element: <User />,
      },
        ],
      },
    ],
  },
];

export default adminRoutes;
