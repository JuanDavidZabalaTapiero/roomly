import { Outlet, useNavigate } from "react-router";
import { useCurrentUser } from "../../hooks/useCurrentUser";

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, loading } = useCurrentUser();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/", { replace: true });
  };

  if (loading) return <p>Verificando sesión...</p>;
  if (!user) return null;

  return (
    <>
      <header>
        <h1>Dashboard</h1>

        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main>
        <Outlet context={{ user }} />
      </main>
    </>
  );
}

export default DashboardLayout;
