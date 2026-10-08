import { useState } from "react";
import type { ChangeEvent } from "react";
import { createUser } from "../api/user";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export function useCreateUserForm() {
  // Variables
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  // Manejar cambio en input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validación
  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    }
    if (!formData.email.includes("@")) {
      errors.email = "Ingresa un correo electrónico válido.";
    }
    if (formData.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Llamada a API
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validate()) return;

    setLoading(true);

    try {
      await createUser(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", password: "" });
      setValidationErrors({});
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al crear el usuario",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    success,
    validationErrors,
    handleChange,
    handleSubmit,
  };
}
