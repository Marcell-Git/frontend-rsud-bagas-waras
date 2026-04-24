import React, { useState, useRef } from "react";
import {
  User,
  Lock,
  ArrowRight,
  Stethoscope,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { login } from "../api/auth";
import { getWithExpiry } from "../utils/localStorageHelper";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Auth = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  React.useEffect(() => {
    const token = getWithExpiry("token");
    const user = getWithExpiry("user");
    if (token && user) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.warning("Mohon lengkapi username dan password.");
      return;
    }

    if (!captchaToken) {
      toast.warning("Mohon selesaikan verifikasi reCAPTCHA terlebih dahulu.");
      return;
    }

    setIsLoading(true);

    try {
      await login({ ...formData, captcha: captchaToken });
      toast.success("Login Berhasil! Selamat datang di Dashboard Admin.");
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      captchaRef.current?.reset();
      setCaptchaToken(null);
      toast.error(
        error.response?.data?.message ||
          "Login gagal. Periksa kembali username dan password Anda.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50 font-sans relative overflow-hidden">
      {/* Background decoration to match dashboard feel */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-teal-600 rounded-[22px] flex items-center justify-center shadow-xl shadow-teal-600/20 mb-4">
            <Stethoscope className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-center">
            RSUD <span className="text-teal-600">Bagas Waras</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm mt-1 uppercase tracking-widest text-[10px]">
            Portal Administrator
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 text-center">
              Login
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Username
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-teal-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-slate-700 font-bold outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-teal-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-14 text-slate-700 font-bold outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="space-y-2">
              <div className="flex justify-center transition-all">
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                  onExpired={handleCaptchaExpired}
                />
              </div>
              {captchaToken && (
                <p className="text-[11px] text-teal-600 font-bold flex items-center gap-1 ml-1">
                  <ShieldCheck size={12} />
                  Verifikasi berhasil
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-login"
              disabled={isLoading || !captchaToken}
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group shadow-lg shadow-teal-600/20 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Masuk Sistem
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Support Info */}
        <p className="text-center mt-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Sistem Terpusat RSUD Bagas Waras Klaten
        </p>
      </div>
    </div>
  );
};

export default Auth;
