import { apiRequest } from "../services/api";

const API_BASE = "";

export const API_AUTH_BASE = `${API_BASE}/auth`;

export const AUTH_ENDPOINTS = {
  ADMIN_LOGIN: `${API_AUTH_BASE}/admin/login`,
};

export const adminLogin = async ({ email, password }) => {
  return apiRequest(AUTH_ENDPOINTS.ADMIN_LOGIN, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};