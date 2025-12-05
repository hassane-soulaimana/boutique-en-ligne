import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
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
import Favoris from "./pages/Favoris";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

import Header from "./components/header/Header";
import Footer from "./components/footer/footer";

import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/echiquiers" element={<Echiquiers />} />
          <Route path="/pieces" element={<Pieces />} />
          <Route path="/accessoires" element={<Accessoires />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:univers" element={<CollectionDetail />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}