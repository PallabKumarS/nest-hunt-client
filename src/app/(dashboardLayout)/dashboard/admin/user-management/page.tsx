import UserManagement from "@/components/modules/management/UserManagement";
import NoData from "@/components/shared/NoData";
import { getAllUsers } from "@/services/UserService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | User Management",
  description:
    "This is User Management Page of the dashboard used by admin only",
};

const UserManagementPage = async () => {
  const users = await getAllUsers({ limit: 12 });

  if (users?.data?.length === 0) {
    return <NoData />;
  }

  return (
    <div>
      <UserManagement users={users?.data} meta={users?.meta} />
    </div>
  );
};

export default UserManagementPage;
