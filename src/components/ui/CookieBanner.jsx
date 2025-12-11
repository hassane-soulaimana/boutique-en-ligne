import React, { useState } from "react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(() => {
    return localStorage.getItem("cookieConsent") !== "true";
  });

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
      <span className="text-gray-700 text-sm">
        Ce site utilise des cookies pour assurer son bon fonctionnement, mesurer l’audience et, le cas échéant, personnaliser votre expérience. En continuant, vous acceptez notre <a href="/confidentialite" className="underline hover:text-orange-600">politique de confidentialité</a>.
      </span>
      <button
        onClick={acceptCookies}
        className="bg-orange-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-orange-600 transition"
      >
        Accepter
      </button>
    </div>
  );
};

export default CookieBanner;
