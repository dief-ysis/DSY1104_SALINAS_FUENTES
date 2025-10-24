import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renderiza el spinner de Bootstrap', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner-border');
  });

  it('usa los estilos de Bootstrap para el contenedor', () => {
    const { container } = render(<LoadingSpinner />);
    const containerDiv = container.querySelector('.loading-spinner');
    
    expect(containerDiv).toHaveClass(
      'd-flex',
      'flex-column',
      'align-items-center',
      'justify-content-center'
    );
  });

  it('tiene el data-testid correcto', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });
});