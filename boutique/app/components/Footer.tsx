const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">
          &copy; {new Date().getFullYear()} MangaChess. L'alliance ultime de la stratégie et de vos animes préférés.
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:text-white transition">Mentions Légales</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Livraison</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
