import { FaFileAlt, FaDownload, FaTimes } from "react-icons/fa";

const ModalPdfViewer = ({ tarif, onClose }) => {
  if (!tarif) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 md:px-7 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-light-blue rounded-xl flex items-center justify-center">
              <FaFileAlt className="text-primary-blue text-sm" />
            </div>
            <h3 className="font-primary font-bold text-dark-blue text-base md:text-lg">
              {tarif.nama}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={tarif.pdf}
              download={tarif.filePdf}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary-blue border border-primary-blue/30 rounded-xl hover:bg-light-blue transition-colors"
            >
              <FaDownload className="text-xs" />
              Unduh
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-500 transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={`${tarif.pdf}#toolbar=1&navpanes=0&scrollbar=1`}
            title={tarif.nama}
            className="w-full h-full"
            style={{ minHeight: "70vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalPdfViewer;
