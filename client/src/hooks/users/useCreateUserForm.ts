import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { createUser } from "../../api/user";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
};

type CreateUserFormValues = {
  name: string;
  email: string;
  password: string;
};

const emptyValues: CreateUserFormValues = {
  name: "",
  email: "",
  password: "",
};

export function useCreateUserForm() {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ESTADOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [formData, setFormData] = useState<CreateUserFormValues>(emptyValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FUNCIONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData(function updateFormData(previousFormData) {
      return {
        ...previousFormData,
        [name]: value,
      };
    });
  }

  function validateForm() {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    }

    if (!formData.email.trim()) {
      errors.email = "El email es obligatorio.";
    } else if (!formData.email.includes("@")) {
      errors.email = "Ingresa un correo electrónico válido.";
    }

    if (formData.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function submitCreateUserForm(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    setLoading(true);

    try {
      await createUser(formData);
      setSuccess(true);
      setFormData(emptyValues);
      setValidationErrors({});
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocurrió un error al intentar crear el usuario";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // VALORES QUE UTILIZA EL COMPONENTE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return {
    formData,
    loading,
    error,
    success,
    validationErrors,
    handleChange: handleFormChange,
    handleSubmit: submitCreateUserForm,
  };
}
