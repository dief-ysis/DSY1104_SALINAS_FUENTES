// Categorías de productos disponibles en HuertoHogar
// Productos frescos, orgánicos y sostenibles

export const CATEGORIES = [
  {
    id: 'Frutas Frescas',
    name: 'Frutas Frescas',
    description: 'Nuestra selección de frutas frescas ofrece una experiencia directa del campo a tu hogar. Estas frutas se cultivan y cosechan en el punto óptimo de madurez para asegurar su sabor y frescura. Disfruta de una variedad de frutas de temporada que aportan vitaminas y nutrientes esenciales a tu dieta diaria. Perfectas para consumir solas, en ensaladas o como ingrediente principal en postres y smoothies.',
    image: '/assets/images/categories/frutas-frescas.jpg'
  },
  {
    id: 'Verduras Orgánicas',
    name: 'Verduras Orgánicas',
    description: 'Descubre nuestra gama de verduras orgánicas, cultivadas sin el uso de pesticidas ni químicos, garantizando un sabor auténtico y natural. Cada verdura es seleccionada por su calidad y valor nutricional, ofreciendo una excelente fuente de vitaminas, minerales y fibra. Ideales para ensaladas, guisos y platos saludables, nuestras verduras orgánicas promueven una alimentación consciente y sostenible.',
    image: '/assets/images/categories/vegetales-verdes.png'
  },
  {
    id: 'Productos Orgánicos',
    name: 'Productos Orgánicos',
    description: 'Nuestros productos orgánicos están elaborados con ingredientes naturales y procesados de manera responsable para mantener sus beneficios saludables. Desde aceites y miel hasta granos y semillas, ofrecemos una selección que apoya un estilo de vida saludable y respetuoso con el medio ambiente. Estos productos son perfectos para quienes buscan opciones alimenticias que aporten bienestar sin comprometer el sabor ni la calidad.',
    image: '/assets/images/categories/organicos.webp'
  }
];

// Exportar también como constante para compatibilidad
export const PRODUCT_CATEGORIES = CATEGORIES.map(cat => cat.id);