import CreateListing from "@/components/modules/listing/CreateListing";
import { getPersonalListings } from "@/services/ListingService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NH || Create Listing",
  description:
    "Create Listing with appropriate information and images for the property",
};

const CreateListingPage = async () => {
  const listings = await getPersonalListings();

  return <CreateListing listings={listings?.data} />;
};

export default CreateListingPage;
