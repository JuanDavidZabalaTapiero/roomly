import { request } from "./api";
import type { User } from "../types/user";

type LoginInput = {
  email: string;
  password: string;
};

type TokenResponse = {
  access_token: string;
  token_type: "bearer";
};

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type UpdateUserInput = {
  name: string;
  email: string;
  role: User["role"];
};

// Auth
export function loginUser(credentials: LoginInput): Promise<TokenResponse> {
  return request<TokenResponse>("/api/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getMe(accessToken: string): Promise<User> {
  return request<User>("/api/users/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// CRUD
export function createUser(user: CreateUserInput): Promise<User> {
  return request<User>("/api/users/", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function getUser(id: number): Promise<User> {
  return request<User>(`/api/users/${id}`);
}

export function getAllUsers(): Promise<User[]> {
  return request<User[]>("/api/users/");
}

export function updateUser(id: number, user: UpdateUserInput): Promise<User> {
  return request<User>(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}
