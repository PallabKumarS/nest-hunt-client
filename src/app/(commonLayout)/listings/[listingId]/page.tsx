import Container from "@/components/shared/Container";
import { getSingleListing } from "@/services/ListingService";
import { Metadata } from "next";

const listingFetch = async (listingId: string) => {
  return await getSingleListing(listingId);
};

export const metadata: Metadata = {
  title: "NH || Listing Details",
  description:
    "Listing Details with appropriate information and images for the property",
};

const ListingDetailsPage = () => {
  return (
    <Container>
      <h1>This is ListingDetailsPage Component</h1>
    </Container>
  );
};

export default ListingDetailsPage;
