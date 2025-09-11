// js/blogs.js
const BLOGS_DATA = [
  {
    id: 1,
    titulo: "5 Beneficios de Consumir Productos Orgánicos",
    descripcion: "Descubre por qué incorporar productos orgánicos en tu dieta puede mejorar tu salud y bienestar general.",
    imagen: "assets/images/blog/organicos-beneficios.jpg",
    fecha: "2024-03-15",
    autor: "Equipo HuertoHogar",
    contenido: "Los productos orgánicos no solo son mejores para el medio ambiente, sino que también ofrecen numerosos beneficios para la salud...",
    destacado: true
  },
  {
    id: 2,
    titulo: "Cómo Conservar Frutas y Verduras por Más Tiempo",
    descripcion: "Aprende técnicas simples y efectivas para mantener tus productos frescos por más tiempo.",
    imagen: "assets/images/blog/conservacion-frutas.jpg",
    fecha: "2024-03-10",
    autor: "María González",
    contenido: "La correcta conservación de frutas y verduras es clave para aprovechar al máximo sus nutrientes y sabor...",
    destacado: true
  },
  {
    id: 3,
    titulo: "Receta: Ensalada de Quinoa con Vegetales Frescos",
    descripcion: "Una receta fácil, nutritiva y deliciosa para disfrutar de los mejores productos de temporada.",
    imagen: "assets/images/blog/receta-quinoa.jpg",
    fecha: "2024-03-05",
    autor: "Chef Carlos Martínez",
    contenido: "La quinoa es un superalimento versátil que combina perfectamente con vegetales frescos...",
    destacado: false
  },
  {
    id: 4,
    titulo: "La Importancia de Apoyar a Productores Locales",
    descripcion: "Conoce cómo tu elección de compra impacta positivamente en la comunidad y economía local.",
    imagen: "assets/images/blog/productores-locales.jpg",
    fecha: "2024-02-28",
    autor: "Pedro Sánchez",
    contenido: "Cuando eliges productos de productores locales, no solo obtienes alimentos más frescos...",
    destacado: true
  }
];

class BlogsManager {
  constructor() {
    this.blogs = BLOGS_DATA;
    this.init();
  }
  
  init() {
    this.renderBlogs();
  }
  
  renderBlogs() {
    const container = document.getElementById('blogs-container');
    
    if (!container) return;
    
    const blogsHTML = this.blogs.map(blog => `
      <article class="blog-card">
        <div class="blog-image">
          <img src="${blog.imagen}" alt="${blog.titulo}" loading="lazy">
          ${blog.destacado ? '<span class="blog-badge">Destacado</span>' : ''}
        </div>
        <div class="blog-content">
          <div class="blog-meta">
            <span class="blog-date">${this.formatDate(blog.fecha)}</span>
            <span class="blog-author">Por ${blog.autor}</span>
          </div>
          <h2>${blog.titulo}</h2>
          <p>${blog.descripcion}</p>
          <a href="#" class="blog-link read-more">Leer más →</a>
        </div>
      </article>
    `).join('');
    
    container.innerHTML = blogsHTML;
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BlogsManager();
});