import { request } from "./api";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  created_at: string;
};

export function createUser(user: CreateUserInput): Promise<User> {
  return request<User>("/api/users/", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function getUser(id: number): Promise<User> {
  return request<User>(`/api/users/${id}`);
}
