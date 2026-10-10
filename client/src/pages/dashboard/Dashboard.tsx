import type { User } from "../../types/user";
import { useOutletContext } from "react-router";

type DashboardContext = {
  user: User;
};

function Dashboard() {
  const { user } = useOutletContext<DashboardContext>();

  return <h1>Bienvenido, {user.name}</h1>;
}

export default Dashboard;
