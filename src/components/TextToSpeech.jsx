import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { FaVolumeUp, FaStop, FaPause, FaPlay } from "react-icons/fa";

const TextToSpeech = () => {
  const { pathname } = useLocation();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Load ResponsiveVoice script dynamically only when this component is mounted (PPID pages)
  useEffect(() => {
    const scriptId = "responsivevoice-script";
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://code.responsivevoice.org/responsivevoice.js?key=cm9mEMEL";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
      
      // Remove script and cleanup potential widgets added by ResponsiveVoice
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      
      // Try to remove any common elements added by ResponsiveVoice to the body
      const rvElements = document.querySelectorAll('script[src*="responsivevoice"], #rv-container, .responsivevoice-widget');
      rvElements.forEach(el => el.remove());
    };
  }, [pathname]);

  const handleSpeech = () => {
    if (!window.responsiveVoice) {
      console.error("ResponsiveVoice not loaded");
      return;
    }

    if (isSpeaking) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      return;
    }

    // Get text from main content area
    const mainContent = document.querySelector("main") || document.body;
    
    // Clean text: remove hidden elements if possible
    const text = mainContent.innerText
      .replace(/\s+/g, ' ')
      .trim();

    if (!text) return;

    window.responsiveVoice.speak(text, "Indonesian Female", {
      onstart: () => {
        setIsSpeaking(true);
        setIsPaused(false);
      },
      onend: () => {
        setIsSpeaking(false);
        setIsPaused(false);
      },
      onerror: (event) => {
        console.error("ResponsiveVoice error", event);
        setIsSpeaking(false);
        setIsPaused(false);
      }
    });
  };

  const handlePauseResume = () => {
    if (!window.responsiveVoice) return;
    
    if (isPaused) {
      window.responsiveVoice.resume();
      setIsPaused(false);
    } else {
      window.responsiveVoice.pause();
      setIsPaused(true);
    }
  };

  // Only show on PPID pages
  if (!pathname.startsWith("/ppid")) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col gap-3">
      {isSpeaking && (
        <button
          onClick={handlePauseResume}
          className="w-12 h-12 bg-white text-amber-500 rounded-full shadow-lg border border-amber-100 flex items-center justify-center hover:bg-amber-50 transition-all hover:scale-110 active:scale-95"
          title={isPaused ? "Lanjutkan Membaca" : "Jeda Membaca"}
        >
          {isPaused ? <FaPlay size={14} /> : <FaPause size={14} />}
        </button>
      )}
      <button
        onClick={handleSpeech}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group ${
          isSpeaking 
            ? "bg-red-500 text-white" 
            : "bg-amber-500 text-white hover:bg-amber-600"
        }`}
        title={isSpeaking ? "Berhenti Membaca" : "Baca Halaman Ini (Text to Speech)"}
      >
        {isSpeaking ? (
          <FaStop className="text-xl" />
        ) : (
          <div className="relative">
            <FaVolumeUp className="text-2xl" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        )}
        
        {/* Tooltip for desktop */}
        {!isSpeaking && (
          <div className="absolute right-full mr-4 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
            Baca Halaman Ini
          </div>
        )}
      </button>
    </div>
  );
};

export default TextToSpeech;
