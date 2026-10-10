import { useCreateUserForm } from "../../hooks/useCreateUserForm";

export function CreateUserForm() {
  const {
    formData,
    loading,
    error,
    success,
    validationErrors,
    handleChange,
    handleSubmit,
  } = useCreateUserForm();

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Usuario</h2>

      {success && <div>¡Usuario creado exitosamente!</div>}

      {error && <div>{error}</div>}

      <div>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {validationErrors.name && <span>{validationErrors.name}</span>}
      </div>

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
        {loading ? "Guardando..." : "Registrarse"}
      </button>
    </form>
  );
}
