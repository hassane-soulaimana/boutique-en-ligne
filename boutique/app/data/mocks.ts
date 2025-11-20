export type ProductCategory = 'echiquier' | 'pieces' | 'accessoires';
export type ProductUnivers = 'one-piece' | 'naruto' | 'dragon-ball' | 'attack-on-titan' | 'demon-slayer';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  univers?: ProductUnivers;
  imageUrl: string;
  stock: number;
  rating: number;
  features: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Échiquier Thousand Sunny',
    description: 'Un échiquier magnifique inspiré du navire des Mugiwara. Les cases représentent les mers de Grand Line.',
    price: 180,
    category: 'echiquier',
    univers: 'one-piece',
    imageUrl: '/images/placeholder.jpg',
    stock: 12,
    rating: 4.8,
    features: ['Plateau en bois d\'érable', 'Pièces peintes à la main', 'Dimensions: 50x50cm', 'Coffret de rangement inclus']
  },
  {
    id: '2',
    name: 'Pièces Akatsuki',
    description: 'Set de pièces représentant les membres de l\'organisation Akatsuki. Le Roi est Pain, la Reine est Konan.',
    price: 95,
    category: 'pieces',
    univers: 'naruto',
    imageUrl: '/images/placeholder.jpg',
    stock: 25,
    rating: 4.5,
    features: ['Résine haute qualité', 'Hauteur du roi: 10cm', 'Finition mate', 'Certificat d\'authenticité']
  },
  {
    id: '3',
    name: 'Horloge Radar Dragon Ball',
    description: 'Horloge de tournoi stylisée comme le radar à Dragon Balls.',
    price: 55,
    category: 'accessoires',
    univers: 'dragon-ball',
    imageUrl: '/images/placeholder.jpg',
    stock: 50,
    rating: 4.2,
    features: ['Affichage digital', 'Sons officiels de l\'anime', 'Piles incluses', 'Mode tournoi officiel']
  },
  {
    id: '4',
    name: 'Échiquier Mur Maria',
    description: 'Plateau représentant les murs protégeant l\'humanité. Attention aux Titans colossaux !',
    price: 160,
    category: 'echiquier',
    univers: 'attack-on-titan',
    imageUrl: '/images/placeholder.jpg',
    stock: 8,
    rating: 4.9,
    features: ['Effet pierre réaliste', 'Pièces Titans vs Bataillon', 'Plateau surélevé', 'Matériaux durables']
  },
   {
    id: '5',
    name: 'Katana de Zenitsu (Ouvre-lettre)',
    description: 'Accessoire de bureau ou de décoration pour accompagner vos parties.',
    price: 30,
    category: 'accessoires',
    univers: 'demon-slayer',
    imageUrl: '/images/placeholder.jpg',
    stock: 100,
    rating: 4.0,
    features: ['Métal inoxydable', 'Longueur: 20cm', 'Support inclus', 'Réplique fidèle']
  },
  {
    id: '6',
    name: 'Pièces Z Fighters',
    description: 'Goku, Vegeta et les autres défenseurs de la terre.',
    price: 90,
    category: 'pieces',
    univers: 'dragon-ball',
    imageUrl: '/images/placeholder.jpg',
    stock: 15,
    rating: 4.6,
    features: ['Personnages en pose de combat', 'Socles pondérés', 'Compatible échiquier standard', 'Boîte collector']
  },
];

export const collections = [
    { id: 'one-piece', name: 'One Piece', description: 'L\'ère de la piraterie' },
    { id: 'naruto', name: 'Naruto', description: 'La voie du Ninja' },
    { id: 'dragon-ball', name: 'Dragon Ball', description: 'La quête des boules de cristal' },
    { id: 'attack-on-titan', name: 'L\'Attaque des Titans', description: 'Le combat pour la liberté' },
    { id: 'demon-slayer', name: 'Demon Slayer', description: 'Pourfendeurs de démons' },
];
