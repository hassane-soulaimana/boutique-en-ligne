import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      {/* NAVBAR DESKTOP */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT - LOGO */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* CENTER - NAV LINKS (desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700">

         {/* Collections - hover dropdown */}
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
        </nav>

        {/* RIGHT - ICONS (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <FiSearch size={20} className="cursor-pointer hover:text-black" />
          <FiUser size={20} className="cursor-pointer hover:text-black" />
          <FiShoppingCart size={20} className="cursor-pointer hover:text-black" />
        </div>

        {/* BURGER (mobile) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu size={28} />
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="p-4 flex justify-end">
          <FiX size={26} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>

        {/* Mobile links */}
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
          <Link className="" to="/pieces">Pièces d'échecs</Link>
          <Link className="" to="/accessoires">Accessoires</Link>
        </nav>

        {/* Icons at bottom */}
        <div className="px-6 mt-6 flex gap-6 text-gray-700">
          <FiSearch size={22} />
          <FiUser size={22} />
          <FiShoppingCart size={22} />
        </div>
      </div>
    </header>
  );
}
