import { createBrowserRouter } from 'react-router'
import Root from './pages/root'
import Home from './pages/home'

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
        {
            index: true,
            Component: Home
        }
    ]
  }
])