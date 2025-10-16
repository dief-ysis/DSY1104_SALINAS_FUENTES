import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/Root";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/cart";
import NewProduct from "./pages/products/NewProduct";
import ProductDetail from "./pages/products/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            Component: Products,
          },
          {
            path: "nuevo",
            Component: NewProduct,
          },
          {
            path: ":id",
            Component: ProductDetail,
          }
        ]
      },
      {
        path: "cart",
        Component: Cart,
      }
    ]
  }
]);