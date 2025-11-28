import { useState } from "react";
import { Link } from "react-router-dom";

// Heroicons (solid = bold)
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

// Feather Icons (pour menu burger uniquement)
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">

      {/* NAVBAR DESKTOP */}
      <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">

        {/* LEFT - LOGO */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* CENTER NAV (desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-black font-medium">

          {/* Collections Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-black">
              Collections
              <span className="transition-transform duration-200 group-hover:rotate-180">
                ▼
              </span>
            </button>

            <div
              className="
                absolute left-0 top-full mt-0 w-40 bg-white border border-gray-200 shadow-md rounded-md py-2
                opacity-0 pointer-events-none translate-y-1
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                transition-all duration-200
              "
            >
              <Link className="block px-4 py-2 hover:bg-gray-100" to="/collections/naruto">Naruto</Link>
              <Link className="block px-4 py-2 hover:bg-gray-100" to="/collections/ghibli">Studio Ghibli</Link>
              <Link className="block px-4 py-2 hover:bg-gray-100" to="/collections/hxh">Hunter x Hunter</Link>
              <Link className="block px-4 py-2 hover:bg-gray-100" to="/collections/demonslayer">Demon Slayer</Link>
              <Link className="block px-4 py-2 hover:bg-gray-100" to="/collections/onepiece">One Piece</Link>
            </div>
          </div>

          <span className="w-px h-6 bg-gray-300"></span>

          <Link className="hover:text-black" to="/echiquiers">Échiquiers</Link>
          <Link className="hover:text-black" to="/pieces">Pièces d'échecs</Link>
          <Link className="hover:text-black" to="/accessoires">Accessoires</Link>
          <Link className="hover:text-black" to="/about">À propos</Link>
          <Link className="hover:text-black" to="/contact">Contact</Link>
        </nav>

        {/* RIGHT ICONS (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer hover:text-black" />
          <div className="relative group">
            <UserIcon className="w-6 h-6 cursor-pointer hover:text-black group-hover:text-black" />
            <div
              className="
                absolute right-0 top-full mt-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-1
                opacity-0 pointer-events-none invisible -translate-y-2
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0
                transition-all duration-200
              "
            >
              <Link className="block px-4 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition" to="/connexion">Connexion</Link>
              <Link className="block px-4 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition" to="/inscription">Inscription</Link>
              <Link className="block px-4 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition border-t" to="/profil">Mon Profil</Link>
            </div>
          </div>
          <ShoppingCartIcon className="w-6 h-6 cursor-pointer hover:text-black" />
        </div>

        {/* BURGER (mobile) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu size={28} />
        </button>
      </div>

      {/* MOBILE BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`md:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* CLOSE BTN */}
        <div className="p-4 flex justify-end">
          <FiX size={26} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>

        {/* MOBILE NAV */}
        <nav className="flex flex-col gap-4 px-6 text-gray-700">

          <details className="border-b pb-2">
            <summary className="cursor-pointer hover:text-black">Collections</summary>
            <div className="pl-4 flex flex-col gap-2 mt-2">
              <Link to="/collections/naruto">Naruto</Link>
              <Link to="/collections/ghibli">Studio Ghibli</Link>
              <Link to="/collections/hxh">Hunter x Hunter</Link>
              <Link to="/collections/demonslayer">Demon Slayer</Link>
              <Link to="/collections/onepiece">One Piece</Link>
            </div>
          </details>

          <Link className="border-b pb-2" to="/echiquiers">Échiquiers</Link>
          <Link className="border-b pb-2" to="/pieces">Pièces d'échecs</Link>
          <Link className="border-b pb-2" to="/accessoires">Accessoires</Link>
          <Link className="border-b pb-2" to="/about">À propos</Link>
          <Link className="border-b pb-2" to="/contact">Contact</Link>
          
          <details className="border-b pb-2">
            <summary className="cursor-pointer hover:text-black">Utilisateur</summary>
            <div className="pl-4 flex flex-col gap-2 mt-2">
              <Link to="/connexion">Connexion</Link>
              <Link to="/inscription">Inscription</Link>
              <Link to="/profil">Mon Profil</Link>
            </div>
          </details>
        </nav>

        {/* MOBILE ICONS */}
        <div className="px-6 mt-6 flex gap-6 text-gray-700">
          <MagnifyingGlassIcon className="w-6 h-6" />
          <UserIcon className="w-6 h-6" />
          <ShoppingCartIcon className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
}
