import { useUsers } from "../../hooks/users/useUsers";
import { Link } from "react-router";

function UsersTable() {
  const { users, loading, error, reload } = useUsers();

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return (
      <div>
        <p role="alert">{error}</p>
        <button type="button" onClick={() => void reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return <p>No hay usuarios registrados.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Fecha de registro</th>
          <th>Editar</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{new Date(user.created_at).toLocaleDateString("es-CO")}</td>
            <td>
              <Link to={`/dashboard/users/${user.id}/edit`}>Editar</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;
