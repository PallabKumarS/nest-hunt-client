import FAQ from "@/components/modules/pages/FAQ";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Nest Hunt",
  description:
    "Frequently asked questions about Nest Hunt marketplace - find answers to common questions about buying, selling, payments, shipping, and account management.",
  keywords:
    "FAQ, help, support, questions, Nest Hunt, marketplace, buying, selling",
};

const page = () => {
  return (
    <Container>
      <FAQ />
    </Container>
  );
};

export default page;
