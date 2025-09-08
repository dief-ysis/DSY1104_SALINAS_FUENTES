class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.comentarioTextarea = document.getElementById('comentario');
    this.charCountElement = document.getElementById('char-remaining');
    this.maxChars = 500;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.updateCharCount();
  }
  
  setupEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validateForm();
    });
    
    // Contador de caracteres en tiempo real
    this.comentarioTextarea.addEventListener('input', () => {
      this.updateCharCount();
    });
    
    // Validación en tiempo real
    document.getElementById('nombre').addEventListener('blur', () => this.validateNombre());
    document.getElementById('email').addEventListener('blur', () => this.validateEmail());
    this.comentarioTextarea.addEventListener('blur', () => this.validateComentario());
  }
  
  updateCharCount() {
    const currentLength = this.comentarioTextarea.value.length;
    const remaining = this.maxChars - currentLength;
    this.charCountElement.textContent = remaining;
    
    if (remaining < 0) {
      this.charCountElement.style.color = '#dc2626';
    } else if (remaining < 50) {
      this.charCountElement.style.color = 'var(--accent-mustard)';
    } else {
      this.charCountElement.style.color = 'inherit';
    }
  }
  
  validateForm() {
    const isValid = 
      this.validateNombre() &&
      this.validateEmail() &&
      this.validateComentario();
    
    if (isValid) {
      this.submitForm();
    }
  }
  
  validateNombre() {
    const input = document.getElementById('nombre');
    const error = document.getElementById('nombre-error');
    const value = input.value.trim();
    
    if (!value) {
      this.showError(error, 'El nombre es requerido');
      return false;
    }
    
    if (value.length > 100) {
      this.showError(error, 'El nombre no puede tener más de 100 caracteres');
      return false;
    }
    
    this.hideError(error);
    return true;
  }
  
  validateEmail() {
    const input = document.getElementById('email');
    const error = document.getElementById('email-error');
    const email = input.value.trim();
    const allowedDomains = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
    
    // Email es opcional, pero si se ingresa debe ser válido
    if (!email) {
      this.hideError(error);
      return true;
    }
    
    if (email.length > 100) {
      this.showError(error, 'El correo no puede tener más de 100 caracteres');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showError(error, 'Por favor ingresa un correo electrónico válido');
      return false;
    }
    
    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      this.showError(error, 'Solo se permiten correos de @duoc.cl, @profesor.duoc.cl y @gmail.com');
      return false;
    }
    
    this.hideError(error);
    return true;
  }
  
  validateComentario() {
    const input = this.comentarioTextarea;
    const error = document.getElementById('comentario-error');
    const value = input.value.trim();
    
    if (!value) {
      this.showError(error, 'El mensaje es requerido');
      return false;
    }
    
    if (value.length > this.maxChars) {
      this.showError(error, `El mensaje no puede tener más de ${this.maxChars} caracteres`);
      return false;
    }
    
    this.hideError(error);
    return true;
  }
  
  showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
  }
  
  hideError(element) {
    element.textContent = '';
    element.style.display = 'none';
  }
  
  submitForm() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simular envío
    setTimeout(() => {
      alert('¡Mensaje enviado exitosamente! Te contactaremos a la brevedad.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      this.form.reset();
      this.updateCharCount();
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});