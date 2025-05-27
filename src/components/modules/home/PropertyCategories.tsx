"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Building,
  Home,
  Castle,
  Hotel,
  Warehouse,
  Trees,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getListingLocations } from "@/services/ListingService";

const PropertyCategories = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [locations, setLocations] = useState<[{ location: string }] | []>([]);

  // Icons to cycle through for locations
  const locationIcons = [Building, Home, Castle, Hotel, Warehouse, Trees];

  // Colors to cycle through for locations
  const colorSchemes = [
    { color: "bg-primary/10", textColor: "text-primary" },
    { color: "bg-secondary/10", textColor: "text-secondary-foreground" },
    { color: "bg-accent/10", textColor: "text-accent-foreground" },
  ];

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await getListingLocations();
      setLocations(res?.data || []);
    };

    fetchLocations();
  }, [pathname, router]);

  // Handle location click
  const handleLocationClick = (location: string) => {
    const params = new URLSearchParams();
    params.set("houseLocation", location);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by <span className="text-gradient">Location</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect property in your preferred neighborhood
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {locations.slice(0, 6).map((locationObj, index) => {
            // Get icon and color based on index
            const IconComponent = locationIcons[index % locationIcons.length];
            const { color, textColor } =
              colorSchemes[index % colorSchemes.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <Link
                  href={`/listings?houseLocation=${encodeURIComponent(
                    locationObj.location
                  )}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLocationClick(locationObj.location);
                  }}
                >
                  <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all h-full flex flex-col items-center justify-center text-center cursor-pointer">
                    <div className={`p-4 rounded-full ${color} mb-4`}>
                      <IconComponent className={`w-6 h-6 ${textColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      {locationObj.location}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 inline mr-1" />
                      Properties
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyCategories;
