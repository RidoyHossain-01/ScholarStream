import { Link, NavLink } from "react-router";
import { HiMenuAlt2 } from "react-icons/hi";
import Button from "../Button/Button";
import useAuth from "../../../hooks/useAuth";
import ProfileDropDown from "../../dropdown/profileDropDown";
import { CiLogin, CiViewList } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user } = useAuth();

  const links = (
    <>
      <li>
        <NavLink to={"/"}>
          <IoHomeOutline className="lg:hidden" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/all-scholarships"}>
          <CiViewList className="lg:hidden" /> All Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>
          <LuLayoutDashboard className="lg:hidden" />
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>
          <LuLayoutDashboard className="lg:hidden" />
          About
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/blogs"}>
              <CiViewList className="lg:hidden" />
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/my-profile"}>
              <CiViewList className="lg:hidden" />
              My Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-300">
      <div className="navbar shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden hover:bg-base-200 animation"
            >
              <HiMenuAlt2 className="text-accent text-2xl" />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow border border-base-300"
            >
              {links}
            </ul>
          </div>
          <Link
            to={"/"}
            className="text-primary text-2xl hover:text-accent animation font-bold flex items-center gap-1"
          >
            Scholar<span className="text-accent">Stream</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-5 px-1 text-secondary">{links}</ul>
        </div>
        <div className="navbar-end flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <ProfileDropDown />
          ) : (
            <Link to={"/login"}>
              <Button label={"Log in"} icon={<CiLogin />} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
