import { useState, useMemo } from 'react';
import { PRODUCTS_HH, validarProducto } from '../database/products';
import { CATEGORIES } from '../database/categories';

const ITEMS_PER_PAGE = 12;

export function useProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('nombre');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_HH
      .filter(validarProducto)
      .filter(product => {
        const matchesFilter = filter === '' || 
          product.nombre.toLowerCase().includes(filter.toLowerCase()) ||
          product.descripcion.toLowerCase().includes(filter.toLowerCase());
        
        const matchesCategory = category === '' || 
          product.categoriaId.toLowerCase() === category.toLowerCase();
        
        return matchesFilter && matchesCategory;
      })
      .sort((a, b) => {
        const factor = sortOrder === 'asc' ? 1 : -1;
        if (sortBy === 'precio') {
          return (a.precioCLP - b.precioCLP) * factor;
        }
        return a[sortBy].localeCompare(b[sortBy]) * factor;
      });
  }, [filter, category, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  const categories = CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name
  }));

  return {
    products: paginatedProducts,
    categories,
    pagination: {
      currentPage,
      totalPages,
      setPage: setCurrentPage
    },
    filters: {
      filter,
      setFilter,
      category,
      setCategory,
      sortBy,
      setSortBy,
      sortOrder,
      setSortOrder
    }
  };
}