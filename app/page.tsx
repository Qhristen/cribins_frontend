import Container from '@/components/container';
import Hero from '@/components/hero';
import Linstings from '@/components/listing';
import TLSection from '@/components/t-l-section';

const Home = () => {
  return (
    <Container>
      <div className="pt-10">
        <Linstings />
        {/* <Hero /> */}
        {/* <TLSection /> */}
      </div>
    </Container>
  );
};

export default Home;
