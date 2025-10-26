/**
 * imageUtils.js
 * Utilidad para resolver imágenes de producto y proporcionar un fallback
 */

// Los productos pueden referenciar muchas imágenes. No filtramos por una lista
// rígida: si el campo `imagePath` está presente, lo devolvemos directamente.
// Si no existe o está vacío, devolvemos una imagen por defecto según la categoría.
const defaultImages = {
  'Frutas Frescas': '/assets/images/products/manzana.jpg',
  'Verduras Orgánicas': '/assets/images/products/espinaca.jpg',
  'Productos Orgánicos': '/assets/images/products/miel.png',
  default: '/assets/images/products/manzana.jpg'
};

export function getProductImage(imagePath, category) {
  if (typeof imagePath === 'string' && imagePath.trim() !== '') {
    return imagePath;
  }

  return defaultImages[category] || defaultImages.default;
}

export default getProductImage;
