import DelayedNoData from "@/components/shared/DelayedNoData";
import LoadingData from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { getPersonalRequests } from "@/services/RequestService";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Track Requests",
  description:
    "This is Track Requests Page of the dashboard used by tenant only",
};

const TrackingPage = async () => {
  const requests = await getPersonalRequests({ limit: 12 });

  if (requests?.data?.length === 0) {
    return (
      <Suspense fallback={<LoadingData />}>
        <DelayedNoData />
      </Suspense>
    );
  }

  return (
    <div>
      <h1>This is TrackingPage Component</h1>
    </div>
  );
};

export default TrackingPage;
