import { Navigate, Outlet } from "react-router";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { User } from "../../types/user";

type RequireAuthProps = {
  role: User["role"];
};

function RequireAuth({ role }: RequireAuthProps) {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return <p>Verificando sesión...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    const destination = user.role === "admin" ? "/dashboard" : "/app";
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
