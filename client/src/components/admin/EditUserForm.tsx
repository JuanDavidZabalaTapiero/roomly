import { useUser } from "../../hooks/users/useUser";
import { useUpdateUserForm } from "../../hooks/users/useUpdateUserForm";

type EditUserFormProps = {
  userId: number;
};

function EditUserForm({ userId }: EditUserFormProps) {
  const { user, loading: loadingUser, error: loadError } = useUser(userId);

  const {
    values,
    loading: saving,
    error: saveError,
    success,
    handleChange,
    handleSubmit,
  } = useUpdateUserForm(user);

  if (loadingUser) {
    return <p>Cargando usuario...</p>;
  }

  if (loadError) {
    return <p role="alert">{loadError}</p>;
  }

  if (!user) {
    return <p>No se encontró el usuario.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="role">Rol</label>
        <select
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {saveError && <p role="alert">{saveError}</p>}
      {success && <p>Usuario actualizado correctamente.</p>}

      <button type="submit" disabled={saving}>
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}

export default EditUserForm;
