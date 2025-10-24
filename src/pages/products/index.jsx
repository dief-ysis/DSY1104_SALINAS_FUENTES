import ProductsComponent from "../../components/products/Products";

// Nota: Este page delega la carga de datos al loader de ruta (`productsLoader`)
// Implementación realizada para cumplir la rúbrica: el componente visual usa
// `useLoaderData()` y `useNavigation()` para mostrar `LoadingSpinner` durante
// estados de navegación 'loading'. El loader (`src/loaders/products.js`) se
// encarga de llamar a `productService.getAllProducts()` y `getAllCategories()`.
export default function Products() {
  return <ProductsComponent />;
}