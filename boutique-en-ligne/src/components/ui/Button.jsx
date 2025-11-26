// Composant bouton réutilisable
// On peut l'utiliser partout dans l'application pour garder un style cohérent

function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  type = 'button',      // Type du bouton (button, submit)
  disabled = false,     // Bouton désactivé ou non
  style = {}           // Styles personnalisés supplémentaires
}) {
  // Style de base pour tous les boutons
  const baseStyle = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
    opacity: disabled ? 0.6 : 1
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
      type={type}
      style={{ ...variants[variant], ...style }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
