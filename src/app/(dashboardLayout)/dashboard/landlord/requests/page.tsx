import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Requests",
  description: "This is Requests Page of the dashboard used by landlord only",
};

const RequestPage = () => {
  return (
    <div>
      <h1>This is LandlordRequestPage Component</h1>
    </div>
  );
};

export default RequestPage;
