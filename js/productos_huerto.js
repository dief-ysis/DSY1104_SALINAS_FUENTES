// productos_huerto.js
// Validación de productos HH-020
export function validarProducto(producto) { // HH-020
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

export const PRODUCTS_HH = [
  {
    code: "FR001", nombre: "Manzanas Fuji", categoriaId: "FR",
    precioCLP: 1200, unidad: "kg", stock: 150, origen: "Valle del Maule",
    descripcion: "Manzanas crujientes y dulces; ideales para snack o postres.",
    practicas: ["Agricultura responsable"],
    recetas: ["https://www.ejemplo.cl/recetas/strudel-manzana"],
    imagen: "assets/products/fr001.webp"
  },
  {
    code: "FR003", nombre: "Plátanos Cavendish", categoriaId: "FR",
    precioCLP: 800, unidad: "kg", stock: 250, origen: "Zona Central",
    descripcion: "Dulces y energéticos; ricos en potasio.",
    practicas: ["Manejo postcosecha"],
    recetas: ["https://www.ejemplo.cl/recetas/batido-platano"],
    imagen: "assets/products/fr003.jpg"
  },
  // Producto nuevo agregado, imagen local personalizada
  {
    code: "FR004", nombre: "Peras Packham", categoriaId: "FR",
    precioCLP: 950, unidad: "kg", stock: 120, origen: "Región Metropolitana",
    descripcion: "Peras jugosas y dulces, perfectas para postres o ensaladas.",
    practicas: ["Cosecha manual"],
    recetas: ["https://www.ejemplo.cl/recetas/tarta-pera"],
    imagen: "assets/images/pera.jpg" // Imagen local agregada por el usuario
  },
  // Producto nuevo agregado, imagen local personalizada
  {
    code: "FR005", nombre: "Uvas Red Globe", categoriaId: "FR",
    precioCLP: 1300, unidad: "kg", stock: 140, origen: "Valle de Aconcagua",
    descripcion: "Uvas grandes, dulces y crocantes, ideales para snack.",
    practicas: ["Cultivo sostenible"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-uvas"],
    imagen: "assets/images/uva2.jpg" // Imagen local agregada por el usuario
  },
  // Producto nuevo: Kiwis verdes
  {
    code: "FR006",
    nombre: "Kiwis Verdes",
    categoriaId: "FR",
    precioCLP: 1500,
    unidad: "kg",
    stock: 100,
    origen: "Región del Maule",
    descripcion: "Kiwis frescos, ricos en vitamina C y fibra, perfectos para snacks saludables.",
    practicas: ["Agricultura sostenible", "Cosecha manual"],
    recetas: ["https://www.ejemplo.cl/recetas/smoothie-kiwi"],
    imagen: "assets/images/wiki.jpg" // [MOD-1] Actualizada imagen de Kiwis Verdes (11/09/2025)
  },
  {
    code: "VR001", nombre: "Zanahorias Orgánicas", categoriaId: "VR",
    precioCLP: 900, unidad: "kg", stock: 100, origen: "Región de O'Higgins",
    descripcion: "Crujientes y sin pesticidas; excelentes para ensaladas y jugos.",
    practicas: ["Certificación orgánica"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-zanahoria"],
    imagen: "assets/products/vr001.webp"
  },
  {
    code: "VR002", nombre: "Espinacas Frescas", categoriaId: "VR",
    precioCLP: 700, unidad: "0.5kg", stock: 80, origen: "Zona Sur",
    descripcion: "Hojas tiernas y nutritivas; ideales para ensaladas y batidos.",
    practicas: ["Riego eficiente"],
    recetas: ["https://www.ejemplo.cl/recetas/quiche-espinaca"],
    imagen: "assets/products/vr002.webp"
  },

  {
    code: "FR007", nombre: "Naranjas Valencia", categoriaId: "FR",
    precioCLP: 1100, unidad: "kg", stock: 180, origen: "Valle del Elqui",
    descripcion: "Naranjas dulces y jugosas, ideales para jugos naturales y postres.",
    practicas: ["Agricultura sostenible"],
    recetas: ["https://www.ejemplo.cl/recetas/jugo-naranja"],
    imagen: "assets/images/naranja.jpg" // [MOD-2] Actualizada imagen de Naranjas Valencia (11/09/2025)
  },
  {
    code: "FR008", nombre: "Cerezas Premium", categoriaId: "FR",
    precioCLP: 3500, unidad: "500g", stock: 60, origen: "Región del Maule",
    descripcion: "Cerezas frescas, dulces y de gran tamaño, perfectas para snacks saludables.",
    practicas: ["Cosecha selectiva"],
    recetas: ["https://www.ejemplo.cl/recetas/tarta-cereza"],
    imagen: "assets/images/bote-cerezas-delizia.jpg" // [MOD-3] Actualizada imagen de Cerezas Premium (11/09/2025)
  },
  {
    code: "FR009", nombre: "Frutillas Orgánicas", categoriaId: "FR",
    precioCLP: 2200, unidad: "500g", stock: 90, origen: "Región de Los Lagos",
    descripcion: "Frutillas rojas, dulces y libres de pesticidas, ideales para postres y batidos.",
    practicas: ["Cultivo orgánico"],
    recetas: ["https://www.ejemplo.cl/recetas/batido-frutilla"],
    imagen: "assets/images/frutilla.jpg" // [MOD-4] Actualizada imagen de Frutillas Orgánicas (11/09/2025)
  },
  {
    code: "FR010", nombre: "Sandía Fresca", categoriaId: "FR",
    precioCLP: 1800, unidad: "unidad", stock: 50, origen: "Región Metropolitana",
    descripcion: "Sandía grande, jugosa y refrescante, ideal para el verano.",
    practicas: ["Riego eficiente"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-sandia"],
    imagen: "assets/images/sandia.jpg" // [MOD-5] Actualizada imagen de Sandía Fresca (11/09/2025)
  },
  {
    code: "FR011", nombre: "Mangos Importados", categoriaId: "FR",
    precioCLP: 2500, unidad: "unidad", stock: 70, origen: "Ecuador",
    descripcion: "Mangos dulces y aromáticos, perfectos para jugos y postres tropicales.",
    practicas: ["Comercio justo"],
    recetas: ["https://www.ejemplo.cl/recetas/mousse-mango"],
    imagen: "assets/images/Mangos-1.jpg"
  },
  {
    code: "VR003", nombre: "Pimientos Tricolores", categoriaId: "VR",
    precioCLP: 1500, unidad: "kg", stock: 120, origen: "V Región",
    descripcion: "Rojos, amarillos y verdes; aportan color y antioxidantes.",
    practicas: ["Rotación de cultivos"],
    recetas: ["https://www.ejemplo.cl/recetas/salteado-pimientos"],
    imagen: "assets/products/vr003.webp"
  },
  // Producto nuevo agregado, imagen local personalizada
  {
    code: "VR004", nombre: "Brócoli Orgánico", categoriaId: "VR",
    precioCLP: 1100, unidad: "kg", stock: 90, origen: "Región del Maule",
    descripcion: "Brócoli fresco, rico en fibra y antioxidantes.",
    practicas: ["Cultivo ecológico"],
    recetas: ["https://www.ejemplo.cl/recetas/brocoli-salteado"],
    imagen: "assets/images/brocoli.jpg" // Imagen local agregada por el usuario
  },
  // Producto nuevo agregado, imagen local personalizada
  {
    code: "VR005", nombre: "Lechuga Hidropónica", categoriaId: "VR",
    precioCLP: 800, unidad: "unidad", stock: 110, origen: "Región de Los Lagos",
    descripcion: "Lechuga fresca y crocante, ideal para ensaladas.",
    practicas: ["Hidroponía sostenible"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-lechuga"],
    imagen: "assets/images/lechuga-lollo-green.jpg" // Imagen local agregada por el usuario
  },
  {
    code: "PO001", nombre: "Miel Orgánica", categoriaId: "PO",
    precioCLP: 5000, unidad: "500g", stock: 50, origen: "Apicultores locales",
    descripcion: "Miel pura y aromática; rica en antioxidantes.",
    practicas: ["Apicultura sostenible"],
    recetas: ["https://www.ejemplo.cl/recetas/te-miel-limon"],
    imagen: "assets/products/po001.webp"
  },
  {
    code: "PO003", nombre: "Quinua Orgánica", categoriaId: "PO",
    precioCLP: 3200, unidad: "kg", stock: 70, origen: "Altiplano",
    descripcion: "Grano andino de alto valor nutritivo.",
    practicas: ["Producción responsable"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-quinua"],
    imagen: "assets/products/po003.jpg"
  },
  // Producto nuevo agregado, imagen local personalizada
  {
    code: "PO004", nombre: "Aceite de Oliva Extra Virgen", categoriaId: "PO",
    precioCLP: 4500, unidad: "500ml", stock: 60, origen: "Valle del Huasco",
    descripcion: "Aceite de oliva de primera prensada, sabor intenso y frutado.",
    practicas: ["Extracción en frío"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-aceite-oliva"],
    imagen: "assets/images/aceite.jpg" // Imagen local agregada por el usuario
  },
  // Imagen local agregada por el usuario
  {
    code: "PO005", nombre: "Semilla de Chía", categoriaId: "PO",
    precioCLP: 2200, unidad: "250g", stock: 80, origen: "Región de Coquimbo",
    descripcion: "Semillas de chía ricas en omega 3 y fibra, ideales para desayunos y batidos.",
    practicas: ["Agricultura orgánica"],
    recetas: ["https://www.ejemplo.cl/recetas/pudin-chia"],
    imagen: "assets/images/chia.jpg" // Imagen local agregada por el usuario
  },
  // Imagen local agregada por el usuario
  {
    code: "PO006", nombre: "Avena Integral", categoriaId: "PO",
    precioCLP: 1800, unidad: "kg", stock: 100, origen: "Región de La Araucanía",
    descripcion: "Avena natural, perfecta para desayunos saludables.",
    practicas: ["Producción local"],
    recetas: ["https://www.ejemplo.cl/recetas/porridge-avena"],
    imagen: "assets/images/Header_Avena_Integral.jpg" // Imagen local agregada por el usuario
  },
  {
    code: "PL001", nombre: "Leche Entera", categoriaId: "PL",
    precioCLP: 1100, unidad: "1L", stock: 90, origen: "Lecherías locales",
    descripcion: "Leche fresca, ideal para consumo diario.",
    practicas: ["Bienestar animal"],
    recetas: ["https://www.ejemplo.cl/recetas/arroz-con-leche"],
    imagen: "assets/products/pl001.png"
  }
  ,{
    code: "PL002", nombre: "Queso Fresco Artesanal", categoriaId: "PL",
    precioCLP: 3200, unidad: "500g", stock: 60, origen: "Región de Los Ríos",
    descripcion: "Queso fresco, suave y cremoso, ideal para desayunos.",
    practicas: ["Elaboración artesanal"],
    recetas: ["https://www.ejemplo.cl/recetas/queso-fresco"],
  imagen: "assets/images/queso.jpg" // Imagen local agregada por el usuario
  },
  {
    code: "PL003", nombre: "Yogur Natural", categoriaId: "PL",
    precioCLP: 1500, unidad: "500g", stock: 70, origen: "Región Metropolitana",
    descripcion: "Yogur natural, sin azúcar, fuente de probióticos.",
    practicas: ["Fermentación natural"],
    recetas: ["https://www.ejemplo.cl/recetas/yogur-natural"],
  imagen: "assets/images/yogur-natura.jpg" // Imagen local agregada por el usuario
  },
  {
  code: "PL004", nombre: "Mantequilla", categoriaId: "PL",
    precioCLP: 2500, unidad: "250g", stock: 50, origen: "Región de Los Lagos",
    descripcion: "Mantequilla artesanal, sabor intenso y textura cremosa.",
    practicas: ["Producción tradicional"],
    recetas: ["https://www.ejemplo.cl/recetas/mantequilla-campo"],
  imagen: "assets/images/Mantequilla.jpg" // Imagen local agregada por el usuario
  },
  {
    code: "PL005", nombre: "Kéfir de Leche", categoriaId: "PL",
    precioCLP: 1800, unidad: "500ml", stock: 40, origen: "Región de La Araucanía",
    descripcion: "Bebida fermentada, fuente de probióticos y calcio.",
    practicas: ["Fermentación artesanal"],
    recetas: ["https://www.ejemplo.cl/recetas/kefir-leche"],
  imagen: "assets/images/kefir-en-mesa-paleta.jpg" // Imagen local agregada por el usuario
  }
  ,{
    code: "PL006", nombre: "Quesillo Fresco", categoriaId: "PL",
    precioCLP: 2100, unidad: "250g", stock: 60, origen: "Región de Los Lagos",
    descripcion: "Quesillo suave y fresco, ideal para desayunos y colaciones.",
    practicas: ["Elaboración artesanal"],
    recetas: ["https://www.ejemplo.cl/recetas/quesillo"],
    imagen: "assets/products/pl006.jpg"
  },
  {
    code: "PL007", nombre: "Leche Descremada", categoriaId: "PL",
    precioCLP: 1200, unidad: "1L", stock: 80, origen: "Región Metropolitana",
    descripcion: "Leche baja en grasa, ideal para dietas saludables.",
    practicas: ["Bienestar animal"],
    recetas: ["https://www.ejemplo.cl/recetas/leche-descremada"],
    imagen: "assets/images/Leche-descremada-Colun-200-ml.jpg" // [MOD-18] Actualizada imagen de Leche Descremada (11/09/2025)
  },
  {
    code: "PL008", nombre: "Yogur de Frutilla", categoriaId: "PL",
    precioCLP: 1700, unidad: "500g", stock: 70, origen: "Región de Los Ríos",
    descripcion: "Yogur natural con frutilla, sin colorantes artificiales.",
    practicas: ["Fermentación natural"],
    recetas: ["https://www.ejemplo.cl/recetas/yogur-frutilla"],
    imagen: "assets/images/Yogur-casero.jpg" // [MOD-22] Actualizada imagen de Yogur de Frutilla (11/09/2025)
  },
  {
    code: "PL009", nombre: "Queso Chanco", categoriaId: "PL",
    precioCLP: 3500, unidad: "kg", stock: 50, origen: "Región del Maule",
    descripcion: "Queso semiduro, tradicional chileno, ideal para tablas y sándwiches.",
    practicas: ["Elaboración tradicional"],
    recetas: ["https://www.ejemplo.cl/recetas/queso-chanco"],
    imagen: "assets/images/Queso-Chanco.jpg" // [MOD-20] Actualizada imagen de Queso Chanco (11/09/2025)
  },
  {
    code: "PL010", nombre: "Mantecoso Artesanal", categoriaId: "PL",
    precioCLP: 3800, unidad: "kg", stock: 40, origen: "Región de Los Lagos",
    descripcion: "Queso mantecoso, textura suave y sabor intenso.",
    practicas: ["Elaboración artesanal"],
    recetas: ["https://www.ejemplo.cl/recetas/queso-mantecoso"],
    imagen: "assets/images/quesooo.jpg" // [MOD-23] Actualizada imagen de Mantecoso Artesanal (11/09/2025)
  },
  {
    code: "PL011", nombre: "Leche Vegetal de Almendras", categoriaId: "PL",
    precioCLP: 2500, unidad: "1L", stock: 30, origen: "Región Metropolitana",
    descripcion: "Leche vegetal, sin lactosa, ideal para dietas veganas.",
    practicas: ["Producción local"],
    recetas: ["https://www.ejemplo.cl/recetas/leche-almendras"],
    imagen: "assets/images/almendras.jpg" // [MOD-24] Actualizada imagen de Leche Vegetal de Almendras (11/09/2025)
  },
  {
    code: "VR006", nombre: "Tomate Limachino", categoriaId: "VR",
    precioCLP: 1200, unidad: "kg", stock: 110, origen: "Región de Valparaíso",
    descripcion: "Tomates frescos, jugosos y de sabor intenso, ideales para ensaladas.",
    practicas: ["Cultivo tradicional"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-tomate"],
    imagen: "assets/images/Tomate-Limachino.jpg" // [MOD-7] Actualizada imagen de Tomate Limachino (11/09/2025)
  },
  {
    code: "VR007", nombre: "Pepino Orgánico", categoriaId: "VR", // [MOD-8] Actualizado nombre del producto (11/09/2025)
    precioCLP: 900, unidad: "kg", stock: 80, origen: "Región Metropolitana",
    descripcion: "Pepinos frescos, crocantes y libres de pesticidas.",
    practicas: ["Agricultura orgánica"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-pepino"],
    imagen: "assets/images/Pepino.-Organico..jpg" // [MOD-8] Actualizada imagen del producto (11/09/2025)
  },
  {
    code: "VR008", nombre: "Cebolla Morada", categoriaId: "VR",
    precioCLP: 1000, unidad: "kg", stock: 90, origen: "Región del Maule",
    descripcion: "Cebollas moradas, ideales para ensaladas y guisos.",
    practicas: ["Rotación de cultivos"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-cebolla"],
    imagen: "assets/images/cebolla-morada.jpg" // [MOD-9] Actualizada imagen de Cebolla Morada (11/09/2025)
  },
  {
    code: "VR009", nombre: "Acelga Orgánica", categoriaId: "VR",
    precioCLP: 800, unidad: "atado", stock: 70, origen: "Región de O'Higgins",
    descripcion: "Acelga fresca, rica en vitaminas y minerales.",
    practicas: ["Cultivo orgánico"],
    recetas: ["https://www.ejemplo.cl/recetas/acelga-salteada"],
    imagen: "assets/images/Acelga-Organica-700-g.jpg" // [MOD-10] Actualizada imagen de Acelga Orgánica (11/09/2025)
  },
  {
    code: "VR010", nombre: "Repollo Verde", categoriaId: "VR",
    precioCLP: 950, unidad: "unidad", stock: 60, origen: "Región del Biobío",
    descripcion: "Repollo fresco, ideal para ensaladas y guisos.",
    practicas: ["Agricultura sostenible"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-repollo"],
    imagen: "assets/images/repollo-verde.jpg" // [MOD-11] Actualizada imagen de Repollo Verde (11/09/2025)
  },
  {
    code: "VR011", nombre: "Betarraga", categoriaId: "VR",
    precioCLP: 900, unidad: "kg", stock: 75, origen: "Región de Los Lagos",
    descripcion: "Betarragas dulces, ideales para ensaladas y jugos.",
    practicas: ["Cultivo tradicional"],
    recetas: ["https://www.ejemplo.cl/recetas/ensalada-betarraga"],
    imagen: "assets/images/beterraga.jpg" // [MOD-12] Actualizada imagen de Betarraga (11/09/2025)
  },
  {
    code: "PO007", nombre: "Pan Integral Orgánico", categoriaId: "PO",
    precioCLP: 1800, unidad: "unidad", stock: 60, origen: "Región Metropolitana",
    descripcion: "Pan integral elaborado con harinas orgánicas, sin aditivos.",
    practicas: ["Panadería artesanal"],
    recetas: ["https://www.ejemplo.cl/recetas/pan-integral"],
    imagen: "assets/images/panes-integrales-organico.jpg" // [MOD-13] Actualizada imagen de Pan Integral Orgánico (11/09/2025)
  },
  {
    code: "PO008", nombre: "Granola Orgánica", categoriaId: "PO",
    precioCLP: 3200, unidad: "500g", stock: 50, origen: "Región de Los Lagos",
    descripcion: "Granola con frutos secos y semillas, sin azúcar añadida.",
    practicas: ["Producción orgánica"],
    recetas: ["https://www.ejemplo.cl/recetas/granola"],
    imagen: "assets/images/granola.jpg" // [MOD-14] Actualizada imagen de Granola Orgánica (11/09/2025)
  },
  {
    code: "PO009", nombre: "Tofu Orgánico", categoriaId: "PO",
    precioCLP: 2500, unidad: "400g", stock: 40, origen: "Región Metropolitana",
    descripcion: "Tofu fresco, fuente de proteína vegetal, ideal para dietas veganas.",
    practicas: ["Producción artesanal"],
    recetas: ["https://www.ejemplo.cl/recetas/tofu"],
    imagen: "assets/images/tofu.jpg" // [MOD-15] Actualizada imagen de Tofu Orgánico (11/09/2025)
  },
  {
    code: "PO010", nombre: "Mermelada de Frambuesa Orgánica", categoriaId: "PO",
    precioCLP: 2800, unidad: "250g", stock: 30, origen: "Región de Los Ríos",
    descripcion: "Mermelada artesanal, sin conservantes, elaborada con frambuesas orgánicas.",
    practicas: ["Elaboración artesanal"],
    recetas: ["https://www.ejemplo.cl/recetas/mermelada-frambuesa"],
    imagen: "assets/images/mermelada-de-frambuesa.jpg" // [MOD-16] Actualizada imagen de Mermelada de Frambuesa Orgánica (11/09/2025)
  },
  {
    code: "PO011", nombre: "Cacao Orgánico en Polvo", categoriaId: "PO",
    precioCLP: 3500, unidad: "200g", stock: 25, origen: "Ecuador",
    descripcion: "Cacao puro, sin azúcar, ideal para repostería saludable.",
    practicas: ["Comercio justo"],
    recetas: ["https://www.ejemplo.cl/recetas/cacao"],
    imagen: "assets/images/Manare_CacaoenpolvoOrg500g10.jpg" // [MOD-17] Actualizada imagen de Cacao Orgánico en Polvo (11/09/2025)
  }
];

// Validar todos los productos al cargar HH-020
export const PRODUCTS_VALIDOS = PRODUCTS_HH.filter(validarProducto); // HH-020

// Función para obtener el nombre de la categoría
import { CATEGORIES_HH } from './categorias_huerto.js';

export function categoriaNombre(categoriaId) {
    const categoria = CATEGORIES_HH.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Otra categoría';
}

// Función para formatear precios en CLP
export function formatCLP(value) {
    return value.toLocaleString('es-CL', { 
        style: 'currency', 
        currency: 'CLP', 
        minimumFractionDigits: 0 
    });
}
