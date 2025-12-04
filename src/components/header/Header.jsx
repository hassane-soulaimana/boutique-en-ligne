import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.jsx";

import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-stone-200 sticky top-0 z-50">

      {/* DESKTOP NAV */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center group">
          <img
            src="/logo.png"
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
              <Link className="block px-4 py-2 text-sm hover:bg-stone-100" to="/collections/hxh">Hunter x Hunter</Link>
              <Link className="block px-4 py-2 text-sm hover:bg-stone-100" to="/collections/demonslayer">Demon Slayer</Link>
              <Link className="block px-4 py-2 text-sm hover:bg-stone-100" to="/collections/onepiece">One Piece</Link>
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
              <Link className="block px-4 py-2 text-sm hover:bg-orange-50" to="/connexion">Connexion</Link>
              <Link className="block px-4 py-2 text-sm hover:bg-orange-50" to="/inscription">Inscription</Link>
              <Link className="block px-4 py-2 text-sm border-t hover:bg-orange-50" to="/profil">Mon Profil</Link>
            </div>
          </div>

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
              <Link to="/collections/hxh" onClick={() => setMenuOpen(false)}>Hunter x Hunter</Link>
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
              <Link to="/connexion" onClick={() => setMenuOpen(false)}>Connexion</Link>
              <Link to="/inscription" onClick={() => setMenuOpen(false)}>Inscription</Link>
              <Link to="/profil" onClick={() => setMenuOpen(false)}>Mon Profil</Link>
            </div>
          </details>

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
