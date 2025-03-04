import ListingDetails from "@/components/modules/listing/ListingDetails";
import Container from "@/components/shared/Container";
import { getSingleListing } from "@/services/ListingService";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { listingId: string };
}): Promise<Metadata> {
  const listing = await getSingleListing((await params).listingId);

  return {
    title: `NH || ${listing?.data?.houseLocation}`,
    description: listing?.data?.description,
  };
}

const ListingDetailsPage = async ({
  params,
}: {
  params: { listingId: string };
}) => {
  const listingId = (await params).listingId;
  const listing = await getSingleListing(listingId);

  console.log(listing);

  return (
    <Container>
      <ListingDetails listing={listing?.data} />
    </Container>
  );
};

export default ListingDetailsPage;
