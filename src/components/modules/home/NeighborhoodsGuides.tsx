"use client";

import { motion } from "framer-motion";
import { MapPin, Building, Car, Coffee, School, ParkingCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NeighborhoodGuides = () => {
  const neighborhoods = [
    {
      name: "Downtown District",
      description:
        "Urban living with easy access to business centers, entertainment, and dining.",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564181/samples/landscapes/architecture-signs.jpg",
      amenities: ["Shopping Centers", "Public Transit", "Nightlife"],
      icons: [Building, Car, Coffee],
    },
    {
      name: "Suburban Heights",
      description:
        "Family-friendly neighborhoods with excellent schools and recreational facilities.",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564180/samples/landscapes/beach-boat.jpg",
      amenities: ["Good Schools", "Parks", "Community Centers"],
      icons: [School, ParkingCircle, Building],
    },
    {
      name: "Riverside Community",
      description:
        "Peaceful living with scenic views and outdoor activities along the river.",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564179/samples/landscapes/nature-mountains.jpg",
      amenities: ["Waterfront", "Hiking Trails", "Local Cafes"],
      icons: [ParkingCircle, Car, Coffee],
    },
  ];

  return (
    <section className="py-16 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Neighborhood <span className="text-gradient">Guides</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the unique character and amenities of popular neighborhoods
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {neighborhoods.map((neighborhood, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48">
                <Image
                  src={neighborhood.image}
                  alt={neighborhood.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">
                    {neighborhood.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-muted-foreground">
                  {neighborhood.description}
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold">Popular Amenities:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {neighborhood.amenities.map((amenity, i) => {
                      const Icon = neighborhood.icons[i];
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-center text-center p-2 bg-primary/5 rounded-lg"
                        >
                          <Icon className="h-5 w-5 text-primary mb-1" />
                          <span className="text-xs">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-2">
                  <MapPin className="mr-2 h-4 w-4" /> Explore Area
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodGuides;
