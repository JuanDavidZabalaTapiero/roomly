export type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
};
