// useParams permet de récupérer les paramètres de l'URL
// Exemple : si l'URL est /collections/naruto, useParams() retourne { univers: 'naruto' }
import { useParams } from 'react-router-dom';

function CollectionDetail() {
  // On récupère le paramètre 'univers' depuis l'URL
  const { univers } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Collection : {univers}</h1>
      <p>Produits de l'univers {univers}</p>
    </div>
  );
}

export default CollectionDetail;
