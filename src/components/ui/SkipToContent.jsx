import React from "react";

// Lien d'accessibilité "aller au contenu". On gère le clic à la main pour
// scroller sans changer l'URL (sinon le HashRouter croit que "#main-content"
// est une route et affiche la page 404).
const SkipToContent = () => {
  const handleClick = (e) => {
    e.preventDefault();
    const main = document.getElementById("main-content");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
      main.scrollIntoView();
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only absolute top-2 left-2 bg-amber-600 text-white px-4 py-2 rounded z-50 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      Aller au contenu principal
    </a>
  );
};

export default SkipToContent;
