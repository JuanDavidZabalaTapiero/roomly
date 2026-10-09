import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { loginUser } from "../api/user";

type FormErrors = {
  email?: string;
  password?: string;
};

export function useLoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.email.trim()) {
      errors.email = "El email es obligatorio.";
    } else if (!formData.email.includes("@")) {
      errors.email = "Ingresa un correo electrónico válido.";
    }

    if (!formData.password) {
      errors.password = "La contraseña es obligatoria.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setAccessToken(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await loginUser(formData);
      setAccessToken(response.access_token);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al intentar iniciar sesión",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    validationErrors,
    accessToken,
    handleChange,
    handleSubmit,
  };
}
