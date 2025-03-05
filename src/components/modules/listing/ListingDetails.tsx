"use client";

import { TListing, TMongoose } from "@/types";
import { motion } from "framer-motion";
import ImageSlider from "@/components/shared/ImageSlider";
import { Badge } from "@/components/ui/badge";
import { Bed, MapPin, Check, Calendar } from "lucide-react";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/features/authSlice";
import Link from "next/link";

interface ListingDetailsProps {
  listing: TListing & TMongoose;
}

const ListingDetails = ({ listing }: ListingDetailsProps) => {
  const user = useAppSelector(userSelector);

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="text-4xl">🏠</div>
        <h2 className="text-2xl font-semibold text-gray-800">
          No Listing Found
        </h2>
        <p className="text-gray-600">
          This listing may have been removed or is no longer available.
        </p>
        <Link href="/listings" className="text-primary hover:underline">
          Browse other listings
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 mb-20"
    >
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            {listing.houseLocation}
          </h1>
          <Badge
            className={listing.isAvailable ? "bg-green-500" : "bg-red-500"}
          >
            {listing.isAvailable ? "Available" : "Rented"}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <p>{listing.houseLocation}</p>
        </div>
      </div>

      {/* Image Slider */}
      <div className="overflow-hidden rounded-xl">
        <ImageSlider images={listing.images} variant="detail" />
      </div>

      {/* Details Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Property Details</h2>
            <p className="text-muted-foreground">{listing.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-primary" />
                <span>{listing.bedroomNumber} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>
                  Status: {listing.isAvailable ? "Available" : "Rented"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-primary">
              ${listing.rentPrice.toLocaleString()}/month
            </h2>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Listed on:
                {formatDistance(new Date(listing.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>

          {listing.features && (
            <div className="space-y-2 mb-10">
              <h3 className="text-xl font-semibold">Additional Features</h3>
              <p className="text-muted-foreground">{listing.features}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Request Button Section */}
      <div className="mt-6 text-center mx-auto">
        {user?.role === "tenant" ? (
          <>
            {listing.isAvailable ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="w-full bg-primary text-white hover:bg-primary/90 mx-auto"
                  onClick={() => {
                    console.log("Request to Rent");
                  }}
                >
                  Request to Rent
                </Button>
              </motion.div>
            ) : (
              <div className="rounded-xl border bg-muted p-4 mx-auto text-center">
                <p className="text-lg font-medium text-muted-foreground text-center">
                  This property is currently rented. Check back later or explore
                  other available properties.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border bg-muted p-4 mx-auto text-center">
            <p className="text-lg font-medium text-muted-foreground text-center">
              Only tenants can request to rent properties. Please log in as a
              tenant to make a request.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ListingDetails;
