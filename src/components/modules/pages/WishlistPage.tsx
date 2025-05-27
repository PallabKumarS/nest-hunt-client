"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  wishlistSelector,
  removeFromWishlist,
} from "@/redux/features/wishlistSlice";
import { motion } from "framer-motion";
import { Heart, MapPin, Bed, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

const WishlistPage = () => {
  const wishlistProperties = useAppSelector(wishlistSelector);
  const dispatch = useAppDispatch();

  const handleRemoveFromWishlist = (listingId: string) => {
    dispatch(removeFromWishlist(listingId));
    toast.success("Removed from wishlist");
  };

  if (wishlistProperties.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <Heart className="h-16 w-16 text-gray-300 mx-auto" />
          <h1 className="text-3xl font-bold">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground">
            Start adding properties to your wishlist to keep track of your
            favorites.
          </p>
          <Link href="/listings">
            <Button>Browse Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <Badge variant="secondary">
            {wishlistProperties.length}{" "}
            {wishlistProperties.length === 1 ? "Property" : "Properties"}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistProperties.map((property, index) => (
            <motion.div
              key={property.listingId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={property.images[0] || "/placeholder-property.jpg"}
                    alt={property.houseLocation}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveFromWishlist(property.listingId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Badge
                    className={`absolute top-2 left-2 ${
                      property.isAvailable ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {property.isAvailable ? "Available" : "Rented"}
                  </Badge>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {property.houseLocation}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">
                        {property.houseLocation}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        {property.bedroomNumber} Beds
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      ${property.rentPrice.toLocaleString()}/mo
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {property.description}
                  </p>

                  <div className="pt-2">
                    <Link href={`/listings/${property.listingId}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
