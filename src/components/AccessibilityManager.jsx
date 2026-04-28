import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { MdAccessible } from "react-icons/md";

const AccessibilityManager = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isAdmin = pathname.startsWith("/admin");
    const isAuth = pathname.startsWith("/auth");
    
    setIsVisible(!isAdmin && !isAuth);

    const existingScript = document.querySelector('script[src*="sienna-accessibility"]');
    
    if (!isAdmin && !isAuth && !existingScript) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js";
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [pathname]);

  const toggleSienna = () => {
    // Try different possible selectors for the Sienna trigger
    const selectors = [
      ".sienna-accessibility-widget",
      "#sienna-accessibility-widget",
      ".asw-menu-btn",
      ".sienna-widget",
      "[aria-label='Accessibility Menu']",
      "button[title*='Accessibility']"
    ];

    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el) {
        el.click();
        return;
      }
    }
    // If not found, it might be because the script hasn't loaded or initialized yet
    console.warn("Sienna widget trigger not found");
  };

  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          .sienna-accessibility-widget, 
          #sienna-accessibility-widget,
          .asw-menu-btn,
          .sienna-widget {
            display: none !important;
          }
        `}
      </style>
      
      <button
        onClick={toggleSienna}
        className="fixed bottom-24 right-6 z-9999 bg-primary-blue hover:bg-secondary-blue text-white p-2 rounded-full shadow-[0_4px_20px_rgba(2,138,162,0.5)] transition-all group hover:-translate-y-1 flex items-center justify-center"
        title="Menu Aksesibilitas"
        aria-label="Menu Aksesibilitas"
      >
        <div className="bg-white text-primary-blue rounded-full p-1 flex items-center justify-center relative">
          <MdAccessible className="text-4xl relative z-10 group-hover:scale-110 transition-transform" />
        </div>
      </button>
    </>
  );
};

export default AccessibilityManager;
