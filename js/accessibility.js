// js/accessibility.js
class AccessibilityChecker {
  constructor() {
    this.issues = [];
    this.init();
  }
  
  init() {
    this.checkImages();
    this.checkHeadings();
    this.checkContrast();
    this.checkForms();
    this.checkKeyboardNavigation();
    this.reportIssues();
  }
  
  checkImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.alt && !img.hasAttribute('aria-hidden')) {
        this.issues.push({
          type: 'image',
          element: img,
          message: 'Imagen sin texto alternativo (alt)',
          severity: 'high'
        });
      }
    });
  }
  
  checkHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingLevels = {};
    
    headings.forEach(heading => {
      const level = heading.tagName.substring(1);
      if (!headingLevels[level]) headingLevels[level] = 0;
      headingLevels[level]++;
      
      if (!heading.id && heading.offsetParent !== null) {
        this.issues.push({
          type: 'heading',
          element: heading,
          message: `Encabezado h${level} sin ID (útil para navegación)`,
          severity: 'low'
        });
      }
    });
    
    // Verificar estructura jerárquica
    if (!headings[0] || headings[0].tagName !== 'H1') {
      this.issues.push({
        type: 'structure',
        element: document.body,
        message: 'La página debería comenzar con un H1',
        severity: 'medium'
      });
    }
  }
  
  checkContrast() {
    // Esta es una verificación básica, en producción usaría una librería como axe-core
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(el => {
      if (el.offsetParent === null) return; // Saltar elementos ocultos
      
      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;
      const color = style.color;
      
      // Verificación simplificada - en realidad se necesitaría calcular el ratio de contraste
      if (bgColor === color) {
        this.issues.push({
          type: 'contrast',
          element: el,
          message: 'Posible problema de contraste entre texto y fondo',
          severity: 'high'
        });
      }
    });
  }
  
  checkForms() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (!input.id && !input.hasAttribute('aria-label')) {
        const label = input.closest('.form-group')?.querySelector('label');
        if (!label || !label.htmlFor) {
          this.issues.push({
            type: 'form',
            element: input,
            message: 'Campo de formulario sin etiqueta asociada',
            severity: 'high'
          });
        }
      }
    });
  }
  
  checkKeyboardNavigation() {
    // Verificar que todos los elementos interactivos sean focusables
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    interactiveElements.forEach(el => {
      if (el.tabIndex === -1 && el.offsetParent !== null) {
        this.issues.push({
          type: 'keyboard',
          element: el,
          message: 'Elemento interactivo no focusable con teclado',
          severity: 'medium'
        });
      }
    });
  }
  
  reportIssues() {
    if (this.issues.length === 0) {
      console.log('✅ No se encontraron problemas de accesibilidad');
      return;
    }
    
    console.group('🔍 Reporte de Accesibilidad');
    this.issues.forEach(issue => {
      console.log(
        `%c${issue.severity.toUpperCase()} ${issue.type}: ${issue.message}`,
        `color: ${this.getColorForSeverity(issue.severity)}; font-weight: bold`,
        issue.element
      );
    });
    console.groupEnd();
  }
  
  getColorForSeverity(severity) {
    const colors = {
      high: '#dc2626',
      medium: '#ea580c',
      low: '#ca8a04'
    };
    return colors[severity] || '#000';
  }
}

// Ejecutar en desarrollo
if (process.env.NODE_ENV === 'development') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => new AccessibilityChecker(), 1000);
  });
}