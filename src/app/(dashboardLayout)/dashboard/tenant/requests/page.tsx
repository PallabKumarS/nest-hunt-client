import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Requests",
  description: "This is Requests Page of the dashboard used by tenant only",
};

const RequestsPage = () => {
  return (
    <div>
      <h1>This is RequestsPage Component</h1>
    </div>
  );
};

export default RequestsPage;
