import SkipToContent from "./components/ui/SkipToContent";
import Livraison from "./pages/Livraison";
import Retours from "./pages/Retours";
import Confidentialite from "./pages/Confidentialite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext.jsx";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CGV from "./pages/cgv";
import CGU from "./pages/CGU";
import MentionsLegales from "./pages/MentionsLegales";
import Echiquiers from "./pages/Echiquiers";
import Pieces from "./pages/Pieces";
import Accessoires from "./pages/Accessoires";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import ProductDetail from "./pages/ProductDetail";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Profil from "./pages/Profil";
import Panier from "./pages/Panier";
import Checkout from "./pages/Checkout";
import ConfirmationCommande from "./pages/ConfirmationCommande";
import Favoris from "./pages/Favoris";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CookieBanner from "./components/ui/CookieBanner";

import "./App.css";

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <SkipToContent />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/echiquiers" element={<Echiquiers />} />
          <Route path="/pieces" element={<Pieces />} />
          <Route path="/accessoires" element={<Accessoires />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:univers" element={<CollectionDetail />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/livraison" element={<Livraison />} />
          <Route path="/retours" element={<Retours />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation-commande" element={<ConfirmationCommande />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
        <CookieBanner />
      </Router>
    </ShopProvider>
  );
}