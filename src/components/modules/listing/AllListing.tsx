import ListingCard from "./ListingCard";
import NoData from "@/components/shared/NoData";
import { TListing, TMongoose } from "@/types";

interface AllListingProps {
  listings: (TListing & TMongoose)[];
}

const AllListing = ({ listings }: AllListingProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Available Properties
        </h1>
        <p className="text-muted-foreground">
          Discover your perfect home from our curated collection of properties
        </p>
      </div>

      {listings?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] lg:grid-cols-3 gap-4 mb-10">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default AllListing;
