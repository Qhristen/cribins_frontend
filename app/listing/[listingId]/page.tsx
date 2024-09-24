import Container from '@/components/container';
import SingleListingClient from '@/components/listing/single-listing';

interface PageProps {
  params: {
    listingId: string;
  };
}
const SingleListing = ({ params }: PageProps) => {
  return (
    <Container>
      <SingleListingClient listingId={params.listingId} />
    </Container>
  );
};

export default SingleListing;
