import AllListing from "@/components/modules/listing/AllListing";
import Container from "@/components/shared/Container";
import { getAllListings } from "@/services/ListingService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NH || All Listings",
  description:
    "All Listings with appropriate information and images for the property",
};

const AllListingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // Get all listings
  const listings = await getAllListings(await searchParams);

  return (
    <Container>
      <AllListing listings={listings?.data} meta={listings?.meta} />
    </Container>
  );
};

export default AllListingsPage;
