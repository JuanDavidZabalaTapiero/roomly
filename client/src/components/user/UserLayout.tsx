import { Outlet, useNavigate } from "react-router";

function UserLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/", { replace: true });
  };

  return (
    <>
      <header>
        <h1>Roomly</h1>

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

export default UserLayout;
