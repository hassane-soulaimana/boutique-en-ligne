// Données simulées pour les commandes utilisateur
// Plus tard : ces données viendront de l'API backend

export const ordersData = [
  {
    id: 'CMD-001',
    date: '2025-11-15',
    statut: 'Livré',
    total: 149.99,
    produits: [
      {
        id: 'ech-001',
        nom: 'Échiquier Naruto - Konoha vs Akatsuki',
        quantite: 1,
        prix: 149.99
      }
    ]
  },
  {
    id: 'CMD-002',
    date: '2025-11-10',
    statut: 'En cours',
    total: 124.98,
    produits: [
      {
        id: 'acc-001',
        nom: 'Pendule d\'Échecs Hunter x Hunter',
        quantite: 1,
        prix: 34.99
      },
      {
        id: 'pce-001',
        nom: 'Set de Pièces Demon Slayer',
        quantite: 1,
        prix: 89.99
      }
    ]
  },
  {
    id: 'CMD-003',
    date: '2025-10-28',
    statut: 'Livré',
    total: 169.99,
    produits: [
      {
        id: 'ech-002',
        nom: 'Échiquier One Piece - Marines vs Pirates',
        quantite: 1,
        prix: 169.99
      }
    ]
  }
];

// Liste de favoris simulée (IDs de produits)
// Plus tard : stockée dans le backend lié au compte utilisateur
export const favoritesData = ['ech-001', 'pce-001', 'acc-003'];

export default ordersData;
