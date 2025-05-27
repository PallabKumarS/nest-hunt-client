import WishlistPage from "@/components/modules/pages/WishlistPage";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist || Nest Hunt",
  description: "View and manage your favorite properties in your wishlist",
};

export default function Wishlist() {
  return (
    <Container>
      <WishlistPage />
    </Container>
  );
}
