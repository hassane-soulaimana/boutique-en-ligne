import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext.jsx";

import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { getTotalItems, favorites } = useContext(ShopContext);
  const cartCount = getTotalItems();
  const favCount = favorites.length;

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    
    checkAuth();
    // Écouter les changements de localStorage
    window.addEventListener("storage", checkAuth);
    
    // Vérifier périodiquement (pour les changements dans le même onglet)
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-stone-200 sticky top-0 z-50">

      {/* DESKTOP NAV */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center group">
          <img
            src={process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/logo.png' : 'logo.png'}
            alt="logo"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* DESKTOP LINKS */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-stone-800">

          <Link to="/" className="hover:text-black transition">Accueil</Link>

          {/* COLLECTIONS — CSS ONLY DROPDOWN */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-black transition">
              Collections
              <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>

            <div
              className="
                absolute left-0 top-full z-50 w-52 bg-white border border-stone-200 shadow-xl rounded-sm py-2
                opacity-0 scale-95 pointer-events-none
                group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                transition-all duration-150 origin-top
              "
            >
              <Link className="block px-4 py-2 text-sm hover:bg-stone-100" to="/collections/naruto">Naruto</Link>
              <Link className="block px-4 py-2 text-sm hover:bg-stone-100" to="/collections/ghibli">Studio Ghibli</Link>
              <Link className="block px-4 py-2 text-sm hover:bg-stone-100" to="/collections/demon-slayer">Demon Slayer</Link>
              <Link className="block px-4 py-2 text-sm hover:bg-stone-100" to="/collections/one-piece">One Piece</Link>
            </div>
          </div>

          <Link to="/echiquiers" className="hover:text-black transition">Échiquiers</Link>
          <Link to="/pieces" className="hover:text-black transition">Pièces d'échecs</Link>
          <Link to="/accessoires" className="hover:text-black transition">Accessoires</Link>
        </nav>

        {/* RIGHT ICONS */}
        <div className="hidden md:flex items-center gap-6 text-stone-700">

          <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer hover:text-black transition" />

          {/* USER — CSS ONLY DROPDOWN */}
          <div className="relative group">
            <UserIcon className="w-6 h-6 cursor-pointer hover:text-black transition" />

            <div
              className="
                absolute right-0 top-full z-50 w-48 bg-white border border-stone-200 shadow-lg rounded-sm py-2
                opacity-0 scale-95 pointer-events-none
                group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                transition-all duration-150 origin-top-right
              "
            >
              {!isLoggedIn ? (
                <>
                  <Link className="block px-4 py-2 text-sm hover:bg-orange-50" to="/connexion">Connexion</Link>
                  <Link className="block px-4 py-2 text-sm hover:bg-orange-50" to="/inscription">Inscription</Link>
                </>
              ) : (
                <>
                  <Link className="block px-4 py-2 text-sm hover:bg-orange-50" to="/profil">Mon Profil</Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                  >
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </div>

          {/* FAVORIS */}
          <Link to="/favoris" className="relative block hover:text-black transition">
            <HeartIcon className="w-6 h-6" />
            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>

          {/* PANIER */}
          <Link to="/panier" className="relative block hover:text-black transition">
            <ShoppingCartIcon className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* BURGER MENU */}
        <button className="md:hidden text-stone-700" onClick={() => setMenuOpen(true)}>
          <Bars3Icon className="w-7 h-7" />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`
          md:hidden fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-50 p-6
          transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-end mb-6">
          <XMarkIcon
            className="w-6 h-6 cursor-pointer hover:text-black"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* MOBILE MENU */}
        <nav className="flex flex-col gap-6 text-stone-700 text-lg">

          <Link to="/" onClick={() => setMenuOpen(false)} className="border-b pb-3">
            Accueil
          </Link>

          <details className="border-b pb-3">
            <summary className="cursor-pointer text-lg">Collections</summary>
            <div className="pl-4 flex flex-col gap-3 mt-3 text-base">
              <Link to="/collections/naruto" onClick={() => setMenuOpen(false)}>Naruto</Link>
              <Link to="/collections/ghibli" onClick={() => setMenuOpen(false)}>Studio Ghibli</Link>
              <Link to="/collections/naruto" onClick={() => setMenuOpen(false)}>Naruto</Link>
              <Link to="/collections/demonslayer" onClick={() => setMenuOpen(false)}>Demon Slayer</Link>
              <Link to="/collections/onepiece" onClick={() => setMenuOpen(false)}>One Piece</Link>
            </div>
          </details>

          <Link to="/echiquiers" onClick={() => setMenuOpen(false)} className="border-b pb-3">
            Échiquiers
          </Link>

          <Link to="/pieces" onClick={() => setMenuOpen(false)} className="border-b pb-3">
            Pièces d'échecs
          </Link>

          <Link to="/accessoires" onClick={() => setMenuOpen(false)} className="border-b pb-3">
            Accessoires
          </Link>

          <details className="border-b pb-3">
            <summary className="cursor-pointer">Utilisateur</summary>
            <div className="pl-4 flex flex-col gap-3 mt-3 text-base">
              {!isLoggedIn ? (
                <>
                  <Link to="/connexion" onClick={() => setMenuOpen(false)}>Connexion</Link>
                  <Link to="/inscription" onClick={() => setMenuOpen(false)}>Inscription</Link>
                </>
              ) : (
                <>
                  <Link to="/profil" onClick={() => setMenuOpen(false)}>Mon Profil</Link>
                  <button 
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="text-left text-red-600 hover:text-red-700"
                  >
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </details>

          <Link
            to="/favoris"
            className="flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <HeartIcon className="w-6 h-6" />
            Favoris
            {favCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>

          <Link
            to="/panier"
            className="flex items-center gap-3 mt-6"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCartIcon className="w-6 h-6" />
            Panier
            {cartCount > 0 && (
              <span className="ml-auto bg-orange-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
