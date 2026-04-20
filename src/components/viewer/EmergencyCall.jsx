import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const EmergencyCall = () => {
  return (
    <div className="fixed bottom-6 right-6 z-9999">
      <a
        href="tel:02723392233"
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(220,38,38,0.5)] transition-all group hover:-translate-y-1"
      >
        <div className="bg-white text-red-600 rounded-full p-2 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
          <FaPhoneAlt className="text-lg relative z-10 group-hover:scale-110 transition-transform" />
        </div>
        <span className="hidden sm:block text-sm font-bold uppercase tracking-wider">Emergency Call</span>
      </a>
    </div>
  );
};

export default EmergencyCall;
