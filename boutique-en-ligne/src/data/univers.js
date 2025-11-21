// Liste des univers manga disponibles dans la boutique
// Chaque univers a un id, un nom, une description et une couleur

const univers = [
  {
    id: 'naruto',
    nom: 'Naruto',
    description: 'L\'univers des ninjas de Konoha avec Naruto, Sasuke et Kakashi',
    image: '/images/univers/naruto.jpg',
    couleur: '#FF6B35'
  },
  {
    id: 'one-piece',
    nom: 'One Piece',
    description: 'Les pirates du Chapeau de Paille à la recherche du trésor légendaire',
    image: '/images/univers/one-piece.jpg',
    couleur: '#E63946'
  },
  {
    id: 'dragon-ball',
    nom: 'Dragon Ball',
    description: 'Les guerriers Z et leurs combats épiques pour protéger la Terre',
    image: '/images/univers/dragon-ball.jpg',
    couleur: '#F77F00'
  },
  {
    id: 'death-note',
    nom: 'Death Note',
    description: 'Le duel d\'intelligence entre Light et L dans un univers sombre',
    image: '/images/univers/death-note.jpg',
    couleur: '#1A1A1A'
  },
  {
    id: 'attack-on-titan',
    nom: 'Attack on Titan',
    description: 'L\'humanité face aux titans dans un monde post-apocalyptique',
    image: '/images/univers/attack-on-titan.jpg',
    couleur: '#8B4513'
  },
  {
    id: 'demon-slayer',
    nom: 'Demon Slayer',
    description: 'Les pourfendeurs de démons dans le Japon de l\'ère Taisho',
    image: '/images/univers/demon-slayer.jpg',
    couleur: '#2A9D8F'
  },
  {
    id: 'my-hero-academia',
    nom: 'My Hero Academia',
    description: 'Les héros en formation de l\'Académie Yuei',
    image: '/images/univers/my-hero-academia.jpg',
    couleur: '#264653'
  },
  {
    id: 'hunter-x-hunter',
    nom: 'Hunter x Hunter',
    description: 'Les aventures de Gon et ses amis dans le monde des Hunters',
    image: '/images/univers/hunter-x-hunter.jpg',
    couleur: '#06A77D'
  }
];

// On exporte la liste pour l'utiliser dans d'autres fichiers
export default univers;
