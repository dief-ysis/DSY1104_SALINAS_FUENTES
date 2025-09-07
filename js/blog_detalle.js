class BlogDetail {
  constructor() {
    this.blog = null;
    this.allBlogs = BLOGS_DATA;
    this.init();
  }
  
  init() {
    this.getBlogFromURL();
    this.renderBlogDetail();
    this.renderRelatedPosts();
    this.setupEventListeners();
  }
  
  getBlogFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = parseInt(urlParams.get('id'));
    
    if (!blogId) {
      window.location.href = 'blogs.html';
      return;
    }
    
    this.blog = this.allBlogs.find(b => b.id === blogId);
    
    if (!this.blog) {
      window.location.href = 'blogs.html';
      return;
    }
  }
  
  renderBlogDetail() {
    if (!this.blog) return;
    
    // Actualizar breadcrumb
    document.getElementById('breadcrumb-title').textContent = this.blog.titulo;
    
    // Actualizar información principal
    document.getElementById('blog-title').textContent = this.blog.titulo;
    document.getElementById('blog-date').textContent = this.formatDate(this.blog.fecha);
    document.getElementById('blog-author').textContent = this.blog.autor;
    
    // Imagen
    document.getElementById('blog-image').src = this.blog.imagen;
    document.getElementById('blog-image').alt = this.blog.titulo;
    
    // Contenido
    document.getElementById('blog-content').innerHTML = `
      <p>${this.blog.contenido}</p>
      
      <h2>Beneficios de una Alimentación Saludable</h2>
      <p>Una dieta balanceada rica en frutas y verduras orgánicas puede transformar tu salud. Los productos frescos no solo aportan vitaminas y minerales esenciales, sino que también ayudan a prevenir enfermedades y mantener un peso saludable.</p>
      
      <h3>Consejos Prácticos</h3>
      <ul>
        <li>Incorpora al menos 5 porciones de frutas y verduras al día</li>
        <li>Prefiere productos de temporada y locales</li>
        <li>Experimenta con nuevas recetas y sabores</li>
        <li>Planifica tus comidas semanalmente</li>
      </ul>
      
      <blockquote>
        "La calidad de los alimentos que consumes impacta directamente en tu calidad de vida."
      </blockquote>
      
      <p>Recuerda que pequeños cambios en tu alimentación pueden generar grandes beneficios a largo plazo. ¡Comienza hoy!</p>
    `;
  }
  
  renderRelatedPosts() {
    const container = document.getElementById('related-posts');
    
    if (!this.blog) return;
    
    // Obtener posts relacionados (excluyendo el actual)
    const relatedPosts = this.allBlogs
      .filter(blog => blog.id !== this.blog.id && blog.destacado)
      .slice(0, 3);
    
    if (relatedPosts.length === 0) {
      container.innerHTML = '<p>No hay artículos relacionados disponibles</p>';
      return;
    }
    
    const postsHTML = relatedPosts.map(post => `
      <div class="related-post">
        <img src="${post.imagen}" alt="${post.titulo}" loading="lazy">
        <div class="related-content">
          <h4>${post.titulo}</h4>
          <p>${post.descripcion}</p>
          <a href="blog-detalle.html?id=${post.id}">Leer más</a>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = postsHTML;
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  setupEventListeners() {
    // Botones de compartir
    document.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const platform = e.target.dataset.platform;
        this.shareBlog(platform);
      });
    });
    
    // Newsletter
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.subscribeNewsletter();
    });
  }
  
  shareBlog(platform) {
    const title = this.blog.titulo;
    const url = window.location.href;
    
    let shareUrl;
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
  }
  
  subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
      alert('Por favor ingresa tu correo electrónico');
      return;
    }
    
    // Simular suscripción
    alert(`¡Gracias por suscribirte con el correo: ${email}!`);
    emailInput.value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BlogDetail();
});