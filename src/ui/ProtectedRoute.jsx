import { useEffect } from "react";
import Login from "../Login/Login";
import { useUser } from "../Login/useUser";
import AppLayout from "./AppLayout";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isAuthenticated) {
    return children;
    
  }
}

export default ProtectedRoute;
