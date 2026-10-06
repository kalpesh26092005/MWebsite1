import { HeroSection } from '../components/home/HeroSection';
import { AboutPreview } from '../components/home/AboutPreview';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { BestSellers } from '../components/home/BestSellers';
import { HowToOrder } from '../components/home/HowToOrder';
import { Testimonials } from '../components/home/Testimonials';
import { InstagramFeed } from '../components/home/InstagramFeed';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutPreview />
      <FeaturedCategories />
      <BestSellers />
      <HowToOrder />
      <Testimonials />
      <InstagramFeed />
    </main>
  );
};

export default Home;