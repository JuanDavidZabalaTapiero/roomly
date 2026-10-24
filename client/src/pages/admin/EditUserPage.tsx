import { useParams } from "react-router";
import EditUserForm from "../../components/admin/EditUserForm";

function EditUserPage() {
  const { userId } = useParams();
  const parsedUserId = Number(userId);

  if (!userId || !Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    return <p>ID de usuario inválido.</p>;
  }

  return (
    <section>
      <h2>Editar usuario</h2>
      <EditUserForm userId={parsedUserId} />
    </section>
  );
}

export default EditUserPage;
