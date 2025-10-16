export const PRODUCTS_HH = [
  // Frutas (FR)
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
    code: "FR002",
    nombre: "Naranjas Valencia",
    categoriaId: "FR",
    precioCLP: 1000,
    unidad: "kg",
    stock: 200,
    origen: "Región de O'Higgins",
    descripcion: "Naranjas jugosas y dulces, perfectas para jugo natural.",
    practicas: ["Cultivo orgánico"],
    recetas: ["https://www.ejemplo.cl/recetas/jugo-naranja-jengibre"],
    imagen: "/assets/products/fr002.jpg"
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
  {
    code: "FR004",
    nombre: "Kiwis Hayward",
    categoriaId: "FR",
    precioCLP: 2500,
    unidad: "kg",
    stock: 100,
    origen: "Región del Maule",
    descripcion: "Kiwis frescos ricos en vitamina C.",
    practicas: ["Agricultura sustentable"],
    recetas: ["https://www.ejemplo.cl/recetas/postre-kiwi"],
    imagen: "/assets/products/fr004.jpg"
  },

  // Verduras (VE)
  {
    code: "VE001",
    nombre: "Tomates Larga Vida",
    categoriaId: "VE",
    precioCLP: 1500,
    unidad: "kg",
    stock: 180,
    origen: "Valle de Limache",
    descripcion: "Tomates frescos y jugosos para ensaladas.",
    practicas: ["Cultivo hidropónico"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-mediterranea"],
    imagen: "/assets/products/ve001.jpg"
  },
  {
    code: "VE002",
    nombre: "Lechugas Hidropónicas",
    categoriaId: "VE",
    precioCLP: 990,
    unidad: "unidad",
    stock: 120,
    origen: "Quilicura",
    descripcion: "Lechugas frescas cultivadas en ambiente controlado.",
    practicas: ["Cultivo hidropónico", "Sin pesticidas"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-cesar"],
    imagen: "/assets/products/ve002.jpg"
  },
  {
    code: "VE003",
    nombre: "Zanahorias Orgánicas",
    categoriaId: "VE",
    precioCLP: 1200,
    unidad: "kg",
    stock: 150,
    origen: "Valle del Elqui",
    descripcion: "Zanahorias dulces y crujientes.",
    practicas: ["Cultivo orgánico"],
    recetas: ["https://www.ejemplo.cl/recetas/crema-zanahoria"],
    imagen: "/assets/products/ve003.jpg"
  },

  // Hierbas (HE)
  {
    code: "HE001",
    nombre: "Albahaca Fresca",
    categoriaId: "HE",
    precioCLP: 890,
    unidad: "manojo",
    stock: 80,
    origen: "Huerto Local",
    descripcion: "Albahaca aromática para tus preparaciones.",
    practicas: ["Cultivo orgánico", "Cosecha diaria"],
    recetas: ["https://www.ejemplo.cl/recetas/pesto-albahaca"],
    imagen: "/assets/products/he001.jpg"
  },
  {
    code: "HE002",
    nombre: "Cilantro Fresco",
    categoriaId: "HE",
    precioCLP: 590,
    unidad: "manojo",
    stock: 100,
    origen: "Huerto Local",
    descripcion: "Cilantro fresco para tus preparaciones mexicanas.",
    practicas: ["Cultivo orgánico"],
    recetas: ["https://www.ejemplo.cl/recetas/guacamole"],
    imagen: "/assets/products/he002.jpg"
  },

  // Semillas (SE)
  {
    code: "SE001",
    nombre: "Semillas de Tomate Cherry",
    categoriaId: "SE",
    precioCLP: 2500,
    unidad: "pack",
    stock: 50,
    origen: "Banco de Semillas Nacional",
    descripcion: "Semillas orgánicas para cultivo casero.",
    practicas: ["Semillas certificadas"],
    recetas: ["https://www.ejemplo.cl/guias/cultivo-tomate-cherry"],
    imagen: "/assets/products/se001.jpg"
  },
  {
    code: "SE002",
    nombre: "Semillas de Lechuga",
    categoriaId: "SE",
    precioCLP: 1990,
    unidad: "pack",
    stock: 60,
    origen: "Banco de Semillas Nacional",
    descripcion: "Semillas para cultivo de lechuga hidropónica.",
    practicas: ["Semillas certificadas"],
    recetas: ["https://www.ejemplo.cl/guias/cultivo-lechuga"],
    imagen: "/assets/products/se002.jpg"
  },

  // Herramientas (HT)
  {
    code: "HT001",
    nombre: "Kit de Jardinería Básico",
    categoriaId: "HT",
    precioCLP: 15990,
    unidad: "kit",
    stock: 30,
    origen: "Nacional",
    descripcion: "Kit con pala, rastrillo y guantes de jardín.",
    practicas: ["Herramientas certificadas"],
    recetas: ["https://www.ejemplo.cl/guias/uso-herramientas-jardin"],
    imagen: "/assets/products/ht001.jpg"
  },
  {
    code: "HT002",
    nombre: "Regadera 5L",
    categoriaId: "HT",
    precioCLP: 8990,
    unidad: "unidad",
    stock: 40,
    origen: "Nacional",
    descripcion: "Regadera de plástico resistente con roseta.",
    practicas: ["Plástico reciclado"],
    recetas: ["https://www.ejemplo.cl/guias/riego-eficiente"],
    imagen: "/assets/products/ht002.jpg"
  },

  // Sustratos (SU)
  {
    code: "SU001",
    nombre: "Tierra de Hojas 5L",
    categoriaId: "SU",
    precioCLP: 3990,
    unidad: "saco",
    stock: 100,
    origen: "Región Metropolitana",
    descripcion: "Sustrato orgánico para macetas y huertos.",
    practicas: ["Compostaje certificado"],
    recetas: ["https://www.ejemplo.cl/guias/preparacion-sustrato"],
    imagen: "/assets/products/su001.jpg"
  },
  {
    code: "SU002",
    nombre: "Compost Orgánico 3L",
    categoriaId: "SU",
    precioCLP: 2990,
    unidad: "saco",
    stock: 80,
    origen: "Región Metropolitana",
    descripcion: "Compost maduro para enriquecer tu huerto.",
    practicas: ["Compostaje certificado"],
    recetas: ["https://www.ejemplo.cl/guias/uso-compost"],
    imagen: "/assets/products/su002.jpg"
  }
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