"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, MapPin, Check, X, Eye, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { TListing, TMongoose } from "@/types";
import ImageSlider from "@/components/shared/ImageSlider";
import { Button } from "@/components/ui/button";
import ConfirmationBox from "@/components/shared/ConfirmationBox";
import { toast } from "sonner";
import { deleteListing } from "@/services/ListingService";
import { Modal } from "@/components/shared/Modal";
import ListingForm from "@/components/forms/ListingForm";

interface ListingCardProps {
  listing: TListing & TMongoose;
  edit?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ListingCard = ({
  listing,
  edit = false,
  onEdit,
  onDelete,
}: ListingCardProps) => {
  const handleDelete = async (listingId: string) => {
    const toastId = toast.loading("Deleting listing...");

    try {
      const res = await deleteListing(listingId);
      if (res.success) {
        toast.success(res?.message, { id: toastId });
      } else {
        toast.error(res?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Error deleting listing", { id: toastId });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative">
            <ImageSlider images={listing.images} variant="card" />
            <Badge
              className={`absolute right-2 top-2 z-10 ${
                listing.isAvailable ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {listing.isAvailable ? "Available" : "Rented"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <p className="text-sm">{listing.houseLocation}</p>
          </div>

          <div className="mt-3 space-y-2">
            <h3 className="font-semibold">
              ${listing.rentPrice.toLocaleString()}/month
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {listing.description}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t p-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{listing.bedroomNumber} Bedrooms</span>
            </div>
            <div className="flex items-center gap-1">
              {listing.isAvailable ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>

          <div className="flex w-full items-center gap-2">
            <Link href={`/listings/${listing.listingId}`} className="flex-1">
              <Button variant="default" className="w-full hover:bg-teal-500">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </Link>

            {edit && (
              <>
                <Modal
                  trigger={
                    <Button variant="outline" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  }
                  content={<ListingForm listing={listing} edit={true} />}
                  title="Edit Listing"
                />
                <ConfirmationBox
                  trigger={
                    <Button
                      variant="outline"
                      onClick={() => onDelete?.(listing.listingId!)}
                      className="flex-1 hover:bg-red-500 hover:text-white"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  }
                  onConfirm={() => handleDelete(listing.listingId!)}
                />
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ListingCard;
