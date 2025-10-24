import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from '../components/products/Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: mockOnPageChange
  };

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renderiza la paginación con el número correcto de páginas', () => {
    render(<Pagination {...defaultProps} />);
    
    // Verifica que los números de página están presentes
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('deshabilita el botón Anterior en la primera página', () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const prevButton = container.querySelector('.pagination .page-item:first-child');
    expect(prevButton).toHaveClass('disabled');
  });

  it('deshabilita el botón Siguiente en la última página', () => {
    const { container } = render(<Pagination {...defaultProps} currentPage={5} />);
    const nextButton = container.querySelector('.pagination .page-item:last-child');
    expect(nextButton).toHaveClass('disabled');
  });

  it('llama a onPageChange con el número de página correcto al hacer clic', () => {
    render(<Pagination {...defaultProps} />);
    const pageThreeButton = screen.getByText('3');
    fireEvent.click(pageThreeButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('marca la página actual como activa', () => {
    const { container } = render(<Pagination {...defaultProps} currentPage={3} />);
    const activePageItem = container.querySelector('.pagination .page-item.active');
    expect(activePageItem).toBeInTheDocument();
  });
});