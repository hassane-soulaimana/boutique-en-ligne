// Outlet permet d'afficher les pages enfants (Home, Echiquiers, etc.)
import { Outlet } from 'react-router-dom';

// import Header from './Header'; // À décommenter quand Header sera créé par l'équipe
// import Footer from './Footer'; // À décommenter quand Footer sera créé par l'équipe

// Layout = Structure générale de toutes les pages
// Il affiche le Header, le contenu de la page, et le Footer
function Layout() {
  return (
    <div className="app-layout">
      {/* 
        ========== HEADER ========== 
        Géré par l'équipe - Header temporaire pour tester 
      */}
      <header style={{ 
        padding: '1rem', 
        background: '#FF6B35', 
        color: 'white',
        textAlign: 'center'
      }}>
        <h1>🎮 Échecs Manga - Header temporaire</h1>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Header/Footer gérés par l'équipe - En attente d'intégration
        </p>
      </header>

      {/* 
        ========== CONTENU PRINCIPAL ========== 
        Outlet affiche la page correspondant à l'URL
        Exemple : si l'URL est /echiquiers, Outlet affiche <Echiquiers />
      */}
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Outlet />
      </main>

      {/* 
        ========== FOOTER ========== 
        Géré par l'équipe - Footer temporaire pour tester 
      */}
      <footer style={{ 
        padding: '1rem', 
        background: '#333', 
        color: 'white',
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <p>© 2025 Échecs Manga - Footer temporaire</p>
      </footer>
    </div>
  );
}

export default Layout;
