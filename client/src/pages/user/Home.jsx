import HeroSection from '../../components/home/HeroSection';
import FeaturedCategories from '../../components/home/FeaturedCategories';
import BestSelling from '../../components/home/BestSelling';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import DeliveryService from '../../components/home/DeliveryService';
import FAQSection from '../../components/home/FAQSection';
import Newsletter from '../../components/home/Newsletter';

const Home = () => {
  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white">
      <HeroSection />
      <FeaturedCategories />
      <BestSelling />
      <WhyChooseUs />
      <DeliveryService />
      <FAQSection />
      <Newsletter />
    </div>
  );
};

export default Home;
