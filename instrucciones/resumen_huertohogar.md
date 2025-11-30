Análisis Completo del Caso HuertoHogar y Planificación de la Evaluación Parcial N° 2

Este documento sintetiza la información de los cuatro archivos proporcionados, define el alcance del proyecto (reescritura de frontend con React y pruebas unitarias con Jest, excluyendo el panel administrativo) y ofrece un análisis crítico de los supuestos del encargo.

I. Contexto de Negocio y Estilo de HuertoHogar

Concepto

Detalle

Archivo Fuente

Giro

Tienda online dedicada a llevar productos agrícolas frescos y de calidad directamente del campo a clientes en Chile.

DSY1104 - Forma A

Misión

Proporcionar productos frescos, garantizar sabor, fomentar la conexión consumidores-agricultores y promover una alimentación saludable/sostenible.

DSY1104 - Forma A

Visión

Ser la tienda online líder en distribución de productos frescos y naturales en Chile, con un nuevo estándar de calidad y servicio.

DSY1104 - Forma A

Colores Principales

Blanco Suave (#F7F7F7), Verde Esmeralda (#2E8B57), Amarillo Mostaza (#FFD700), Marrón Claro (#8B4513).

DSY1104 - Forma A / Matriz Requerimientos (HH-001)

Tipografía

Montserrat (general) y Playfair Display (encabezados).

DSY1104 - Forma A / Matriz Requerimientos (HH-002)

II. Alcance del Proyecto (Reescritura de Frontend Únicamente)

El proyecto se enmarca como una reescritura completa del frontend (no una migración) de la tienda.

Requisito Técnico

Detalle y Herramientas

Observación Crucial

Stack Principal

React para el framework de frontend, Bootstrap para el diseño responsivo.

Se excluye la implementación de un backend o un panel administrativo.

Datos

Crear un archivo JavaScript que actúe como una fuente de datos simulada (mock database) e implementar funciones CRUD (Crear, Leer, Actualizar, Eliminar) básicas.

La lógica de negocio (CRUD) debe residir en estas funciones mock, las cuales deben ser probadas rigurosamente.

Componentes

Convertir las vistas requeridas en componentes de React reutilizables, asegurando la gestión eficiente de su estado (state) y propiedades (props).

La atomicidad y modularidad de React es un punto central de la evaluación (IE1.1.2).

Componentes y Vistas Requeridas (Excluyendo Admin Panel)

A continuación, se detalla la lista exhaustiva de las vistas y componentes requeridos para el flujo de la tienda y el usuario, extraídos de las instrucciones y la matriz, y excluyendo explícitamente todos los módulos administrativos:

Módulo/Vista

Componentes Principales Implicados

Requerimiento Matriz / Instrucción

Navegación Base

Header, Footer, Navbar responsiva.

DSY1104 Anexo 1 / HH-006

Home

HomeContainer, Banner, CategoriasDestacadas, Ofertas.

DSY1104 Anexo 1

Productos

ListadoProductos, Filtros, TarjetaProducto.

HH-101 (Carga de Productos)

Detalle Producto

DetalleProducto, SelectorCantidad, BotonAgregarCarrito.

DSY1104 Anexo 1

Categorías

ListadoCategorias, CategoriaContainer (e.g., Categoría #1).

DSY1104 Anexo 1 / HH-007

Ofertas

ListadoOfertas, ContadorOferta.

DSY1104 Anexo 1

Usuario

RegistroForm, LoginForm.

DSY1104 Anexo 1

Informativas

Nosotros, Contacto (FormularioContacto).

DSY1104 Anexo 1

Blogs

ListadoBlogs, DetalleBlog (Blog #1 y Blog #2).

DSY1104 Anexo 1

Checkout (Compra)

Carrito (listado, subtotal), CheckoutForm (datos de envío).

DSY1104 Anexo 1

Procesamiento Pago

PagoExitosoPage, PagoErrorPage.

DSY1104 Anexo 1

III. Estrategia de Pruebas Unitarias (JEST)

ATENCIÓN: Las instrucciones en los archivos PDF mencionan explícitamente Jasmine y Karma. Sin embargo, siguiendo tu instrucción directa y priorizando el uso de herramientas modernas, la estrategia se basará en JEST, el estándar actual de pruebas para React.

Herramientas: JEST (como test runner y assertion library) y React Testing Library (RTL) para centrarse en el comportamiento del usuario.

Alcance: Las pruebas unitarias deben cubrir la lógica de los componentes y la lógica de negocio mockeada (CRUD) para asegurar la calidad del código (IE2.2.1).

Tipos de Pruebas Requeridas (Adaptadas a JEST/RTL):

Tipo de Prueba

Enfoque (con Jest/RTL)

Caso de Uso HuertoHogar

Lógica de Estado

Comprobar que el estado de un componente (ej. un formulario) cambia correctamente tras la interacción del usuario.

Verificar que el state de un RegistroForm se actualiza con los datos de entrada.

Manejo de Props

Verificar que el componente recibe y utiliza las propiedades de entrada de manera adecuada.

Probar que el TarjetaProducto renderiza el precio y el stock pasado por props.

Simulación de Eventos

Simular eventos de usuario para verificar que se ejecuten funciones específicas o cambios de estado/DOM.

Simular un clic en BotonAgregarCarrito y comprobar que la función addProductToCart del mock de datos sea llamada.

Renderizado Condicional

Verificar que se muestre el componente o mensaje correcto bajo ciertas condiciones.

Probar que PagoErrorPage se renderiza cuando el estado de la compra es fallido.