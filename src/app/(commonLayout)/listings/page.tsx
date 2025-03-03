import AllListing from "@/components/modules/listing/AllListing";
import Container from "@/components/shared/Container";
import { getAllListings } from "@/services/ListingService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NH || All Listings",
  description:
    "All Listings with appropriate information and images for the property",
};

const AllListingsPage = async () => {
  const listings = await getAllListings();

  return (
    <Container>
      <AllListing listings={listings?.data} />
    </Container>
  );
};

export default AllListingsPage;
