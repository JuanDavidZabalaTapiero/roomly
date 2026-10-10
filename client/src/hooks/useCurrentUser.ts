import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMe } from "../api/user";
import type { User } from "../types/user";

export function useCurrentUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const validateSession = async () => {
      const token = sessionStorage.getItem("access_token");

      if (!token) {
        navigate("/", { replace: true });
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getMe(token);
        if (active) setUser(currentUser);
      } catch {
        sessionStorage.removeItem("access_token");
        if (active) navigate("/", { replace: true });
      } finally {
        if (active) setLoading(false);
      }
    };

    void validateSession();

    return () => {
      active = false;
    };
  }, [navigate]);

  return { user, loading };
}
