/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  List,
  Home as HomeIcon,
  Building,
  MapPin,
  DollarSign,
  Bed,
  Sofa,
  Key,
  Users,
  FileText,
  Clock,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Container from "./Container";

interface MegaMenuProps {
  className?: string;
}

// Real Estate Focused Mega Menu Data Structure
const megaMenuData = {
  categories: {
    title: "Categories",
    sections: [
      {
        title: "Property Types",
        icon: HomeIcon,
        items: [
          {
            name: "Houses",
            href: "/listings?category=houses",
            icon: HomeIcon,
          },
          {
            name: "Apartments",
            href: "/listings?category=apartments",
            icon: Building,
          },
          { name: "Condos", href: "/listings?category=condos", icon: Building },
          {
            name: "Townhouses",
            href: "/listings?category=townhouses",
            icon: HomeIcon,
          },
        ],
      },
      {
        title: "Locations",
        icon: MapPin,
        items: [
          {
            name: "City Center",
            href: "/listings?location=city-center",
            icon: MapPin,
          },
          {
            name: "Suburban",
            href: "/listings?location=suburban",
            icon: MapPin,
          },
          {
            name: "Waterfront",
            href: "/listings?location=waterfront",
            icon: MapPin,
          },
          {
            name: "Countryside",
            href: "/listings?location=countryside",
            icon: MapPin,
          },
        ],
      },
      {
        title: "Price Range",
        icon: DollarSign,
        items: [
          {
            name: "Budget Friendly",
            href: "/listings?price=budget",
            icon: DollarSign,
          },
          {
            name: "Mid Range",
            href: "/listings?price=mid-range",
            icon: DollarSign,
          },
          { name: "Luxury", href: "/listings?price=luxury", icon: DollarSign },
          {
            name: "Premium",
            href: "/listings?price=premium",
            icon: DollarSign,
          },
        ],
      },
      {
        title: "Features",
        icon: Bed,
        items: [
          { name: "1-2 Bedrooms", href: "/listings?bedrooms=1-2", icon: Bed },
          { name: "3+ Bedrooms", href: "/listings?bedrooms=3-plus", icon: Bed },
          {
            name: "Furnished",
            href: "/listings?feature=furnished",
            icon: Sofa,
          },
          {
            name: "Pet Friendly",
            href: "/listings?feature=pet-friendly",
            icon: Shield,
          },
        ],
      },
      {
        title: "Rental Terms",
        icon: Key,
        items: [
          {
            name: "Short Term",
            href: "/listings?term=short-term",
            icon: Clock,
          },
          {
            name: "Long Term",
            href: "/listings?term=long-term",
            icon: Clock,
          },
          {
            name: "Lease Options",
            href: "/listings?term=lease-options",
            icon: FileText,
          },
          {
            name: "Immediate Move-in",
            href: "/listings?term=immediate",
            icon: Key,
          },
        ],
      },
      {
        title: "For Landlords",
        icon: Users,
        items: [
          {
            name: "List Property",
            href: "/dashboard/landlord/create-listing",
            icon: FileText,
          },
          {
            name: "Manage Listings",
            href: "/dashboard/landlord/listings",
            icon: FileText,
          },
          {
            name: "Tenant Requests",
            href: "/dashboard/landlord/requests",
            icon: Users,
          },
          {
            name: "Landlord Guide",
            href: "/landlord-guide",
            icon: FileText,
          },
        ],
      },
    ],
  },
};

const MegaMenu = ({ className = "" }: MegaMenuProps) => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const handleMegaMenuToggle = (menuType: string) => {
    if (activeMegaMenu === menuType) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(menuType);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node)
      ) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const MegaMenuContent = ({ data }: { data: any }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-[6vh] left-0 w-[90vw] bg-background backdrop-blur-sm border-t border-border shadow-2xl z-50"
      style={{ marginLeft: "calc(-50vw)" }}
    >
      <Container>
        <div className="py-8 px-4">
          {/* Only Main Sections - No Sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {data.sections.map((section: any, index: number) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <section.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item: any, itemIndex: number) => (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </motion.div>
  );

  return (
    <div className={`relative ${className}`} ref={megaMenuRef}>
      {/* Categories Menu Trigger */}
      <div className="relative">
        <button
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-accent/20 group"
          onClick={() => handleMegaMenuToggle("categories")}
        >
          <List className="w-5 h-5 group-hover:rotate-6 transition-transform" />
          Categories
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              activeMegaMenu === "categories" ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Mega Menu Content */}
      <AnimatePresence>
        {activeMegaMenu === "categories" && (
          <MegaMenuContent data={megaMenuData.categories} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenu;
