// Badge pour afficher des infos comme la catégorie ou l'univers d'un produit
// Exemple : "Naruto", "Échiquier", "Nouveauté", etc.

function Badge({ children, color = '#FF6B35' }) {
  const badgeStyle = {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500',
    backgroundColor: color,
    color: 'white'
  };

  return (
    <span style={badgeStyle}>
      {children}
    </span>
  );
}

export default Badge;
