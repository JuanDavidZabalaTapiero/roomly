import { useEffect, useState } from "react";
import { getMe } from "../../api/user";
import type { User } from "../../types/user";

export function useCurrentUser() {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ESTADOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FUNCIONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  async function validateSessionFromApi() {
    const accessToken = sessionStorage.getItem("access_token");

    if (!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const currentUser = await getMe(accessToken);
      setUser(currentUser);
    } catch {
      sessionStorage.removeItem("access_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function validateSessionWhenHookStarts() {
    void validateSessionFromApi();
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EFECTOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  useEffect(validateSessionWhenHookStarts, []);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // VALORES QUE UTILIZA EL COMPONENTE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return {
    user,
    loading,
  };
}
