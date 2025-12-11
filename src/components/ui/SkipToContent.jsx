import React from "react";

const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only absolute top-2 left-2 bg-amber-600 text-white px-4 py-2 rounded z-50 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-amber-400"
    tabIndex={0}
  >
    Aller au contenu principal
  </a>
);

export default SkipToContent;
