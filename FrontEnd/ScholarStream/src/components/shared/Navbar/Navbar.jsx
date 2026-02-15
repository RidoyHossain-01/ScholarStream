import { Link, NavLink } from "react-router";

import { HiMenuAlt2 } from "react-icons/hi";
import Button from "../Button/Button";
import useAuth from "../../../hooks/useAuth";
import ProfileDropDown from "../../dropdown/profileDropDown";
import { CiLogin, CiViewList } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";

import { LuLayoutDashboard } from "react-icons/lu";

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
          {" "}
          <CiViewList className="lg:hidden" /> All Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>
          {" "}
          <LuLayoutDashboard className="lg:hidden" />
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md">
      <div className="navbar shadow-sm ">
        <div className="navbar-start">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden hover:bg-secondary animation"
            >
              <span
                className=" text-white text-2xl  "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <HiMenuAlt2 className="text-accent " />
              </span>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to={"/"}
            className=" text-primary text-2xl hover:text-accent animation font-bold flex items-center gap-1"
          >
            Scholar<span className="text-accent">Stream</span>{" "}
          </Link>
        </div>
        <div className="navbar-center hidden  lg:flex">
          <ul className="flex gap-5 px-1 text-secondary ">{links}</ul>
        </div>
        <div className="navbar-end">
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
