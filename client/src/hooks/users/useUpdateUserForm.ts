import { useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { updateUser } from "../../api/user";
import type { User } from "../../types/user";

type UserFormValues = {
  name: string;
  email: string;
  role: User["role"];
};

const emptyValues: UserFormValues = {
  name: "",
  email: "",
  role: "user",
};

export function useUpdateUserForm(user: User | null) {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ESTADOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [values, setValues] = useState<UserFormValues>(emptyValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FUNCIONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function loadFormValuesFromUser() {
    if (user === null) {
      setValues(emptyValues);
      return;
    }

    setValues({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    setError(null);
    setSuccess(false);
  }

  function handleFormChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setValues(function updateFormValues(currentValues) {
      const updatedValues: UserFormValues = {
        ...currentValues,
        [name]: value,
      };

      return updatedValues;
    });

    setError(null);
    setSuccess(false);
  }

  async function submitUserUpdate(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (user === null) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const updatedUser = await updateUser(user.id, values);

      setValues({
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });

      setSuccess(true);
    } catch (caughtError) {
      const errorMessage =
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo actualizar el usuario";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function loadFormValuesWhenUserChanges() {
    loadFormValuesFromUser();
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EFECTOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  useEffect(loadFormValuesWhenUserChanges, [user]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // VALORES QUE UTILIZA EL COMPONENTE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return {
    values,
    loading,
    error,
    success,
    handleChange: handleFormChange,
    handleSubmit: submitUserUpdate,
  };
}
