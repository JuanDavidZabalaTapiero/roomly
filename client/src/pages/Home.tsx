import { Navigate } from "react-router";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";

function Home() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return <p>Cargando...</p>;
  }

  // Redireccionamiento según rol
  if (user) {
    return (
      <Navigate to={user.role === "admin" ? "/dashboard" : "/app"} replace />
    );
  }

  return <h1>Inicio</h1>;
}

export default Home;
