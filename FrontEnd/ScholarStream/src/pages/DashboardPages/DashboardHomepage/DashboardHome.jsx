import useRole from "../../../hooks/useRole";
import Loader from "../../../components/shared/Loader";
import AdminHome from "../Admin/AdminHome";
import ModeratorHome from "../Moderator/ModeratorHome";
import StudentHome from "../Student/StudentHome";

const DashboardHome = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <Loader />;
  }
  return (
    <div>
      {role === "Admin" && <AdminHome />}
      {role === "Moderator" && <ModeratorHome />}
      {role === "Student" && <StudentHome />}
    </div>
  );
};

export default DashboardHome;
