"use client";

import { useAuthSession } from "@/shared/hooks/use-session";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, user } = useAuthSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    router.replace("/admin/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Admin Dashboard, {user?.name}</h1>

      <p>
        This is a protected admin page, visible only to authenticated users.
      </p>

      <div>
        <h2>Admin Tools</h2>
        <ul>
          <li>View User Statistics</li>
          <li>Manage Content</li>
          <li>Settings</li>
          <li>View Reports</li>
        </ul>
      </div>

      <div>
        <h3>Recent Activities</h3>
        <ul>
          <li>Activity 1: Admin logged in</li>
          <li>Activity 2: Content updated</li>
          <li>Activity 3: Settings changed</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
