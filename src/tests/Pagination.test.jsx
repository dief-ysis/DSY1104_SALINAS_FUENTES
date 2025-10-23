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

  it('renderiza la paginación de Bootstrap con el número correcto de páginas', () => {
    render(<Pagination {...defaultProps} />);
    const pageItems = screen.getAllByRole('listitem');
    expect(pageItems).toHaveLength(7); // 5 números + botones prev/next
    
    // Verifica que usa los estilos de Bootstrap
    const nav = screen.getByRole('list');
    expect(nav).toHaveClass('pagination');
    expect(nav).toHaveClass('justify-content-center');

    // Verifica que los números de página están presentes
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('deshabilita el botón Anterior en la primera página', () => {
    render(<Pagination {...defaultProps} />);
    const items = screen.getAllByRole('listitem');
    const prevButton = items[0];
    expect(prevButton).toHaveClass('disabled');
  });

  it('deshabilita el botón Siguiente en la última página', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const items = screen.getAllByRole('listitem');
    const nextButton = items[items.length - 1];
    expect(nextButton).toHaveClass('disabled');
  });

  it('llama a onPageChange con el número de página correcto al hacer clic', () => {
    render(<Pagination {...defaultProps} />);
    const pageThreeButton = screen.getByText('3');
    fireEvent.click(pageThreeButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('llama a onPageChange al hacer clic en los botones Anterior/Siguiente', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    
    const items = screen.getAllByRole('listitem');
    const prevButton = items[0].querySelector('.page-link');
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    const nextButton = items[items.length - 1].querySelector('.page-link');
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('marca la página actual como activa usando los estilos de Bootstrap', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const activePageButton = screen.getByText('3').closest('.page-item');
    expect(activePageButton).toHaveClass('active');
  });
});