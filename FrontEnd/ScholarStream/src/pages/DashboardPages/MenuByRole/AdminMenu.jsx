import { FaGraduationCap, FaPlus } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { NavLink } from "react-router";

const AdminMenu = () => {
  return (
    <>
      {/* Manage Users */}
      <li>
        <NavLink
          to={"/dashboard/manage-users"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Users"
        >
          {/* icon */}
          <MdOutlineManageAccounts className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">Manage Users</span>
        </NavLink>
      </li>

      {/* Manage Scholarships */}
      <li>
        <NavLink
          to={"/dashboard/manage-scholarships"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Scholarships"
        >
          {/* icon */}
          <FaGraduationCap className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">Manage Scholarships</span>
        </NavLink>
      </li>

      {/* Post a Scholarship */}
      <li>
        <NavLink
          to={"/dashboard/post-A-Scholarship"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Post a Scholarship"
        >
          {/* icon */}
          <FaPlus className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">Post a Scholarship</span>
        </NavLink>
      </li>
    </>
  );
};

export default AdminMenu;
