import { Link } from "react-router";
import { useUsers } from "../../hooks/users/useUsers";
import { useDeleteUser } from "../../hooks/users/useDeleteUser";
import type { User } from "../../types/user";

function UsersTable() {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // HOOKS Y DATOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const { users, loading, error: loadError, reload } = useUsers();
  const {
    deletingUserId,
    error: deleteError,
    success: deleteSuccess,
    deleteUserById,
  } = useDeleteUser();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FUNCIONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  async function handleDeleteUser(userId: number) {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar este usuario?",
    );

    if (!confirmed) {
      return;
    }

    const wasDeleted = await deleteUserById(userId);

    if (wasDeleted) {
      await reload();
    }
  }

  function createDeleteButtonHandler(userId: number) {
    return function deleteThisUser() {
      void handleDeleteUser(userId);
    };
  }

  function renderUserRow(user: User) {
    const isDeleting = deletingUserId === user.id;

    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{new Date(user.created_at).toLocaleDateString("es-CO")}</td>
        <td>
          <Link to={`/dashboard/users/${user.id}/edit`}>Editar</Link>
        </td>
        <td>
          <button
            type="button"
            disabled={deletingUserId !== null}
            onClick={createDeleteButtonHandler(user.id)}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </td>
      </tr>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDERIZADO
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (loadError) {
    return (
      <div>
        <p role="alert">{loadError}</p>
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
    <div>
      {deleteError && <p role="alert">{deleteError}</p>}
      {deleteSuccess && <p role="status">Usuario eliminado correctamente.</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Fecha de registro</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody>{users.map(renderUserRow)}</tbody>
      </table>
    </div>
  );
}

export default UsersTable;
