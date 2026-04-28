import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const EmergencyCall = () => {
  return (
    <div className="fixed bottom-6 right-6 z-9999">
      <a
        href="tel:02723392233"
        className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-[0_4px_20px_rgba(220,38,38,0.5)] transition-all group hover:-translate-y-1"
      >
        <div className="bg-white text-red-600 rounded-full p-2 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
          <FaPhoneAlt className="text-lg relative z-10 group-hover:scale-110 transition-transform" />
        </div>
      </a>
    </div>
  );
};

export default EmergencyCall;
