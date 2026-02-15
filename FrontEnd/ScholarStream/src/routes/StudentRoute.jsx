import Loader from "../components/shared/Loader";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const StudentRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <Loader />;
  }
  if (role !== "Student") {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default StudentRoute;
