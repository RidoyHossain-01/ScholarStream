import { useQuery } from "@tanstack/react-query";

import useRole from "../../../../hooks/useRole";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/shared/Loader";
import ApplicationCard from "./ApplicationCard";

const ReviewApplications = () => {
  const axiosSecure = useAxiosSecure();

  const [role, isRoleLoading] = useRole();
  const { user, loading } = useAuth();

  const {
    data: applications,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    enabled: role === "Moderator",
    queryKey: ["ReviewApplications", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/applications");
      return data;
    },
  });

  if (loading || isRoleLoading || isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error Happened </div>;
  }
  return (
    <div className="w-full p-4 md:p-6 bg-base-200 min-h-screen">
      <div className="bg-base-100 shadow-xl rounded-xl p-5">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="text-2xl font-bold">Manage Applied Applications</h2>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-300 text-base font-semibold">
              <tr>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Applied University</th>
                <th>Feedback</th>
                <th>Status</th>
                <th>Payment</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {applications.map((application) => (
              <ApplicationCard
                key={application?._id}
                application={application}
                refetch={refetch}
              />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewApplications;
