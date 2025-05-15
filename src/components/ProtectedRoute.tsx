import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const auth = useAuth();

  // <Navigate to="/login" /> - JSX conditional redirect
  // navigate("/login") - event/callback/action
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
