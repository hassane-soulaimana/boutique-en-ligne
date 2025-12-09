/**
 * Image Loader Service
 * Gère le chargement des images avec fallbacks et gestion d'URL complète
 */

import API_URL from './api';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300?text=Image+non+disponible';

/**
 * Retourne l'URL de l'image avec vérification et complétion
 * @param {string} imageUrl - URL de l'image depuis l'API
 * @returns {string} URL de l'image valide
 */
export const getImageUrl = (imageUrl) => {
  // Si pas d'URL, retourner le placeholder
  if (!imageUrl) {
    return PLACEHOLDER_IMAGE;
  }

  // Si l'URL est déjà complète (http/https)
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // Si l'URL est relative avec slash, compléter avec l'API base URL
  if (imageUrl.startsWith('/')) {
    return `${API_URL}${imageUrl}`;
  }

  // Sinon, compléter avec l'API base URL et slash
  return `${API_URL}/${imageUrl}`;
};

/**
 * Hook pour gérer les erreurs de chargement d'images
 */
export const handleImageError = (event) => {
  if (event.target.src !== PLACEHOLDER_IMAGE) {
    console.warn('❌ Erreur chargement image:', event.target.src);
    event.target.src = PLACEHOLDER_IMAGE;
  }
};
