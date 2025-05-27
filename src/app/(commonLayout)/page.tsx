import FeaturedProperties from "@/components/modules/home/FeaturedProperties";
import HeroSection from "@/components/modules/home/HeroSection";
import HowItWorks from "@/components/modules/home/HowItWorks";
import NeighborhoodGuides from "@/components/modules/home/NeighborhoodsGuides";
import NewsLetter from "@/components/modules/home/NewsLetter";
import PropertyCategories from "@/components/modules/home/PropertyCategories";
import Testimonials from "@/components/modules/home/Testimonials";
import Tips from "@/components/modules/home/Tips";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NestHunt | Home",
  description: "Welcome to NestHunt, your gateway to finding your dream home.",
};

const page = () => {
  return (
    <Container className="space-y-10">
      <HeroSection />
      <FeaturedProperties />
      <HowItWorks />
      <PropertyCategories />
      <Testimonials />
      <NeighborhoodGuides />
      <Tips />
      <NewsLetter />
    </Container>
  );
};

export default page;
