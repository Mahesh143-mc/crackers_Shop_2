import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import BestSelling from '../components/home/BestSelling';
import FestivalOffers from '../components/home/FestivalOffers';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AnalyticsPreview from '../components/home/AnalyticsPreview';
import POSFeature from '../components/home/POSFeature';
import CustomerReviews from '../components/home/CustomerReviews';
import DeliveryService from '../components/home/DeliveryService';
import FAQSection from '../components/home/FAQSection';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <div className="bg-zinc-950 min-h-screen text-white selection:bg-orange-500 selection:text-white">
      <HeroSection />
      <FeaturedCategories />
      <BestSelling />
      <FestivalOffers />
      <WhyChooseUs />
      <AnalyticsPreview />
      <POSFeature />
      <CustomerReviews />
      <DeliveryService />
      <FAQSection />
      <Newsletter />
    </div>
  );
};

export default Home;
