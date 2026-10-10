import { Link } from "react-router";

function DashboardNotFound() {
  return (
    <section>
      <h1>Página no encontrada</h1>
      <Link to="/dashboard">Volver al dashboard</Link>
    </section>
  );
}

export default DashboardNotFound;
