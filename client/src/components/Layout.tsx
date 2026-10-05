import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">Usuarios</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
