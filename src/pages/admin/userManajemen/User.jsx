import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  User as UserIcon,
  Shield,
  Fingerprint,
  Save,
} from "lucide-react";
import { toast } from "react-toastify";
import Modal from "../../../components/admin/Modal";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import useTitle from "../../../hooks/useTitle";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../../api/users/index";

const User = () => {
  useTitle("Manajemen Pengguna");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    username: "",
    role: "",
    password: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [itemToDelete, setItemToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Gagal mengambil data user");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (
      !formData.nama_lengkap ||
      !formData.username ||
      (!editingItem && !formData.password) ||
      !formData.role
    ) {
      toast.warning("Mohon lengkapi semua data user");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        const dataToSend = { ...formData };
        if (!dataToSend.password) delete dataToSend.password;

        await updateUser(editingItem.id, dataToSend);
        toast.success("Informasi user berhasil diperbarui");
      } else {
        await createUser(formData);
        toast.success("User baru berhasil didaftarkan");
      }
      closeModal();
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Gagal menyimpan data user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteUser(itemToDelete);
      setUsers(users.filter((u) => u.id !== itemToDelete));
      toast.success("User berhasil dihapus");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus user");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama_lengkap: item.nama_lengkap || "",
        username: item.username || "",
        role: item.role || "",
        password: "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        nama_lengkap: "",
        username: "",
        role: "",
        password: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      nama_lengkap: "",
      username: "",
      role: "",
      password: "",
    });
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case "Super Admin":
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "Admin":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Humas":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Pengaduan":
        return "bg-rose-50 text-rose-600 border-rose-100";
      case "PPID":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen User
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Kelola akses akun administrator dan petugas sistem.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-primary-blue to-secondary-blue text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-blue/30 transition-all outline-none"
        >
          <Plus size={20} />
          Tambah User
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden font-sans">
        <div className="overflow-x-auto font-sans">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-sans">
                <th className="py-6 px-8 font-black uppercase tracking-widest font-sans">
                  User Info
                </th>
                <th className="py-6 px-8 font-black uppercase tracking-widest font-sans">
                  Username
                </th>
                <th className="py-6 px-8 font-black uppercase tracking-widest font-sans">
                  Role
                </th>
                <th className="py-6 px-8 font-black uppercase tracking-widest text-center font-sans">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-sm">
              {isLoading ? (
                [...Array(5)].map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-slate-100"></div>
                        <div className="h-4 bg-slate-100 rounded-full w-32"></div>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <div className="h-4 bg-slate-100 rounded-full w-24"></div>
                    </td>
                    <td className="py-5 px-8">
                      <div className="h-6 bg-slate-50 rounded-xl w-24"></div>
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex justify-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-50"></div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                users.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors font-sans"
                  >
                    <td className="py-5 px-8 text-slate-600 font-sans">
                      <div className="flex items-center gap-4 font-sans">
                        <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black shrink-0 font-sans">
                          {item.nama_lengkap.charAt(0)}
                        </div>
                        <div className="font-sans">
                          <p className="font-bold text-slate-900 font-sans">
                            {item.nama_lengkap}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-8 font-sans">
                      <div className="flex items-center gap-2 text-slate-700 font-bold font-sans">
                        <Fingerprint
                          size={16}
                          className="text-slate-400 font-sans"
                        />
                        {item.username}
                      </div>
                    </td>
                    <td className="py-5 px-8 text-slate-600 font-sans">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border font-sans ${getRoleStyle(item.role)}`}
                      >
                        <Shield size={12} className="font-sans" />
                        {item.role}
                      </span>
                    </td>
                    <td className="py-5 px-8 font-sans">
                      <div className="flex items-center justify-center gap-2 font-sans">
                        <button
                          onClick={() => openModal(item)}
                          className="p-3 rounded-xl bg-white text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-all shadow-sm font-sans"
                          title="Edit User"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-3 rounded-xl bg-white text-slate-400 hover:text-white hover:bg-rose-500 border border-slate-200 transition-all shadow-sm font-sans"
                          title="Hapus User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!isLoading && users.length === 0 && (
            <div className="py-24 text-center font-sans">
              <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center mx-auto text-slate-300 mb-6 border border-dashed border-slate-200 font-sans">
                <UserIcon size={32} className="font-sans" />
              </div>
              <p className="text-slate-500 font-bold font-sans">
                Belum ada data user.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit Informasi User" : "Daftarkan User Baru"}
        subtitle="Atur kredensial dan hak akses akun sistem administrator."
        footer={
          <div className="flex gap-4 w-full justify-end font-sans">
            <button
              onClick={closeModal}
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest font-sans disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-sans disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save size={16} />
              )}
              {isSubmitting ? "Menyimpan..." : "Simpan User"}
            </button>
          </div>
        }
      >
        <div className="space-y-6 font-sans">
          <div className="space-y-3 font-sans">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
              Nama Lengkap
            </label>
            <div className="relative font-sans">
              <UserIcon
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-sans"
                size={18}
              />
              <input
                type="text"
                name="nama_lengkap"
                value={formData.nama_lengkap}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap user..."
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-bold text-slate-700 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            <div className="space-y-3 font-sans">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                Username
              </label>
              <div className="relative font-sans">
                <Fingerprint
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-sans"
                  size={18}
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username..."
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-bold text-slate-700 font-sans"
                />
              </div>
            </div>
            <div className="space-y-3 font-sans">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-bold text-slate-700 font-sans"
              />
              {editingItem && (
                <p className="text-[10px] text-slate-400 font-medium italic mt-1 font-sans">
                  *Kosongkan jika tidak ingin mengubah password
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3 font-sans">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-sans">
              Hak Akses (Role)
            </label>
            <div className="relative font-sans">
              <Shield
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-sans"
                size={18}
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer font-sans"
              >
                <option value="" disabled>
                  Pilih Role...
                </option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Humas">Humas</option>
                <option value="Pengaduan">Pengaduan</option>
                <option value="PPID">PPID</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Akun User"
        message="Apakah Anda yakin ingin menghapus akun user ini?"
      />
    </div>
  );
};

export default User;
