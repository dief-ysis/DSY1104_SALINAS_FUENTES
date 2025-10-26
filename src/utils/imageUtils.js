/**
 * imageUtils.js
 * Utilidad para resolver imágenes de producto y proporcionar un fallback
 */

// Los productos pueden referenciar muchas imágenes. No filtramos por una lista
// rígida: si el campo `imagePath` está presente, lo devolvemos directamente.
// Si no existe o está vacío, devolvemos una imagen por defecto según la categoría.
const defaultImages = {
  'Frutas Frescas': '/assets/products/manzana.jpg',
  'Verduras Orgánicas': '/assets/products/espinaca.jpg',
  'Productos Orgánicos': '/assets/products/miel.png',
  default: '/assets/products/manzana.jpg'
};

export function getProductImage(imagePath, category) {
  // Si hay una ruta de imagen válida, la devolvemos
  if (typeof imagePath === 'string' && imagePath.trim() !== '') {
    return imagePath;
  }

  // Buscar imagen por categoría, con fallback al default
  return defaultImages[category] || defaultImages.default;
}

export default getProductImage;