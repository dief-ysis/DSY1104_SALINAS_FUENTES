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
        
        // Usar propiedades normalizadas que vienen del service
        const name = product.name || product.nombre || '';
        const description = product.description || product.descripcion || '';
        const category = product.category || product.categoriaId || '';
        
        const matchesFilter = filter === '' || 
          name.toLowerCase().includes(filter.toLowerCase()) ||
          description.toLowerCase().includes(filter.toLowerCase());
        
        const matchesCategory = category === '' || 
          category.toLowerCase() === category.toLowerCase();
        
        return matchesFilter && matchesCategory;
      })
      .sort((a, b) => {
        const factor = sortOrder === 'asc' ? 1 : -1;
        if (sortBy === 'precio' || sortBy === 'price') {
          return (a.price - b.price) * factor;
        }
        const aValue = a[sortBy] || a.name || '';
        const bValue = b[sortBy] || b.name || '';
        return String(aValue).localeCompare(String(bValue)) * factor;
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