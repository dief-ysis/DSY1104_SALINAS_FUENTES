import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders correct number of page buttons', () => {
    render(<Pagination {...defaultProps} />);
    const pageButtons = screen.getAllByRole('button').filter(button => !isNaN(button.textContent));
    expect(pageButtons).toHaveLength(5);
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByLabelText('Página anterior');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const nextButton = screen.getByLabelText('Página siguiente');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with correct page number when clicking page button', () => {
    render(<Pagination {...defaultProps} />);
    const pageThreeButton = screen.getByText('3');
    fireEvent.click(pageThreeButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when clicking next/previous buttons', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    
    const prevButton = screen.getByLabelText('Página anterior');
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    const nextButton = screen.getByLabelText('Página siguiente');
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});