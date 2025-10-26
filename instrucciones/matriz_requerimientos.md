Matriz de Requerimientos (Backlog) - Caso HuertoHogar

Esta matriz contiene los requisitos funcionales y no funcionales detallados para el proyecto HuertoHogar, extraídos del archivo CSV provisto.

ID

Vista / Módulo

Caso (Escenario)

Tipo

Detalle del Requerimiento Técnico

Validaciones / Reglas (JS/HTML/CSS)

Criterios de Aceptación (Given/When/Then)

Dependencias

Prioridad

Complejidad

Tareas Sugeridas

HH-001

Base UI

Tema/Estilos

No Funcional

Definir tokens CSS (--color-*) para: #F7F7F7, #2E8B57, #FFD700, #8B4513, #333333, #666666.

Contraste AA mínimo 4.5:1; variables en :root; no usar colores hardcodeados en componentes.

Dado el tema cargado, cuando inspecciono los estilos, entonces todos los colores provienen de variables CSS y alcanzan contraste AA.

Guía de estilo del caso

Alta

S

- Crear :root con variables
- Clase utilitaria para fondos y textos
- Prueba de contraste en 3 componentes

HH-002

Base UI

Tipografías

No Funcional

Cargar fuentes Montserrat + Playfair Display y definir jerarquía tipográfica (h1–h6, body).

Fallback sans-serif y serif; optimizar display=swap; pesos requeridos (400/600/700).

Dado el diseño, cuando el texto es visualizado, entonces usa la fuente correcta y cumple con la jerarquía tipográfica.

Guía de estilo del caso

Alta

S

- Definir jerarquía h1-h6
- Importar fuentes de Google Fonts
- Aplicar estilos a 5 vistas

HH-003

Login / Registro

Formulario/Botones

Funcional

Crear formulario de registro: Email, Contraseña (segura), Confirmar Contraseña. Crear formulario de Login: Email, Contraseña.

Email con formato válido. Contraseña (min. 8 caracteres, alfanumérica). Contraseñas deben coincidir.

Dado un usuario, cuando se registra con datos válidos, entonces se guarda el usuario y es redireccionado al Home.

Datos simulados (mock)

Alta

M

- Crear componente de formulario
- Validaciones JS
- Funcionalidad de guardar usuario

HH-004

Base UI

Navegación

Funcional

Implementar navegación entre vistas (Home, Categorías, Ofertas, Carrito, etc.).

Uso de enrutamiento (ej. react-router-dom). Estado de navegación persistente.

Dado el usuario, cuando hace clic en un enlace del navbar, entonces es dirigido a la vista correspondiente sin recargar la página.

React Router

Alta

M

- Definición de rutas
- Componente Navbar
- Integración con Router

HH-005

General

Manejo de Errores

No Funcional

Implementar manejo de errores: 400 (mala petición), 404 (no encontrado), 500 (error interno).

Mostrar alertas o mensajes informativos en la interfaz. Evitar alert() nativo del navegador.

Dado un error de datos (404), cuando un componente intenta cargar, entonces muestra un mensaje informativo en la vista y evita crashear.

Promise mocks

Alta

M

- Componente ErrorPage
- Implementar try/catch en llamadas mock
- Mostrar mensaje de error

HH-006

Catálogo

Filtros de categoría

Funcional

Mostrar categorías en el catálogo principal y permitir filtrar.

Al seleccionar una categoría, solo deben mostrarse productos de esa categoría.

Dado un usuario, cuando selecciona "Frutas Frescas", entonces la lista de productos se filtra solo para mostrar frutas.

JSON categorías

Alta

S

- Estructura categorías
- Textos del caso
- Integración con filtros

HH-101

Datos

Productos del caso (códigos FR/VR/PO/PL)

Funcional

Cargar productos: FR001, FR002, FR003, VR001, VR002, VR003, PO001, PO003, PL001.

Validar estructura común; precios CLP; stocks enteros.

Dada las semillas, cuando renderizo catálogo, entonces se visualizan con la info correcta.

JSON productos

Alta

M

- Crear listado
- Campos precio/stock/origen/desc
- Imágenes representativas

HH-110

QA

Check de accesibilidad

No Funcional

Pasar checklist: foco visible, alt, contraste, labels, aria-live en errores.

Revisión manual con teclado + herramientas básicas (sin plugins).

Dada la app, cuando navego con teclado y reviso contraste, entonces cumplo los mínimos definidos.

Checklist interno

Media

S

- Lista de verificación
- Correcciones
- Evidencia capturas

HH-111

QA

Responsive en 3 breakpoints

No Funcional

Verificar composición en ≤480, 481–768, ≥769.

Sin desbordes horizontales; menú colapsable (hamburguer); imágenes redimensionables.

Dado el diseño, cuando redimensiono la ventana, entonces no hay barras de scroll horizontales y los elementos se reacomodan correctamente.

Bootstrap

Alta

M

- Definir media queries con Bootstrap
- Probar 5 vistas

HH-112

QA

Cobertura de tests

No Funcional

Alcanzar cobertura de línea >80% en los módulos de lógica de negocio (CRUD mock, Carrito).

Usar Jest para medir cobertura.

Dado el proyecto, cuando ejecuto los tests, entonces la cobertura reportada de los archivos de lógica es superior al 80%.

Jest

Alta

S

- Configurar Jest
- Ejecutar tests y reportar cobertura