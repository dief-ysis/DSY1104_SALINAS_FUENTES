export const homeLoader = async () => {
  // Datos para la página de inicio
  return {
    featuredProducts: [
      {
        id: 'FR001',
        name: 'Manzanas Fuji',
        price: 1200,
        image: '/media/image2.jpeg',
        category: 'Frutas Frescas'
      },
      {
        id: 'VR001',
        name: 'Zanahorias Orgánicas',
        price: 900,
        image: '/media/image5.jpeg',
        category: 'Verduras Orgánicas'
      },
      {
        id: 'PO001',
        name: 'Miel Orgánica',
        price: 5000,
        image: '/media/image8.png',
        category: 'Productos Orgánicos'
      },
      {
        id: 'PL001',
        name: 'Leche Entera',
        price: 1200,
        image: 'https://via.placeholder.com/300x200?text=Leche',
        category: 'Productos Lácteos'
      }
    ],
    stats: {
      years: 6,
      locations: 9,
      products: 10
    }
  };
};