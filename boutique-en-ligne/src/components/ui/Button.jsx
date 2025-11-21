// Composant bouton réutilisable
// On peut l'utiliser partout dans l'application pour garder un style cohérent

function Button({ children, onClick, variant = 'primary' }) {
  // Style de base pour tous les boutons
  const baseStyle = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s'
  };

  // Styles différents selon le type de bouton (primary, secondary, outline)
  const variants = {
    primary: {
      ...baseStyle,
      background: '#FF6B35',
      color: 'white'
    },
    secondary: {
      ...baseStyle,
      background: '#333',
      color: 'white'
    },
    outline: {
      ...baseStyle,
      background: 'transparent',
      color: '#FF6B35',
      border: '2px solid #FF6B35'
    }
  };

  return (
    <button 
      style={variants[variant]} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
