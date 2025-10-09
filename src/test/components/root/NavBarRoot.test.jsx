import { render, screen } from '@testing-library/react';
import NavBarRoot from '../../../components/root/NavBarRoot';

describe('NavBarRoot', () => {
  test('renderiza correctamente', () => {
    render(<NavBarRoot />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});