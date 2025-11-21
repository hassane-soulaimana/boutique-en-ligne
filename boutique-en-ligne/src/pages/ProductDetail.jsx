// useParams permet de récupérer les paramètres de l'URL
// Exemple : si l'URL est /produit/ech-001, useParams() retourne { id: 'ech-001' }
import { useParams } from 'react-router-dom';

function ProductDetail() {
  // On récupère le paramètre 'id' depuis l'URL
  const { id } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Détail du Produit</h1>
      <p>Produit ID: {id}</p>
      <p>Ici on affichera toutes les infos du produit (nom, prix, images, etc.)</p>
    </div>
  );
}

export default ProductDetail;
