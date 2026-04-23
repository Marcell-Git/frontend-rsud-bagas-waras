import { useEffect } from "react";
import { useLocation } from "react-router";

const AccessibilityManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isAdmin = pathname.startsWith("/admin");
    const isAuth = pathname.startsWith("/auth");
    
    const existingScript = document.querySelector('script[src*="sienna-accessibility"]');
    
    // We'll look for common selectors used by Sienna.
    const widgetSelectors = [
      ".sienna-accessibility-widget", 
      "#sienna-accessibility-widget",
      ".sienna-widget",
      ".sienna-container"
    ];

    const findWidget = () => {
      for (const selector of widgetSelectors) {
        const el = document.querySelector(selector);
        if (el) return el;
      }
      return null;
    };

    if (isAdmin || isAuth) {
      // Hide widget if on admin path
      const widget = findWidget();
      if (widget) {
        widget.style.setProperty("display", "none", "important");
      }
    } else {
      // Show widget if on other paths
      const widget = findWidget();
      if (widget) {
        widget.style.setProperty("display", "block", "important");
      } else if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js";
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [pathname]);

  return null;
};

export default AccessibilityManager;
