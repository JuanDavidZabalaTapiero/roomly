import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../../api/user";

type FormErrors = {
  email?: string;
  password?: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};

const emptyValues: LoginFormValues = {
  email: "",
  password: "",
};

export function useLoginForm() {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ESTADOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [formData, setFormData] = useState<LoginFormValues>(emptyValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

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
  }

  async function submitLoginForm(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(formData);

      sessionStorage.setItem("access_token", response.access_token);
      navigate("/", { replace: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocurrió un error al intentar iniciar sesión";
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
    validationErrors,
    handleChange: handleFormChange,
    handleSubmit: submitLoginForm,
  };
}
