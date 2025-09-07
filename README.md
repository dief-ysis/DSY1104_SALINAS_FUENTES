# HuertoHogar - Documentación del Proyecto

## Descripción
Tienda online de productos agrícolas frescos directamente del campo a domicilio.

## Estructura del Proyecto

huerto-hogar/
├── index.html # Página principal
├── pages/ # Otras páginas
│ ├── productos.html # Catálogo de productos
│ ├── detalle-producto.html # Detalle de producto
│ ├── carrito.html # Carrito de compras
│ ├── login.html # Inicio de sesión
│ ├── registro.html # Registro de usuario
│ ├── contacto.html # Formulario de contacto
│ ├── blogs.html # Listado de blogs
│ ├── blog-detalle.html # Detalle de blog
│ └── nosotros.html # Información de la empresa
├── css/
│ └── styles.css # Estilos principales
├── js/
│ ├── main.js # Funcionalidad principal
│ ├── productos_huerto.js # Datos de productos
│ ├── categorias_huerto.js # Datos de categorías
│ ├── carrito.js # Gestión del carrito
│ ├── productos.js # Página de productos
│ ├── detalle-producto.js # Página de detalle
│ ├── login.js # Formulario de login
│ ├── registro.js # Formulario de registro
│ ├── contacto.js # Formulario de contacto
│ ├── blogs.js # Página de blogs
│ ├── blog-detalle.js # Detalle de blog
│ ├── mapa.js # Mapa de ubicaciones
│ └── accessibility.js # Verificación de accesibilidad
└── assets/
├── images/ # Imágenes generales
└── products/ # Imágenes de productos


## Instalación y Uso
1. Clonar el repositorio
2. Abrir index.html en un navegador web
3. No se requiere servidor para funcionalidad básica

## Tecnologías Utilizadas
- HTML5 semántico
- CSS3 con variables custom properties
- JavaScript ES6+
- LocalStorage para persistencia de datos
- Leaflet.js para mapas

## Características Implementadas
- [x] Diseño responsive (mobile-first)
- [x] Sistema de temas con colores del caso
- [x] Catálogo de productos con filtros
- [x] Carrito de compras con persistencia
- [x] Formularios con validación
- [x] Páginas de contenido (blog, nosotros)
- [x] Mapa de ubicaciones
- [x] Programa de fidelización
- [x] Accesibilidad (WCAG básico)

## Consideraciones de Accesibilidad
- Navegación por teclado
- Textos alternativos en imágenes
- Contraste adecuado
- Estructura semántica HTML
- ARIA labels donde sea necesariox