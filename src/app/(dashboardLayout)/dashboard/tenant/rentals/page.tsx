import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Rentals",
  description: "This is Rentals Page of the dashboard used by tenant only",
};

const RentalsPage = () => {
  return (
    <div>
      <h1>This is RentalsPage Component</h1>
    </div>
  );
};

export default RentalsPage;
