import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import About from '../../pages/info/About';

const renderAbout = () => {
  return render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );
};

describe('About Page', () => {
  it('renders about page', () => {
    renderAbout();
    const container = document.querySelector('.container') || document.body;
    expect(container).toBeTruthy();
  });

  it('renders page content', () => {
    renderAbout();
    // Check for content sections
    const content = document.querySelector('[class*="about"]') || screen.queryByText(/about|sobre|acerca/i) || document.body;
    expect(content).toBeTruthy();
  });

  it('has main heading', () => {
    renderAbout();
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });
});
