const API_URL = import.meta.env.VITE_API_URL;

export async function request(path: string, options?: RequestInit) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options,
    });
  } catch {
    throw new Error("No se pudo conectar al servidor");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Ocurrióm un error inesperado");
  }

  return data;
}
