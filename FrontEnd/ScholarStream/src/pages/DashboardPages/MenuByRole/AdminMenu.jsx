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



{/* Settings */}
       <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
            {/* Settings icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
    </>
  );
};

export default AdminMenu;
