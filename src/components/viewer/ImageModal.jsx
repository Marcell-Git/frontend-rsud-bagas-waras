import React from 'react';
import { FaSearchPlus, FaTimes } from 'react-icons/fa';

const ImageModal = ({ isOpen, imageUrl, onClose, title ="Dokumen Gambar" }) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 px-6 border-b border-gray-100 bg-gray-50/80 shrink-0">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <FaSearchPlus className="text-cyan-600" /> {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors focus:outline-none"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Modal Body / Fully Scrollable Image */}
        <div className="overflow-auto p-4 md:p-8 bg-gray-200/50 flex grow custom-scrollbar items-start justify-center">
          <img
            src={imageUrl}
            alt="Detail"
            className="max-w-none w-auto h-auto shadow-lg rounded-xl bg-white block"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
