import { MdOutlineRateReview, MdReviews } from "react-icons/md";
import { NavLink } from "react-router";

const ModeratorMenu = () => {
  return (
    <>
      {/* Review Applications */}
      <li>
        <NavLink
          to={"/dashboard/review-applications"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Review Applications"
        >
          {/* icon */}
          <MdReviews className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">Review Applications</span>
        </NavLink>
      </li>
      {/* Manage Reviews */}
      <li>
        <NavLink
          to={"/dashboard/manage-reviews"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Reviews"
        >
          {/* icon */}
          <MdOutlineRateReview className="my-1.5 inline-block size-4" />
          <span className="is-drawer-close:hidden">Manage Reviews</span>
        </NavLink>
      </li>
    </>
  );
};

export default ModeratorMenu;
