// On importe React Router pour gérer la navigation
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// On importe le Layout (structure de base avec Header/Footer)
import App from '../App';

// On importe toutes nos pages
import Home from '../pages/Home';
import Echiquiers from '../pages/Echiquiers';
import Pieces from '../pages/Pieces';
import Accessoires from '../pages/Accessoires';
import Collections from '../pages/Collections';
import CollectionDetail from '../pages/CollectionDetail';
import ProductDetail from '../pages/ProductDetail';
import Connexion from '../pages/Connexion';
import Inscription from '../pages/Inscription';
import Profil from '../pages/Profil';
import NotFound from '../pages/NotFound';

// Composant qui gère toutes les routes de notre application
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route parente avec le Layout */}
        <Route path="/" element={<App />}>
          {/* Route d'accueil : / */}
          <Route index element={<Home />} />
          
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
          
          {/* Routes utilisateur */}
          <Route path="connexion" element={<Connexion />} />
          <Route path="inscription" element={<Inscription />} />
          <Route path="profil" element={<Profil />} />
          
          {/* Route 404 : toutes les autres URLs */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
