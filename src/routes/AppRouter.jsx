// On importe React Router pour gérer la navigation
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// On importe le CartProvider
import { CartProvider } from '../context/CartContext';

// On importe le Layout (structure de base avec Header/Footer)
import App from '../App';

// On importe toutes nos pages
import Home from '../pages/Home';
import About from '../pages/about';
import Contact from '../pages/contact';
import Echiquiers from '../pages/Echiquiers';
import Pieces from '../pages/Pieces';
import Accessoires from '../pages/Accessoires';
import Collections from '../pages/Collections';
import CollectionDetail from '../pages/CollectionDetail';
import ProductDetail from '../pages/ProductDetail';
import Connexion from '../pages/Connexion';
import Inscription from '../pages/Inscription';
import Profil from '../pages/Profil';
import Panier from '../pages/Panier';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

// Composant qui scroll vers le haut à chaque changement de page
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Composant qui gère toutes les routes de notre application
function AppRouter() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Route parente avec le Layout */}
          <Route path="/" element={<App />}>
            {/* Route d'accueil : / */}
            <Route index element={<Home />} />
            
            {/* Route à propos */}
            <Route path="about" element={<About />} />
            
            {/* Route contact */}
            <Route path="contact" element={<Contact />} />
            
            {/* Routes des catégories */}
            <Route path="echiquiers" element={<Echiquiers />} />
            <Route path="pieces" element={<Pieces />} />
            <Route path="accessoires" element={<Accessoires />} />
            
            {/* Routes des collections */}
            <Route path="collections" element={<Collections />} />
            {/* Route dynamique : :univers sera remplacé par naruto, one-piece, etc. */}
            <Route path="collections/:univers" element={<CollectionDetail />} />
            
            {/* Route dynamique pour le détail d'un produit : :id sera l'id du produit */}
            <Route path="produit/:id" element={<ProductDetail />} />
            
            {/* Route du panier */}
            <Route path="panier" element={<Panier />} />
            
            {/* Routes utilisateur */}
            <Route path="connexion" element={<Connexion />} />
            <Route path="inscription" element={<Inscription />} />
            <Route path="profil" element={<Profil />} />
            
            {/* Route admin */}
            <Route path="admin" element={<Admin />} />
            
            {/* Route 404 : toutes les autres URLs */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default AppRouter;
