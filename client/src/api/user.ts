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
