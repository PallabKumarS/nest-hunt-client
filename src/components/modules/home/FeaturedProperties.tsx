"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TListing, TMongoose } from "@/types";
import { useEffect, useState } from "react";
import { getAllListings } from "@/services/ListingService";

const FeaturedPropertiesClient = () => {
  const [listings, setListings] = useState<(TListing & TMongoose)[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await getAllListings({
          limit: "3",
          isAvailable: "true",
          isDeleted: "false",
        });
        setListings(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight">
              Featured <span className="text-gradient">Properties</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Handpicked properties that match your preferences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/listings">
              <Button variant="outline" className="mt-4 md:mt-0">
                View All Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {listings.map((property) => (
            <motion.div
              key={property.listingId}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={
                    property.images[0] ||
                    "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564181/samples/landscapes/architecture-signs.jpg"
                  }
                  alt={property.description}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-white">
                  Featured
                </Badge>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.houseLocation}</span>
                </div>

                <h3 className="text-xl font-semibold line-clamp-1">
                  {property.description}
                </h3>

                <div className="flex justify-between items-center">
                  <p className="text-primary font-bold">
                    ${property.rentPrice}/month
                  </p>

                  <div className="flex space-x-3 text-muted-foreground">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.bedroomNumber}</span>
                    </div>
                  </div>
                </div>

                <Link href={`/listings/${property.listingId}`}>
                  <Button className="w-full mt-2">View Details</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesClient;
