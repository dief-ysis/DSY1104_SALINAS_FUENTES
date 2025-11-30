# 📚 Documentación Técnica Completa - Huerto Hogar

## 📋 Índice
1. [Descripción General](#descripción-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración](#configuración)
5. [Contextos y Estado](#contextos-y-estado)
6. [Rutas y Navegación](#rutas-y-navegación)
7. [Componentes Principales](#componentes-principales)
8. [Base de Datos](#base-de-datos)
9. [Servicios y Hooks](#servicios-y-hooks)
10. [Flujos de Negocio](#flujos-de-negocio)
11. [Estilos y CSS](#estilos-y-css)
12. [Testing](#testing)
13. [Despliegue](#despliegue)
14. [Comandos Disponibles](#comandos-disponibles)

---

## 📖 Descripción General

**Nombre del Proyecto:** HuertoHogar React
**Descripción:** Tienda online de productos agrícolas frescos y orgánicos, directo del campo a tu hogar.
**Versión:** 0.1.0
**Licencia:** ISC
**Repositorio:** https://github.com/dief-ysis/DSY1104_SALINAS_FUENTES
**Branch Activa:** Prueba2-davidF
**Propósito:** Plataforma de e-commerce para venta de productos orgánicos cultivados localmente

### Características Principales
- ✅ Catálogo de productos con filtrado por categoría
- ✅ Carrito de compras persistente
- ✅ Sistema de autenticación y login
- ✅ Proceso de checkout con pago
- ✅ Blog con artículos
- ✅ Formulario de contacto
- ✅ Página de ofertas especiales
- ✅ Sistema de pedidos y stock
- ✅ Diseño responsive con Bootstrap
- ✅ 80/80 tests pasando

---

## 🛠️ Stack Tecnológico

### Frontend Framework
```
Framework: React 18.2.0
Language: JavaScript (ES Module)
Build Tool: Vite 4.4.5
Module System: ESM (type: "module")
```

### UI & Styling
```
CSS Framework: Bootstrap 5.3.8
Component Library: react-bootstrap 2.10.10
Icons: react-icons 5.5.0
Animations: framer-motion 12.23.24
Utilities: @popperjs/core 2.11.8
```

### Routing
```
Router: react-router-dom 6.30.1
Router Bootstrap: react-router-bootstrap 0.26.3
```

### Forms & Validation
```
Form Library: Formik 2.4.6
Validation: Yup 1.7.1
```

### HTTP & API
```
HTTP Client: Axios 1.12.2
```

### State Management
```
Redux Toolkit: @reduxjs/toolkit 1.9.7
React-Redux: react-redux 8.1.3
```

### UI Components
```
Loading Spinner: react-loader-spinner 7.0.3
Alerts: SweetAlert2 11.26.2
```

### Development Tools
```
Build: Vite 4.4.5
Module Bundler: Terser 5.44.0
Compression: vite-plugin-compression 0.5.1
PWA: vite-plugin-pwa 1.1.0
```

### Testing
```
Test Framework: Jest 29.7.0
Test Environment: jsdom
React Testing Library: @testing-library/react 14.3.1
DOM Testing: @testing-library/jest-dom 6.9.1
```

### Code Quality
```
Linter: ESLint 8.45.0
Babel: @babel/core 7.28.4
Babel React: @babel/preset-react 7.27.1
Babel Env: @babel/preset-env 7.28.3
Jest Babel: babel-jest 30.2.0
```

### Utilities
```
PostCSS: 8.5.6
PostCSS Import: 16.1.1
Autoprefixer: 10.4.21
Source Map Explorer: 2.5.3
Identity Obj Proxy: 3.0.0 (Mock CSS)
```

### Deployment
```
GitHub Pages: gh-pages 6.3.0
```

### Type Support
```
React Types: @types/react 18.2.15
React DOM Types: @types/react-dom 18.2.7
```

---

## 📁 Estructura del Proyecto

```
DSY1104_SALINAS_FUENTES/
│
├── 📄 package.json              # Dependencias y scripts
├── 📄 vite.config.js            # Configuración de Vite
├── 📄 jest.config.cjs           # Configuración de Jest
├── 📄 babel.config.js           # Configuración de Babel
├── 📄 eslint.config.js          # Configuración de ESLint
├── 📄 index.html                # HTML principal
├── 📄 README.md                 # Documentación proyecto
│
├── 📂 src/
│   ├── 📄 main.jsx              # Punto de entrada
│   ├── 📄 routes.jsx            # Definición de rutas
│   │
│   ├── 📂 pages/                # Páginas principales
│   │   ├── Root.jsx             # Layout raíz
│   │   ├── 📂 home/
│   │   │   └── Home.jsx
│   │   ├── 📂 products/
│   │   │   ├── Products.jsx
│   │   │   ├── productDetail.jsx
│   │   │   └── Offers.jsx
│   │   ├── 📂 cart/
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── PagoExitoso.jsx
│   │   │   └── PagoError.jsx
│   │   ├── 📂 auth/
│   │   │   ├── Login.jsx
│   │   │   └── Registro.jsx
│   │   └── 📂 info/
│   │       ├── About.jsx
│   │       ├── Blog.jsx
│   │       ├── DetalleBlog.jsx
│   │       └── Contact.jsx
│   │
│   ├── 📂 components/           # Componentes reutilizables
│   │   ├── 📂 common/
│   │   │   ├── Navbar.jsx       # Barra de navegación fija
│   │   │   ├── Footer.jsx       # Pie de página
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorPage.jsx
│   │   ├── 📂 home/
│   │   │   ├── Hero.jsx         # Sección hero con animaciones
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── FeaturedCategories.jsx
│   │   │   └── FeaturedOffers.jsx
│   │   ├── 📂 products/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── ItemListContainer.jsx
│   │   ├── 📂 cart/
│   │   │   └── CartItem.jsx
│   │
│   ├── 📂 context/              # Contextos de React
│   │   ├── AuthContext.jsx      # Autenticación
│   │   └── CartContext.jsx      # Carrito (con useMemo)
│   │
│   ├── 📂 database/             # Datos estáticos
│   │   ├── products.js          # 7 productos de ejemplo
│   │   └── categories.js        # 3 categorías
│   │
│   ├── 📂 services/
│   │   └── product.js           # Normalización de productos
│   │
│   ├── 📂 hooks/
│   │   ├── useProducts.js       # Hook para productos
│   │   ├── useScrollToTop.js    # Scroll-to-top reutilizable
│   │
│   ├── 📂 loaders/              # React Router Data Loaders
│   │   ├── home.js              # Carga datos home
│   │   ├── products.js          # Carga lista de productos
│   │   └── productLoader.js     # Carga detalle de producto
│   │
│   ├── 📂 redux/                # Redux store (opcional)
│   │   └── ...
│   │
│   ├── 📂 utils/
│   │   └── formatters.js        # Formatos de precio CLP
│   │
│   ├── 📂 styles/               # Estilos CSS organizados
│   │   ├── index.css            # Principal
│   │   ├── 📂 base/
│   │   │   └── base.css
│   │   ├── 📂 foundation/
│   │   │   └── colors.css
│   │   ├── 📂 layout/
│   │   │   ├── navbar.css       # Barra fija, hide-on-scroll
│   │   │   └── footer.css
│   │   ├── 📂 components/
│   │   ├── 📂 sections/
│   │   │   └── hero.css         # Hero con overlay oscuro
│   │   ├── 📂 pages/
│   │   │   ├── auth-pages.css
│   │   │   ├── cart-pages.css
│   │   │   ├── info-pages.css
│   │   │   └── home-page.css
│   │   ├── 📂 products/
│   │   │   ├── product-card.css
│   │   │   └── products.css
│   │   └── custom-utilities.css
│   │
│   └── 📂 tests/                # Tests unitarios
│       ├── Hero.test.jsx
│       ├── Navbar.test.jsx
│       ├── LoadingSpinner.test.jsx
│       ├── Pagination.test.jsx
│       ├── ProductCard.test.jsx
│       ├── 📂 components/
│       ├── 📂 pages/
│       └── 📂 utils/
│
├── 📂 public/
│   ├── manifest.json            # PWA manifest
│   └── 📂 assets/
│       ├── 📂 images/           # Imágenes generales
│       │   ├── categories/
│       │   ├── blog/
│       │   └── logo.png
│       └── 📂 products/         # Imágenes de productos (7)
│           ├── manzana.jpg
│           ├── naranja.jpg
│           ├── platano.jpg
│           ├── zanahoria.jpg
│           ├── espinaca.jpg
│           ├── pimenton.jpg
│           └── miel.png
│
├── 📂 __mocks__/
│   └── fileMock.js              # Mock para archivos en tests
│
├── 📂 test/
│   └── setup.js                 # Setup de tests
│
├── 📂 coverage/                 # Reporte de cobertura (generado)
│   └── lcov-report/
│
├── .gitignore
├── ANALISIS_PROBLEMAS.md        # Análisis de problemas resueltos
└── DOCUMENTACION_TECNICA.md     # Este archivo


```

---

## ⚙️ Configuración

### Vite (vite.config.js)
```javascript
{
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
  }
}
```

### Jest (jest.config.cjs)
```javascript
{
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  moduleNameMapper: {
    '\\.(css|...)$': 'identity-obj-proxy',
    '\\.(jpg|...)$': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

### Babel (babel.config.js)
```javascript
{
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
}
```

### ESLint (eslint.config.js)
- Basado en `@eslint/js`
- Plugin: eslint-plugin-react-hooks
- Plugin: eslint-plugin-react-refresh
- Regla personalizada: varsIgnorePattern para constantes

---

## 🔄 Contextos y Estado

### AuthContext (`src/context/AuthContext.jsx`)
**Responsabilidad:** Gestionar autenticación y sesiones de usuarios

**Estado:**
```javascript
{
  user: { id: number, email: string, name: string } | null,
  loading: boolean,
  error: string | null,
  isAuthenticated: boolean
}
```

**Métodos:**
- `login(email, password)` → { success, error }
- `logout()` → { success, error }

**Características:**
- Validación de email (regex)
- Validación de contraseña (mín 6 caracteres)
- Persistencia en localStorage con clave: `huertohogar-auth`
- Mock de autenticación (sin backend real)
- Delay simulado de 1000ms

**Uso:**
```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

---

### CartContext (`src/context/CartContext.jsx`)
**Responsabilidad:** Gestionar carrito de compras y stock

**Estado:**
```javascript
{
  cartItems: [
    {
      id: string,
      name: string,
      price: number,
      image: string,
      quantity: number,
      stock: number,
      subtotal: number
    }
  ]
}
```

**Métodos:**
- `addToCart(product, quantity)` - Agrega o incrementa producto
- `removeFromCart(productId)` - Elimina producto
- `updateQuantity(productId, quantity)` - Actualiza cantidad
- `clearCart()` - Vacía todo el carrito
- `processPayment()` - Procesa pago y reduce stock
- `getReducedStock(productId, originalStock)` - Obtiene stock reducido

**Características:**
- Persistencia en localStorage: `huertohogar-cart`
- Stock en localStorage: `huertohogar-stock`
- Normalización de propiedades (image/imagen, name/nombre, etc)
- Validación de stock antes de agregar
- Uso de `useMemo` para optimización de referencias
- Carrito expuesto como `cart` (array transformado)
- Compatible con tests y componentes

**Flujo de Pago:**
1. Usuario hace clic en "Confirmar Pedido"
2. `processPayment()` ejecuta:
   - Reduce stock en localStorage
   - Llama `clearCart()` → `setCartItems([])`
3. React detecta cambio en `cartItems`
4. `exposedCart` se actualiza (nueva referencia)
5. `useEffect` en Checkout detecta `cart.length === 0`
6. Muestra éxito y redirige

**Uso:**
```javascript
const { cart, addItem, removeItem, processPayment } = useCart();
```

---

## 🛣️ Rutas y Navegación

### Estructura de Rutas (`src/routes.jsx`)
```
/                       → Login (index)
/home                   → Home (con loader)
/productos              → Products (con loader)
/productos/:id          → Product Detail (con loader)
/ofertas                → Offers
/carrito                → Cart
/checkout               → Checkout
/pago-exitoso           → Success Page
/pago-error             → Error Page
/blog                   → Blog
/blog/:id               → Blog Detail
/contacto               → Contact
/nosotros               → About
/registro               → Registration
/                       → ErrorPage (404)
```

### Data Loaders
**homeLoader:** Carga featured products y stats
**productsLoader:** Carga lista de productos
**productLoader:** Carga detalle de producto por ID

### Navegación Principal
- **Navbar:** Home, Productos, Blog, Contacto
- **Carrito:** Ícono con contador en navbar
- **Auth:** Login/Logout en navbar
- **Footer:** Links útiles, newsletter, redes sociales

### Lazy Loading
Todos los componentes de página usan `lazy()` con `Suspense` y `<LoadingSpinner />`

---

## 🎨 Componentes Principales

### Navbar (`src/components/common/Navbar.jsx`)
**Características:**
- Fixed position en top con z-index: 1030
- Hide on scroll: Se oculta al bajar, se muestra al subir
- Scroll detection a partir de 10px
- Responsive con Bootstrap collapse
- Muestra contador de items en carrito
- Integración con autenticación
- Transiciones suaves (0.3s)
- Links activos destacados

**Estados CSS:**
- `.navbar-visible` - Visible
- `.navbar-hidden` - Oculta (translateY -100%)

---

### Hero (`src/components/home/Hero.jsx`)
**Características:**
- Animaciones con Framer Motion
- Overlay oscuro (rgba(0,0,0,0.5))
- Badge "Fresco · Local · Responsable"
- Título principal: "Del huerto a tu hogar"
- Subtítulo descriptivo
- CTA botones a productos y categorías
- Diseño responsive
- Accesibilidad con aria-label

---

### ProductCard (`src/components/products/ProductCard.jsx`)
**Características:**
- Tarjeta responsive con altura flexible
- Imagen con lazy loading
- Badge orgánico (si aplica)
- Información de origen
- Prácticas de cultivo
- Barra de stock visual (3 colores)
- Precio formateado en CLP
- Botones: Ver Detalle, Agregar al carrito
- Soporte para propiedades españolas e inglesas

---

### Footer (`src/components/common/Footer.jsx`)
**Características:**
- Información de empresa
- Redes sociales
- Newsletter con validación de email
- Links útiles organizados en columnas
- Información de contacto y horarios
- Diseño responsive
- Fondo verde (Bootstrap success)

---

### ProductDetail (`src/pages/products/productDetail.jsx`)
**Características:**
- Información completa del producto
- Galería de imágenes
- Descripción detallada
- Especificaciones (origin, practices)
- Recetas sugeridas
- Control de cantidad
- Botón agregar al carrito
- Scroll-to-top al cargar

---

## 📊 Base de Datos

### Productos (`src/database/products.js`)
**Total:** 7 productos de ejemplo

**Estructura de Producto:**
```javascript
{
  id: string,                    // Ej: 'FR001'
  name: string,                  // Nombre en inglés
  price: number,                 // Precio en CLP
  description: string,           // Descripción larga
  category: string,              // Categoría
  stock: number,                 // Stock disponible
  unit: string,                  // Unidad (kg, bolsa, etc)
  origin: string,                // Origen del producto
  image: string,                 // Ruta de imagen
  practices: string,             // Prácticas de cultivo
  recipes: [string]              // Recetas sugeridas
}
```

**Productos Disponibles:**

| ID | Nombre | Categoría | Precio | Stock |
|----|--------|-----------|--------|-------|
| FR001 | Manzanas Fuji | Frutas Frescas | $1,200 | 150 |
| FR002 | Naranjas Valencia | Frutas Frescas | $1,000 | 200 |
| FR003 | Plátanos Cavendish | Frutas Frescas | $800 | 250 |
| VR001 | Zanahorias Orgánicas | Verduras Orgánicas | $900 | 100 |
| VR002 | Espinacas Frescas | Verduras Orgánicas | $700 | 80 |
| VR003 | Pimientos Tricolores | Verduras Orgánicas | $1,500 | 120 |
| PO001 | Miel Orgánica | Productos Orgánicos | $5,000 | 50 |

**Rutas de Imágenes:**
```
/assets/products/manzana.jpg
/assets/products/naranja.jpg
/assets/products/platano.jpg
/assets/products/zanahoria.jpg
/assets/products/espinaca.jpg
/assets/products/pimenton.jpg
/assets/products/miel.png
```

---

### Categorías (`src/database/categories.js`)
```javascript
[
  {
    id: 'Frutas Frescas',
    name: 'Frutas Frescas',
    description: '...',
    image: '/assets/images/categories/frutas-frescas.jpg'
  },
  {
    id: 'Verduras Orgánicas',
    name: 'Verduras Orgánicas',
    description: '...',
    image: '/assets/images/categories/vegetales-verdes.png'
  },
  {
    id: 'Productos Orgánicos',
    name: 'Productos Orgánicos',
    description: '...',
    image: '/assets/images/categories/organicos.webp'
  }
]
```

---

## 🔧 Servicios y Hooks

### ProductService (`src/services/product.js`)
**Responsabilidad:** Normalizar y servir datos de productos

**Métodos:**
- `getAllProducts()` - Retorna todos los productos normalizados
- `getProductById(id)` - Retorna un producto por ID
- `getProductsByCategory(categoryId)` - Filtra por categoría
- `getFeaturedProducts(limit)` - Retorna productos destacados
- `searchProducts(options)` - Búsqueda avanzada con filtros
- `validateStock(productId, quantity)` - Valida disponibilidad
- `getStats()` - Retorna estadísticas
- `getAllCategories()` - Retorna categorías

**Normalización de Producto:**
- Propiedades en español: `nombre`, `precioCLP`, `imagen`, `descripcion`
- Propiedades en inglés: `name`, `price`, `image`, `description`
- Ambas disponibles simultáneamente

---

### useProducts Hook (`src/hooks/useProducts.js`)
**Responsabilidad:** Gestionar estado de productos con paginación y filtros

**Estado:**
```javascript
{
  products: [],
  categories: [],
  loading: boolean,
  error: string | null,
  currentPage: number,
  filter: string,
  category: string,
  sortBy: string,
  sortOrder: 'asc' | 'desc'
}
```

**Características:**
- Paginación (12 items por página)
- Filtrado por nombre y descripción
- Filtrado por categoría
- Ordenamiento (nombre, precio)
- Orden ascendente/descendente
- Optimizado con useMemo

---

### useScrollToTop Hook (`src/hooks/useScrollToTop.js`)
**Responsabilidad:** Desplazar scroll al top al montar componente

```javascript
export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
```

**Uso en Páginas:**
- Login, Registro, Home, Products, ProductDetail
- Cart, Checkout, PagoError, PagoExitoso
- About, Blog, DetalleBlog, Contact, Offers

---

## 💼 Flujos de Negocio

### Flujo de Navegación e Inicio
```
Usuario Abre App
    ↓
    ├─→ Si NO autenticado: Muestra Login
    │     ├→ Email/Contraseña válidos
    │     ├→ "Iniciar Sesión" guardado en localStorage
    │     └→ Redirige a /home
    │
    └─→ Si autenticado: Muestra Home
          └→ Acceso a navegación completa
```

### Flujo de Compra
```
1. Navegar a /productos
   ├─ Filtar por categoría
   ├─ Ordenar por nombre/precio
   └─ Ver paginación

2. Seleccionar producto
   ├─ Click en tarjeta o "Ver Detalle"
   ├─ Muestra /productos/:id
   └─ Información completa + agregar al carrito

3. Agregar al carrito
   ├─ Validar stock
   ├─ Si OK: Agregar a cart
   ├─ Guardar en localStorage
   └─ Mostrar contador en navbar

4. Ver carrito
   ├─ /carrito → Lista de items
   ├─ Modificar cantidades
   ├─ Eliminar items
   └─ Botón "Proceder al Pago"

5. Checkout (/checkout)
   ├─ Formulario de envío (Formik validado)
   ├─ Información de pago (mock)
   ├─ Resumen del pedido
   └─ Botón "Confirmar Pedido"

6. Procesar Pago
   ├─ Ejecutar processPayment()
   ├─ Reducir stock en localStorage
   ├─ Limpiar carrito (clearCart)
   ├─ setOrderPlaced(true)
   └─ Mostrar éxito

7. Éxito
   ├─ Mensaje de confirmación
   ├─ Número de pedido
   └─ Redirige a /home (2 seg)
```

### Flujo de Autenticación
```
Login:
  1. Ingresar email y contraseña
  2. Validar con regex y largo mínimo
  3. Delay de 1000ms (simulación)
  4. Guardar user en localStorage
  5. Actualizar contexto

Logout:
  1. Click en "Cerrar Sesión"
  2. Delay de 500ms (simulación)
  3. Limpiar localStorage
  4. Redirige a /
```

### Flujo de Búsqueda y Filtrado
```
ProductsPage:
  ├─ useProducts() retorna productos paginados
  ├─ Usuario selecciona categoría
  ├─ Hook filtra por category.id
  ├─ Ordenamiento opcional
  ├─ Paginación con Pagination component
  └─ Mostrar resultados (12 por página máx)
```

---

## 🎨 Estilos y CSS

### Estructura de CSS
```
src/styles/
├── index.css                 # Importa todas las hojas
├── custom-utilities.css      # Utilidades custom
├── base/
│   └── base.css             # Estilos base (main content padding)
├── foundation/
│   └── colors.css           # Paleta de colores
├── layout/
│   ├── navbar.css           # Navbar fixed + hide-on-scroll
│   └── footer.css           # Footer responsive
├── components/              # Estilos de componentes
├── sections/
│   └── hero.css             # Hero con overlay
├── pages/
│   ├── auth-pages.css
│   ├── cart-pages.css
│   ├── home-page.css
│   └── info-pages.css
└── products/
    ├── product-card.css
    └── products.css
```

### Diseño Responsivo
**Breakpoints Bootstrap:**
- xs: < 576px (móvil)
- sm: ≥ 576px
- md: ≥ 768px (tablet)
- lg: ≥ 992px
- xl: ≥ 1200px
- xxl: ≥ 1400px

### Paleta de Colores
```
Primary (Verde): #2E8B57 (Success de Bootstrap)
Secondary: #6C757D (Gray)
Background: #F8F9FA
Overlay Hero: rgba(0, 0, 0, 0.5)
Border: #DEE2E6
```

### Espaciamiento
- Márgenes página: 2rem (horizontal)
- Padding navbar: 80px (top content)
- Footer: 3rem top, 2rem sides

---

## 🧪 Testing

### Configuración de Tests
**Framework:** Jest 29.7.0
**Entorno:** jsdom (navegador simulado)
**Setup:** `test/setup.js`

### Test Files
```
src/tests/
├── Hero.test.jsx           # Tests de Hero
├── Navbar.test.jsx         # Tests de Navbar
├── LoadingSpinner.test.jsx # Tests de Spinner
├── Pagination.test.jsx     # Tests de Paginación
├── ProductCard.test.jsx    # Tests de Tarjeta
├── components/
├── pages/
└── utils/
```

### Cobertura Requerida
```
Branches: 80%
Functions: 80%
Lines: 80%
Statements: 80%
```

### Tests Actuales
✅ **80/80 tests pasando**

**Test Suites:**
- Navigation tests (Navbar, routing)
- Component tests (Hero, ProductCard, LoadingSpinner)
- Functionality tests (Cart, Auth, Forms)

### Mocks
- **CSS:** `identity-obj-proxy`
- **Imágenes:** `__mocks__/fileMock.js`
- **Contextos:** Mock CartContext, AuthContext

### Ejecución de Tests
```bash
npm test                  # Ejecución en watch mode
npm run test:ci           # CI mode sin watch
npm run coverage          # Con reporte de cobertura
```

---

## 🚀 Despliegue

### GitHub Pages
**URL:** https://dief-ysis.github.io/DSY1104_SALINAS_FUENTES/
**Rama:** gh-pages
**Build:** Vite build → dist/

### Configuración de Despliegue
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Proceso de Despliegue
```bash
npm run deploy              # Build + Deploy a gh-pages
```

---

## 📜 Comandos Disponibles

### Desarrollo
```bash
npm run dev                 # Inicia servidor Vite (http://localhost:5173)
npm run preview             # Preview del build
npm run build               # Build para producción
npm run analyze             # Analizar bundle size (source-map-explorer)
npm run build:analyze       # Build + análisis
```

### Testing
```bash
npm test                    # Jest en watch mode
npm test -- --coverage     # Con reporte de cobertura
npm test -- --watchAll=false
```

### Linting
```bash
npm run lint                # Ejecutar ESLint
npm run lint --fix          # Fix automático
```

### Despliegue
```bash
npm run deploy              # Deploy a GitHub Pages
npm run predeploy           # Build preparatorio
```

---

## 📊 Estadísticas del Proyecto

### Código
- **Líneas de código:** ~3,000+
- **Componentes React:** 20+
- **Páginas:** 11
- **Tests:** 80
- **Cobertura:** 80%+

### Performance
- **Bundle Size:** Optimizado con Vite + Terser
- **Code Splitting:** Lazy loading de páginas
- **Lazy Images:** Atributo `loading="lazy"`

### Accesibilidad
- **Aria Labels:** En componentes interactivos
- **Semantic HTML:** Uso de section, article, etc
- **Keyboard Navigation:** Soporte completo

### SEO
- **Meta Tags:** En HTML
- **PWA:** Manifest incluido
- **OpenGraph:** Preparado

---

## 🔄 Cambios Recientes (Octubre 26, 2025)

### Fixes Implementados
1. ✅ **Scroll-to-Top en todas las páginas**
   - Creado hook `useScrollToTop()`
   - Aplicado a 13 páginas
   - Consistencia en toda la app

2. ✅ **Carrito se vacía correctamente al pagar**
   - Optimización con `useMemo` en CartContext
   - Flujo de pago mejorado
   - useEffect reacciona correctamente

3. ✅ **Sistema de imágenes verificado**
   - Todas las rutas correctas
   - Todos los archivos existen
   - Normalización en service

### Estado Final
- ✅ 80/80 tests pasando
- ✅ Todos los problemas resueltos
- ✅ Documentación completa

---

## 📚 Referencias Internas

- `ANALISIS_PROBLEMAS.md` - Análisis detallado de bugs resueltos
- `README.md` - Documentación usuario
- `package.json` - Dependencias y scripts
- `jest.config.cjs` - Configuración testing

---

**Última actualización:** 26 de Octubre de 2025
**Versión:** 0.1.0
**Status:** ✅ Desarrollo Activo

---

*Documento generado automáticamente por análisis de proyecto*
*Para actualizaciones, ver archivo de cambios recientes*
