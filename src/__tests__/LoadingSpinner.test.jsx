import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renderiza el spinner de Bootstrap y el mensaje de carga', () => {
    render(<LoadingSpinner />);
    
    // Verifica el mensaje de carga visible
    expect(screen.getByText('Cargando...', { selector: '.mt-3' })).toBeInTheDocument();
    
    // Verifica el spinner de Bootstrap
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner-border');
    
    // Verifica el texto oculto para lectores de pantalla
    expect(screen.getByText('Cargando...', { selector: '.visually-hidden' })).toBeInTheDocument();
  });

  it('usa los estilos de Bootstrap para el contenedor', () => {
    const { container } = render(<LoadingSpinner />);
    const containerDiv = container.firstChild;
    
    expect(containerDiv).toHaveClass(
      'd-flex',
      'flex-column',
      'align-items-center',
      'justify-content-center'
    );
  });
});