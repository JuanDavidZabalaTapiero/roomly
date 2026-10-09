import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <>
      <header>
        <h1>Dashboard</h1>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
