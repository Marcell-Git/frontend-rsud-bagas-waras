import React from "react";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Newspaper,
  Images,
  Megaphone,
  BookOpen,
  ExternalLink,
  Target,
  ListTodo,
  History,
  Scale,
  Users2,
  Briefcase,
  ShieldCheck,
  UserCheck,
  Calendar,
  Bed,
  Stethoscope,
  GitGraph,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  FolderOpen,
  Award,
  Smile,
  FileCheck,
  ShieldAlert,
  Gift,
  AlertCircle,
  MessageSquare
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

const SidebarItem = ({ icon: Icon, label, to, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative
        ${
          isActive
            ? "bg-linear-to-r from-primary-blue to-secondary-blue text-white shadow-lg shadow-primary-blue/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }
      `}
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            className={`${isActive ? "text-white" : "group-hover:scale-110 transition-transform duration-300"}`}
          />
          {!collapsed && (
            <span className="font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300">
              {label}
            </span>
          )}
          {collapsed && (
            <div className="absolute left-full ml-6 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

const Sidebar = ({ collapsed, onToggle, hideToggle = false }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Anda telah logout.");
    navigate("/auth");
  };

  const allMenuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      category: "Main",
      to: "/admin",
    },

    // Content
    {
      label: "Banner",
      icon: ImageIcon,
      category: "Content",
      to: "/admin/banner",
    },
    {
      label: "Berita",
      icon: Newspaper,
      category: "Content",
      to: "/admin/berita",
    },
    { label: "Galeri", icon: Images, category: "Content", to: "/admin/galeri" },
    {
      label: "Pengumuman",
      icon: Megaphone,
      category: "Content",
      to: "/admin/pengumuman",
    },
    {
      label: "Buletin",
      icon: BookOpen,
      category: "Content",
      to: "/admin/buletin",
    },
    {
      label: "Link Eksternal",
      icon: ExternalLink,
      category: "Content",
      to: "/admin/link-eksternal",
    },

    // Tentang RSUD
    {
      label: "Visi",
      icon: Target,
      category: "Tentang RSUD",
      to: "/admin/visi",
    },
    {
      label: "Misi",
      icon: ListTodo,
      category: "Tentang RSUD",
      to: "/admin/misi",
    },
    {
      label: "Sejarah",
      icon: History,
      category: "Tentang RSUD",
      to: "/admin/sejarah",
    },
    {
      label: "Landasan Hukum",
      icon: Scale,
      category: "Tentang RSUD",
      to: "/admin/landasan-hukum",
    },

    // Struktur Organisasi
    {
      label: "Gambar Struktur",
      icon: Users2,
      category: "Struktur Organisasi",
      to: "/admin/gambar-struktur",
    },
    {
      label: "Profil Pegawai",
      icon: User,
      category: "Struktur Organisasi",
      to: "/admin/profil-pegawai",
    },
    {
      label: "Tugas RSUD",
      icon: Briefcase,
      category: "Struktur Organisasi",
      to: "/admin/tugas-rsud",
    },
    {
      label: "Fungsi RSUD",
      icon: ShieldCheck,
      category: "Struktur Organisasi",
      to: "/admin/fungsi-rsud",
    },
    {
      label: "Tugas Per Divisi",
      icon: UserCheck,
      category: "Struktur Organisasi",
      to: "/admin/tugas-divisi",
    },

    // Pelayanan
    {
      label: "Jadwal Dokter",
      icon: Calendar,
      category: "Pelayanan",
      to: "/admin/jadwal-dokter",
    },
    {
      label: "Rawat Inap",
      icon: Bed,
      category: "Pelayanan",
      to: "/admin/rawat-inap",
    },
    {
      label: "Rawat Jalan",
      icon: Stethoscope,
      category: "Pelayanan",
      to: "/admin/rawat-jalan",
    },
    {
      label: "Alur Pelayanan",
      icon: GitGraph,
      category: "Pelayanan",
      to: "/admin/alur-pelayanan",
    },
    {
      label: "Syarat Pelayanan",
      icon: FileText,
      category: "Pelayanan",
      to: "/admin/syarat-pelayanan",
    },

    // Publik 
    {
      label: "Berkas PPID",
      icon: FolderOpen,
      category: "Publik",
      to: "/admin/berkas-ppid",
    },
    {
      label: "Kegiatan WBK/WBBM",
      icon: Award,
      category: "Publik",
      to: "/admin/kegiatan-wbkwbbm",
    },

    // Pengaduan
    {
      label: "Survey Kepuasan",
      icon: Smile,
      category: "Pengaduan",
      to: "/admin/survey-kepuasan",
    },
    {
      label: "Pengaduan Masyarakat",
      icon: MessageSquare,
      category: "Pengaduan",
      to: "/admin/pengaduan-masyarakat",
    },
    {
      label: "Laporan Tindak Lanjut",
      icon: FileCheck,
      category: "Pengaduan",
      to: "/admin/laporan-tindak-lanjut",
    },
    {
      label: "Pengaduan Korupsi",
      icon: ShieldAlert,
      category: "Pengaduan",
      to: "/admin/pengaduan-korupsi",
    },
    {
      label: "Lapor Gratifikasi",
      icon: Gift,
      category: "Pengaduan",
      to: "/admin/lapor-gratifikasi",
    },
    {
      label: "Benturan Kepentingan",
      icon: AlertCircle,
      category: "Pengaduan",
      to: "/admin/benturan-kepentingan",
    },
    {
      label: "User Manajemen",
      icon: Users2,
      category: "User Manajemen",
      to: "/admin/users",
    },
  ];

  // RBAC Filtering Logic
  const filteredMenuItems = allMenuItems.filter(item => {
    if (role === "Super Admin") return true;
    
    if (role === "Admin") {
      return item.category !== "User Manajemen";
    }
    
    if (role === "Humas") {
      return item.label === "Kegiatan WBK/WBBM" || item.label === "Dashboard";
    }
    
    if (role === "PPID") {
      return item.label === "Berkas PPID" || item.label === "Dashboard";
    }
    
    if (role === "Pengaduan") {
      return item.category === "Pengaduan" || item.label === "Dashboard";
    }
    
    return item.label === "Dashboard"; // Fallback for other roles
  });

  const categories = Array.from(new Set(filteredMenuItems.map(item => item.category)));

  return (
    <aside
      className={`h-screen bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 ease-in-out fixed left-0 top-0 z-40 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-between font-sans">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary-blue to-secondary-blue flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-blue/30">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black leading-none tracking-tight">
                BAGAS WARAS
              </span>
              <span className="text-primary-blue text-[10px] font-black tracking-widest uppercase mt-1">
                Admin Portal
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary-blue to-secondary-blue flex items-center justify-center text-white font-black text-xl mx-auto">
            B
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      {!hideToggle && (
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 bg-primary-blue text-white p-1 rounded-full shadow-lg hover:bg-secondary-blue transition-colors z-50"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 scrollbar-hide font-sans">
        {categories.map((category) => (
          <div key={category} className="space-y-2">
            {!collapsed && (
              <h3 className="text-slate-600 text-[9px] font-black uppercase tracking-[0.25em] px-4 mb-4">
                {category}
              </h3>
            )}
            <div className="space-y-1">
              {filteredMenuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <SidebarItem
                    key={item.label}
                    {...item}
                    collapsed={collapsed}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/50 font-sans">
        <div
          className={`flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 transition-all ${collapsed ? "justify-center" : ""}`}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700 font-sans">
            <User size={20} />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 font-sans">
              <p className="text-xs font-bold text-white truncate font-sans">
                {user.nama_lengkap || "Administrator"}
              </p>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest truncate font-sans">
                {user.role || "Petugas RSUD"}
              </p>
            </div>
          )}
          {!collapsed && (
            <button 
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
