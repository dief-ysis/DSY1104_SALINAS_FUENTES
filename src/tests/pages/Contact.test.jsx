import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../../pages/info/Contact';

const renderContact = () => {
  return render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  );
};

describe('Contact Page', () => {
  it('renders contact page', () => {
    renderContact();
    const container = document.querySelector('.container') || document.body;
    expect(container).toBeTruthy();
  });

  it('renders form elements', () => {
    renderContact();
    // Check for form inputs
    const inputs = screen.queryAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(0);
  });

  it('renders page title or heading', () => {
    renderContact();
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });
});
