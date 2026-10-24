import { useEffect, useState } from "react";
import { getUser } from "../../api/user";
import type { User } from "../../types/user";

export function useUser(id: number) {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ESTADOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FUNCIONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  async function loadUserFromApi() {
    setLoading(true);
    setError(null);

    try {
      const receivedUser = await getUser(id);
      setUser(receivedUser);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "No se pudo cargar el usuario";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function loadUserWhenIdChanges() {
    void loadUserFromApi();
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EFECTOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  useEffect(loadUserWhenIdChanges, [id]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // VALORES QUE UTILIZA EL COMPONENTE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return {
    user,
    loading,
    error,
  };
}
