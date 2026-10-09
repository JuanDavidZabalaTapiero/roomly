import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMe } from "../api/user";

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    getMe(token)
      .then((user) => {
        console.log("Usuario autenticado:", user);
        setUserName(user.name);
      })
      .catch(() => {
        sessionStorage.removeItem("access_token");
        navigate("/", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p>Verificando sesión...</p>;

  return <h1>Bienvenido, {userName}</h1>;
}

export default Dashboard;
