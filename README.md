# Huerto Hogar - React

Tienda online de productos agrícolas frescos y orgánicos, directo del campo a tu hogar. Proyecto migrado a React como parte de la Evaluación 2 de Desarrollo Fullstack II.

## 📝 Evaluación 2 - Requerimientos Cumplidos

### Tecnologías Implementadas
- ✅ React 18
- ✅ Bootstrap + React Bootstrap
- ✅ Material UI (componentes adicionales)
- ✅ Jest + React Testing Library
- ✅ GitHub Pages para despliegue

### Funcionalidades
- ✅ Migración completa de HTML/JS a React
- ✅ Componentes modulares y reutilizables
- ✅ Integración de datos JSON
- ✅ Sistema de rutas
- ✅ Gestión de estado con Context API
- ✅ Tests unitarios implementados

## 🌟 Características Principales

- Catálogo de productos con filtros y paginación
- Carrito de compras con persistencia local
- Sistema de autenticación y gestión de usuarios
- Blog informativo con artículos sobre agricultura orgánica
- Formulario de contacto validado
- Diseño responsive optimizado
- Material UI para una interfaz moderna

## 🛠 Tecnologías Utilizadas

- **Frontend:**
  - React 18
  - Material UI
  - React Router DOM
  - Formik & Yup
  - Axios

- **Desarrollo:**
  - Vite
  - Jest
  - Testing Library
  - Babel

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
│   ├── Navigation/    # Barra de navegación
│   ├── ProductCard/   # Tarjeta de producto
│   └── Cart/         # Componentes del carrito
├── context/       # Contextos de React
│   ├── AuthContext   # Manejo de autenticación
│   └── CartContext   # Estado del carrito
├── database/     # Datos estáticos
├── pages/        # Componentes de páginas
├── utils/        # Utilidades y helpers
├── theme.js      # Configuración de Material UI
└── main.jsx      # Punto de entrada

public/
└── assets/
    ├── images/   # Imágenes generales
    └── products/ # Imágenes de productos
```

## 🔍 Componentes Principales

### Navigation
- Barra de navegación responsive
- Menú desplegable para móviles
- Indicador de items en carrito
- Integración con autenticación

### Cart
- Gestión completa del carrito
- Control de cantidades
- Cálculo automático de totales
- Proceso de checkout

### ProductDetail
- Vista detallada de productos
- Integración con carrito
- Imágenes y descripciones
- Acciones de compra

### Login & Auth
- Sistema de autenticación
- Validación de formularios
- Gestión de sesiones
- Manejo de errores

### Contact
- Formulario de contacto validado
- Validación con Formik
- Información de contacto
- Diseño responsive

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/dief-ysis/DSY1104_SALINAS_FUENTES.git
```

2. Instalar dependencias:
```bash
cd DSY1104_SALINAS_FUENTES
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## 📝 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run test`: Ejecuta los tests
- `npm run lint`: Ejecuta el linter

## ✅ Testing

El proyecto incluye tests unitarios y de integración usando Jest y Testing Library. Los tests se encuentran en la carpeta `src/__tests__/` y cubren:

### Tests de Componentes
- **Hero.test.jsx**: Verifica la renderización del componente Hero
  - Título principal
  - Descripción
  - Botón de acción

- **ProductCard.test.jsx**: Prueba el componente de tarjeta de producto
  - Renderización de información
  - Funcionalidad del botón "Agregar al carrito"
  - Integración con CartContext

### Tests de Contextos
- **CartContext**: Prueba la lógica del carrito
  - Agregar productos
  - Actualizar cantidades
  - Remover productos
  - Calcular totales

### Tests de Utilidades
- Formateo de precios
- Validación de datos
- Manejo de errores

Para ejecutar los tests:
```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

## 🔒 Seguridad

- Rutas protegidas
- Manejo seguro de tokens
- Validación de inputs
- Sanitización de datos
- Manejo de errores

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de características
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📫 Contacto

Para dudas o sugerencias sobre la implementación en React, contactar a:
- Email: allan.salinas@example.com
- GitHub: @dief-ysis
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