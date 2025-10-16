import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/common/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('has correct ARIA label', () => {
    render(<LoadingSpinner />);
    expect(screen.getByLabelText('Cargando contenido')).toBeInTheDocument();
  });
});