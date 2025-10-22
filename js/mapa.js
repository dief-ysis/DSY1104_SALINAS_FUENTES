// js/mapa.js - Integración con Leaflet.js
class MapaUbicaciones {
  constructor() {
    this.mapa = null;
    this.marcadores = [];
    this.ubicaciones = [
      { ciudad: 'Santiago', lat: -33.4489, lng: -70.6693 },
      { ciudad: 'Puerto Montt', lat: -41.4693, lng: -72.9424 },
      { ciudad: 'Villarica', lat: -39.2856, lng: -72.2279 },
      { ciudad: 'Nacimiento', lat: -37.5061, lng: -72.6731 },
      { ciudad: 'Viña del Mar', lat: -33.0245, lng: -71.5518 },
      { ciudad: 'Valparaíso', lat: -33.0472, lng: -71.6127 },
      { ciudad: 'Concepción', lat: -36.8269, lng: -73.0498 }
    ];
    
    this.init();
  }
  
  init() {
    if (typeof L === 'undefined') {
      console.error('Leaflet.js no está cargado');
      this.showFallback();
      return;
    }
    
    this.inicializarMapa();
    this.agregarMarcadores();
  }
  
  inicializarMapa() {
    // Centrar el mapa en Chile
    this.mapa = L.map('map').setView([-35.6751, -71.5430], 5);
    
    // Agregar capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.mapa);
  }
  
  agregarMarcadores() {
    this.ubicaciones.forEach(ubicacion => {
      const marker = L.marker([ubicacion.lat, ubicacion.lng])
        .addTo(this.mapa)
        .bindPopup(`
          <div class="map-popup">
            <h3>${ubicacion.ciudad}</h3>
            <p>Punto de entrega HuertoHogar</p>
          </div>
        `);
      
      this.marcadores.push(marker);
    });
  }
  
  showFallback() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 8px;">
          <h3>Mapa no disponible</h3>
          <p>No se pudo cargar el mapa interactivo. Aquí están nuestras ubicaciones:</p>
          <ul style="text-align: left; display: inline-block;">
            ${this.ubicaciones.map(u => `<li>${u.ciudad}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  }
}

// Cargar Leaflet.js dinámicamente
function loadLeaflet() {
  return new Promise((resolve, reject) => {
    if (typeof L !== 'undefined') {
      resolve();
      return;
    }
    
    // Cargar CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
    link.crossOrigin = '';
    document.head.appendChild(link);
    
    // Cargar JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
    script.crossOrigin = '';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Inicializar mapa cuando esté listo
document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    loadLeaflet()
      .then(() => new MapaUbicaciones())
      .catch(() => {
        // Si falla la carga de Leaflet, mostrar fallback
        new MapaUbicaciones().showFallback();
      });
  }
});