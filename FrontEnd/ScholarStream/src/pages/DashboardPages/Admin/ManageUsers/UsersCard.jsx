import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UsersCard = ({ user, refetch }) => {
  const { register } = useForm();

  const axiosSecure = useAxiosSecure();
  const handleDeleteUser = async () => {
    Swal.fire({
      title: "Delete User?",
      text: `Please check again before deleting! The user's data will be lost forever`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/user/${user?.email}`);
          toast.success(`The user ${user?.name} was deleted successfully`);
          refetch();
        } catch (error) {
          toast.error(error.message || "Error");
        }
      }
    });
  };

  return (
    <>
      <tr>
        <td className="font-medium">{user?.name}</td>
        <td>{user?.email}</td>

        {/* Current Role Badge */}
        <td>
          <span
            className={`badge ${
              user?.role === "Admin"
                ? "badge-error"
                : user?.role === "Moderator"
                  ? "badge-warning"
                  : "badge-info"
            }`}
          >
            {user?.role}
          </span>
        </td>

        {/* Change Role */}
        {user?.role !== "Admin" && (
          <td className="text-center">
            <select
              {...register("role", {
                onChange: async (e) => {
                  const newRole = e.target.value;
                  try {
                    await axiosSecure.patch(`/userRole/${user?._id}`, {
                      role: newRole,
                    });
                    refetch();
                    toast.success("Role Updated Successfully");
                  } catch (error) {
                    toast.error(error.message || "Error");
                  }
                },
              })}
              defaultValue={user?.role}
              className="select select-sm select-bordered"
            >
              <option value="Student">Student</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
          </td>
        )}

        {/* Delete Button */}

        {user?.role !== "Admin" && (
          <td className="text-center">
            <button
              onClick={() => handleDeleteUser()}
              title="Remove User"
              className="btn btn-sm btn-error btn-outline"
            >
              <FaTrash />
            </button>
          </td>
        )}
      </tr>
    </>
  );
};

export default UsersCard;
