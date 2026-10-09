import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm() {
  const {
    formData,
    loading,
    error,
    validationErrors,
    accessToken,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      {error && <div>{error}</div>}
      {accessToken && <div>¡Inicio de sesión exitoso!</div>}

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {validationErrors.email && <span>{validationErrors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {validationErrors.password && <span>{validationErrors.password}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
