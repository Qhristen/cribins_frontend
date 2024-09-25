import Container from '@/components/container';
import Hero from '@/components/hero2';
import Linstings from '@/components/listing';

const Home = () => {
  return (
    <Container>
      <div className="pt-10">
        <Hero />
        <Linstings />
        {/* <TLSection /> */}
      </div>
    </Container>
  );
};

export default Home;
