import './Pagination.css';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  if (totalPages <= 1) return null;

  return (
    <div className="pagination" role="navigation" aria-label="Paginación">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        &larr;
      </button>

      <div className="pagination-pages">
        {pages.map(page => (
          <button
            key={page}
            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Ir a página ${page}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        &rarr;
      </button>
    </div>
  );
}