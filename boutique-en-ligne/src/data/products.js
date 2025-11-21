// Catalogue de tous les produits de la boutique
// 3 catégories : 'echiquier', 'piece', 'accessoire'
// Chaque produit a un id unique, un nom, un prix, etc.

const products = [
  // ÉCHIQUIERS
  {
    id: 'ech-001',
    nom: 'Échiquier Naruto - Konoha vs Akatsuki',
    categorie: 'echiquier',
    univers: 'naruto',
    prix: 149.99,
    images: [
      '/images/products/echiquiers/naruto-konoha.jpg',
      '/images/products/echiquiers/naruto-konoha-detail.jpg'
    ],
    imageAlt: 'Échiquier Naruto avec pièces Konoha et Akatsuki',
    description: 'Magnifique échiquier en bois représentant l\'affrontement épique entre les ninjas de Konoha et l\'organisation Akatsuki. Chaque pièce est finement sculptée à l\'effigie des personnages emblématiques.',
    caracteristiques: {
      materiau: 'Bois de hêtre et résine peinte',
      dimensions: '45x45cm',
      poids: '2.8kg',
      contenu: 'Échiquier + 32 pièces personnalisées'
    },
    enStock: true,
    nouveaute: true,
    promotion: null
  },
  {
    id: 'ech-002',
    nom: 'Échiquier One Piece - Marines vs Pirates',
    categorie: 'echiquier',
    univers: 'one-piece',
    prix: 169.99,
    images: [
      '/images/products/echiquiers/one-piece-marines.jpg',
      '/images/products/echiquiers/one-piece-detail.jpg'
    ],
    imageAlt: 'Échiquier One Piece Marines contre Pirates',
    description: 'Revivez les batailles épiques de One Piece avec cet échiquier opposant la Marine et les équipages de pirates légendaires. Les pièces représentent Luffy, Zoro, Akainu et bien d\'autres.',
    caracteristiques: {
      materiau: 'Résine haute qualité peinte à la main',
      dimensions: '50x50cm',
      poids: '3.2kg',
      contenu: 'Plateau + 32 figurines détaillées'
    },
    enStock: true,
    nouveaute: true,
    promotion: null
  },
  {
    id: 'ech-003',
    nom: 'Échiquier Dragon Ball Z - Saiyans vs Freezer',
    categorie: 'echiquier',
    univers: 'dragon-ball',
    prix: 159.99,
    images: [
      '/images/products/echiquiers/dbz-saiyans.jpg'
    ],
    imageAlt: 'Échiquier Dragon Ball Z',
    description: 'L\'affrontement ultime entre les Guerriers Z et les forces de Freezer. Pièces représentant Goku, Vegeta, Piccolo face à Freezer et ses sbires.',
    caracteristiques: {
      materiau: 'PVC haute densité peint',
      dimensions: '48x48cm',
      poids: '3.0kg',
      contenu: 'Échiquier thématique + 32 pièces'
    },
    enStock: true,
    nouveaute: false,
    promotion: 10
  },
  {
    id: 'ech-004',
    nom: 'Échiquier Death Note - Light vs L',
    categorie: 'echiquier',
    univers: 'death-note',
    prix: 139.99,
    images: [
      '/images/products/echiquiers/death-note.jpg'
    ],
    imageAlt: 'Échiquier Death Note style minimaliste',
    description: 'Un échiquier élégant et sombre inspiré du duel intellectuel entre Light et L. Design minimaliste avec symboles du Death Note.',
    caracteristiques: {
      materiau: 'Bois laqué noir et blanc',
      dimensions: '40x40cm',
      poids: '2.5kg',
      contenu: 'Plateau en bois + pièces en métal'
    },
    enStock: true,
    nouveaute: false,
    promotion: null
  },

  // PIÈCES
  {
    id: 'pce-001',
    nom: 'Set de Pièces Demon Slayer',
    categorie: 'piece',
    univers: 'demon-slayer',
    prix: 89.99,
    images: [
      '/images/products/pieces/demon-slayer-set.jpg'
    ],
    imageAlt: 'Set de 32 pièces Demon Slayer',
    description: 'Ensemble de 32 pièces d\'échecs représentant les Pourfendeurs de Démons et les Lunes Supérieures. Compatible avec tous les échiquiers standards.',
    caracteristiques: {
      materiau: 'Résine peinte',
      hauteurRoi: '9cm',
      poids: '1.2kg',
      contenu: '32 pièces personnalisées'
    },
    enStock: true,
    nouveaute: true,
    promotion: null
  },
  {
    id: 'pce-002',
    nom: 'Pièces Attack on Titan - Régiment d\'Exploration',
    categorie: 'piece',
    univers: 'attack-on-titan',
    prix: 79.99,
    images: [
      '/images/products/pieces/aot-pieces.jpg'
    ],
    imageAlt: 'Pièces Attack on Titan',
    description: 'Pièces représentant Eren, Mikasa, Levi et le Régiment d\'Exploration face aux Titans. Détails impressionnants.',
    caracteristiques: {
      materiau: 'PVC haute qualité',
      hauteurRoi: '8.5cm',
      poids: '1.0kg',
      contenu: '32 pièces'
    },
    enStock: false,
    nouveaute: false,
    promotion: null
  },
  {
    id: 'pce-003',
    nom: 'Set My Hero Academia - Héros vs Vilains',
    categorie: 'piece',
    univers: 'my-hero-academia',
    prix: 94.99,
    images: [
      '/images/products/pieces/mha-heroes.jpg'
    ],
    imageAlt: 'Pièces My Hero Academia',
    description: 'All Might, Deku, Bakugo et les héros de la classe 1-A affrontent All for One et la Ligue des Vilains sur votre échiquier.',
    caracteristiques: {
      materiau: 'Résine peinte à la main',
      hauteurRoi: '10cm',
      poids: '1.4kg',
      contenu: '32 figurines détaillées'
    },
    enStock: true,
    nouveaute: false,
    promotion: 15
  },

  // ACCESSOIRES
  {
    id: 'acc-001',
    nom: 'Pendule d\'Échecs Hunter x Hunter',
    categorie: 'accessoire',
    univers: 'hunter-x-hunter',
    prix: 34.99,
    images: [
      '/images/products/accessoires/hxh-pendule.jpg'
    ],
    imageAlt: 'Pendule électronique Hunter x Hunter',
    description: 'Pendule d\'échecs électronique aux couleurs de Hunter x Hunter. Écran LCD, plusieurs modes de jeu, alarmes sonores.',
    caracteristiques: {
      type: 'Pendule numérique',
      materiau: 'Plastique ABS',
      fonctions: 'Compte à rebours, bonus, alarmes',
      alimentation: '2 piles AAA (non fournies)'
    },
    enStock: true,
    nouveaute: false,
    promotion: null
  },
  {
    id: 'acc-002',
    nom: 'Sac de Transport Naruto',
    categorie: 'accessoire',
    univers: 'naruto',
    prix: 24.99,
    images: [
      '/images/products/accessoires/naruto-bag.jpg'
    ],
    imageAlt: 'Sac de transport pour échiquier Naruto',
    description: 'Sac de transport robuste aux couleurs de Naruto. Compartiments séparés pour l\'échiquier et les pièces. Logo Konoha brodé.',
    caracteristiques: {
      materiau: 'Toile renforcée',
      dimensions: '52x52x8cm',
      capacite: 'Échiquier jusqu\'à 50cm + pièces',
      details: 'Bandoulière ajustable, poches intérieures'
    },
    enStock: true,
    nouveaute: false,
    promotion: null
  },
  {
    id: 'acc-003',
    nom: 'Tapis de Jeu One Piece - Grand Line',
    categorie: 'accessoire',
    univers: 'one-piece',
    prix: 29.99,
    images: [
      '/images/products/accessoires/one-piece-mat.jpg'
    ],
    imageAlt: 'Tapis de jeu One Piece',
    description: 'Tapis de jeu souple illustrant la carte de Grand Line. Protection optimale pour votre échiquier et surface de jeu agréable.',
    caracteristiques: {
      materiau: 'Néoprène antidérapant',
      dimensions: '60x60cm',
      epaisseur: '3mm',
      entretien: 'Lavable en surface'
    },
    enStock: true,
    nouveaute: true,
    promotion: null
  },
  {
    id: 'acc-004',
    nom: 'Livre "Tactiques d\'Échecs" Dragon Ball',
    categorie: 'accessoire',
    univers: 'dragon-ball',
    prix: 19.99,
    images: [
      '/images/products/accessoires/dbz-book.jpg'
    ],
    imageAlt: 'Livre tactiques échecs Dragon Ball',
    description: 'Guide stratégique illustré avec les personnages de Dragon Ball. 150 pages d\'exercices tactiques et combinaisons célèbres.',
    caracteristiques: {
      format: 'Broché 21x29.7cm',
      pages: '150 pages couleur',
      niveau: 'Débutant à intermédiaire',
      langue: 'Français'
    },
    enStock: true,
    nouveaute: false,
    promotion: null
  },
  {
    id: 'acc-005',
    nom: 'Support de Pièces Death Note',
    categorie: 'accessoire',
    univers: 'death-note',
    prix: 39.99,
    images: [
      '/images/products/accessoires/death-note-holder.jpg'
    ],
    imageAlt: 'Support rangement pièces Death Note',
    description: 'Boîte de rangement élégante en bois noir avec compartiments individuels pour chaque pièce. Design minimaliste Death Note.',
    caracteristiques: {
      materiau: 'Bois laqué noir',
      dimensions: '35x20x8cm',
      capacite: '32 pièces jusqu\'à 10cm',
      interieur: 'Velours noir'
    },
    enStock: true,
    nouveaute: false,
    promotion: null
  },
  {
    id: 'acc-006',
    nom: 'Set de Stickers Demon Slayer',
    categorie: 'accessoire',
    univers: 'demon-slayer',
    prix: 9.99,
    images: [
      '/images/products/accessoires/demon-slayer-stickers.jpg'
    ],
    imageAlt: 'Stickers décoratifs Demon Slayer',
    description: 'Pack de 50 stickers haute qualité pour personnaliser votre échiquier, sac ou accessoires. Résistants à l\'eau.',
    caracteristiques: {
      quantite: '50 stickers',
      tailles: 'Variées 3-8cm',
      materiau: 'Vinyle waterproof',
      application: 'Toutes surfaces lisses'
    },
    enStock: true,
    nouveaute: true,
    promotion: null
  }
];

// On exporte la liste de produits
export default products;
