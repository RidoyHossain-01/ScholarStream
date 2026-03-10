import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../../hooks/useAuth";

import axios from "axios";
import Loader from "../../../../components/shared/Loader";
import ManageScholarshipCard from "./ManageScholarshipCard";
import { Link } from "react-router";
import ErrorPage from "../../../Error/ErrorPage";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageScholarships = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: scholarships,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["manage-scholarship-admin", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-scholarship-admin`);
      return data;
    },
  });

  if (isLoading || loading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-primary">Manage Scholarships</h2>

        <Link
          to={"/dashboard/post-a-scholarship"}
          className="btn btn-primary btn-sm"
        >
          + Add Scholarship
        </Link>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300 bg-base-100">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>University</th>
              <th>Scholarship</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Degree</th>
              <th>Tuition</th>
              <th>App Fee</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {scholarships.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-10 text-base-content/50"
                >
                  No Scholarships Found
                </td>
              </tr>
            ) : (
              scholarships.map((scholarship) => (
                <ManageScholarshipCard
                  scholarship={scholarship}
                  key={scholarship._id}
                  refetch={refetch}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
