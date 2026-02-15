import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import MyApplicationCard from "./MyApplicationCard";
import Loader from "../../../../components/shared/Loader";

const MyApplications = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: applications,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-application", user?.email],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure(`/my-applications`);
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return "Error happened";
  }
  return (
    <div className="w-full">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          {/* Table Head */}
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>University</th>
              <th>Subject</th>
              <th>Feedback</th>
              <th>Fees ($)</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {applications?.map((app) => (
              <MyApplicationCard key={app._id} app={app} refetch={refetch} />
            ))}

            {applications.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-400">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
