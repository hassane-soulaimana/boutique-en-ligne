// Page de profil utilisateur avec onglets
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/product/ProductCard';
import { getCurrentUser, logout, isAuthenticated } from '../utils/auth';
import ordersData, { favoritesData } from '../data/orders';
import products from '../data/products';

function Profil() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('infos'); // Onglet actif
  const [user, setUser] = useState(null);

  // Quand la page charge, on vérifie si l'utilisateur est connecté
  useEffect(() => {
    if (!isAuthenticated()) {
      // Si pas connecté, on redirige vers la page de connexion
      navigate('/connexion');
      return;
    }
    setUser(getCurrentUser());
  }, [navigate]);

  // Fonction de déconnexion
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Si pas d'utilisateur chargé, on affiche rien
  if (!user) {
    return null;
  }

  // Récupérer les produits favoris
  const favoriteProducts = products.filter(p => favoritesData.includes(p.id));

  const tabsContainerStyle = {
    display: 'flex',
    borderBottom: '2px solid #ddd',
    marginBottom: '2rem',
    gap: '1rem'
  };

  const tabStyle = (isActive) => ({
    padding: '1rem 2rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '1rem',
    color: isActive ? '#FF6B35' : '#666',
    borderBottom: isActive ? '3px solid #FF6B35' : 'none',
    marginBottom: '-2px'
  });

  const sectionStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    border: '1px solid #ddd'
  };

  const infoRowStyle = {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    padding: '1rem 0',
    borderBottom: '1px solid #f0f0f0'
  };

  const orderCardStyle = {
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '1rem'
  };

  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        {/* En-tête avec nom et bouton déconnexion */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>
            Bonjour {user.prenom} ! 👋
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Se déconnecter
          </Button>
        </div>

        {/* Onglets */}
        <div style={tabsContainerStyle}>
          <button 
            style={tabStyle(activeTab === 'infos')}
            onClick={() => setActiveTab('infos')}
          >
            Mes informations
          </button>
          <button 
            style={tabStyle(activeTab === 'commandes')}
            onClick={() => setActiveTab('commandes')}
          >
            Mes commandes
          </button>
          <button 
            style={tabStyle(activeTab === 'favoris')}
            onClick={() => setActiveTab('favoris')}
          >
            Mes favoris
          </button>
        </div>

        {/* Contenu selon l'onglet actif */}
        
        {/* ONGLET INFOS */}
        {activeTab === 'infos' && (
          <div style={sectionStyle}>
            <h2 style={{ marginBottom: '1.5rem' }}>Informations personnelles</h2>
            
            <div style={infoRowStyle}>
              <strong>Nom :</strong>
              <span>{user.nom}</span>
            </div>
            <div style={infoRowStyle}>
              <strong>Prénom :</strong>
              <span>{user.prenom}</span>
            </div>
            <div style={infoRowStyle}>
              <strong>Email :</strong>
              <span>{user.email}</span>
            </div>
            <div style={infoRowStyle}>
              <strong>Téléphone :</strong>
              <span>{user.telephone}</span>
            </div>
            <div style={infoRowStyle}>
              <strong>Adresse :</strong>
              <span>{user.adresse}</span>
            </div>
            <div style={infoRowStyle}>
              <strong>Ville :</strong>
              <span>{user.ville}</span>
            </div>
            <div style={infoRowStyle}>
              <strong>Code postal :</strong>
              <span>{user.codePostal}</span>
            </div>

            <Button style={{ marginTop: '2rem' }}>
              Modifier mes informations
            </Button>
          </div>
        )}

        {/* ONGLET COMMANDES */}
        {activeTab === 'commandes' && (
          <div style={sectionStyle}>
            <h2 style={{ marginBottom: '1.5rem' }}>Historique des commandes</h2>
            
            {ordersData.map(order => (
              <div key={order.id} style={orderCardStyle}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem' }}>Commande {order.id}</strong>
                    <p style={{ margin: '0.5rem 0', color: '#666' }}>
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <Badge color={order.statut === 'Livré' ? '#2A9D8F' : '#F77F00'}>
                    {order.statut}
                  </Badge>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  {order.produits.map((produit, index) => (
                    <p key={index} style={{ margin: '0.5rem 0', color: '#666' }}>
                      {produit.nom} x{produit.quantite} - {produit.prix.toFixed(2)} €
                    </p>
                  ))}
                </div>

                <div style={{ 
                  paddingTop: '1rem', 
                  borderTop: '1px solid #ddd',
                  fontWeight: 'bold'
                }}>
                  Total : {order.total.toFixed(2)} €
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ONGLET FAVORIS */}
        {activeTab === 'favoris' && (
          <div style={sectionStyle}>
            <h2 style={{ marginBottom: '1.5rem' }}>Mes produits favoris</h2>
            
            {favoriteProducts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                Vous n'avez pas encore de favoris.
              </p>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                {favoriteProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Profil;
