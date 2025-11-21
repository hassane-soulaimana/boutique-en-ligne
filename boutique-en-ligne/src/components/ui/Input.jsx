// Composant Input réutilisable pour les formulaires

function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  required = false,
  error 
}) {
  const containerStyle = {
    marginBottom: '1rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: `2px solid ${error ? '#E63946' : '#ddd'}`,
    borderRadius: '4px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const errorStyle = {
    color: '#E63946',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label} {required && <span style={{ color: '#E63946' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

export default Input;
