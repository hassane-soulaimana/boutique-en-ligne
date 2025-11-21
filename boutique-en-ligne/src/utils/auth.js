// Fonctions d'authentification
// Pour l'instant avec localStorage (données locales)
// Plus tard : remplacer par des appels API vers le backend

// Fonction de connexion
// Pour l'instant : vérifie les données simulées
// Plus tard : faire un POST vers /api/auth/login
export const login = async (email, password) => {
  // TODO: Remplacer par appel API
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // });
  // const data = await response.json();

  // Simulation : utilisateur de test
  if (email === 'test@manga-chess.com' && password === 'password') {
    const user = {
      id: '1',
      nom: 'Uzumaki',
      prenom: 'Naruto',
      email: 'test@manga-chess.com',
      telephone: '06 12 34 56 78',
      adresse: '12 rue de Konoha',
      ville: 'Paris',
      codePostal: '75001'
    };
    
    // On stocke l'utilisateur dans localStorage (simulation de session)
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true, user };
  }
  
  return { success: false, message: 'Email ou mot de passe incorrect' };
};

// Fonction d'inscription
// Pour l'instant : stocke juste dans localStorage
// Plus tard : faire un POST vers /api/auth/register
export const register = async (userData) => {
  // TODO: Remplacer par appel API
  // const response = await fetch('/api/auth/register', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(userData)
  // });

  // Simulation : on crée l'utilisateur directement
  const newUser = {
    id: Date.now().toString(),
    ...userData
  };
  
  localStorage.setItem('user', JSON.stringify(newUser));
  return { success: true, user: newUser };
};

// Fonction de déconnexion
export const logout = () => {
  // TODO: Si besoin, appeler l'API pour invalider le token
  // await fetch('/api/auth/logout', { method: 'POST' });
  
  localStorage.removeItem('user');
  return { success: true };
};

// Récupérer l'utilisateur connecté
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
