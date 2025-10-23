export const PRODUCTS_HH = [
  {
    code: "FR001",
    nombre: "Manzanas Fuji",
    categoriaId: "FR",
    precioCLP: 1200,
    unidad: "kg",
    stock: 150,
    origen: "Valle del Maule",
    descripcion: "Manzanas crujientes y dulces; ideales para snack o postres.",
    practicas: ["Agricultura responsable"],
    recetas: ["https://www.ejemplo.cl/recetas/strudel-manzana"],
    imagen: "/assets/products/fr001.webp"
  },
  {
    code: "FR003",
    nombre: "Plátanos Cavendish",
    categoriaId: "FR",
    precioCLP: 800,
    unidad: "kg",
    stock: 250,
    origen: "Zona Central",
    descripcion: "Dulces y energéticos; ricos en potasio.",
    practicas: ["Manejo postcosecha"],
    recetas: ["https://www.ejemplo.cl/recetas/batido-platano"],
    imagen: "/assets/products/fr003.jpg"
  },
  // ... resto de productos
];

/**
 * Valida si un producto tiene todos los campos requeridos
 * @param {Object} producto
 * @returns {boolean}
 */
export function validarProducto(producto) {
  if (!producto.code || typeof producto.code !== 'string') return false;
  if (!producto.nombre || typeof producto.nombre !== 'string') return false;
  if (!producto.categoriaId || typeof producto.categoriaId !== 'string') return false;
  if (typeof producto.precioCLP !== 'number' || producto.precioCLP < 0) return false;
  if (!Number.isInteger(producto.stock) || producto.stock < 0) return false;
  if (!producto.origen || typeof producto.origen !== 'string') return false;
  if (!producto.descripcion || typeof producto.descripcion !== 'string') return false;
  if (!Array.isArray(producto.practicas)) return false;
  if (!Array.isArray(producto.recetas)) return false;
  if (!producto.imagen || typeof producto.imagen !== 'string') return false;
  return true;
}

/**
 * Obtiene los productos destacados
 * @param {number} limit - Número máximo de productos a retornar
 * @returns {Array}
 */
export function getFeaturedProducts(limit = 6) {
  return PRODUCTS_HH
    .filter(validarProducto)
    .slice(0, limit);
}