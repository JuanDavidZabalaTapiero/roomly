import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/user";
import type { User } from "../../types/user";

export function useUsers() {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ESTADOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FUNCIONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  async function loadUsersFromApi() {
    setLoading(true);
    setError(null);

    try {
      const receivedUsers = await getAllUsers();
      setUsers(receivedUsers);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los usuarios";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function loadUsersWhenHookStarts() {
    void loadUsersFromApi();
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EFECTOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  useEffect(loadUsersWhenHookStarts, []);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // VALORES QUE UTILIZA EL COMPONENTE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return {
    users,
    loading,
    error,
    reload: loadUsersFromApi,
  };
}
