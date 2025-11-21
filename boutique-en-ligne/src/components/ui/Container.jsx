// Conteneur pour centrer et limiter la largeur du contenu
// Utilisé dans les pages pour avoir une mise en page cohérente

function Container({ children }) {
  const containerStyle = {
    maxWidth: '1200px',       // Largeur maximum
    margin: '0 auto',         // Centrer le conteneur
    padding: '0 1rem',        // Espacement sur les côtés
    width: '100%'             // Prend toute la largeur disponible (jusqu'à maxWidth)
  };

  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
}

export default Container;
