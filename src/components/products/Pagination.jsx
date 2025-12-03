/**
 * PAGINATION - COMPONENTE DE PAGINACIÓN
 * 
 * Paginación para listados de productos.
 * Compatible con respuestas paginadas del backend Spring Boot.
 */

import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalElements = 0,
  pageSize = 12
}) => {
  // No mostrar paginación si solo hay una página o menos
  if (totalPages <= 1) {
    return null;
  }

  // Calcular rango de páginas a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
    
    // Ajustar si estamos cerca del final
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Calcular información de elementos
  const startElement = currentPage * pageSize + 1;
  const endElement = Math.min((currentPage + 1) * pageSize, totalElements);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span className="text-muted">
          Mostrando {startElement} - {endElement} de {totalElements} productos
        </span>
      </div>

      <BootstrapPagination className="pagination-controls">
        {/* Primera página */}
        <BootstrapPagination.First 
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
        />

        {/* Página anterior */}
        <BootstrapPagination.Prev 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        />

        {/* Mostrar primera página si no está en el rango */}
        {pageNumbers[0] > 0 && (
          <>
            <BootstrapPagination.Item onClick={() => onPageChange(0)}>
              1
            </BootstrapPagination.Item>
            {pageNumbers[0] > 1 && <BootstrapPagination.Ellipsis disabled />}
          </>
        )}

        {/* Páginas numeradas */}
        {pageNumbers.map((pageNum) => (
          <BootstrapPagination.Item
            key={pageNum}
            active={pageNum === currentPage}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum + 1}
          </BootstrapPagination.Item>
        ))}

        {/* Mostrar última página si no está en el rango */}
        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 2 && (
              <BootstrapPagination.Ellipsis disabled />
            )}
            <BootstrapPagination.Item onClick={() => onPageChange(totalPages - 1)}>
              {totalPages}
            </BootstrapPagination.Item>
          </>
        )}

        {/* Página siguiente */}
        <BootstrapPagination.Next 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        />

        {/* Última página */}
        <BootstrapPagination.Last 
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;