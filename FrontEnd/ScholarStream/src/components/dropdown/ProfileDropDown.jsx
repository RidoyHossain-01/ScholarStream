import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const ProfileDropDown = () => {
  const { user, logOut } = useAuth();
  const userImg = user.photoURL;

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="avatar  rounded-full">
        <div className="w-10 rounded-full hover:scale-105 animation">
          <img src={userImg} alt="User Image" />
        </div>
      </div>

      <ul
        tabIndex="-1"
        className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
      >
        <li>
          <Link to={"/dashboard/my-profile"}>Profile</Link>
        </li>
        <li>
          <button onClick={handleLogOut}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
