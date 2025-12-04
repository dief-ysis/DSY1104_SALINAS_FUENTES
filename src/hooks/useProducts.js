/**
 * USEPRODUCTS HOOK - GESTIÓN DE PRODUCTOS CON FILTROS (CLIENT SIDE)
 * * Estrategia: Carga todos los productos y filtra en el cliente.
 * Esto garantiza que combinen todos los filtros (Precio + Categoria + Busqueda)
 * sin necesitar lógica compleja de JPA Specifications en el Backend.
 */

import { useState, useMemo, useEffect } from 'react';
import productService from '../services/productService';

const ITEMS_PER_PAGE = 12;

export function useProducts() {
  // ============================================================
  // ESTADO
  // ============================================================
  
  const [allProductsRaw, setAllProductsRaw] = useState([]); // Todos los productos sin filtrar
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados de filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(''); // Búsqueda texto
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  // ============================================================
  // CARGA INICIAL DE DATOS
  // ============================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // 1. Cargar Categorías
        const cats = await productService.getCategories();
        setCategories(cats);

        // 2. Cargar TODOS los productos (Pedimos una página grande)
        // Backend: Pageable (page 0, size 1000)
        const response = await productService.getProducts({ page: 0, size: 1000 });
        
        // Manejar si devuelve objeto paginado (content) o array directo
        const productsList = response.content || response || [];
        setAllProductsRaw(productsList);
        
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
  // LÓGICA DE FILTRADO (EL CEREBRO)
  // ============================================================

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProductsRaw];

    // 1. Filtro por Búsqueda (Nombre o Descripción)
    if (filter) {
      const searchLower = filter.toLowerCase();
      result = result.filter(p => 
        (p.nombre || p.name || '').toLowerCase().includes(searchLower) ||
        (p.descripcion || p.description || '').toLowerCase().includes(searchLower)
      );
    }

    // 2. Filtro por Categoría
    if (category) {
      result = result.filter(p => {
        const cat = p.categoria || p.category || '';
        return cat.toUpperCase() === category.toUpperCase();
      });
    }

    // 3. Filtro por Precio Mínimo
    if (minPrice !== '' && minPrice !== undefined) {
      result = result.filter(p => (p.precio || p.price) >= Number(minPrice));
    }

    // 4. Filtro por Precio Máximo
    if (maxPrice !== '' && maxPrice !== undefined) {
      result = result.filter(p => (p.precio || p.price) <= Number(maxPrice));
    }

    // 5. Ordenamiento
    if (sortBy) {
      const [field, order] = sortBy.split(','); // ej: "precio,asc"
      
      result.sort((a, b) => {
        let valA, valB;

        // Obtener valores según el campo
        if (field === 'precio' || field === 'price') {
          valA = a.precio || a.price || 0;
          valB = b.precio || b.price || 0;
        } else if (field === 'stock') {
          valA = a.stock || 0;
          valB = b.stock || 0;
        } else {
          // Por defecto nombre
          valA = (a.nombre || a.name || '').toLowerCase();
          valB = (b.nombre || b.name || '').toLowerCase();
        }

        // Comparar
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [allProductsRaw, filter, category, minPrice, maxPrice, sortBy]);

  // ============================================================
  // PAGINACIÓN LOCAL
  // ============================================================

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    // Asegurar que la página actual sea válida tras filtrar
    const validPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));
    if (validPage !== currentPage) setCurrentPage(validPage);

    const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage, totalPages]);

  // ============================================================
  // EXPOSE FUNCIONES
  // ============================================================

  const handleFilterChange = (newFilters) => {
    // Mapear los filtros que vienen del componente ProductFilters
    if (newFilters.search !== undefined) setFilter(newFilters.search);
    if (newFilters.categoria !== undefined) setCategory(newFilters.categoria);
    if (newFilters.minPrecio !== undefined) setMinPrice(newFilters.minPrecio);
    if (newFilters.maxPrecio !== undefined) setMaxPrice(newFilters.maxPrecio);
    if (newFilters.sort !== undefined) setSortBy(newFilters.sort);
    
    // Resetear a página 1 si cambian filtros (excepto si solo cambia page)
    if (newFilters.page === undefined || newFilters.page === 0) {
        setCurrentPage(1);
    } else {
        setCurrentPage(newFilters.page);
    }
  };

  const resetFilters = () => {
    setFilter('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('');
    setCurrentPage(1);
  };

  return {
    products: paginatedProducts, // Productos de la página actual
    loading,
    error,
    totalPages,
    totalElements: filteredAndSortedProducts.length,
    currentPage,
    
    // Estado actual de filtros (para UI)
    filters: {
        search: filter,
        categoria: category,
        minPrecio: minPrice,
        maxPrecio: maxPrice,
        sort: sortBy
    },

    setFilter: (val) => handleFilterChange({ search: val }),
    setCategory: (val) => handleFilterChange({ categoria: val }),
    setSort: (val) => handleFilterChange({ sort: val }),
    setPage: setCurrentPage,
    
    // Función genérica que usa ProductFilters.jsx
    onFilterChange: handleFilterChange,
    resetFilters
  };
}

export default useProducts;