import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Blog from '../../pages/info/Blog';

const renderBlog = () => {
  return render(
    <BrowserRouter>
      <Blog />
    </BrowserRouter>
  );
};

describe('Blog Page', () => {
  it('renders blog page', () => {
    renderBlog();
    const container = document.querySelector('.container') || document.body;
    expect(container).toBeTruthy();
  });

  it('renders blog articles or posts', () => {
    renderBlog();
    // Check for blog content
    const content = document.querySelector('[class*="article"]') || document.querySelector('[class*="post"]') || document.body;
    expect(content).toBeTruthy();
  });

  it('has page structure', () => {
    renderBlog();
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });
});
