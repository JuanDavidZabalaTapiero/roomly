import { Outlet, useNavigate } from "react-router";

function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/", { replace: true });
  };

  return (
    <>
      <header>
        <h1>Dashboard Admin</h1>

        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
