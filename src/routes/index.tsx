import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  //todo

  if (!!localStorage.getItem("accessToken")) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
