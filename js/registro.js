// js/registro.js
class RegisterForm {
  constructor() {
    this.form = document.getElementById('register-form');
    this.regionSelect = document.getElementById('region');
    this.comunaSelect = document.getElementById('comuna');
    
    this.regiones = [];
    this.comunas = {};
    
    this.init();
  }
  
  async init() {
    await this.cargarRegiones();
    this.setupEventListeners();
    this.setupDependentSelects();
  }
  
  async cargarRegiones() {
    try {
      // En una implementación real, esto vendría de una API
      this.regiones = [
        { id: 1, nombre: 'Región Metropolitana' },
        { id: 2, nombre: 'Región de Valparaíso' },
        { id: 3, nombre: 'Región del Maule' },
        { id: 4, nombre: 'Región de O\'Higgins' },
        { id: 5, nombre: 'Región del Biobío' }
      ];
      
      this.comunas = {
        1: ['Santiago', 'Puente Alto', 'Maipú', 'Las Condes', 'Providencia'],
        2: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'],
        3: ['Talca', 'Curicó', 'Linares', 'Constitución', 'Cauquenes'],
        4: ['Rancagua', 'San Fernando', 'Rengo', 'Santa Cruz', 'Pichilemu'],
        5: ['Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles', 'Coronel']
      };
      
      this.llenarRegiones();
    } catch (error) {
      console.error('Error cargando regiones:', error);
    }
  }
  
  llenarRegiones() {
    this.regionSelect.innerHTML = '<option value="">Selecciona una región</option>';
    this.regiones.forEach(region => {
      const option = document.createElement('option');
      option.value = region.id;
      option.textContent = region.nombre;
      this.regionSelect.appendChild(option);
    });
  }
  
  llenarComunas(regionId) {
    this.comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';
    
    if (regionId && this.comunas[regionId]) {
      this.comunaSelect.disabled = false;
      this.comunas[regionId].forEach(comuna => {
        const option = document.createElement('option');
        option.value = comuna;
        option.textContent = comuna;
        this.comunaSelect.appendChild(option);
      });
    } else {
      this.comunaSelect.disabled = true;
    }
  }
  
  setupDependentSelects() {
    this.regionSelect.addEventListener('change', () => {
      const regionId = this.regionSelect.value;
      this.llenarComunas(regionId);
    });
  }
  
  setupEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validateForm();
    });
    
    // Validación RUN en tiempo real
    document.getElementById('run').addEventListener('blur', () => this.validateRUN());
    
    // Validación de coincidencia de contraseñas
    document.getElementById('confirm-password').addEventListener('blur', () => this.validatePasswordMatch());
  }
  
  validateForm() {
    const isValid = 
      this.validateRUN() &&
      this.validateText('nombre', 'nombre-error', 'El nombre es requerido') &&
      this.validateText('apellidos', 'apellidos-error', 'Los apellidos son requeridos') &&
      this.validateEmail() &&
      this.validateSelect('region', 'region-error', 'La región es requerida') &&
      this.validateSelect('comuna', 'comuna-error', 'La comuna es requerida') &&
      this.validateText('direccion', 'direccion-error', 'La dirección es requerida') &&
      this.validatePassword() &&
      this.validatePasswordMatch();
    
    if (isValid) {
      this.submitForm();
    }
  }
  
  validateRUN() {
    const runInput = document.getElementById('run');
    const runError = document.getElementById('run-error');
    const run = runInput.value.trim();
    
    if (!run) {
      this.showError(runError, 'El RUN es requerido');
      return false;
    }
    
    // Validar formato RUN (7-9 dígitos + guion + dígito verificador)
    const runRegex = /^(\d{7,9})-([\dkK])$/;
    if (!runRegex.test(run)) {
      this.showError(runError, 'Formato de RUN inválido. Use: 12345678-9');
      return false;
    }
    
    // Validar dígito verificador (algoritmo simple)
    const [numero, dv] = run.split('-');
    if (!this.validarDigitoVerificador(numero, dv)) {
      this.showError(runError, 'Dígito verificador inválido');
      return false;
    }
    
    this.hideError(runError);
    return true;
  }
  
  validarDigitoVerificador(numero, dv) {
    // Implementación simplificada de validación de dígito verificador
    // En una aplicación real, se usaría el algoritmo completo
    const factores = [3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;
    
    for (let i = 0; i < numero.length; i++) {
      suma += parseInt(numero[i]) * factores[i];
    }
    
    const resto = 11 - (suma % 11);
    const dvCalculado = resto === 11 ? '0' : resto === 10 ? 'K' : resto.toString();
    
    return dv.toUpperCase() === dvCalculado;
  }
  
  validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const email = emailInput.value.trim();
    const allowedDomains = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
    
    if (!email) {
      this.showError(emailError, 'El correo electrónico es requerido');
      return false;
    }
    
    if (email.length > 100) {
      this.showError(emailError, 'El correo no puede tener más de 100 caracteres');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showError(emailError, 'Por favor ingresa un correo electrónico válido');
      return false;
    }
    
    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      this.showError(emailError, 'Solo se permiten correos de @duoc.cl, @profesor.duoc.cl y @gmail.com');
      return false;
    }
    
    this.hideError(emailError);
    return true;
  }
  
  validateText(fieldId, errorId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    const value = input.value.trim();
    
    if (!value) {
      this.showError(error, message);
      return false;
    }
    
    if (fieldId === 'direccion' && value.length > 300) {
      this.showError(error, 'La dirección no puede tener más de 300 caracteres');
      return false;
    }
    
    this.hideError(error);
    return true;
  }
  
  validateSelect(fieldId, errorId, message) {
    const select = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    
    if (!select.value) {
      this.showError(error, message);
      return false;
    }
    
    this.hideError(error);
    return true;
  }
  
  validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const password = passwordInput.value;
    
    if (!password) {
      this.showError(passwordError, 'La contraseña es requerida');
      return false;
    }
    
    if (password.length < 4 || password.length > 10) {
      this.showError(passwordError, 'La contraseña debe tener entre 4 y 10 caracteres');
      return false;
    }
    
    this.hideError(passwordError);
    return true;
  }
  
  validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const error = document.getElementById('confirm-password-error');
    
    if (password !== confirmPassword) {
      this.showError(error, 'Las contraseñas no coinciden');
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
    
    submitBtn.textContent = 'Creando cuenta...';
    submitBtn.disabled = true;
    
    // Simular envío
    setTimeout(() => {
      alert('¡Cuenta creada exitosamente!');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      this.form.reset();
      this.llenarComunas(null); // Resetear comuna
      
      // Redirigir al login
      window.location.href = 'login.html';
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RegisterForm();
});