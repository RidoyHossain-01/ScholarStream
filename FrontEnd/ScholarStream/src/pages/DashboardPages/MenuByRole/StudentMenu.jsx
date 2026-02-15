import React from "react";
import { FaStar } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { NavLink } from "react-router";

const StudentMenu = () => {
  return (
    <>
      {/* My Applications */}
      <li>
        <NavLink
          to={"/dashboard/my-applications"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Applications"
        >
          {/* icon */}
          <MdAssignment className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">My Applications</span>
        </NavLink>
      </li>

      {/* Reviews */}
      <li>
        <NavLink
          to={"/dashboard/my-reviews"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Reviews"
        >
          {/* icon */}
          <FaStar className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">My Reviews</span>
        </NavLink>
      </li>
    </>
  );
};

export default StudentMenu;
