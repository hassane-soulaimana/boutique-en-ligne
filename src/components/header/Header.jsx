import { Link } from "react-router-dom";
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import logo from "./logo.png";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-300">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 text-sm font-medium">

          {/* Collections + sous-menu */}
          <div className="relative group">
            <span className="cursor-pointer hover:text-black">
              Collections
            </span>

            <div className="absolute hidden group-hover:block bg-white border shadow-lg p-3 rounded mt-2 w-40">
              <Link to="/collections/naruto" className="block py-1 hover:text-black">Naruto</Link>
              <Link to="/collections/ghibli" className="block py-1 hover:text-black">Ghibli</Link>
              <Link to="/collections/hxh" className="block py-1 hover:text-black">Hunter x Hunter</Link>
              <Link to="/collections/demonslayer" className="block py-1 hover:text-black">Demon Slayer</Link>
              <Link to="/collections/onepiece" className="block py-1 hover:text-black">One Piece</Link>
            </div>
          </div>

          <Link to="/echiquiers" className="hover:text-black">Échiquiers</Link>
          <Link to="/pieces" className="hover:text-black">Pièces d'échecs</Link>
          <Link to="/accessoires" className="hover:text-black">Accessoires</Link>
        </nav>

        {/* ICÔNES */}
        <div className="flex items-center gap-4 text-xl text-gray-700">
          <HiOutlineSearch />
          <HiOutlineUser />
          <HiOutlineShoppingCart />
        </div>
      </div>
    </header>
  );
}
