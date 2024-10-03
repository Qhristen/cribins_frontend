import Container from '@/components/container';
import SingleListingClient from '@/components/listing/single-listing';

interface PageProps {
  params: {
    listingId: string;
  };
}
const SingleListing = ({ params }: PageProps) => {
  return <SingleListingClient listingId={params.listingId} />;
};

export default SingleListing;
