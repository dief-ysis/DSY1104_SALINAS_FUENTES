import { Hero } from '../components/home/Hero';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { BlogSection } from '../components/home/BlogSection';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <BlogSection />
    </div>
  );
}