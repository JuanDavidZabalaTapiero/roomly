import { useState } from "react";
import { deleteUser } from "../../api/user";

export function useDeleteUser() {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ESTADOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FUNCIONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async function deleteUserById(userId: number) {
    setDeletingUserId(userId);
    setError(null);
    setSuccess(false);

    try {
      await deleteUser(userId);
      setSuccess(true);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el usuario";

      setError(errorMessage);
      return false;
    } finally {
      setDeletingUserId(null);
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // VALORES QUE UTILIZA EL COMPONENTE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return {
    deletingUserId,
    error,
    success,
    deleteUserById,
  };
}
