import ListingManagement from "@/components/modules/management/ListingManagement";
import NoData from "@/components/shared/NoData";
import { getAllListings } from "@/services/ListingService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Listing Management",
  description:
    "This is Listing Management Page of the dashboard used by admin only",
};

const ListingManagementPage = async () => {
  const listings = await getAllListings({ limit: 12 });

  if (listings?.data?.length === 0) {
    return <NoData />;
  }

  return (
    <div>
      <ListingManagement listings={listings?.data} meta={listings?.meta} />
    </div>
  );
};

export default ListingManagementPage;
