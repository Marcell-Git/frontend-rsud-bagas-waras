import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterWBS = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#922c40] text-white py-8 font-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-sm text-center md:text-left">
            <p>&copy; {currentYear} IT RSUD BAGAS WARAS</p>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-orange-900 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-orange-900 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <FaTwitter className="text-sm" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-orange-900 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <FaInstagram className="text-sm" />
            </a>
            <a
              href="#"
              aria-label="Youtube"
              className="w-10 h-10 rounded-full bg-orange-900 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <FaYoutube className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterWBS;
