import { get, patch, post } from "@/request";
// 用户信息
export interface LoginData {
  username: string;
  password: string;
}

export function login(data: Record<string, LoginData>) {
  return post("/ctrl/auth/login", data);
}

export function getAuth() {
  return get("/ctrl/auth");
}

export function logout() {
  return patch("/ctrl/auth");
}
