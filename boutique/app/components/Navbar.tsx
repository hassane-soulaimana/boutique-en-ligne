import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300">
          MangaChess
        </Link>
        <div className="space-x-6">
          <Link href="/echiquiers" className="hover:text-yellow-400 transition">
            Échiquiers
          </Link>
          <Link href="/pieces" className="hover:text-yellow-400 transition">
            Pièces
          </Link>
          <Link href="/accessoires" className="hover:text-yellow-400 transition">
            Accessoires
          </Link>
          <div className="relative group inline-block">
            <button className="hover:text-yellow-400 transition focus:outline-none">
              Collections
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-10">
              <Link href="/collections/one-piece" className="block px-4 py-2 hover:bg-gray-100">One Piece</Link>
              <Link href="/collections/naruto" className="block px-4 py-2 hover:bg-gray-100">Naruto</Link>
              <Link href="/collections/dragon-ball" className="block px-4 py-2 hover:bg-gray-100">Dragon Ball</Link>
              <Link href="/collections/attack-on-titan" className="block px-4 py-2 hover:bg-gray-100">Attack on Titan</Link>
              <Link href="/collections/demon-slayer" className="block px-4 py-2 hover:bg-gray-100">Demon Slayer</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
