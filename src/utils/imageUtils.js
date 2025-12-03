/**
 * IMAGE UTILS - UTILIDADES PARA IMÁGENES
 * 
 * Funciones para manejar imágenes de productos con fallbacks.
 */

const defaultImages = {
  'FRUTAS': '/assets/products/manzana.jpg',
  'VERDURAS': '/assets/products/zanahoria.jpg',
  'HIERBAS': '/assets/products/espinaca.jpg',
  'ORGANICOS': '/assets/products/miel.png',
  'GRANOS': '/assets/products/manzana.jpg',
  'LACTEOS': '/assets/products/miel.png',
  'default': '/assets/products/manzana.jpg'
};

/**
 * Obtiene la URL de imagen de un producto con fallback por categoría
 * @param {string} imagePath - Ruta de la imagen del producto
 * @param {string} category - Categoría del producto
 * @returns {string} URL de la imagen
 */
export const getProductImage = (imagePath, category) => {
  // Si hay ruta de imagen válida, usarla
  if (imagePath && typeof imagePath === 'string' && imagePath.trim() !== '') {
    return imagePath;
  }

  // Buscar imagen por categoría
  const categoryKey = category?.toUpperCase() || '';
  return defaultImages[categoryKey] || defaultImages.default;
};

export default { getProductImage };