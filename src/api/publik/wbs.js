import api from "../axios";

export const createLaporanBenturKepentingan = (data) =>
  api.post("/laporan_bentur_kepentingan", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const createLaporanGratifikasi = (data) =>
  api.post("/laporan_gratifikasi", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const createPengaduanKorupsi = (data) =>
  api.post("/pengaduan_korupsi", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });