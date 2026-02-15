import { FaUserEdit, FaKey } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Loader from "../../components/shared/Loader";

const Profile = () => {
  // Example fallback user (remove when using real auth user)
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  //   console.log(role);
  if (isRoleLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL} alt="Profile" />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-4xl font-semibold">{user?.displayName}</h1>

              <h2 className="text-2xl font-bold">{user?.name}</h2>

              <p className="text-gray-500">{user?.email}</p>

              <div>
                <span className="badge badge-primary badge-outline px-4 py-3 text-sm">
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider my-6"></div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
            <button className="btn btn-primary gap-2">
              <FaUserEdit />
              Update Profile
            </button>

            <button className="btn btn-outline btn-secondary gap-2">
              <FaKey />
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
