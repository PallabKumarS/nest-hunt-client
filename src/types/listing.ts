export type TListing = {
  houseLocation: string;
  description: string;
  rentPrice: number;
  bedroomNumber: number;
  images: string[];
  landlordId: string;
  isAvailable?: boolean;
  listingId?: string;
  features?: string;
  isDeleted?: boolean;
};
