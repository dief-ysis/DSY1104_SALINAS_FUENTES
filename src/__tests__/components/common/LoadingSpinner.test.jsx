import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders correctly', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.firstChild).toHaveClass('loading-spinner');
  });

  it('displays loading text', () => {
    const { getByText } = render(<LoadingSpinner />);
    expect(getByText('Cargando...')).toBeInTheDocument();
  });
});