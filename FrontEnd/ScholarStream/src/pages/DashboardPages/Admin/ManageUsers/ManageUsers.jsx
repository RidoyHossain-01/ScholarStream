import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import useRole from "../../../../hooks/useRole";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UsersCard from "./UsersCard";
import Loader from "../../../../components/shared/Loader";

const ManageUsers = () => {
  const [roleFilter, setRoleFilter] = useState("All");

  const [role] = useRole();
  const axiosSecure = useAxiosSecure();
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    enabled: role === "Admin",
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });

  const filteredUsers =
    roleFilter === "All"
      ? users
      : users.filter((user) => user.role === roleFilter);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return "Error Happend";
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Manage Users</h2>

        {/* Filter Dropdown */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="select select-bordered w-full md:w-56"
        >
          <option value="All">All Roles</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          {/* Head */}
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Change Role</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredUsers.map((user) => (
              <UsersCard key={user?._id} user={user} refetch={refetch} />
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
