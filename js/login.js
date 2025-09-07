class LoginForm {
    constructor() {
        this.form = document.getElementById('login-form');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.emailError = document.getElementById('email-error');
        this.passwordError = document.getElementById('password-error');
    
    this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateForm();
        });

    // Validación en tiempo real
    this.emailInput.addEventListener('blur', () => this.validateEmail());
    this.passwordInput.addEventListener('blur', () => this.validatePassword());
    }

    validateForm() {
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (isEmailValid && isPasswordValid) {
        this.submitForm();
        }
    }

    validateEmail() {
    const email = this.emailInput.value.trim();
    const allowedDomains = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
    
    if (!email) {
      this.showError(this.emailError, 'El correo electrónico es requerido');
      return false;
    }
    
    if (email.length > 100) {
      this.showError(this.emailError, 'El correo no puede tener más de 100 caracteres');
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showError(this.emailError, 'Por favor ingresa un correo electrónico válido');
      return false;
    }

    // Validar dominio permitido
    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      this.showError(this.emailError, 'Solo se permiten correos de @duoc.cl, @profesor.duoc.cl y @gmail.com');
      return false;
    }

    this.hideError(this.emailError);
    return true;
    }

    validatePassword() {
    const password = this.passwordInput.value;
    
    if (!password) {
      this.showError(this.passwordError, 'La contraseña es requerida');
      return false;
    }

    if (password.length < 4 || password.length > 10) {
      this.showError(this.passwordError, 'La contraseña debe tener entre 4 y 10 caracteres');
      return false;
    }

    this.hideError(this.passwordError);
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
    // Simular envío del formulario
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Iniciando sesión...';
    submitBtn.disabled = true;
    
    // Simular llamada a API
    setTimeout(() => {
      alert('¡Inicio de sesión exitoso!');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      this.form.reset();
      
      // Redirigir a la página principal
      window.location.href = 'index.html';
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LoginForm();
});