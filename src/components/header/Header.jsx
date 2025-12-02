import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

// Heroicons
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">

      {/* ======================= */}
      {/*      DESKTOP HEADER     */}
      {/* ======================= */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LEFT — Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* CENTER — Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-black font-medium">

          {/* Accueil */}
          <Link to="/" className="hover:text-black">Accueil</Link>

          {/* Collections Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-black">
              Collections
              <span className="transition-transform duration-200 group-hover:rotate-180">▼</span>
            </button>

            <div
              className="
                absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2
                opacity-0 pointer-events-none translate-y-2
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

          <Link to="/echiquiers" className="hover:text-black">Échiquiers</Link>
          <Link to="/pieces" className="hover:text-black">Pièces d'échecs</Link>
          <Link to="/accessoires" className="hover:text-black">Accessoires</Link>
         
        </nav>

        {/* RIGHT — Icons */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer hover:text-black" />

          {/* User menu */}
          <div className="relative group">
            <UserIcon className="w-6 h-6 cursor-pointer hover:text-black" />

            <div
              className="
                absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-1
                opacity-0 pointer-events-none translate-y-2
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                transition-all duration-200
              "
            >
              <Link className="block px-4 py-3 hover:bg-orange-50 hover:text-orange-600 transition" to="/connexion">Connexion</Link>
              <Link className="block px-4 py-3 hover:bg-orange-50 hover:text-orange-600 transition" to="/inscription">Inscription</Link>
              <Link className="block px-4 py-3 border-t hover:bg-orange-50 hover:text-orange-600 transition" to="/profil">Mon Profil</Link>
            </div>
          </div>

          {/* Cart */}
          <Link to="/panier" className="relative block hover:text-black transition">
            <ShoppingCartIcon className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Burger — Mobile */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(true)}
        >
          <Bars3Icon className="w-7 h-7" />
        </button>
      </div>

      {/* ======================= */}
      {/*     MOBILE BACKDROP     */}
      {/* ======================= */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* ======================= */}
      {/*     MOBILE SIDEBAR      */}
      {/* ======================= */}
      <div
        className={`md:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="p-4 flex justify-end">
          <XMarkIcon
            className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Mobile Menu Content */}
        <nav className="flex flex-col gap-4 px-6 text-gray-700 overflow-y-auto pb-10">

          <Link to="/" onClick={() => setMenuOpen(false)} className="border-b pb-2">Accueil</Link>

          {/* Collections dropdown mobile */}
          <details className="border-b pb-2">
            <summary className="cursor-pointer hover:text-black">Collections</summary>
            <div className="pl-4 flex flex-col gap-2 mt-2">
              <Link to="/collections/naruto" onClick={() => setMenuOpen(false)}>Naruto</Link>
              <Link to="/collections/ghibli" onClick={() => setMenuOpen(false)}>Studio Ghibli</Link>
              <Link to="/collections/hxh" onClick={() => setMenuOpen(false)}>Hunter x Hunter</Link>
              <Link to="/collections/demonslayer" onClick={() => setMenuOpen(false)}>Demon Slayer</Link>
              <Link to="/collections/onepiece" onClick={() => setMenuOpen(false)}>One Piece</Link>
            </div>
          </details>

          <Link to="/echiquiers" className="border-b pb-2" onClick={() => setMenuOpen(false)}>Échiquiers</Link>
          <Link to="/pieces" className="border-b pb-2" onClick={() => setMenuOpen(false)}>Pièces d'échecs</Link>
          <Link to="/accessoires" className="border-b pb-2" onClick={() => setMenuOpen(false)}>Accessoires</Link>
      

          {/* Utilisateur */}
          <details className="border-b pb-2">
            <summary className="cursor-pointer hover:text-black">Utilisateur</summary>
            <div className="pl-4 flex flex-col gap-2 mt-2">
              <Link to="/connexion" onClick={() => setMenuOpen(false)}>Connexion</Link>
              <Link to="/inscription" onClick={() => setMenuOpen(false)}>Inscription</Link>
              <Link to="/profil" onClick={() => setMenuOpen(false)}>Mon Profil</Link>
            </div>
          </details>

          {/* Cart icon mobile */}
          <Link
            to="/panier"
            className="flex items-center gap-3 text-gray-700 mt-4"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCartIcon className="w-6 h-6" />
            <span>Panier</span>
            {cartCount > 0 && (
              <span className="bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
