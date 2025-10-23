import { useState, useMemo, useEffect } from 'react';
import { productService } from '../services/product';

const ITEMS_PER_PAGE = 12;

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('nombre');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getAllCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        if (!product) return false;
        
        const nombre = product.nombre || '';
        const descripcion = product.descripcion || '';
        const categoriaId = product.categoriaId || '';
        
        const matchesFilter = filter === '' || 
          nombre.toLowerCase().includes(filter.toLowerCase()) ||
          descripcion.toLowerCase().includes(filter.toLowerCase());
        
        const matchesCategory = category === '' || 
          categoriaId.toLowerCase() === category.toLowerCase();
        
        return matchesFilter && matchesCategory;
      })
      .sort((a, b) => {
        const factor = sortOrder === 'asc' ? 1 : -1;
        if (sortBy === 'precio') {
          return (a.precioCLP - b.precioCLP) * factor;
        }
        return a[sortBy].localeCompare(b[sortBy]) * factor;
      });
  }, [products, filter, category, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  const categoriesOptions = useMemo(() => 
    categories.map(cat => ({
      id: cat.id,
      name: cat.name
    }))
  , [categories]);

  return {
    products: paginatedProducts,
    categories: categoriesOptions,
    loading,
    error,
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