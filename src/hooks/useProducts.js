/**
 * USEPRODUCTS HOOK - GESTIÓN DE PRODUCTOS CON FILTROS
 * 
 * Custom hook para manejar el estado de productos con:
 * - Filtrado por categoría y búsqueda
 * - Ordenamiento (nombre, precio)
 * - Paginación
 * 
 * PRINCIPIOS APLICADOS:
 * - useMemo para optimizar cálculos costosos
 * - Separación de lógica de negocio
 * 
 * RESPONDE A PREGUNTAS:
 * - P94: Ventajas de custom hooks (reutilización, encapsulación)
 * - P67: Minimizar llamadas con optimizaciones
 */

import { useState, useMemo, useEffect } from 'react';
import productService from '../services/productService';

const ITEMS_PER_PAGE = 12;

/**
 * Hook para gestionar productos con filtros y paginación
 * 
 * @returns {Object} Estado y funciones de productos
 */
export function useProducts() {
  // ============================================================
  // ESTADO
  // ============================================================
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados de filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('nombre');
  const [sortOrder, setSortOrder] = useState('asc');

  // ============================================================
  // CARGA INICIAL DE DATOS
  // ============================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // TODO: Cuando backend esté listo, usar productService real
        // Por ahora, cargar desde mock/localStorage si existe
        
        // OPCIÓN 1: Si backend está listo
        // const response = await productService.getProducts({
        //   page: 0,
        //   size: 100 // Cargar todos para filtrar localmente
        // });
        // setProducts(response.content || response);
        
        // OPCIÓN 2: Mock temporal (eliminar cuando backend esté listo)
        const mockProducts = [
          {
            id: 1,
            nombre: 'Manzanas Fuji',
            precio: 1200,
            categoria: 'FRUTAS',
            stock: 150,
            imagen: '/assets/products/manzana.jpg'
          },
          {
            id: 2,
            nombre: 'Zanahorias Orgánicas',
            precio: 900,
            categoria: 'VERDURAS',
            stock: 100,
            imagen: '/assets/products/zanahoria.jpg'
          }
          // Agregar más productos mock según necesites
        ];
        
        setProducts(mockProducts);
        
        // Cargar categorías
        const categoriesData = await productService.getCategories();
        setCategories(categoriesData);
        
      } catch (err) {
        console.error('[useProducts] Error al cargar datos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ============================================================
  // FILTRADO Y ORDENAMIENTO CON useMemo
  // ============================================================

  /**
   * Productos filtrados y ordenados
   * OPTIMIZACIÓN: useMemo evita recalcular en cada render
   */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filtro por búsqueda
    if (filter) {
      const searchLower = filter.toLowerCase();
      result = result.filter(product => {
        const nombre = product.nombre || product.name || '';
        const descripcion = product.descripcion || product.description || '';
        
        return nombre.toLowerCase().includes(searchLower) ||
               descripcion.toLowerCase().includes(searchLower);
      });
    }

    // Filtro por categoría
    if (category) {
      result = result.filter(product => {
        const productCategory = product.categoria || product.category || '';
        return productCategory.toLowerCase() === category.toLowerCase();
      });
    }

    // Ordenamiento
    result.sort((a, b) => {
      let aValue, bValue;

      if (sortBy === 'nombre' || sortBy === 'name') {
        aValue = (a.nombre || a.name || '').toLowerCase();
        bValue = (b.nombre || b.name || '').toLowerCase();
      } else if (sortBy === 'precio' || sortBy === 'price') {
        aValue = a.precio || a.price || 0;
        bValue = b.precio || b.price || 0;
      } else {
        return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return result;
  }, [products, filter, category, sortBy, sortOrder]); // ✅ DEPENDENCIAS

  // ============================================================
  // PAGINACIÓN CON useMemo
  // ============================================================

  /**
   * Productos de la página actual
   * OPTIMIZACIÓN: useMemo
   */
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  /**
   * Total de páginas
   * OPTIMIZACIÓN: useMemo
   */
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  }, [filteredProducts]);

  // ============================================================
  // FUNCIONES DE CONTROL
  // ============================================================

  /**
   * Actualiza el filtro de búsqueda
   */
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset página al filtrar
  };

  /**
   * Actualiza el filtro de categoría
   */
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Reset página al filtrar
  };

  /**
   * Actualiza el ordenamiento
   */
  const handleSortChange = (newSortBy, newSortOrder = 'asc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  /**
   * Cambia de página
   */
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Reinicia todos los filtros
   */
  const resetFilters = () => {
    setFilter('');
    setCategory('');
    setSortBy('nombre');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  // ============================================================
  // RETORNO
  // ============================================================

  return {
    // Datos
    products: paginatedProducts,
    allProducts: filteredProducts,
    categories,
    
    // Estados
    loading,
    error,
    
    // Paginación
    currentPage,
    totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    
    // Filtros actuales
    filter,
    category,
    sortBy,
    sortOrder,
    
    // Funciones
    setFilter: handleFilterChange,
    setCategory: handleCategoryChange,
    setSort: handleSortChange,
    setPage: handlePageChange,
    resetFilters
  };
}

export default useProducts;