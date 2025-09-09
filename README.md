# Huerto Hogar

Tienda online de productos agrícolas frescos y orgánicos, directo del campo a tu hogar.

## Tabla de Contenidos
- [Descripción](#descripción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Buenas Prácticas](#buenas-prácticas)
- [Contacto](#contacto)

## Descripción
Huerto Hogar es una tienda web que ofrece productos orgánicos, frutas, verduras y lácteos frescos, con entrega a domicilio.

## Estructura del Proyecto

```
DSY1104_SALINAS_FUENTES/
├── index.html                # Página principal
├── pages/                    # Páginas secundarias (productos, blogs, contacto, etc.)
├── css/                      # Hojas de estilo
├── js/                       # Archivos JavaScript
├── assets/                   # Imágenes y recursos multimedia
├── products/                 # Imágenes de productos
├── instrucciones/            # Documentos de requerimientos
├── README.md                 # Documentación
└── .gitignore                # Exclusiones de git
```

## Instalación
1. Clona el repositorio:
	```
	git clone https://github.com/dief-ysis/DSY1104_SALINAS_FUENTES.git
	```
2. Abre la carpeta en tu editor de preferencia (VS Code recomendado).
3. No requiere instalación de dependencias, solo abre `index.html` en tu navegador.

## Uso
- Navega por la tienda, agrega productos al carrito, regístrate o inicia sesión.
- Consulta el blog y la información de contacto.

## Buenas Prácticas
- Mantén el código organizado en carpetas por tipo de recurso.
- Usa comentarios y nombres descriptivos en el código.
- Optimiza imágenes antes de subirlas.
- Usa atributos `alt` descriptivos en todas las imágenes para accesibilidad.
- Utiliza un archivo `.gitignore` para evitar subir archivos innecesarios.

## Contacto
Para dudas o sugerencias, contacta a: [Tu Nombre] <tu.email@ejemplo.com>
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