import { request } from "./api";

export function getUser(id: Number) {
  return request(`/api/users/${id}`);
}
